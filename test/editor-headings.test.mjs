import test from 'node:test';
import assert from 'node:assert/strict';
import { editorHeadings } from '../lib/design-system/editor-headings.ts';
test('editor contents retain exact offsets, unique identities and six nested levels including duplicate titles', () => {
  const content = 'متن\r\n# آغاز\r\n## تکراری\n### تکراری\n#### سطح چهار\n##### سطح پنج\n###### سطح شش\n## تکراری';
  const headings = editorHeadings(content);
  assert.equal(headings.length, 7);
  assert.deepEqual(headings.map(item => item.level), [1, 2, 3, 4, 5, 6, 2]);
  assert.equal(new Set(headings.map(item => item.id)).size, headings.length);
  for (const heading of headings) assert.ok(content.slice(heading.offset).startsWith('#'.repeat(heading.level) + ' ' + heading.label));
});
test('empty/nonheading content and heading edits rebuild the outline without interpreting HTML', () => {
  assert.deepEqual(editorHeadings('ordinary text\n####### too deep\n#missing space\n<script>hello</script>'), []);
  assert.equal(editorHeadings('# old')[0].label, 'old');
  assert.equal(editorHeadings('# new')[0].label, 'new');
  assert.equal(editorHeadings('# <script>hello</script>')[0].label, '<script>hello</script>');
});
