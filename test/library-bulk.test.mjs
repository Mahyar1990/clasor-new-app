import test from 'node:test';
import assert from 'node:assert/strict';
import { bulkDocuments, changeSelection } from '../components/design-system/library/tree.ts';
import { outlineRows } from '../components/design-system/library/tree.ts';
const items=[
 {id:'a',title:'دسته الف',repositoryId:'r1',kind:'folder',shared:false,tags:['مشترک','خصوصی']},
 {id:'b',parentId:'a',title:'زیردسته',repositoryId:'r1',kind:'folder',shared:false,tags:[]},
 {id:'c',parentId:'b',title:'سند داخل',repositoryId:'r1',kind:'document',shared:false,tags:['مشترک','خصوصی']},
 {id:'d',title:'سند همسایه',repositoryId:'r1',kind:'document',shared:false,tags:[]},
 {id:'target',title:'مقصد',repositoryId:'r2',kind:'folder',shared:true,tags:[]},
];
test('selection enforces ten distinct items and permits removal at the cap',()=>{
 const ids=Array.from({length:10},(_,i)=>String(i));
 assert.throws(()=>changeSelection(ids,'extra',true));
 assert.equal(changeSelection(ids,'1',true),ids);
 assert.equal(changeSelection(ids,'1',false).length,9);
 assert.equal(ids.length,10);
});
test('batch deletion cascades once through selected parent and descendant without mutation',()=>{
 const result=bulkDocuments(items,['a','c'],'delete',undefined,'now');
 assert.deepEqual(result.filter(item=>item.deleted).map(item=>item.id),['a','b','c']);
 assert.equal(items[0].deleted,undefined);
 assert.equal(result[3],items[3]);
});
test('batch transfer preserves selected subtree, destination scope and compatible tags',()=>{
 const result=bulkDocuments(items,['a','c','d'],'move',{repositoryId:'r2',parentId:'target',shared:true,tags:['مشترک']},'now');
 assert.equal(result[0].parentId,'target');
 assert.equal(result[1].parentId,'a');
 assert.equal(result[2].parentId,'b');
 assert.equal(result[3].parentId,'target');
 assert.deepEqual(result[2].categoryPath,['target','a','b']);
 assert.deepEqual(result[2].tags,['مشترک']);
 assert.equal(result[2].repositoryId,'r2');assert.equal(result[2].shared,true);
 assert.equal(items[0].repositoryId,'r1');
});
test('batch transfer rejects self, descendant, missing and cross-scope destinations',()=>{
 for(const target of [{repositoryId:'r1',parentId:'a'},{repositoryId:'r1',parentId:'b'},{repositoryId:'r1',parentId:'target'},{repositoryId:'r2',parentId:'missing'}]) assert.throws(()=>bulkDocuments(items,['a'],'move',{shared:false,tags:[],...target}));
 assert.throws(()=>bulkDocuments(items,[],'delete'));
 assert.throws(()=>bulkDocuments(items,['unknown'],'delete'));
 assert.throws(()=>bulkDocuments(items,Array.from({length:11},(_,i)=>String(i)),'delete'));
});
test('outline exposes descendants only when expanded and retains ancestor context for search',()=>{
 const closed=outlineRows(items.filter(i=>i.repositoryId==='r1'),items,new Set());
 assert.deepEqual(closed.map(row=>row.document.id),['a','d']);
 const open=outlineRows(items.filter(i=>i.repositoryId==='r1'),items,new Set(['a','b']));
 assert.deepEqual(open.map(row=>[row.document.id,row.depth]),[['a',0],['b',1],['c',2],['d',0]]);
 const matches=outlineRows(items,[items[2]],new Set(['a','b']));
 assert.deepEqual(matches.map(row=>[row.document.id,row.context]),[['a',true],['b',true],['c',false]]);
});

const { resolveRepositoryDocuments } = await import('../components/design-system/library/repository-state.ts');
test('document ownership follows repository metadata and inaccessible repositories are excluded',()=>{
 const repos=[{id:'r1',shared:true,deleted:false,left:false},{id:'r2',shared:false,deleted:true,left:false}];
 const result=resolveRepositoryDocuments(items,repos);
 assert.equal(result.length,4);assert(result.every(item=>item.shared));
 assert.equal(items[0].shared,false);
 assert.equal(resolveRepositoryDocuments(items,[{...repos[0],left:true}]).length,0);
});
