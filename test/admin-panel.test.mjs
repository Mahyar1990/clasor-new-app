import test from 'node:test';
import assert from 'node:assert/strict';
import { sortFeedback } from '../components/design-system/admin/query.ts';
test('feedback sorts numeric-looking IDs in both directions without mutating input', () => {
  const rows = [{ id: '100', entityId: '9', description: 'A' }, { id: '9', entityId: '12', description: 'B' }, { id: '20', entityId: '9', description: 'C' }];
  const before = JSON.stringify(rows);
  assert.deepEqual(sortFeedback(rows, { field: 'id', direction: 'asc' }).map(row => row.id), ['9', '20', '100']);
  assert.deepEqual(sortFeedback(rows, { field: 'id', direction: 'desc' }).map(row => row.id), ['100', '20', '9']);
  assert.deepEqual(sortFeedback(rows, { field: 'entityId', direction: 'asc' }).map(row => row.id), ['100', '20', '9']);
  assert.equal(JSON.stringify(rows), before);
  assert.equal(sortFeedback(rows, { field: 'id', direction: 'asc' })[0], rows[1]);
});
test('feedback sorting retains equal-key source order and handles empty records', () => {
  const rows = [{ id: 'a', entityId: '2', description: 'A' }, { id: 'b', entityId: '2', description: 'B' }];
  assert.deepEqual(sortFeedback(rows, { field: 'entityId', direction: 'desc' }).map(row => row.id), ['a', 'b']);
  assert.deepEqual(sortFeedback([], { field: 'id', direction: 'asc' }), []);
});
