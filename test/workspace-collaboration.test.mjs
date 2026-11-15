import test from "node:test";
import assert from "node:assert/strict";
import { applyDocumentMutation, documentText, getDocumentVersions } from "../lib/workspace/mutations.ts";
import { sampleDocuments, sampleUser, samplePeople, folders, repositories } from "../lib/workspace/fixtures.ts";

const context = { userId: sampleUser.id, people: samplePeople, folders, repositories };
const initial = () => ({ documents: [...sampleDocuments], deleted: [], drafts: {} });
const id = sampleDocuments[0].id;
const at = "2026-10-31T12:00:00.000Z";
const doc = state => state.documents.find(item => item.id === id);
const latest = state => getDocumentVersions(doc(state)).at(-1);
const request = state => ({ type: "request-approval", id, versionId: latest(state).id, reviewerId: samplePeople[0].id, at });
const decision = (state, outcome = "approved", reason = "") => ({ type: "decide-approval", id, versionId: latest(state).id, requestedAt: latest(state).review.requestedAt, outcome, reason, at });

test("all fixture histories keep unique IDs, valid bases and matching current content", () => {
  const ids = new Set();
  for (const document of sampleDocuments) {
    const versions = getDocumentVersions(document);
    assert.equal(versions.at(-1).approval, document.approval);
    if (document.kind === "text") assert.equal(versions.at(-1).content, documentText(document));
    for (const [index, version] of versions.entries()) {
      assert.ok(!ids.has(version.id));
      ids.add(version.id);
      assert.equal(version.number, index + 1);
      assert.equal(version.basedOn, versions[index - 1]?.id ?? null);
    }
  }
});

test("three-version fixture has linked immutable snapshots and independent latest approval", () => {
  const versions = getDocumentVersions(sampleDocuments[0]);
  assert.equal(versions.length, 3);
  assert.equal(versions[1].approval, "approved");
  assert.equal(versions[2].approval, "draft");
  assert.equal(versions[2].basedOn, versions[1].id);
  const original = structuredClone(versions);
  const state = applyDocumentMutation(initial(), { type: "save", id, content: "نسخه چهارم", at }, context);
  assert.equal(latest(state).number, 4);
  assert.equal(latest(state).basedOn, versions[2].id);
  assert.deepEqual(getDocumentVersions(doc(state)).slice(0, 3), original);
  assert.deepEqual(getDocumentVersions(sampleDocuments[0]), original);
});

test("unchanged save clears draft without creating history or resetting approval", () => {
  const document = sampleDocuments[1];
  const state = applyDocumentMutation({ ...initial(), drafts: { [document.id]: documentText(document) } }, { type: "save", id: document.id, content: documentText(document), at }, context);
  const saved = state.documents.find(item => item.id === document.id);
  assert.equal(saved.approval, "approved");
  assert.equal(getDocumentVersions(saved).length, 1);
  assert.equal(state.drafts[document.id], undefined);
});

test("request and decision affect one version only and never grant access", () => {
  let state = initial();
  for (const reviewerId of [sampleUser.id, samplePeople[1].id, "unknown"]) assert.throws(() => applyDocumentMutation(state, { ...request(state), reviewerId }, context), /بررسی‌کننده/);
  state = applyDocumentMutation(state, request(state), context);
  assert.equal(doc(state).approval, "pending");
  assert.throws(() => applyDocumentMutation(state, request(state), context), /قبلاً/);
  assert.throws(() => applyDocumentMutation(state, decision(state, "rejected"), context), /دلیل/);
  const action = decision(state);
  state = applyDocumentMutation(state, action, context);
  assert.equal(doc(state).approval, "approved");
  assert.equal(latest(state).review.decision.by.id, samplePeople[0].id);
  assert.equal(doc(state).share, undefined);
  assert.equal(doc(state).recipients, undefined);
  assert.throws(() => applyDocumentMutation(state, action, context), /انتظار/);
});

test("unsaved text, stale versions and stale requests cannot receive decisions", () => {
  const dirty = { ...initial(), drafts: { [id]: "ذخیره نشده" } };
  assert.throws(() => applyDocumentMutation(dirty, request(dirty), context), /ابتدا/);
  let state = applyDocumentMutation(initial(), request(initial()), context);
  const action = decision(state);
  state = applyDocumentMutation(state, { type: "save", id, content: "متن تازه", at }, context);
  assert.equal(latest(state).approval, "draft");
  assert.equal(getDocumentVersions(doc(state)).at(-2).approval, "pending");
  assert.throws(() => applyDocumentMutation(state, action, context), /نسخه تازه/);
  state = applyDocumentMutation(state, request(state), context);
  assert.throws(() => applyDocumentMutation(state, { ...decision(state), requestedAt: "wrong" }, context), /انتظار/);
});

test("rejection reason is retained and retry does not mutate previous snapshots", () => {
  let state = applyDocumentMutation(initial(), request(initial()), context);
  state = applyDocumentMutation(state, decision(state, "rejected", "  نیاز به توضیح بیشتر  "), context);
  assert.equal(latest(state).review.decision.reason, "نیاز به توضیح بیشتر");
  assert.equal(doc(state).approval, "rejected");
  state = applyDocumentMutation(state, request(state), context);
  assert.equal(latest(state).review.decision, undefined);
  assert.equal(getDocumentVersions(doc(state))[1].approval, "approved");
});

test("recipients update uniquely without changing incoming shares, history or ownership", () => {
  const action = { type: "set-recipient", id, personId: samplePeople[1].id, access: "مشاهده" };
  assert.throws(() => applyDocumentMutation(initial(), { ...action, access: "عمومی" }, context), /سطح/);
  let state = applyDocumentMutation(initial(), action, context);
  state = applyDocumentMutation(state, { ...action, access: "ویرایش" }, context);
  assert.equal(doc(state).recipients.length, 1);
  assert.equal(doc(state).recipients[0].access, "ویرایش");
  assert.equal(getDocumentVersions(doc(state)).length, 3);
  assert.equal(doc(state).share, undefined);
  assert.equal(doc(state).creator.id, sampleUser.id);
  for (const personId of [sampleUser.id, "unknown"]) assert.throws(() => applyDocumentMutation(state, { ...action, personId }, context), /شخص/);
  state = applyDocumentMutation(state, { type: "remove-recipient", id, personId: action.personId }, context);
  assert.equal(doc(state).recipients.length, 0);
  for (const id of ["doc-team-01", "doc-archive-01"]) assert.throws(() => applyDocumentMutation(initial(), { ...action, id }, context), /دسترس/);
});

test("delete and undo retain review and recipient state alongside content history", () => {
  let state = applyDocumentMutation(initial(), request(initial()), context);
  state = applyDocumentMutation(state, { type: "set-recipient", id, personId: samplePeople[1].id, access: "مشاهده" }, context);
  const saved = structuredClone(doc(state));
  state = applyDocumentMutation(state, { type: "delete", id }, context);
  state = applyDocumentMutation(state, { type: "restore", id }, context);
  assert.deepEqual(doc(state), saved);
});
