import test from "node:test";
import assert from "node:assert/strict";
import { applyDocumentMutation, documentText, validateTitle } from "../lib/workspace/mutations.ts";
import { folders, repositories, sampleDocuments, sampleUser } from "../lib/workspace/fixtures.ts";

const context = { folders, repositories, userId: sampleUser.id };
const initial = () => ({ documents: [...sampleDocuments], deleted: [], drafts: {} });
const at = "2026-10-31T12:00:00.000Z";
const original = sampleDocuments[0];

test("creation validates destination and stable ID without mutating fixtures", () => {
  const document = { ...original, id: "local-test", title: "  سند تازه  ", folderId: "folder-autumn", content: "" };
  const state = applyDocumentMutation(initial(), { type: "create", document }, context);
  assert.equal(state.documents[0].title, "سند تازه");
  assert.equal(state.documents[0].id, "local-test");
  assert.equal(state.documents.length, sampleDocuments.length + 1);
  assert.throws(() => applyDocumentMutation(state, { type: "create", document }, context), /قبلاً/);
  assert.throws(() => applyDocumentMutation(initial(), { type: "create", document: { ...document, folderId: "folder-quarter" } }, context), /پوشه/);
});

test("rename and move preserve identity and update title, time and folder", () => {
  let state = applyDocumentMutation(initial(), { type: "rename", id: original.id, title: "عنوان جدید", at }, context);
  state = applyDocumentMutation(state, { type: "move", id: original.id, folderId: "folder-autumn", at }, context);
  const updated = state.documents.find(item => item.id === original.id);
  assert.deepEqual([updated.id, updated.title, updated.folderId, updated.updatedAt], [original.id, "عنوان جدید", "folder-autumn", at]);
  assert.equal(original.title, "راهنمای شروع یک پروژه تازه");
  assert.throws(() => applyDocumentMutation(state, { type: "rename", id: original.id, title: "   ", at }, context), /عنوان/);
  assert.throws(() => applyDocumentMutation(state, { type: "move", id: original.id, folderId: "missing", at }, context), /پوشه/);
});

test("saving is text only, clears its draft and returns approval to draft", () => {
  const document = sampleDocuments[1];
  const state = applyDocumentMutation({ ...initial(), drafts: { [document.id]: "در حال نوشتن" } }, { type: "save", id: document.id, content: "متن ذخیره شده", at }, context);
  const saved = state.documents.find(item => item.id === document.id);
  assert.equal(documentText(saved), "متن ذخیره شده");
  assert.equal(saved.approval, "draft");
  assert.equal(state.drafts[document.id], undefined);
  assert.throws(() => applyDocumentMutation(initial(), { type: "save", id: sampleDocuments[2].id, content: "bad", at }, context), /متنی/);
  assert.throws(() => applyDocumentMutation(initial(), { type: "save", id: original.id, content: "x".repeat(50001), at }, context), /۵۰/);
});

test("delete and undo restore exact snapshot without duplicates", () => {
  let state = applyDocumentMutation(initial(), { type: "save", id: original.id, content: "متن مهم", at }, context);
  const saved = state.documents.find(item => item.id === original.id);
  state = applyDocumentMutation(state, { type: "delete", id: original.id }, context);
  assert.ok(!state.documents.some(item => item.id === original.id));
  state = applyDocumentMutation(state, { type: "restore", id: original.id }, context);
  assert.deepEqual(state.documents[0], saved);
  assert.equal(state.documents.filter(item => item.id === original.id).length, 1);
  assert.throws(() => applyDocumentMutation(state, { type: "restore", id: original.id }, context), /موجود/);
});

test("sample writes reject team shares, archives and empty or oversized titles", () => {
  for (const id of ["doc-team-01", "doc-archive-01"]) assert.throws(() => applyDocumentMutation(initial(), { type: "delete", id }, context), /دسترس/);
  assert.throws(() => validateTitle(""), /عنوان/);
  assert.throws(() => validateTitle("x".repeat(161)), /۱۶۰/);
});
