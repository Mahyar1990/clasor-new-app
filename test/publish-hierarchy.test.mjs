import test from 'node:test';
import assert from 'node:assert/strict';
import { contentsTree } from '../lib/design-system/contents-tree.ts';
import { paneBounds, clampPane, resizePaneWithKey } from '../lib/design-system/resize-pane.ts';
test('contents hierarchy handles six levels, siblings and returning to a parent without mutation',()=>{
 const items=Array.from({length:6},(_,i)=>({id:String(i+1),label:'Heading '+i,level:i+1}));
 items.push({id:'peer',label:'Sibling',level:3},{id:'next',label:'Next',level:2});
 const before=JSON.stringify(items),tree=contentsTree(items);
 let node=tree[0];for(let i=2;i<=6;i++){node=node.children[0];assert.equal(node.level,i)}
 assert.equal(tree[0].children[0].children[1].id,'peer');
 assert.equal(tree[0].children[1].id,'next');assert.equal(JSON.stringify(items),before);
});
test('contents handles skipped levels and multiple roots without inventing headings',()=>{
 const tree=contentsTree([{id:'a',label:'A',level:2},{id:'b',label:'B',level:5},{id:'c',label:'C',level:2}]);
 assert.deepEqual(tree.map(x=>x.id),['a','c']);assert.equal(tree[0].children[0].id,'b');assert.deepEqual(contentsTree([]),[]);
});
test('pane bounds preserve remaining content width and recover when the container shrinks',()=>{
 assert.deepEqual(paneBounds(180,420,1000,320),{min:180,max:420});
 assert.deepEqual(paneBounds(180,420,600,320),{min:180,max:280});
 assert.deepEqual(paneBounds(180,420,400,320),{min:80,max:80});
 assert.equal(clampPane(500,{min:180,max:420}),420);assert.equal(clampPane(30,{min:180,max:420}),180);
});
test('splitter keys move physically left/right in both directions and stay inside bounds',()=>{
 const bounds={min:180,max:420};
 assert.equal(resizePaneWithKey('ArrowLeft',240,'rtl',8,bounds),248);
 assert.equal(resizePaneWithKey('ArrowRight',240,'rtl',8,bounds),232);
 assert.equal(resizePaneWithKey('ArrowRight',240,'ltr',32,bounds),272);
 assert.equal(resizePaneWithKey('Home',240,'rtl',8,bounds),180);
 assert.equal(resizePaneWithKey('End',240,'rtl',8,bounds),420);
 assert.equal(resizePaneWithKey('ArrowLeft',420,'rtl',8,bounds),420);
 assert.equal(resizePaneWithKey('Tab',240,'rtl',8,bounds),null);
});
