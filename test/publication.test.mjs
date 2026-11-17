import test from 'node:test';
import assert from 'node:assert/strict';
import { publicVersion, publicDocuments, publicationOutline, publicationHref } from '../components/design-system/publish/publication-state.ts';
const approved = {id:'approved',approval:'approved',published:true,latest:true,content:'public'};
const base = {id:'doc',title:'Document',repositoryId:'repo',kind:'document',audience:[],blocked:[],password:'',expiresAt:'',versions:[{id:'draft',approval:'draft',published:true,latest:true,content:'private'},approved]};
test('public reader selects only approved published content, preferring latest public snapshot',()=>{
 assert.equal(publicVersion(base).content,'public');
 assert.equal(publicVersion({...base,versions:base.versions.filter(v=>v.id==='draft')}),undefined);
 assert.equal(publicVersion({...base,versions:[{...approved,id:'old',latest:false},{...approved,id:'new',latest:true}]}).id,'new');
});
test('public documents exclude private, hidden, deleted, template and restricted records',()=>{
 const excluded=[{id:'hidden',hidden:true},{id:'deleted',deleted:true},{id:'template',kind:'template'},{id:'private',versions:[]},{id:'password',password:'secret'},{id:'expires',expiresAt:'2026-12-01'},{id:'audience',audience:['user']},{id:'blocked',blocked:['user']},{id:'other',repositoryId:'other'}].map(change=>({...base,...change}));
 assert.deepEqual(publicDocuments([base,...excluded],'repo').map(x=>x.id),['doc']);
});
test('public outline keeps ancestor folders, excludes empty folders, and uses encoded document paths',()=>{
 const folder={...base,id:'folder',kind:'folder',title:'Folder',versions:[]};
 const sub={...folder,id:'sub',parentId:'folder'};
 const leaf={...base,parentId:'sub'};
 const visible=publicDocuments([folder,sub,leaf,{...folder,id:'empty'}],'repo');
 const tree=publicationOutline(visible,'repo');
 assert.deepEqual(visible.map(x=>x.id),['folder','sub','doc']);
 assert.equal(tree[0].children[0].children[0].href,'/clasor-pages/publish/repo/doc');
 assert.equal(publicationHref('a/b','a b'),'/clasor-pages/publish/a%2Fb/a%20b');
});
test('hidden/deleted ancestor chains and cycles never promote their children to public roots',()=>{
 const folder={...base,id:'folder',kind:'folder',versions:[]};
 for(const state of[{hidden:true},{deleted:true}])assert.deepEqual(publicDocuments([{...folder,...state},{...base,parentId:'folder'}],'repo'),[]);
 assert.deepEqual(publicDocuments([{...folder,parentId:'folder'},{...base,parentId:'folder'}],'repo'),[]);
 assert.deepEqual(publicDocuments([{...base,parentId:'missing'}],'repo'),[]);
});
