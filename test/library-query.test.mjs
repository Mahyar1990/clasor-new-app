import test from 'node:test';
import assert from 'node:assert/strict';
import { queryDocuments, defaultSort, emptyFilters, queryRepositories } from '../components/design-system/library/query.ts';
import { updateRepositoryRecords } from '../components/design-system/library/repository-state.ts';
import { descendants, folderTree, folderPath, applyDocumentChange } from '../components/design-system/library/tree.ts';
const items = [
 {id:'root', title:'دسته', kind:'folder', shared:false, order:2, tags:[], content:'', createdAt:'2026-01-01', updatedAt:'2026-02-01'},
 {id:'a',title:'آموزش ۱۰',kind:'document',shared:false,order:1,tags:['راهنما'],content:'محتوای آموزشی',createdAt:'2026-01-03',updatedAt:'2026-02-02'},
 {id:'b',title:'آموزش ۲',kind:'document',shared:false,order:1,tags:['راهنما','محصول'],content:'متن نمونه',createdAt:'2026-01-02',updatedAt:'2026-02-03'},
 {id:'nested',title:'داخل دسته',kind:'document',parentId:'root',shared:false,order:1,tags:[],content:'',createdAt:'2026-01-02'},
 {id:'sub',title:'زیردسته',kind:'folder',parentId:'root',shared:false,order:1,tags:[],content:''},
 {id:'deep',title:'عمیق',kind:'document',parentId:'sub',shared:false,order:1,tags:[],content:''},
 {id:'shared',title:'مشترک',kind:'document',shared:true,order:1,tags:[],content:''},
 {id:'template',title:'نمونه',kind:'template',shared:false,order:4,tags:[],content:''},
];
test('sort priorities compose kind, numeric order and Persian natural names without mutation',()=>{
 const result=queryDocuments(items,false,undefined,'',emptyFilters,defaultSort);
 assert.deepEqual(result.map(i=>i.id),['root','b','a','template']);
 assert.equal(items[0].id,'root');
 assert.deepEqual(queryDocuments(items,false,undefined,'',emptyFilters,[{field:'title',direction:'desc'}]).slice(-2).map(i=>i.id),['a','b']);
});
test('dates and numeric priority respect ascending/descending precedence',()=>{
 assert.deepEqual(queryDocuments(items,false,undefined,'',{...emptyFilters,kind:'document'},[{field:'createdAt',direction:'desc'}]).map(i=>i.id),['a','b','template']);
 assert.deepEqual(queryDocuments(items,false,undefined,'',{...emptyFilters,kind:'document',template:false},[{field:'order',direction:'desc'}]).map(i=>i.id),['template','a','b']);
});
test('scope, normalized search, conjunctive tags and template flags combine',()=>{
 assert.deepEqual(queryDocuments(items,false,undefined,'آموزش ۲',{...emptyFilters,tags:['راهنما','محصول']},[]).map(i=>i.id),['b']);
 assert.deepEqual(queryDocuments(items,false,undefined,'محتواي',{...emptyFilters,searchMode:'content'},[]).map(i=>i.id),['a']);
 assert.deepEqual(queryDocuments(items,false,undefined,'داخل',{...emptyFilters,scope:'all'},[]).map(i=>i.id),['nested']);
 assert.deepEqual(queryDocuments(items,true,undefined,'',emptyFilters,[]).map(i=>i.id),['shared']);
 const office=[{...items[1],id:'sheet',contentType:'office',extension:'xlsx'},{...items[1],id:'word',contentType:'office',extension:'doc'}];
 assert.deepEqual(queryDocuments(office,false,undefined,'',{...emptyFilters,contentType:'excel'},[]).map(i=>i.id),['sheet']);
 assert.deepEqual(queryDocuments(office,false,undefined,'',{...emptyFilters,contentType:'file'},[]).map(i=>i.id),['word']);
 assert.deepEqual(queryDocuments(items,false,undefined,'',{...emptyFilters,kind:'document',template:true},[]).map(i=>i.id),['template']);
});
test('Persian and Arabic digits normalize for search',()=>{
 assert.equal(queryDocuments([{...items[1],title:'سند 12'}],false,undefined,'۱۲',emptyFilters,[]).length,1);
 assert.equal(queryDocuments([{...items[1],title:'سند ۱۲'}],false,undefined,'١٢',emptyFilters,[]).length,1);
});
test('stable ties retain source order',()=>{
 assert.deepEqual(queryDocuments(items,false,undefined,'',{...emptyFilters,kind:'document'},[{field:'order',direction:'asc'}]).map(i=>i.id),['a','b','template']);
});
test('folder paths, excluded descendants and recursive deletion keep relations coherent',()=>{
 assert.deepEqual(folderPath(items,'sub'),['root','sub']);
 assert.deepEqual([...descendants(items,'root')].sort(),['deep','nested','root','sub']);
 assert.equal(folderTree(items,'root').length,0);
 assert.equal(folderTree(items)[0].children[0].id,'sub');
 const result=applyDocumentChange(items,'root',item=>({...item,deleted:true}));
 assert.deepEqual(result.filter(i=>i.deleted).map(i=>i.id).sort(),['deep','nested','root','sub']);
 assert.equal(items[0].deleted,undefined);
});

test('repository scope and ownership changes agree across lists and invoke updates once',()=>{
 const own={id:'owned',name:'مخزن من',role:'مالک',shared:false,archived:false,deleted:false,left:false,published:true,bookmarked:true,updatedAt:'2026-01-01'};
 const shared={...own,id:'shared-repo',role:'مدیر',shared:true};
 let calls=0;
 const updated=updateRepositoryRecords([own,shared],'owned',item=>{calls++;return {...item,role:'مدیر'};});
 assert.equal(calls,1);
 assert.equal(queryRepositories(updated,'my-repositories','').length,0);
 assert.equal(queryRepositories(updated,'shared-repositories','').length,2);
 assert.equal(queryRepositories(updated,'published-repositories','').length,0);
 assert.equal(queryRepositories(updated,'bookmarked-repositories','').length,2);
 assert.equal(queryRepositories([{...own,archived:true}],'archived-repositories','مخزن').length,1);
 assert.equal(queryRepositories([{...own,archived:true}],'my-repositories','').length,0);
 assert.equal(own.shared,false);
});
