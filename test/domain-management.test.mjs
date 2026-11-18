import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesDomainQuery, normalizeDomainText, validateNews, uniqueUsername, validPriority } from '../components/design-system/domain/queries.ts';

test('domain searches normalize Persian/Arabic spelling and numeric priority without changing facets', () => {
  assert.equal(normalizeDomainText('  كليد ١۲  '), 'کلید 12');
  const query = { text: 'راهنماي ۱۲', filters: { target: 'document', repositoryId: 'repo-1' } };
  assert.equal(matchesDomainQuery(query, ['راهنمای 12'], { target: 'document', repositoryId: 'repo-1' }), true);
  assert.equal(matchesDomainQuery(query, ['راهنمای 12'], { target: 'answer', repositoryId: 'repo-1' }), false);
  assert.equal(matchesDomainQuery(query, ['راهنمای 12'], { target: 'document', repositoryId: 'repo-2' }), false);
  assert.equal(query.text, 'راهنماي ۱۲');
});

test('review status, repository and inclusive date limits combine; clearing restores all statuses', () => {
  const facets = { status: 'pending', repositoryId: 'repo-1', createdAt: '2026-11-18T09:00:00Z' };
  const query = { text: '', filters: { status: 'pending', repositoryId: 'repo-1', fromDate: '2026-11-18', toDate: '2026-11-18' } };
  assert.equal(matchesDomainQuery(query, [], facets), true);
  assert.equal(matchesDomainQuery(query, [], { ...facets, createdAt: '2026-11-17T21:30:00Z' }), true);
  assert.equal(matchesDomainQuery(query, [], { ...facets, createdAt: '2026-11-17T20:29:00Z' }), false);
  assert.equal(matchesDomainQuery(query, [], { ...facets, status: 'approved' }), false);
  assert.equal(matchesDomainQuery(query, [], { ...facets, createdAt: '2026-11-19T00:00:00Z' }), false);
  assert.equal(matchesDomainQuery({ text: '', filters: {} }, [], { ...facets, status: 'approved' }), true);
  assert.equal(matchesDomainQuery({ text: '', filters: { fromDate: '2026-11-19', toDate: '2026-11-18' } }, [], facets), false);
});

test('private newsletters require a repository and nonempty content; external links reject unsafe protocols', () => {
  const draft = { title: 'اطلاعیه', body: 'متن اطلاعیه', link: '' };
  assert.equal(validateNews(draft, false), '');
  assert.ok(validateNews(draft, true));
  assert.equal(validateNews({ ...draft, repositoryId: 'repo-1', link: 'https://example.com/news' }, true), '');
  for (const link of ['javascript:alert(1)', 'data:text/html,test', '//example.com', 'file:///tmp/test', 'invalid']) assert.ok(validateNews({ ...draft, link }, false));
  assert.ok(validateNews({ ...draft, title: '  ' }, false));
  assert.ok(validateNews({ ...draft, body: '  ' }, false));
});

test('domain access has unique Pod usernames and repository priority accepts only positive safe integers', () => {
  assert.equal(uniqueUsername(' @New.user ', ['existing.user']), true);
  assert.equal(uniqueUsername('EXISTING.user', ['existing.user']), false);
  for (const username of ['', 'a', 'space name', 'کاربر', 'person@example.com']) assert.equal(uniqueUsername(username, []), false);
  for (const priority of ['1', '42', '9007199254740991']) assert.equal(validPriority(priority), true);
  for (const priority of ['0', '-1', '1.2', '1e2', 'Infinity', '9007199254740992', '']) assert.equal(validPriority(priority), false);
});
