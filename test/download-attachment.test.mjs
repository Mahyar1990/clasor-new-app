import test from 'node:test';
import assert from 'node:assert/strict';
import { canDownloadAttachment } from '../lib/design-system/download-attachment.ts';
test('feedback download links accept supported upload formats and local/server file URLs', () => {
  for (const url of ['/sample-content/research-report.pdf', 'https://example.com/file', 'http://localhost/file', 'blob:https://example.com/id', 'data:text/plain;charset=utf-8,hello', 'data:application/pdf;base64,JVBERg==', 'data:image/png;base64,abcd', 'data:image/jpeg;base64,abcd', 'data:image/webp;base64,abcd', 'data:video/mp4;base64,abcd', 'data:video/mpeg;base64,abcd']) assert.equal(canDownloadAttachment(url), true, url);
});
test('missing/unavailable or executable download locations are not offered as links', () => {
  for (const url of [undefined, '', '//example.com/file', '/\\example.com/file', 'javascript:alert(1)', 'data:text/html,test', 'data:image/svg+xml,test', 'file:///tmp/file', 'https://', 'https://example.com/\nfile']) assert.equal(canDownloadAttachment(url), false, url);
});
