import test from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
const resolution = registerHooks({ resolve(specifier, context, next) { return next(specifier === './publication-state' ? `${specifier}.ts` : specifier, context); } });
const { publishedSearchRecords, searchPublishedDocuments, emptyPublishSearch } = await import('../components/design-system/publish/search-state.ts');
resolution.deregister();
import { publicationBlocks, reactionCounts, canOpenPublishedInPanel, publicAttachmentUrl } from '../components/design-system/publish/article-state.ts';
import { outlineSelectionPath } from '../lib/design-system/outline-path.ts';
const version={id:'approved',approval:'approved',published:true,latest:true,content:'راهنمای ساخت مخزن برای کاربران'};
const document={id:'doc',title:'راهنمای مخزن',kind:'document',repositoryId:'repo',creator:'کاربر نمونه',tags:['آموزش'],audience:[],blocked:[],password:'',expiresAt:'',createdAt:'2026-11-01',updatedAt:'2026-11-02',versions:[version,{id:'draft',approval:'draft',published:false,content:'عبارت محرمانه'}]};
const repo={id:'repo',name:'مخزن',published:true};
test('public full-text search spans public repositories and never searches draft/private content',()=>{
 const records=publishedSearchRecords([document,{...document,id:'other',repositoryId:'other',versions:[{...version,content:'راهنمای دیگر'}]}],[repo,{...repo,id:'other'}]);
 assert.equal(searchPublishedDocuments(records,{...emptyPublishSearch,text:'راهنما'}).length,2);
 assert.equal(searchPublishedDocuments(records,{...emptyPublishSearch,text:'محرمانه'}).length,0);
 assert.equal(searchPublishedDocuments(records,emptyPublishSearch).length,0);
 assert.equal(publishedSearchRecords([document],[{...repo,published:false}]).length,0);
});
test('advanced search composes title, creator and tag and normalizes Arabic/Persian text',()=>{
 const records=publishedSearchRecords([document,{...document,id:'no-tag',tags:[]},{...document,id:'other-author',creator:'دیگر'}],[repo]);
 assert.deepEqual(searchPublishedDocuments(records,{...emptyPublishSearch,mode:'advanced',title:'راهنما',creator:'كاربر',tag:'آموزش'}).map(x=>x.id),['doc']);
 assert.equal(searchPublishedDocuments(records,{...emptyPublishSearch,text:'كاربران'}).length,3);
});
test('search sort is deterministic and does not mutate its source',()=>{
 const records=publishedSearchRecords([document,{...document,id:'new',createdAt:'2026-11-10',updatedAt:'2026-10-01',title:'الف'}],[repo]);
 assert.equal(searchPublishedDocuments(records,{...emptyPublishSearch,mode:'advanced'} )[0].id,'new');
 assert.equal(searchPublishedDocuments(records,{...emptyPublishSearch,mode:'advanced',sort:'updatedAt'})[0].id,'doc');
 assert.equal(searchPublishedDocuments(records,{...emptyPublishSearch,mode:'advanced',sort:'title'})[0].id,'new');
 assert.equal(records[0].id,'doc');
});
test('content sections keep hierarchy, repeated names get distinct IDs, markup stays text',()=>{
 const blocks=publicationBlocks('Intro\n\n## Heading\nLine\nnext\n\n### Heading\n<img src=x onerror=alert(1)>');
 assert.deepEqual(blocks.filter(b=>b.type==='heading').map(b=>[b.level,b.text]),[[2,'Heading'],[3,'Heading']]);
 assert.equal(new Set(blocks.map(b=>b.id)).size,blocks.length);
 assert(blocks.some(b=>b.text==='<img src=x onerror=alert(1)>'));
 assert.deepEqual(publicationBlocks(''),[]);
});
test('outline active path identifies every ancestor and guards cycles',()=>{
 const item={id:'folder',children:[{id:'sub',children:[{id:'doc'}]}]};
 assert.deepEqual(outlineSelectionPath([item],'doc'),['folder','sub','doc']);
 assert.deepEqual(outlineSelectionPath([item],'unknown'),[]);
 item.children.push(item);assert.deepEqual(outlineSelectionPath([item],'missing'),[]);
});
test('reactions count the single current choice and panel links require explicit access',()=>{
 assert.deepEqual(reactionCounts('like',12,1),{likes:13,dislikes:1});
 assert.deepEqual(reactionCounts('dislike',12,1),{likes:12,dislikes:2});
 assert.deepEqual(reactionCounts(null,12,1),{likes:12,dislikes:1});
 assert.equal(canOpenPublishedInPanel(null,'repo'),false);
 assert.equal(canOpenPublishedInPanel({repositoryIds:[]},'repo'),false);
 assert.equal(canOpenPublishedInPanel({repositoryIds:['repo']},'repo'),true);
});
test('attachment download URLs accept bounded fixture formats and reject executable URLs',()=>{
 for(const url of['/file.pdf','https://example.com/file.pdf','data:text/plain;charset=utf-8,Hello'])assert.equal(publicAttachmentUrl(url),true);
 for(const url of['javascript:alert(1)','//other.example/file','data:text/html,<script>',''])assert.equal(publicAttachmentUrl(url),false);
});
