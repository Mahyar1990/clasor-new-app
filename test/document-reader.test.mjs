import test from 'node:test';
import assert from 'node:assert/strict';
import { splitIdentifiers, appendIdentifiers } from '../lib/design-system/identifiers.ts';
import { documentFlags, panelRecipientOptions, prunePanelRecipients } from '../components/design-system/library/document-state.ts';
import { parseReaderSnapshot } from '../components/design-system/reader/transfer.ts';
test('identifiers split on all requested delimiters, preserve order and remove duplicates',()=>{
 assert.deepEqual(splitIdentifiers('a b\nc,d،e\t a\r\n'),['a','b','c','d','e']);
 assert.deepEqual(appendIdentifiers(['existing','a'],'a،new existing'),['existing','a','new']);
 assert.deepEqual(splitIdentifiers(' ,، \n'),[]);
});
test('panel access is scoped to repository users and groups with distinct namespaces',()=>{
 const repo={members:[{id:'same',name:'member'}],groups:[{id:'same',name:'group'}],pendingMembers:[{id:'pending',name:'invite'}]};
 assert.deepEqual(panelRecipientOptions(repo).map(item=>item.id),['user:same','group:same']);
 assert.deepEqual(prunePanelRecipients(['user:same','group:same','user:pending','arbitrary','user:same'],repo),['user:same','group:same']);
 assert.deepEqual(prunePanelRecipients(['user:same'],{members:[],groups:[]}),[]);
});
test('reader indicators distinguish publication restrictions from hidden and panel state',()=>{
 const doc={bookmarked:false,hidden:false,blocked:[],audience:[],password:'',expiresAt:''};
 assert.deepEqual(documentFlags(doc),{bookmarked:false,hidden:false,restricted:false,blocked:false});
 assert.equal(documentFlags({...doc,hidden:true}).restricted,false);
 for(const field of['password','expiresAt'])assert.equal(documentFlags({...doc,[field]:'value'}).restricted,true);
 assert.deepEqual(documentFlags({...doc,bookmarked:true,hidden:true,audience:['user'],blocked:['group:g']}),{bookmarked:true,hidden:true,restricted:true,blocked:true});
});
test('reader handoff validates identity, expiration and required collections without parsing arbitrary markup',()=>{
 const document={id:'doc',title:'<script>example</script>',content:'<img src=x onerror=alert(1)>',versions:[],tags:[],audience:[],blocked:[],recipients:[],activities:[],bookmarked:true,hidden:false,deleted:false,shared:false};
 const raw=JSON.stringify({document,storedAt:1000});
 assert.equal(parseReaderSnapshot(raw,'doc',2000).document.content,document.content);
 assert.equal(parseReaderSnapshot(raw,'other',2000),null);
 assert.equal(parseReaderSnapshot(raw,'doc',86_401_001),null);
 assert.equal(parseReaderSnapshot(raw,'doc',999),null);
 assert.equal(parseReaderSnapshot('{broken','doc',2000),null);
 assert.equal(parseReaderSnapshot(JSON.stringify({document:{...document,versions:undefined},storedAt:1000}),'doc',2000),null);
 assert.equal(parseReaderSnapshot('x'.repeat(2_000_001),'doc',2000),null);
});
