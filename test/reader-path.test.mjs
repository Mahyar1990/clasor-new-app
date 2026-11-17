import test from 'node:test';
import assert from 'node:assert/strict';
import { readerFolderPath, readerBreadcrumbs } from '../components/design-system/reader/reader-path.ts';
test('reader breadcrumbs retain repository, ordered ancestor folders, document and selected version',()=>{
 const doc={id:'doc',title:'Document',repositoryId:'repo',parentId:'b',category:'B'};
 const folders=[{id:'a',title:'A',kind:'folder',repositoryId:'repo'},{id:'b',title:'B',kind:'folder',parentId:'a',repositoryId:'repo'}];
 const path=readerFolderPath(doc,folders);
 assert.deepEqual(path,[{id:'a',label:'A'},{id:'b',label:'B'}]);
 assert.deepEqual(readerBreadcrumbs(doc,{id:'repo',name:'Repository'},path,{name:'Version 2',approval:'draft',published:false}).map(item=>item.label),['Repository','A','B','Document','Version 2 (پیش‌نویس)']);
 assert.equal(readerBreadcrumbs(doc,{id:'repo',name:'Repository'},path,{name:'Version 2',approval:'draft',published:false})[0].href,'/clasor-pages/repositories/repo');
});
test('reader folder fallback omits the repository root and bounds invalid ancestry',()=>{
 assert.deepEqual(readerFolderPath({category:'ریشهٔ مخزن'},[]),[]);
 assert.deepEqual(readerFolderPath({category:'ریشه مخزن / الف / ب'},[]).map(item=>item.label),['الف','ب']);
 const doc={parentId:'a',repositoryId:'repo',category:'fallback'};
 const folders=[{id:'a',kind:'folder',title:'A',parentId:'b',repositoryId:'repo'},{id:'b',kind:'folder',title:'B',parentId:'a',repositoryId:'repo'}];
 assert.equal(readerFolderPath(doc,folders).length,2);
 assert.deepEqual(readerFolderPath(doc,[{...folders[0],repositoryId:'other'}]),[{id:'category-0',label:'fallback'}]);
});

test('document emphasis and version status stay within the final breadcrumb',()=>{
 const doc={title:'Document'},repo={id:'r',name:'Repository'};
 for(const [approval,published,status] of [['draft',false,'پیش‌نویس'],['approved',false,'تأییدشده'],['approved',true,'تأییدشده عمومی']]){
  const trail=readerBreadcrumbs(doc,repo,[],{name:'نسخهٔ ۳',approval,published});
  assert.equal(trail.at(-2).emphasis,true);
  assert.equal(trail.at(-1).label,`نسخهٔ ۳ (${status})`);
 }
});
