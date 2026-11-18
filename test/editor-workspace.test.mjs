import test from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
// Match the app bundler's extension resolution for this dependency under Node's TS runner.
const resolution = registerHooks({ resolve(specifier, context, next) { return next(specifier === '../document-dialogs/version-state' ? `${specifier}.ts` : specifier, context); } });
const { editorCapabilities, editableVersion, saveEditorDraft, approveEditorDraft, versionActions, publishEditorVersion } = await import('../components/design-system/reader/editor-state.ts');
resolution.deregister();
const draft={id:'draft',name:'نسخهٔ ۳',content:'draft',approval:'draft',published:false};
const approved={id:'approved',name:'نسخهٔ ۳',content:'approved',approval:'approved',published:true,latest:true};
const doc={versions:[draft,approved],content:'original'};
test('editor capability matrix follows each requested document family',()=>{
 for(const type of ['classic','word','excel','flowchart'])assert.equal(editorCapabilities({contentType:type}).autosave,true);
 assert.deepEqual(editorCapabilities({contentType:'file'}),{kind:'file',drawer:false,autosave:false,pdf:false});
 assert.deepEqual(editorCapabilities({}),{kind:'classic',drawer:true,autosave:true,pdf:true});
 assert.equal(editorCapabilities({contentType:'office',extension:'doc'}).kind,'word');
 assert.equal(editorCapabilities({contentType:'office',extension:'xlsx'}).kind,'excel');
 assert.equal(editorCapabilities({contentType:'drawio'}).kind,'flowchart');
});
test('editing approved content selects its same-number draft and retains independent snapshots',()=>{
 assert.equal(editableVersion(doc.versions,approved).id,'draft');
 const result=saveEditorDraft(doc,approved,'new draft');
 assert.equal(result.version.id,'draft');
 assert.equal(result.document.versions.find(v=>v.id==='approved').content,'approved');
 assert.equal(result.document.versions.find(v=>v.id==='draft').content,'new draft');
 assert.equal(doc.versions[0].content,'draft');
 assert.equal(result.document.editHistory[0].content,'new draft');
 assert.equal(saveEditorDraft(result.document,result.version,'new draft').document.editHistory.length,1);
 const created=saveEditorDraft({...doc,versions:[approved]},approved,'new');
 assert.equal(created.version.approval,'draft');
 assert.equal(created.document.versions.find(v=>v.id==='approved').content,'approved');
});
test('approval commits the current buffer atomically and preserves the existing public label',()=>{
 for(const publish of [false,true]){
  const result=approveEditorDraft(doc,draft,'latest buffer',publish);
  assert.equal(result.version.approval,'approved');
  assert.equal(result.version.content,'latest buffer');
  assert.equal(result.version.latest,true);
  assert.equal(result.version.published,true);
  assert.equal(result.document.versions.length,1);
 }
 const result=approveEditorDraft({...doc,versions:[draft]},draft,'new',false);
 assert.equal(result.version.published,false);
 assert.equal(approveEditorDraft({...doc,versions:[draft]},draft,'new',true).version.published,true);
});

test('document actions depend on approval and public status in both modes',()=>{
 assert.deepEqual(versionActions(draft,true),{approveDraft:true,publishVersion:false});
 assert.deepEqual(versionActions({...approved,published:false},true),{approveDraft:false,publishVersion:true});
 for(const item of [draft,approved,undefined])assert.deepEqual(versionActions(item,false),{approveDraft:false,publishVersion:false});
 assert.deepEqual(versionActions(approved,true),{approveDraft:false,publishVersion:false});
});
test('publishing approved content preserves the independent same-number draft',()=>{
 const source={...doc,versions:[draft,{...approved,published:false}]};
 const result=publishEditorVersion(source,source.versions[1]);
 assert.equal(result.versions.find(v=>v.id==='approved').published,true);
 assert.equal(result.versions.find(v=>v.id==='approved').content,'approved');
 assert.equal(result.versions.find(v=>v.id==='draft'),draft);
 assert.equal(result.versions.length,2);
 assert.equal(source.versions[1].published,false);
});
