## Repository summary and shared document surfaces — 2026/11/17

An entered repository owns its page heading inside the tinted summary card. Description comes next and canonical RoleBadge follows it. Back, tags and the redundant Active label are removed from that summary; archived state remains visible when relevant. LibraryShell's explicit titleInContent placement leaves ordinary list/unavailable headings intact and preserves the shared heading ref for destructive-action focus. Catalogue summaries retain an h2 within their own section. Repository lists use larger rectangular tiles with an in-flow operation column and no internal divider. Creation moves into the title row at the upper-left through LibraryShell titleActions; search remains below.

Document and folder rows now activate their existing primary link/button across blank cells in tables and the outline. Documents keep native new-tab snapshot capture; folders keep in-place navigation/expansion. Checkbox wrappers, operation cells, interactive controls, portal content, selected text and non-primary clicks are excluded. Name links remain the keyboard target; table rows keep their native semantics instead of gaining duplicate button roles or tab stops.

Version view and edit both compose the actual EditorWorkspace used by the new-tab page. The selected version/initial editing state, repository, folder trail and commit acknowledgement pass through document context. Embedded workspaces use a section landmark, preserve iframe Escape and return View all to the surrounding version list. Creation/clone remains a compact number-only flow. No redundant zoom/copy toolbar remains in the active version viewer.

Embedded dirty/approval/publication decisions use the existing NavigableGlassModal stack via a decision host, preserving one dialog instead of adding overlays. The decision page reads current navigation itself, retains commit-error retry behavior and cancels its pending request on actual unmount without treating Strict Mode's effect probe as a user cancellation. Approval pauses autosave; Back returns to the same mounted editor state and original control. New-tab workspaces retain their ordinary decision dialogs. Independent table, repository and version catalogue examples exercise these same compositions.

## Compact reader breadcrumb and tab handoff — 2026/11/17

The reader header now uses repository → ancestor folders → bold document title → selected version (draft/approved/approved public). The former detached version-name/status group is removed. The dock toggle and breadcrumb are vertically centered; tools share the row at sufficient width and wrap below on small screens.

`readerFolderPath` resolves same-repository folder ancestry with cycle/deletion guards; legacy flat category metadata supplies a text-only fallback and omits the repository root placeholder. New-tab snapshots optionally carry the ancestor labels so user-created folder paths survive a fresh tab/reload even when those folders are not in the reader's initial fixtures. Reader commits retain that path. Legacy snapshots remain accepted; malformed optional paths are rejected. Only the known repository destination is linked; unknown folder destinations remain text instead of inventing unsupported routes.

## Reader action matrix and independent publication — 2026/11/17

The compact right-hand dock and consolidated menus supersede the previous Sheet/toolbar description below. The panel uses DockedPanel, existing ClasorTabs and existing content compositions; only scoped density changes. Toolbar/picker examples remain independently reachable on navigation, and a separate dock example is on layout, alongside the complete reader preview.

| Selected snapshot | Preview/edit actions when writable |
| --- | --- |
| Draft | Approve draft; Approve and publish |
| Approved, non-public | Publish only |
| Approved, public | No approval/publication action |

The product `versionActions` helper derives these presentation flags; generic controls receive booleans/callbacks. Preview download shares the action menu; edit/preview uses a separate Switch. Options sits at the physical far left, ModeSwitch sits beside it, editing Save/Autosave controls sit to its right, and the drawer toggle sits at the far right. Manual Save is a stable editing control and disables under Autosave (or when clean), rather than disappearing.

Publishing an approved snapshot uses `publishEditorVersion`/the existing publish version action directly. It changes the approved record's public flag without recreating an approved record, copying content, approving/deleting a same-number draft or changing the selected ID. Explicit draft approval remains the separate confirmation flow and may replace its approved counterpart. Both preserve local commit acknowledgement/error handling.

## Type-aware editor workspace — 2026/11/17

The current user-specified reader structure supersedes the earlier header/sidebar composition below. Entry is always preview. One compact glass header combines the document path/title, canonical flags/status badges and the toolbar; redundant bookmark/options/zoom/copy controls and permanent tools sidebar are removed from the new-tab page. The separate version-view dialog retains its existing controls and near-viewport navigation.

| Family | Preview | Editing | Side panel |
| --- | --- | --- | --- |
| Classic Clasor | PDF via browser print/save | Approve draft, approve/publish, autosave | History (editing only), tags, attachments, chat, comments, questions |
| File | File download | Approve draft, approve/publish | None |
| Word, flowchart, Excel | File download | Approve draft, approve/publish, autosave | None |

Office/Word and Excel extensions normalize through `editorCapabilities`; flowchart aliases normalize to the same family. Creation now also exposes flowchart. Other existing document kinds remain supported without inferring new tools from this request.

Entering edit mode chooses the selected version's same-number draft when available. Manual/autosave writes only draft content; approved content remains independent until explicit approval. Autosave debounces 700ms and is unavailable for files. Changing mode/version with unsaved content asks Save and continue, Discard or Back; pending navigation pauses autosave. The browser also receives a normal beforeunload warning while dirty. Approval confirms replacing the same-number approved snapshot and optionally public-labeling it, then returns to preview. Existing publication and latest labels retain the version-state rules. The product workspace accepts an optional synchronous commit acknowledgement; a failed local write keeps the buffer dirty, shows a retryable error and blocks guarded navigation/approval until a write succeeds. The catalogue can simulate this failure independently of storage. Saved edits append local editing-history records; the panel does not relabel version snapshots as editing history.

Classic's drawer starts closed, uses the existing Base UI Sheet and unified ClasorTabs, and restores toggle focus on close. History is absent in preview. Tags use repository master options. Attachment and chat interactions update fictional preview records; attachment payloads are bounded to 500KB total for this local handoff. All growing panel lists reuse cumulative PreviewList/LoadMore. Comments and questions reuse their existing compositions.

The independent toolbar catalogue example complements a complete type-selectable workspace example; no business rules moved into the generic toolbar. Embedded editors remain local plaintext integration fixtures, not real Word/Excel/flowchart engines or remote Clasor editors. Fixture file downloads are truthful `.txt` exports of fixture content; production binary download requires a backend file response. This limitation is distinct from the working PDF print bridge and local attachment download.

## Repository invitations and document reading — 2026/11/17

Pending invitations are separate from accepted repository members. Sharing renders accepted members first, followed by a dimmer pending list with avatar fallback, role and waiting status. Pending entries have only Cancel invitation; they are excluded from panel restriction choices. Inviting through sharing or repository creation appends pending entries, while the creator remains the active owner. Both lists retain cumulative loading and search behavior.

Publication audience IDs use removable tokens; panel exclusions use the repository-scoped user/group picker and explicit Save. Document rows and reader surfaces consume the same derived status flags. Existing bookmark IDs and document/version menu contracts remain stable.

Document links open `/clasor-pages/read/[documentId]` in a native new tab with noopener/noreferrer. Folders continue in-place navigation. The reader places a compact title/options header, version and discussion tools around an iframe. Version selection from the versions dialog stays in that same navigable dialog and expands close to the viewport; view/edit retain independent same-number draft and approved snapshots. New-version creation still asks for no content.

`EditorFrame` hosts `/document-editor`. The local plaintext editor uses a same-origin, source-window-checked, session-scoped postMessage handshake; content is rendered as text, never evaluated markup. Ready acknowledgement removes the loading label even when initialization precedes the listener. Iframe Escape returns from a version page; direct content editing dismisses through Base UI's close primitive. Zoom, text copy and local text download are functional preview tools. This is an editor integration preview, not a connection to Clasor's remote rich-text/Office editor.

To hand modified and newly created fixtures to a tab without an opener, the preview stores a bounded per-document browser-local snapshot (24-hour TTL, maximum two million serialized characters), including repository membership context. Repository files, keys, requests and join links are omitted; custom image payloads are omitted. Expired entries are pruned on writes. Reader changes synchronize matching records in already-open preview tabs through storage events. This narrow handoff is not general application persistence, backend authorization or account storage. Other list/repository state remains session-local; unavailable/expired custom documents show a return link.

## Compact control follow-up — 2026/11/16

Version snapshots are vertically stacked again under their canonical version number; same-number draft and approved content remain independent. Inline status/creator/date/public/latest labels reduce height, while options stay in normal flow with reserved padding. There is no absolute menu over the row text. OptionsButton is shared across every record menu, including files, members and groups.

Repository-key generation and registration share one FormActions row below generated values, keeping their geometry aligned before/after generation. Submission requires both a nonempty name and generated key. Shared action rows and TextField action slots also address related dialog alignment rather than maintaining isolated offsets. These changes retain local demo-key semantics.

Search disclosure and integrated-field behavior in NAVIGATION.md/CONTROLS.md supersede the previous always-visible search row. Existing cumulative list loading, multi-sort, ownership, tags and ten-item selection rules remain in force.

## Repository-scoped documents, tags and group mutations — 2026/11/16

Every library document now has a repositoryId. The provider derives document sharing scope from current repository metadata and excludes deleted/left repositories. Clicking a tile opens its own workspace, not the information dialog. A repository workspace reuses document search/filter, sort, table/outline, creation and menus. New records inherit the current repository and category; at the aggregate personal root they use the personal repository. Template choices are limited to the destination repository. New repositories start with no documents.

Repository tags are a vocabulary owned by that repository. The repository-creation tag stage creates/deletes names only; it does not select from global tags. Management is also available from repository options in lists, dashboard and the workspace header. Deletion confirms once, then removes the tag from documents in that repository without affecting another repository's vocabulary. This replaces the older tag-selection description in the initial creation flow below. Public Clasor UI bundles were inspected read-only: the create stage uses title + add + removable tags; repository tag management has name/create and delete confirmation. No source-account mutation occurred.

Search text and title/content mode apply on submission. Changing the draft does not change the current result list. Filter changes and applied queries reset/cancel cumulative loads; selection remains explicit across search, filters, scrolling and view switches. Ending selection or a successful batch operation clears it. The outline includes matching rows and their ancestor context; sort order applies among matching siblings. Short and long lists retain the existing 10-record/600ms mock loading contract, including repository tag management.

Batch deletion removes selected folders and descendants atomically after confirmation. Batch move accepts up to ten distinct selected records, validates the destination and rejects self/descendant targets. Selecting a parent and its child moves one coherent subtree, not two detached records. Cross-repository move updates sharing scope and retains only tags defined by the destination vocabulary; destination controls explain this. Cancelling leaves records and selection intact. Shared aggregate documents retain their existing edit restrictions; writable repository workspaces expose creation/batch actions and role-appropriate publication controls. These local preview controls do not replace backend authorization.

Repository images use a thumbnail, accessible name and default/error fallback; custom image files are read locally and retained in the session as data URLs. Creation is still atomic at the final step. No real upload, storage, encryption or backend was introduced. Fixtures now include distinct repository documents and nested categories for interactive review.

## Library pages and surface grouping — 2026/11/16

The dashboard and seven standalone library pages share the in-memory `LibraryProvider`. Search/filter/sort and active folders belong to each page; record mutations remain shared during client navigation. Reload resets mock data. No account mutation, real upload, backend storage or persistent encryption was introduced.

Document search supports normalized Persian/Arabic letters and digits, title/content mode and current-category/all-repository scope. Filters combine kind, content type, every selected tag, template and bookmark; removable chips expose active constraints. Folder kind disables irrelevant content-type/template options. Filtering and sorting reset/cancel cumulative loads; lists append 10 records with skeletons and preserve existing nodes. Repository lists use compact square GlassTile cards, search and tile-shaped loading skeletons. Ownership/shared/archive/published scopes are distinct.

Ordered multi-sort supports kind (folder/document), name, numeric priority, created date and modified date, with independent directions and stable ties. The default is kind, priority, name. Folder breadcrumbs support drill-down; moving excludes self/descendants and deleting a category handles descendants locally.

Source public Clasor UI was inspected read-only. The local creation compositions follow these stage sequences:

| Creation | Stages |
| --- | --- |
| Classic document | Type → title/description/priority → template → encryption key → version name |
| File / Office document | Type (Office subtype/extension) → title/description/priority → version name |
| Form document | Type → title/description/priority → form configuration → version name |
| Template | Classic type → title/description/priority → version name |
| Category | Title/description/priority → review |
| Repository | Title/description → member POD IDs and individual roles → tags → optional image |

The category review is an intentional compact step added for the requested stepped UX. Unlike the source's early repository creation, these previews commit atomically at the final stage, so cancellation leaves no partial record. New documents get one named draft and no invented approval history. Template content is copied only when selected; content editing stays in its separate dialog. Repositories start with an owner and the explicitly entered members.

Same-number version snapshots share one RecordGroup heading and compact side-by-side draft/approved cells with independent menus. Public remains a label on approved state; independent snapshot content and actions remain intact. Groups, form sections, tags and file summaries are flat content on one glass master rather than nested glass panes. Independent examples for these patterns, filters, multi-sort, tiles and creation flows are rendered by app/page.tsx on layout/overlays.

## Header source mapping - 2026/11/16

Read-only inspection of the available public Clasor frontend mapped the header controls to these fields and actions:

| Control | Source structure | Local preview |
| --- | --- | --- |
| Invitation list | Repository name, role, reject/accept; accepted state has repository URL/copy and entry action | Fictional independent requests, cumulative batches of ten, decisions retained across reopening; one modal with Back to the list |
| Feedback | Required content and optional files, six maximum, one MiB each, eight supported extensions | Compact text area and AttachmentPicker, fixed submit/cancel footer, inline validation and local success toast |
| Account | User name and logout | Labeled dropdown; compact logout confirmation and local guest/resume state |
| Admin | Navigation to /panel-admin-clasor | Labeled external navigation to Clasor in a new tab |

No feedback subject/email/account-type fields are invented. The account metadata uses fictional identity. No source-account mutation, feedback request or attachment upload is sent. The accepted fixture's URL is under example.com; entry is disabled with an explicit reason until the repository interior has a designed preview. That limitation does not affect the source admin navigation.

Header compositions have independent light/dark and empty-list examples on overlays/layout. Glass controls and attachment selection have independent buttons/inputs catalogue examples. Product-specific state stays in components/design-system/header-dialogs; reusable attachments and material contracts stay in components/ui and classes.ts.

## Request, file and version follow-up - 2026/11/16

Request rows contain separate sibling controls for opening details and accepting/rejecting a pending request; decision controls also remain in the detail page. Inline decisions retain focus on the row opener.

Repository file rows show upload date and source-aligned download, publish, rename and delete actions. Rename/publication/delete use the existing single-modal navigation. Uploaded files retain their local File payload for download; fixture downloads use the local sample PDF. No account or remote file operation is performed.

Version creation collects only the version number. A fresh version starts empty; cloning retains the source snapshot. Creation leaves the current document content unchanged. Content can be edited only through the separate edit action. Same-number draft/approved snapshots appear under one RecordGroup heading while retaining independent status, content, IDs and menus. Groups use cumulative loading in batches of ten version numbers.

## دیالوگ‌های داشبورد کلاسور — قرارداد جاری ۲۰۲۶/۱۱/۱۶

این بخش بر توصیف‌های قدیمی پیش‌نمایش داشبورد مقدم است. مدل تاریخی `/workspace` در این تغییر بازنویسی نشده است.

اشتراک مخزن: دعوت شناسه پادی و نقش در یک ردیف، آواتار تصویر یا fallback، منوی دسترسی پیشرفته/اعلانات/انتقال مالکیت/حذف عضو و ویرایش نقش. گروه دارای نام، توضیح و مجموعه غیرخالی اعضای غیرمالک است؛ عملیات ویرایش/حذف در همان پنجره با بازگشت اجرا می‌شوند. حذف عضو، عضویت او در گروه‌ها را نیز حذف می‌کند. انتقال مالکیت نقش فعلی را به مدیر تبدیل می‌کند. نقش‌ها و رفتارها محلی‌اند و مجوز backend ایجاد نمی‌کنند.

لینک پیوستن برای هر نقش رکورد جدا در state مخزن دارد؛ ساخت تکراری هم در انتخابگر و هم هنگام ثبت مسدود است. حذف لینک اجازه ساخت دوباره آن نقش را می‌دهد. انتشار فعال فقط دکمه لغو انتشار دارد؛ پس از لغو، انتشار دوباره ممکن است. لینک‌ها نمایشی و زیر example.com هستند.

مدیریت فایل: افزودن تک‌دکمه‌ای، جستجو بالای فهرست و پیشرفت شیشه‌ای با لغو/تلاش مجدد؛ بارگذاری شبکه‌ای واقعی انجام نمی‌شود. فهرست‌های قابل رشد از PreviewList و بارگذاری تجمعی ۱۰تایی استفاده می‌کنند. اعلانات ناحیه اسکرول نام‌گذاری‌شده مستقل دارند. ردیف کلید و دسترسی مستقیم جمع‌وجور است.

نسخه پیش‌نویس و تاییدشده هم‌شماره، شناسه و محتوای جدا دارند. عمومی صرفاً برچسب تاییدشده است؛ پیش‌نویس عمومی نمی‌شود. فهرست نسخه محتوا ندارد؛ نمایش، ویرایش، ایجاد/کپی نسخه، مقایسه، لینک، درخواست/لغو درخواست، تایید/رد، عمومی‌سازی، انتخاب آخرین نسخه و حذف به صفحات داخلی همان دیالوگ می‌روند. منو تابع وضعیت نسخه است. ویرایش تاییدشده، پیش‌نویس هم‌شماره را ایجاد/ویرایش می‌کند. تایید پیش‌نویس پس از هشدار صریح، تاییدشده هم‌شماره را جایگزین و پیش‌نویس را می‌بندد؛ برچسب عمومی قبلی حفظ می‌شود. شماره‌های فارسی/عربی/لاتین در تشخیص تکرار یکسان‌اند. ایجاد نسخه، پیش‌نویس تکراری نمی‌سازد. عمومی‌سازی منوی اصلی سند فقط آخرین تاییدشده را هدف می‌گیرد.

درخواست نسخه، سازنده، تاریخ ویرایش، شماره و وضعیت دارد؛ کلیک، محتوا و تصمیم تایید/رد را با بازگشت باز می‌کند. انتقال سند از انتخابگر درختی استفاده می‌کند و انصراف تغییری ثبت نمی‌کند. همه وضعیت‌ها در حافظه پیش‌نمایش و برای هر رکورد مستقل‌اند.

## Shared table column contract — 2026/11/15

Current table geometry lives in `table-contract.ts` and shared `classes.ts` utilities. Metadata columns default to 112px, single actions to 76px with 16px padding on each side; content gets the remaining width. Both SolidDataTable and DataTable consume this contract. Custom multiple actions retain 128px by default. The new document table catalogue is rendered on the data and layout pages with a long title, hidden semantic caption and working glass menu/dialog. Dashboard-only width/padding overrides have been removed. See [materials](MATERIALS.md) for the current API; the older stage sections below are historical.

## Dashboard glass table and identity surfaces — 2026/11/15

`SolidDataTable` accepts `appearance="glass"` for a graduated translucent header and alternating translucent rows; its default remains `solid`. Semantics, stable row IDs, scroll region and action focus are preserved. `GlassEmblem` supplies reusable logo/folder tiles and circular avatars. Both are demonstrated on `/design-system/layout` with a local dark preview; the dashboard consumes these shared components directly. See [materials](MATERIALS.md) for the appearance and accessibility contract.

## ترکیب‌های جاری — ۲۰۲۶/۱۱/۱۴

[GlassCard](../../components/ui/GlassCard.tsx) سطح مشترک و [AppLayout](../../components/ui/AppLayout.tsx) ترکیب آن با هدر، سایدبار و Mesh ثابت است. [SolidDataTable](../../components/ui/SolidDataTable.tsx) و [SolidForm](../../components/ui/SolidForm.tsx) نام عمومی خود را نگه داشته‌اند، اما قاب‌هایشان شیشه‌ای است؛ ردیف دادهٔ جدول می‌تواند مات بماند.

نمونه‌های تعاملی در `components/design-system/layout-content-catalogue.tsx` از طریق `app/page.tsx` نمایش داده می‌شوند. دادهٔ نمونه را به primitive عمومی وارد نکنید. جدول، caption، header، row و region اسکرول معنایی و شناسهٔ ردیف پایدار را نگه می‌دارد.

قاعدهٔ `/workspace` همچنان افزودن تجمعی خودکارِ ۱۰تایی با LoadMore، حفظ فوکوس/انتخاب/اسکرول و لغو بارگذاری هنگام تغییر جست‌وجو/فیلتر/ترتیب است. تأخیر ۶۰۰ms مربوط به mock است. نسخه، تأیید و دسترسی مستقل‌اند؛ بازنگری ظاهری این منطق را تغییر نداده است.

## تاریخچهٔ مرحله E

# مرحله E — جدول و الگوهای ترکیبی

## قاعده فهرست‌های پنل

در `/workspace` همه فهرست‌های داده با رسیدن انتهای فهرست به محدوده دید، خودکار دسته بعدی ۱۰تایی را اضافه می‌کنند؛ `components/workspace/load-more.tsx` و `getLoadedItems` مبنای مشترک‌اند. اسکلت ردیف هنگام بارگذاری نشان داده می‌شود؛ موارد قبلی، انتخاب، موقعیت اسکرول و فوکوس حفظ می‌شوند. جست‌وجو/فیلتر/مرتب‌سازی شمار نمایان را بازنشانی و بارگذاری قبلی را لغو می‌کنند. فهرست کوتاه کنترل اضافه ندارد. صفحه‌بندی شماره‌دار استفاده نشود؛ دکمه فقط fallback مرورگر فاقد IntersectionObserver است. نمونه‌های تاریخی کاتالوگ و گزینه‌های ثابت فرم مشمول این الگو نیستند.

اجزای این مرحله همگی در `components/ui` هستند: DataTable روی Table رجیستری shadcn، PermissionAction، CreationStepper و ApprovalContext. داده‌ها و fixtureها فقط در `components/design-system/patterns-catalogue.tsx` قرار دارند.

## DataTable

نوار جست‌وجو به قاب جدول متصل است: `toolbar` محتوای نوار بالای جدول و `id` شناسه خود table را می‌گیرد. جزء `components/ui/table-search.tsx` از Input، Button و ButtonGroup رجیستری shadcn ساخته شده است. input و دکمه ذره‌بین در یک گروه پیوسته و هم‌ارتفاع هستند و با aria-controls به table متصل می‌شوند. `TableSearch` خواص label، tableId، value، onValueChange، onSearch، placeholder و disabled و ref ورودی را می‌گیرد. فرم جست‌وجو با دکمه یا Enter بدون ناوبری صفحه onSearch را فراخوانی می‌کند؛ فیلتر زنده هنگام تایپ نیز حفظ شده است. نوار هنگام پیمایش بدنه ثابت بیرون ناحیه اسکرول می‌ماند.

تنظیم نمایش رکوردها: شناسه ردیف فقط برای کلید، انتخاب و جست‌وجو نگهداری می‌شود و در سلول‌ها یا پیام مشخصات نمونه نمایش داده نمی‌شود. گزینه حذف غیرفعال و پیام همراه آن از جدول اول حذف شده‌اند. ستون اقدام‌ها با `actionColumnWidth` پیش‌فرض ۱۲۸ پیکسل محدود می‌شود (حداقل ۱۱۲ برای هدف‌های لمس)؛ متن رکوردها ۱۲ پیکسل و عنوان ستون‌ها ۱۴ پیکسل است.

به‌روزرسانی ۲۰۲۶/۱۰/۲۴: هدر با `position: sticky` روی همان جدول معنایی ثابت می‌ماند و ردیف‌ها داخل ظرف محدود پیمایش می‌شوند. `maxHeight` پیش‌فرض ۳۶۰ است؛ نمونه جست‌وجوپذیر ارتفاع ۳۲۰ دارد. `Table.containerProps` برای نام‌گذاری و فوکوس ظرف اسکرول استفاده می‌شود؛ ستون‌های هدر و بدنه در یک جدول باقی می‌مانند و هم‌ترازی آن‌ها با اسکرول افقی حفظ می‌شود.

نمونه دوم بخش داده شامل ۱۸ ردیف، جست‌وجوی نام/شناسه، شمار نتیجه، حالت بدون نتیجه، منوی مشخصات/حذف و دکمه حذف مستقل است. جست‌وجو حروف ی/ک فارسی و عربی و حروف کوچک/بزرگ لاتین را همسان می‌کند. تغییر جست‌وجو انتخاب‌ها را پاک می‌کند و انتخاب همه فقط نتایج فیلترشده را شامل می‌شود. حذف صرفاً محلی است، ردیف را از انتخاب‌ها حذف می‌کند و دکمه بازنشانی داده‌ها را بازیابی می‌کند.

پس از حذف، فوکوس به جست‌وجو برمی‌گردد؛ این جابه‌جایی بعد از به‌روزرسانی DOM انجام و درخواست animation frame هنگام unmount پاک می‌شود. RowActionMenu نیز `fallbackFocusRef` اختیاری برای حذف trigger دارد. منوها در portal باقی می‌مانند و ظرف اسکرول جدول آن‌ها را قطع نمی‌کند.

API تکمیلی: `renderActions(row)` محتوای سفارشی ستون اقدام را می‌گیرد؛ در نبود آن `actions(row)` همچنان منوی قبلی را می‌سازد. `emptyMessage` پیام خالی‌بودن را قابل تنظیم می‌کند. ثابت‌ماندن هدر با اسکرول ۱۸۰ پیکسلی بدنه، پیمایش با صفحه‌کلید، جست‌وجو، حذف مستقیم/منو، بازنشانی و چهار عرض صفحه در `.codex/qa-table` بررسی شده‌اند.

ورودی‌ها: `label`, `rows`, `columns(id/label/render)`, `getRowId`, `rowLabel`, `selectedIds`, `onSelectionChange`, `density`, `state`, `actions?`, `onRetry?`. جدول HTML معنایی، caption، عنوان ستون با scope=col و checkbox نام‌دار دارد. عنوان ستون فهرست مختلط در نمونه «نام» است و نام‌های بلند چندخطی نمایش داده می‌شوند. انتخاب همه فقط rows داده‌شده را انتخاب می‌کند؛ برای انتخاب میان چند صفحه، قرارداد مصرف‌کننده باید جداگانه تعیین شود.

حالت ready با selectedIds، انتخاب کامل یا جزئی را نشان می‌دهد. empty، loading و error متمایزند. شمار انتخاب، پاک‌کردن و indeterminate وجود دارند. تراکم comfortable/compact از متغیرهای مبانی استفاده می‌کند؛ فاصله ردیف ۱۸/۱۲ است. ظرف shadcn Table اسکرول افقی دارد و سند سرریز نمی‌کند. actions برای هر ردیف نام و علت غیرفعال‌بودن مستقل دارد. این جدول مرتب‌سازی، فیلتر یا بارگذاری سرویس را فرض نمی‌کند.

## PermissionAction

ورودی، مدل `ResolvedPermission` است؛ نقش و شناسه کاربر ورودی آن نیستند. `onDirectApproval` و `onRequestApproval` مسیر اقدام مجاز را می‌گیرند و حالت blocked هیچ‌یک را اجرا نمی‌کند. `permissionActionItem` همین نتیجه را برای RowActionMenu تولید می‌کند تا دکمه و منو از یک مجوز استفاده کنند. علت محدودیت در متن دائمی می‌ماند. نمونه مدیر/ویرایشگر/نویسنده در نسخه خود/مهمان فقط fixtureهای محلی‌اند و ماتریس مجوز محصول نیستند.

## CreationStepper

ریشه `data-slot="creation-stepper"` و شماره مرحله `data-slot="step-indicator"` دارند تا مصرف‌کننده محصول فاصله و اندازه را در محدوده خود تنظیم کند؛ رفتار و ظاهر پیش‌فرض کاتالوگ حفظ می‌شود. ConfirmationDialog/DestructiveDialog نیز `contentClassName` اختیاری برای ظاهر محتوای portal می‌پذیرند؛ این گزینه روی مجوز، تأیید یا فوکوس اثر ندارد.

ورودی‌ها: `steps(id/label)`, `currentStep`, `onStepChange`, `children`, `onCommit`, `commitLabel` و `canContinue/validationMessage/loading/error` اختیاری. مدل فرم در مصرف‌کننده می‌ماند تا برگشت اطلاعات را پاک نکند. مراحل کامل/جاری/آینده با متن و aria-current=step مشخص‌اند. ادامه فقط onStepChange را اجرا می‌کند؛ آخرین دکمه برچسب صریح دارد و onCommit را با guard تکرار و پشتیبانی Promise اجرا می‌کند. خطای Promise حفظ و اعلام می‌شود. نمونه بعد از ایجاد جزئی، همان مورد ساخته‌شده را برای بازیابی نگه می‌دارد؛ بازیابی نسخه تازه‌ای ایجاد نمی‌کند. ورودی نسخه خالی با نسخه مبتنی بر محتوای قبلی به‌روشنی تفاوت دارد. عنوان مرحله جدید با تغییر مرحله فوکوس می‌گیرد و بارگذاری صفحه فوکوس را جابه‌جا نمی‌کند.

## ApprovalContext

گزینه `showStatus` پیش‌فرض true دارد. در ترکیب با کارتی که از قبل badge وضعیت را در عنوان نشان می‌دهد، false قرار گیرد تا نشان تکراری ساخته نشود؛ metadata و هویت‌ها همچنان نمایش داده می‌شوند.

مدل context شامل creator، lastEditor، requester و حالت pending/decided است. تصمیم‌گیرنده فقط در decided از decision.by می‌آید؛ در pending متن «هنوز تصمیمی ثبت نشده» دیده می‌شود. زمان‌ها ISO و با fa-IR و منطقه Asia/Tehran نمایش داده می‌شوند؛ زمان نامعتبر fallback دارد. metadata با dl/dt/dd و time معنایی است. هویت مجهول از Identity استفاده می‌کند. هیچ سیاست تفکیک وظایف تازه‌ای ساخته نشده است.

## شواهد

آزمون `.codex/qa-stage-e/verify.mjs` انتخاب جزئی/همه/پاک‌کردن، فاصله ۱۸/۱۲، حالت‌های empty/loading/error، بازیابی فهرست، مهمان مسدود در دکمه و منو، درخواست ویرایشگر، حفظ عنوان و مبنای نسخه پس از برگشت، ایجاد صریح، بازیابی بدون ایجاد دوباره و چهار هویت/دو زمان تصمیم را بررسی می‌کند. در عرض‌های ۳۶۰/۶۴۰/۷۰۰/۱۰۲۴/۱۴۴۰ سرریز سند یا خطای JavaScript دیده نشد. build و lint نیز اجرا شدند. تست انسانی صفحه‌خوان و بررسی نهایی در F باقی است.
