import test from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { hierarchyPath } from '../lib/design-system/hierarchy.ts';
const resolution = registerHooks({ resolve(specifier, context, next) { return next(specifier === '../domain/queries' ? `${specifier}.ts` : specifier, context); } });
const { branchPath, branchHierarchy, branchDescendants, removeBranch, branchNameError } = await import('../components/design-system/organization/state.ts');
const { saveOrganizationMember, saveOrganizationPosition, replacePositionMembers, removeOrganizationPosition } = await import('../components/design-system/organization/memberships.ts');
resolution.deregister();
const branches = [
  { id: 'root', name: 'دفتر مرکزی' },
  { id: 'product', name: 'معاونت محصول', parentId: 'root' },
  { id: 'design', name: 'طراحی', parentId: 'product' },
  { id: 'research', name: 'پژوهش کاربران', parentId: 'design' },
  { id: 'support', name: 'پشتیبانی', parentId: 'root' },
  { id: 'other', name: 'شعبه منطقه‌ای' },
];
test('branch search keeps ancestor context, matches descendants and leaves sibling records unchanged', () => {
  const before = JSON.stringify(branches);
  const tree = branchHierarchy(branches, 'پژوهش');
  assert.deepEqual(hierarchyPath(tree, 'research'), ['root', 'product', 'design', 'research']);
  assert.equal(tree[0].children.length, 1);
  assert.deepEqual(branchPath(branches, 'research').map(item => item.id), ['root', 'product', 'design', 'research']);
  assert.equal(branchHierarchy(branches, 'معاونت محصول')[0].children[0].children[0].children[0].id, 'research');
  assert.deepEqual(branchHierarchy(branches, 'پیدا نشد'), []);
  assert.equal(JSON.stringify(branches), before);
});
test('branch removal atomically scopes descendants, members and positions without affecting another branch', () => {
  const state = { branches, members: [{ id: 'a', branchId: 'design' }, { id: 'b', branchId: 'other' }], positions: [{ id: 'p', branchId: 'research' }, { id: 'q', branchId: 'root' }] };
  const result = removeBranch(state, 'product');
  assert.deepEqual([...branchDescendants(branches, 'product')], ['product', 'design', 'research']);
  assert.deepEqual(result.branches.map(item => item.id), ['root', 'support', 'other']);
  assert.deepEqual(result.members.map(item => item.id), ['b']);
  assert.deepEqual(result.positions.map(item => item.id), ['q']);
  assert.equal(state.members.length, 2);
  assert.equal(result.branches[2], branches[5]);
});
test('branch names are unique per parent with Persian normalization, while renaming a node preserves its own name', () => {
  assert.ok(branchNameError(branches, '  '));
  assert.ok(branchNameError(branches, 'طراحي', 'product'));
  assert.equal(branchNameError(branches, 'طراحي', 'product', 'design'), '');
  assert.equal(branchNameError(branches, 'طراحي', 'other'), '');
});
test('hierarchy paths and branch helpers terminate on malformed cycles and handle empty selections', () => {
  const cycle = { id: 'loop', label: 'loop', children: [] }; cycle.children.push(cycle);
  assert.deepEqual(hierarchyPath([cycle], 'missing'), []);
  assert.deepEqual(hierarchyPath([], 'missing'), []);
  const cyclicBranches = [{ id: 'a', name: 'A', parentId: 'b' }, { id: 'b', name: 'B', parentId: 'a' }];
  assert.equal(branchPath(cyclicBranches, 'a').length, 2);
  assert.equal(branchDescendants(cyclicBranches, 'a').size, 2);
  assert.deepEqual(branchHierarchy(cyclicBranches), []);
});

const memberState = () => ({
  branches: [{ id: 'a', name: 'A' }, { id: 'b', name: 'B' }],
  positions: [{ id: 'lead', branchId: 'a', name: 'راهبر' }, { id: 'expert', branchId: 'a', name: 'کارشناس' }, { id: 'other', branchId: 'b', name: 'مدیر' }],
  members: [{ id: 'first', branchId: 'a', positionId: 'lead', user: { id: 'pod-1', name: 'کاربر اول', username: 'first.user' } }, { id: 'second', branchId: 'a', positionId: 'expert', user: { id: 'pod-2', name: 'کاربر دوم', username: 'second.user' } }, { id: 'elsewhere', branchId: 'b', positionId: 'other', user: { id: 'pod-3', name: 'کاربر سوم', username: 'known.user' } }],
});
test('branch membership requires a live position in the same branch even when form checks are bypassed', () => {
  const state = memberState(), before = JSON.stringify(state);
  for (const role of ['', 'none', 'missing', 'other']) assert.throws(() => saveOrganizationMember(state, 'a', 'new.user', role));
  assert.throws(() => saveOrganizationMember(state, 'a', 'FIRST.USER', 'lead'));
  const next = saveOrganizationMember(state, 'a', '@known.user', 'expert', undefined, () => 'new-id');
  assert.equal(next.members.at(-1).positionId, 'expert');
  assert.equal(next.members.at(-1).user, state.members[2].user);
  assert.equal(JSON.stringify(state), before);
});
test('creating a position and multiple users is atomic and does not commit invalid or duplicate usernames', () => {
  const state = memberState(), before = JSON.stringify(state);
  const position = { id: 'new-role', branchId: 'a', name: 'سمت جدید' };
  assert.throws(() => saveOrganizationPosition(state, position, ['valid.user', 'bad user']));
  assert.throws(() => saveOrganizationPosition(state, position, ['same.user', '@SAME.USER']));
  let id = 0;
  const next = saveOrganizationPosition(state, position, ['new.user', 'known.user'], () => `new-${++id}`);
  assert.equal(next.positions.at(-1).id, 'new-role');
  assert.equal(next.members.filter(member => member.positionId === 'new-role').length, 2);
  assert.ok(next.members.every(member => next.positions.some(role => role.id === member.positionId && role.branchId === member.branchId)));
  assert.equal(JSON.stringify(state), before);
});
test('editing position members preserves existing identity/order, moves selected branch users and scopes removals', () => {
  const state = memberState();
  const next = replacePositionMembers(state, state.positions[0], ['SECOND.USER']);
  assert.equal(next.members.some(member => member.id === 'first'), false);
  assert.equal(next.members[0].id, 'second');
  assert.equal(next.members[0].user, state.members[1].user);
  assert.equal(next.members[0].positionId, 'lead');
  assert.equal(next.members[1], state.members[2]);
  const renamed = saveOrganizationPosition(state, { ...state.positions[0], name: 'راهبر جدید' });
  assert.equal(renamed.members, state.members);
});
test('deleting an occupied position is rejected and never leaves users without a role', () => {
  const state = memberState();
  assert.throws(() => removeOrganizationPosition(state, 'a', 'lead'));
  assert.throws(() => removeOrganizationPosition(state, 'b', 'lead'));
  const moved = saveOrganizationMember(state, 'a', 'first.user', 'expert', 'first');
  const next = removeOrganizationPosition(moved, 'a', 'lead');
  assert.equal(next.members.length, state.members.length);
  assert.ok(next.members.every(member => next.positions.some(role => role.id === member.positionId && role.branchId === member.branchId)));
});
