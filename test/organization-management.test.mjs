import test from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { hierarchyPath } from '../lib/design-system/hierarchy.ts';
const resolution = registerHooks({ resolve(specifier, context, next) { return next(specifier === '../domain/queries' ? `${specifier}.ts` : specifier, context); } });
const { branchPath, branchHierarchy, branchDescendants, removeBranch, branchNameError } = await import('../components/design-system/organization/state.ts');
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
