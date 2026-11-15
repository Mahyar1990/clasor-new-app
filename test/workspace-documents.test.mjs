import test from "node:test";
import assert from "node:assert/strict";
import { defaultFilters, getDocumentResults, getLoadedItems, normalizeSearch } from "../lib/workspace/documents.ts";
import { folders, personalRepositoryId, repositories, sampleDocuments, sampleUser } from "../lib/workspace/fixtures.ts";
import { folderPath, getSharedDocuments, repositoryHref, safeReturnHref } from "../lib/workspace/navigation.ts";

test("fixtures have unique IDs, valid relations and same-repository folder ancestry", () => {
  for (const collection of [repositories, folders, sampleDocuments]) assert.equal(new Set(collection.map(item => item.id)).size, collection.length);
  assert.ok(repositories.length >= 4);
  assert.ok(folders.length >= 6);
  assert.ok(sampleDocuments.filter(item => item.repositoryId === personalRepositoryId).length >= 30);
  for (const folder of folders) {
    assert.ok(repositories.some(item => item.id === folder.repositoryId));
    const visited = new Set([folder.id]);
    let parentId = folder.parentId;
    while (parentId) {
      assert.ok(!visited.has(parentId), "folder cycle");
      visited.add(parentId);
      const parent = folders.find(item => item.id === parentId);
      assert.equal(parent?.repositoryId, folder.repositoryId);
      parentId = parent.parentId;
    }
  }
  for (const document of sampleDocuments) {
    assert.ok(repositories.some(item => item.id === document.repositoryId));
    if (document.folderId) assert.equal(folders.find(item => item.id === document.folderId)?.repositoryId, document.repositoryId);
    assert.ok(Date.parse(document.updatedAt) >= Date.parse(document.createdAt));
  }
});

test("personal scope excludes team documents even when created by the current user", () => {
  assert.ok(sampleDocuments.some(item => item.repositoryId !== personalRepositoryId && item.creator?.id === sampleUser.id));
  const page = getDocumentResults(sampleDocuments, personalRepositoryId, defaultFilters);
  assert.equal(page.total, 32);
  assert.ok(page.rows.every(item => item.repositoryId === personalRepositoryId));
});

test("search handles Persian/Arabic letters, whitespace, ZWNJ and Latin case", () => {
  assert.equal(normalizeSearch("  يادداشت  كتابخانه "), "یادداشت کتابخانه");
  assert.equal(normalizeSearch("برنامه‌ریزی"), normalizeSearch("برنامه ریزی"));
  for (const query of ["یادداشت کتابخانه شخصی", "project notes", "RESEARCH.PDF"]) {
    assert.equal(getDocumentResults(sampleDocuments, personalRepositoryId, { ...defaultFilters, query }).total, 1);
  }
});

test("combined filters and empty results are applied before cumulative slicing", () => {
  const page = getDocumentResults(sampleDocuments, personalRepositoryId, { ...defaultFilters, query: "گزارش", kind: "pdf", approval: "pending" });
  assert.equal(page.total, 1);
  assert.equal(page.rows[0].id, "doc-personal-03");
  assert.ok(page.rows.every(item => item.kind === "pdf" && item.approval === "pending"));
  const empty = getDocumentResults(sampleDocuments, personalRepositoryId, { ...defaultFilters, query: "عنوان ناموجود", visibleCount: 40 });
  assert.deepEqual([empty.total, empty.shown, empty.hasMore], [0, 0, false]);
});

test("load more grows a stable prefix without duplicates and preserves fixtures", () => {
  const original = sampleDocuments.map(item => item.id);
  const batches = [10, 20, 30, 40].map(visibleCount => getDocumentResults(sampleDocuments, personalRepositoryId, { ...defaultFilters, visibleCount }));
  assert.deepEqual(batches.map(batch => batch.rows.length), [10, 20, 30, 32]);
  assert.deepEqual(batches.map(batch => batch.hasMore), [true, true, true, false]);
  assert.deepEqual(batches.map(batch => batch.nextCount), [20, 30, 32, 32]);
  for (let index = 1; index < batches.length; index++) assert.deepEqual(batches[index].rows.slice(0, batches[index - 1].shown), batches[index - 1].rows);
  assert.equal(new Set(batches.at(-1).rows.map(item => item.id)).size, 32);
  assert.deepEqual(sampleDocuments.map(item => item.id), original);
});

test("generic load more handles invalid limits, short lists, empty lists and removal", () => {
  const items = Array.from({ length: 25 }, (_, index) => index);
  for (const [requested, shown] of [[0, 10], [-20, 10], [NaN, 10], [Infinity, 10], [15.9, 15], [999, 25]]) assert.equal(getLoadedItems(items, requested).shown, shown);
  assert.deepEqual(getLoadedItems([], 30), { rows: [], total: 0, shown: 0, nextCount: 0, hasMore: false });
  assert.deepEqual(getLoadedItems(items.slice(0, 4), 30).rows, [0, 1, 2, 3]);
  const before = getLoadedItems(items, 20);
  const after = getLoadedItems(items.filter(item => item !== 0), 20);
  assert.equal(after.shown, before.shown);
  assert.equal(after.rows[0], 1);
  assert.equal(after.rows.at(-1), 20);
  assert.equal(getLoadedItems(items.slice(0, 8), 30).hasMore, false);
});

test("date and name sorting are reversible and independent from source order", () => {
  const all = getDocumentResults(sampleDocuments, personalRepositoryId, { ...defaultFilters, sort: "updated-asc" });
  assert.equal(all.rows[0].id, "doc-personal-32");
  assert.equal(getDocumentResults(sampleDocuments, personalRepositoryId, defaultFilters).rows[0].id, "doc-personal-01");
  const subset = sampleDocuments.slice(0, 6);
  const asc = getDocumentResults(subset, personalRepositoryId, { ...defaultFilters, sort: "title-asc" }).rows;
  const desc = getDocumentResults(subset, personalRepositoryId, { ...defaultFilters, sort: "title-desc" }).rows;
  assert.deepEqual(asc.map(item => item.id), desc.map(item => item.id).reverse());
});

test("shared documents use explicit sharing metadata, independently of creator", () => {
  const shared = getSharedDocuments(sampleDocuments);
  assert.equal(shared.length, 2);
  assert.ok(shared.every(item => item.share.by.name && item.share.access));
  assert.ok(shared.some(item => item.creator.id === sampleUser.id));
  assert.equal(getDocumentResults(shared, null, defaultFilters).total, 2);
});

test("folder paths validate repository scope and reject cycles and unknown IDs", () => {
  assert.deepEqual(folderPath(folders, "repo-product", "folder-quarter").map(item => item.name), ["برنامه‌ریزی", "فصل پاییز"]);
  assert.equal(folderPath(folders, "repo-personal", "folder-quarter"), null);
  assert.equal(folderPath(folders, "repo-product", "unknown"), null);
  assert.deepEqual(folderPath(folders, "repo-product", null), []);
  assert.equal(folderPath([{ id: "a", parentId: "a", repositoryId: "r", name: "cycle" }], "r", "a"), null);
});

test("return destinations accept local list paths only", () => {
  const valid = repositoryHref("repo-product", "folder-quarter");
  assert.equal(safeReturnHref(valid), valid);
  assert.equal(safeReturnHref("/workspace/shared"), "/workspace/shared");
  for (const value of [null, "https://example.com", "//example.com", "/workspace/documents/unknown", "/workspace/repositories/../bad", "/workspace/repositories/repo-product?next=evil"]) {
    assert.equal(safeReturnHref(value), "/workspace/documents");
  }
});
