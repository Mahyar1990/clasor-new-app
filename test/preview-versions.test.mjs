import test from 'node:test';
import assert from 'node:assert/strict';
import { changeVersion, editDraft, newDraft } from '../components/design-system/document-dialogs/version-state.ts';
const fixtures = () => [
  { id: 'draft', name: 'نسخهٔ ۳', content: 'new draft', approval: 'draft', published: false },
  { id: 'approved', name: 'نسخهٔ ۳', content: 'approved content', approval: 'approved', published: true, latest: true },
];
test('same numbered draft and approved snapshots retain separate content', () => {
  const versions = fixtures();
  const result = editDraft(versions, 'draft', 'edited draft');
  assert.equal(result[1].content, 'approved content');
  assert.equal(result[0].content, 'edited draft');
  assert.equal(versions[0].content, 'new draft');
});
test('editing an approved snapshot writes to its draft without changing approved content', () => {
  const result = editDraft(fixtures(), 'approved', 'draft only');
  assert.equal(result.find(item => item.id === 'approved').content, 'approved content');
  assert.equal(result.find(item => item.id === 'draft').content, 'draft only');
  const withoutDraft = fixtures().slice(1);
  const created = editDraft(withoutDraft, 'approved', 'new draft');
  assert.equal(created.length, 2);
  assert.equal(created[0].published, false);
  assert.equal(created[1].content, 'approved content');
});
test('public is only permitted on approved snapshots', () => {
  const result = changeVersion(fixtures(), 'draft', 'publish');
  assert.equal(result[0].published, false);
  assert.equal(changeVersion(fixtures(), 'approved', 'unpublish')[1].published, false);
});
test('confirming replaces matching approved snapshot without duplicates and preserves publication', () => {
  const result = changeVersion(fixtures(), 'draft', 'confirm');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'approved');
  assert.equal(result[0].content, 'new draft');
  assert.equal(result[0].published, true);
  assert.equal(result[0].approval, 'approved');
});
test('requests can be cancelled and rejected independently of content', () => {
  const pending = changeVersion(fixtures(), 'draft', 'request');
  assert.equal(pending[0].pending, true);
  const cancelled = changeVersion(pending, 'draft', 'cancel-request');
  assert.equal(cancelled[0].pending, false);
  assert.equal(cancelled[0].content, 'new draft');
  assert.equal(changeVersion(pending, 'draft', 'reject')[0].pending, false);
});
test('new drafts allow approved same number, reject duplicate drafts and blank numbers', () => {
  const approved = fixtures().slice(1);
  assert.equal(newDraft(approved, 'نسخهٔ ۳', 'new', 'new').length, 2);
  assert.equal(newDraft(fixtures(), 'نسخهٔ ۳', 'new', 'new').length, 2);
  assert.equal(newDraft(fixtures(), 'نسخهٔ 3', 'new', 'new').length, 2);
  assert.equal(newDraft(fixtures(), ' ', 'new', 'new').length, 2);
});
test('latest selection is limited to approved versions', () => {
  const versions = fixtures();
  assert.equal(changeVersion(versions, 'draft', 'last'), versions);
  assert.equal(changeVersion(versions, 'missing', 'last'), versions);
});
