## Compact type-aware editor workspace — 2026/11/17

Evidence: working tree on `feat/compact-document-editor-workspace`, based on `06a5240`. This revision replaces the earlier new-tab reader toolbar/sidebar while retaining version-dialog behavior.

- ui:check passed for 235 React files; lint and TypeScript passed. All 50 tests in `test/*.test.mjs` passed, including the three required workspace files and three new editor cases: type capabilities/aliases, draft-only saves with independent approved content/edit history, and atomic approval/publication from the current buffer.
- Browser checks passed for preview-first entry, more than 850px iframe height in a 1000px desktop viewport, removed redundant page controls, the classic-only closed drawer, edit-only history, chat/attachment preview interactions, drawer focus restoration, manual Save, unsaved Back/Discard/Save-and-continue while switching versions, and 700ms autosave. Approved content stayed independent until approval. Public approval returned to preview with canonical badges; PDF invoked the validated iframe print bridge. Version selection still stayed in one enlarged dialog and opened no additional tab.
- File, Word, flowchart and Excel toolbar cases passed: file downloads in preview; approval controls in editing; Autosave absent for File and present for the other three. 320/390px checks found no document overflow and retained editor space. Fixture downloads correctly used `.txt` rather than claiming to generate real Office files.
- Storage-quota fault injection passed: manual save and approval retained the current buffer, failed Save-and-continue stayed on the decision dialog, error messages remained visible, and explicit retry succeeded after storage recovery without runtime errors. The full catalogue exposes this state with a failure toggle.
- The independent navigation-catalogue example passed keyboard mode activation, dark Select portals, read-only and empty-version disabled controls, dirty/save interaction, RTL mobile bounds and solid/forced-color/reduced-motion modes. The complete workspace example passed local dark drawer/version portals and arrow-key tabs. Desktop captures were visually reviewed. Runtime/console checks also passed across six product/catalogue/workspace routes and four internal catalogue navigations. The focus test waits for the Sheet closing transition before asserting restoration.
- The server stopped during the interrupted run and the first development restart stopped for the CLI upgrade reminder. Retrying the same command restored the local server; no dependency upgrade was performed. The repeated build attempt again hit the known Turbopack CSS worker port-bind permission failure after tokens and structural checks. Production build success is not claimed. The required feedback instructions were read (with the documented network retry). The CLI notice was evaluated and excluded because its explicit retry guidance resolved it immediately; no new qualifying report remained. The repeated CSS port-bind limitation was already reported and was not submitted again.

The page, independent shared toolbar example, full workspace example and owning contracts are delivered together. The original source account remains untouched; all browser mutations target fictional local fixtures. Native browser print offers Save as PDF. Local plaintext iframes are integration previews, not actual Word/Excel/flowchart engines or remote file services. These results do not establish backend authorization, human screen-reader acceptance or complete accessibility certification. Temporary browser scripts and captures remain outside the repository.

## Document reader, sharing and canonical status controls — 2026/11/17

Evidence: working tree on `feat/document-reader-and-repository-sharing`, based on `00bfd96`. Results below belong to this revision, not earlier stage counts.

- ui:check passed for 229 React files; lint and TypeScript passed. All 47 tests in `test/*.test.mjs` passed, including four new cases for identifier tokenization, repository-only recipient scoping, independent status flags and bounded/expired reader handoff parsing. The three required workspace test files are included. Specification index (17 sources), documentation links and diff whitespace checks passed.
- Browser checks passed for successful upload replacing Retry/Cancel while retaining the identical progress node and meter width/height; pending sharing invitations, active-member separation and cancellation (including invitations from the repository-creation wizard); repository member/group multiselect; identifier separation/removal; document row flags; Create opposite breadcrumb and adjacent Filter/Sort/Close controls.
- Real new-tab checks passed with no opener, iframe rendering, bookmark updates back to the originating list, newly created document handoff and reload, plaintext markup rendering without execution, and saved iframe edits. Version status badges reuse the canonical components; selecting/viewing/editing a version retained the same dialog and browser-tab count. Near-viewport geometry, Back restoration and iframe Escape passed at 320/390px. A missed-ready race was fixed with an explicit session-scoped acknowledgement; the loading label disappears after initialization.
- Catalogue checks passed for dark preview, token removal, multi-select, editable/read-only iframe, 320px component bounds, solid material, forced colors and reduced motion. Escape from direct editing dismisses through the Base UI close primitive. An initial catalogue test clicked before React hydration; the test now waits for interactive state. A separate test initially selected a folder instead of a document; the selector now names the intended document. Neither was a product regression.
- A browser test exposed an existing success toast intercepting Save on the enlarged editor. The toast now follows Base UI's outside/inert marker and moves behind the active dialog while retaining its live region. The upload/create/edit/version scenarios passed again after this fix. Mobile reader and desktop reader/version captures were visually reviewed.
- Runtime/console checks passed across six product/catalogue/workspace routes, four internal catalogue navigations and shared table-menu keyboard dismissal. npm run build was attempted with escalation and hit the already reported Turbopack CSS worker port-bind permission failure; no successful production build is claimed. The final Next.js feedback audit retained no new qualifying issue beyond the known environment limitation.

All source-account data remains untouched. The source iframe integration was confirmed in publicly delivered UI code; authenticated reader DOM automation was unavailable, so the local tools are a preview composition rather than a claim of exact remote editor integration. Reader handoff uses a bounded 24-hour local snapshot; other fixtures remain in memory. Temporary scripts/captures stay outside the repository. These checks do not establish production authorization, human screen-reader acceptance or complete accessibility certification.

## Unified options, compact versions and search disclosure — 2026/11/16

Evidence: working tree on `fix/compact-search-and-dialog-controls`, based on `5478d26`.

- ui:check passed for 217 React files; lint and TypeScript passed. All 43 existing workspace, preview-version and library tests passed. Structural validation now rejects ad hoc three-dot Button/IconButton controls outside OptionsButton.
- Browser checks passed for initially hidden search/filter controls, disclosure state, focus, integrated title/content selection, attached Apply geometry and Enter, immediate adjacency to table/outline, filter application, close/clear/reset, and 320/390px overflow. Sort and explicit selection retain their independent state.
- Record-menu geometry and computed materials matched between repository, document and version controls. Version snapshots stack vertically, retain shared numbering and independent actions/content, and reserve menu insets. Key generation/save share one aligned row in both generated/ungenerated states. Captures were visually reviewed.
- Local dark search/Select/menu portals, tag input/action alignment with validation errors, tree reuse, solid mode, forced colors, reduced motion and mobile key dialogs passed. Alignment measurements wait for the standard two-pixel hover lift to settle. Public IDs and composed Base UI refs remain preserved.
- A final console sweep exposed instant-shell-url-data on the catalogue route: Page awaited params outside a page-local Suspense boundary. Moving the read into the streamed section fixed the application error; all six route checks, four internal catalogue navigations and the shared table menu then passed without runtime/console errors. This is a documented migration requirement, not retained as a new framework defect. A legacy forced-colors test now checks that no pseudo-element is painted (including content:none), rather than requiring a particular display value for a nonexistent pseudo-element.
- npm run build was attempted with escalation and encountered the already reported Turbopack CSS worker port-bind permission failure. A successful production build is not claimed. The final feedback audit retained no new qualifying Next issue beyond this known environment limitation.

All account/source data remains untouched; tests use local fixtures. Scripts and screenshots stay outside the repository. Automated checks do not establish human screen-reader acceptance or complete accessibility certification. Remote publication is explicitly authorized for this request; branch synchronization is verified separately after committing.

## Repository workspaces, master tags and batch actions — 2026/11/16

Evidence: working tree on `feat/repository-workspace-and-bulk-documents`, based on `5f80c17`.

- ui:check passed for 215 React files; lint and TypeScript passed. All 43 workspace, preview-version and library tests passed, including six new selection/subtree/outline/repository-scope cases. Documentation links and specification index checks passed.
- Browser scenarios passed for bounded applied search and separate creation rows, repository navigation/image display, master tag creation/duplicate validation, tag deletion Cancel/Confirm and document-tag cleanup, folder-only disabled filters, title/content mode, search ancestor context, the ten-item cap, selection retained between table/outline, cross-repository subtree move, recursive deletion and cancellation, atomic repository/tag/image creation, empty new repository and 320/390px overflow.
- Catalogue scenarios passed for repository/outline/batch examples, local dark tag and bulk/Select portals, one-dialog navigation, focus restoration, solid/forced-color/reduced-motion modes, repository-scoped template and document creation, nested category creation, mobile batch controls and unavailable repository routes. The title hover has no separate translated/shadowed button surface.
- Desktop checks at 720/900px height passed: list bounds stay inside the main panel and cumulative loading reaches all 28 repository-root records. A failed image request correctly switched to the default illustration; the final card/navigation smoke had no runtime or hydration error.
- Image-edit checks passed for custom/default recognition, chosen default color, replacing an image and retaining a custom image when saving other metadata.
- Long-list checks passed for 16 repository tags and 14 destination folders: real inner scrolling, automatic cumulative append, retained existing row identity, cancelled selection and stable title focus after repository deletion.
- A browser test exposed a stale Back callback captured before pushing a tag confirmation page. The confirmation now reads dialog navigation in its mounted child component; cancellation, successful deletion and focus restoration passed after the fix. Screenshot checks keep caret rendering unchanged to avoid changing unhydrated input attributes; hydration-aware setup waits for interactive controls.
- npm run build was attempted with escalation and again hit the known Turbopack internal CSS worker port-bind permission failure. Production build success is not claimed. The final feedback audit retained no new qualifying Next issue beyond this already reported environment limitation.

The original Clasor account was not changed. Source inspection used read-only public UI assets. Captures and browser scripts remain outside the repository. All state and images are session-local mock data; checks do not establish backend authorization, human screen-reader acceptance or full accessibility certification.

## Flat surfaces and independent library pages — 2026/11/16

Evidence: working tree on `feat/clasor-library-pages-and-flat-surfaces`, based on `eb94c0f`.

- ui:check passed for 204 React files; lint and TypeScript passed. All 37 workspace, preview-version and library logic tests passed, including 7 new query/tree/repository tests. Documentation links, specification index and diff whitespace checks passed.
- Browser checks passed on all seven library routes: visible active navigation, source-aligned document/template/category/repository creation, wizard Back retaining fields, template-content copy, atomic final creation, folder drill-down and all-category scope, search normalization, filter Apply/Cancel/chips, five-criterion sort and reorder, my/shared restrictions, square repository tiles and archive/restore state across navigation.
- Same-number draft/approved snapshots were checked side by side with independent actions and no nested backdrop filter. Catalogue nested surfaces, creation/filter/select dark portals, focus restoration, solid mode, forced colors, reduced motion, 320/390px overflow, mobile multi-sort and mobile navigation passed. Workspace regression smoke passed; no runtime errors occurred in these checks.
- The shared Select wrapper now forwards explicit test IDs to visible controls. Tests scope selectors to the visible route because cacheComponents retains previous pages in hidden Activity trees. This matches the installed Next documentation and is not treated as a framework defect.
- npm run build was attempted during this request and hit the already reported Turbopack internal CSS worker port-bind permission failure. A successful production build is not claimed. The final feedback audit retained no new qualifying Next issue beyond that known environment limitation.

Apple source references and implemented material hierarchy are in MATERIALS.md; source field/stage mapping and local state limits are in PATTERNS.md. Browser scripts and captures remain outside the repository. These checks do not establish human screen-reader or complete accessibility acceptance; no source-account write occurred.

## Refined glass header controls - 2026/11/16

Evidence: working tree on `feat/refined-glass-header-controls`, based on `c563e58`.

- ui:check passed for 183 React files; lint, TypeScript, documentation links, specification index and whitespace checks passed. All 30 existing workspace/preview-version tests passed.
- Browser checks covered compact header control geometry, shared rim/reflection layers, the source admin target (not followed), feedback text validation, unsupported/oversized files, six-file limit, removal and focus, local success confirmation, cumulative invitation loading with existing nodes retained, reject/accept, accepted link and Back, retained decisions, logout cancellation and stable fallback focus.
- Existing repository/document dialog regression checks also passed after the shared button/material change.
- Widths 320/390, catalogue examples, pressed/disabled/keyboard states, local dark controls and dialog portals, solid mode, forced colors, reduced motion, focus containment, Escape/restoration and empty invitations passed. Tests waited for theme changes and visual transitions before inspecting styles. No runtime error or source-account write occurred in the final checks.
- The account label was placed inside Menu.Group after an initial runtime check exposed the primitive's required context. Header dialogs now accept a stable theme anchor, preventing local preview themes from being lost when focus moves into portals.
- npm run build was attempted and hit the previously reported Turbopack internal CSS port-bind permission failure. Production build success is not claimed; the feedback reporting pass retained no new qualifying issue beyond this already reported environment limitation.

Browser captures and scripts remain temporary files outside the repository. These checks are not human screen-reader or complete accessibility acceptance. All feedback/invitation/logout state is a local design preview, not backend integration.

## Request/file/version follow-up - 2026/11/16

Evidence: working tree on `feat/refine-request-file-version-flows`, based on `0978cce`.

- ui:check passed for 176 React files; lint and TypeScript passed. All 30 existing workspace/preview-version tests passed. Documentation links, specification index and diff whitespace checks passed.
- Local browser checks covered inline accept/reject without opening a viewer, retained detail decisions, focus after inline decisions, file upload dates, source-aligned menus, rename/publication/delete, download filename, upload success status and record persistence after reopening.
- Same-number snapshots share a group while retaining different content; creating a version has no content field, starts empty and leaves prior content intact; the separate editor remains functional. Breadcrumb separators and ancestor navigation passed.
- RTL widths 320/390, dark file-menu portals, standalone catalogue examples, completed upload disabled states, solid and forced-color surfaces, reduced motion and horizontal overflow were checked. No runtime errors were recorded.
- npm run build was attempted and stopped at the previously reported Turbopack CSS internal port-bind permission error. Production build success is not claimed; no duplicate Next.js feedback report was submitted for this known environment issue.

Data and actions remain local previews. These checks do not establish human screen-reader or complete accessibility acceptance.

## دیالوگ‌های جمع‌وجور و ناوبری داخلی — ۲۰۲۶/۱۱/۱۶

شواهد روی working tree برنچ `feat/compact-navigable-record-dialogs` بر پایه `170a37e` ثبت شدند.

- `ui:check` برای ۱۷۴ فایل React، lint، TypeScript، لینک‌های مستندات و هماهنگی ایندکس مشخصات پاس شدند. ۲۳ تست موجود workspace و ۷ تست تازه مدل نسخه، در مجموع ۳۰ تست، پاس شدند.
- مرورگر محلی: جای محتوای گزینه تصویر مخزن، لغو/تلاش مجدد و تکمیل بارگذاری محلی، جستجوی فایل، بازگشت با حفظ تب/جستجو/فوکوس، ویرایش گروه، اعتبارسنجی اعضای غیرخالی، ساخت/حذف کلید و لایه واحد دیالوگ بررسی شدند.
- نگهداری لینک جدا برای هر نقش، جلوگیری از تکرار و حذف/ساخت مجدد، انتشار/لغو انتشار، نمایش درخواست و تصمیم تایید، مسیر درختی و نگهداری مقصد بررسی شدند.
- فهرست نسخه بدون محتوا، محتوای متفاوت پیش‌نویس/تاییدشده هم‌شماره، ساخت نسخه و رد شماره تکراری فارسی/لاتین، عمومی‌سازی تاییدشده و منوهای وضعیت بررسی شدند. تست‌های خالص، عدم تغییر محتوای تاییدشده هنگام ویرایش و جایگزینی صریح هنگام تایید را نیز بررسی می‌کنند.
- عرض‌های ۳۲۰/۳۹۰، تم تاریک portal و منوی داخلی، reduced motion، forced colors، حالت بدون شفافیت و محصوربودن فوکوس پاس شدند. اسکرول اعلانات با داده بلند موقت مرورگر بررسی شد. خطای runtime ثبت نشد.
- منوی داخلی از فوتر بالاتر و منوی صفحه از دیالوگ پایین‌تر قرار می‌گیرد؛ مشکل برخورد pointer با فوتر در بررسی پیدا و اصلاح شد.
- `npm run build` در حالت معمول و با دسترسی بیشتر اجرا شد؛ هر دو با خطای شناخته‌شده مجوز bind پورت داخلی Turbopack هنگام CSS متوقف شدند. بیلد تولید تایید نشده است. این رخداد قبلاً در گذر بازخورد Next.js ثبت شده و گزارش تکراری ارسال نشد.

بارگذاری، کلید، لینک و تغییرات رکورد صرفاً محلی‌اند؛ حساب کلاسور تغییر نکرد. این شواهد پذیرش انسانی صفحه‌خوان یا تایید کامل WCAG نیستند.


## یکپارچه‌سازی تب‌بار — ۲۰۲۶/۱۱/۱۶

شواهد روی working tree برنچ `refactor/unify-glass-tabs` بر پایهٔ `9388d7d` ثبت شدند. ظاهر ریل و تب فعالِ نمونهٔ مورد تأیید پیش از تغییر ثبت شد و رنگ زمینه/متن، blur، شعاع، رنگ حاشیه، سایه، padding و ارتفاع پیش‌فرض با پیاده‌سازی یکپارچه در مرورگر مقایسه و یکسان بود.

- صفحهٔ ناوبری فقط یک tablist دارد؛ نمونه‌های تکراری خطی/بخش‌بندی‌شده حذف شده‌اند. حالت تاریک، عنوان بلند و تب غیرفعال روی همان نمونه بررسی شدند.
- RTL با جهت‌ها، Home/End، ردشدن از تب غیرفعال، بازگشت انتخاب هنگام غیرفعال‌کردن تب فعال و حالت کنترل‌شده پاس شد.
- سطوح داشبورد با نمونهٔ مرجع یکسان‌اند؛ ارتفاع جمع‌وجور دسکتاپ ۳۲px حفظ شد. استقلال تب‌های سند/مخزن و تب‌های دیالوگ اشتراک مخزن، درخواست‌ها و نظرات سند بررسی شدند.
- عرض‌های ۳۲۰ و ۳۹۰px، دیده‌شدن تب فوکوس‌شده در نوار افقی، نبود سرریز ریشه، dark، solid، forced colors و reduced motion بررسی شدند. خطای runtime در بررسی مرورگر ثبت نشد.
- `ui:check` برای ۱۶۵ فایل React، lint، TypeScript، ۲۳ تست منطق workspace، لینک‌های مستندات و ایندکس مشخصات پاس شدند.
- `npm run build` اجرا شد و با همان خطای شناخته‌شدهٔ مجوز bind پورت داخلی Turbopack در پردازش CSS متوقف شد؛ موفقیت بیلد تولید ادعا نمی‌شود.

این شواهد پذیرش انسانی صفحه‌خوان، همهٔ مرورگرها یا تأیید کامل WCAG نیستند.

## اتصال دیالوگ‌های رکورد به داشبورد — ۲۰۲۶/۱۱/۱۶

شواهد این تغییر روی working tree برنچ `feat/dashboard-record-dialogs` بر پایهٔ `8d770be` ثبت شدند.

- منوی جداگانهٔ دیالوگ مخزن از سایدبار محصول و رجیستری صفحات حذف شده؛ نشانی قبلی به داشبورد redirect می‌شود. نمونه‌های کامپوننت داخل کاتالوگ حفظ شده‌اند.
- `ui:check` برای ۱۶۵ فایل React، lint و TypeScript پاس شدند؛ ۲۳ تست منطق workspace پاس شد. لینک‌های مستندات و ایندکس مشخصات هماهنگ‌اند.
- بررسی مرورگر از خود منوی عملیات داشبورد شامل ویرایش و اشتراک مخزن، سایر گزینه‌های مالک، نشان، بایگانی، ویرایش سند/متن/تگ، نسخه‌ها، عمومی‌سازی، دسترسی، نظرات و تأیید/حذف بود. استقلال دو رکورد، ماندگاری پس از جابه‌جایی تب‌ها و بازگشت فوکوس به عملیات یا عنوان پنل پس از حذف بررسی شدند. عمومی‌سازی نسخه وضعیت تأیید آن را تغییر نداد.
- تمام گونه‌های دیالوگ سند از کاتالوگ باز و بسته شدند؛ لینک با انقضا، رمز/حذف رمز، کپی/حذف لینک، محدودیت کاربران، پاسخ پرسش و محدودیت زمینهٔ داشبورد بررسی شدند. منوی نمونهٔ قبلی نیز دیالوگ واقعی محلی را باز کرد و تم تاریک آن حفظ شد.
- TagPicker از نظر انتخاب با Space، حذف چیپ و بازگشت فوکوس، جستجوی بدون نتیجه، غیرفعال، جلوگیری از ثبت فرم با Enter جستجو، حالت solid/forced-colors و اندازه‌های ۳۲۰/۳۹۰px بررسی شد. فهرست فعالیت با skeleton قابل مشاهده، حفظ ۱۰ ردیف قبلی و افزودن خودکار تا ۱۲ ردیف بررسی شد.
- نمایش دیالوگ داشبورد و تگ در عرض‌های ۳۲۰/۳۹۰px سرریز ریشه نداشت. کاهش حرکت و حالت‌های بدون شفافیت بررسی شدند. تصاویر صرفاً در مسیر موقت هستند.
- `npm run build` اجرا شد؛ پردازش CSS در Turbopack با محدودیت شناخته‌شدهٔ مجوز پورت داخلی محیط متوقف شد. موفقیت بیلد تولید ادعا نمی‌شود.

این شواهد ادعای پذیرش انسانی صفحه‌خوان، همهٔ مرورگرها، کنتراست کامل یا اتصال به حساب/سرویس کلاسور نیست. ویرایش محتوا در این نمونه متن ساده است و نسخه‌ها داخل دیالوگ محلی نمایش داده می‌شوند.

## بازبینی سراسری متریال شیشه‌ای — ۲۰۲۶/۱۱/۱۶

شواهد این تغییر روی working tree برنچ `feat/design-system-glass-polish` بر پایهٔ `07c34a0` ثبت شدند؛ نتایج تاریخی زیر اجرای جدید محسوب نمی‌شوند.

- تمام ۱۴ بخش کاتالوگ در مرورگر Chrome بررسی شدند. نمای واقعی سطوح، نشان‌ها، انتخاب‌ها، آواتار و پیام‌ها قبل/بعد مشاهده شد؛ حالت‌های روشن/تاریکِ کنترل، وضعیت و بازخورد نیز بازبینی شدند.
- `ui:check` برای ۱۵۳ فایل React، lint و TypeScript پاس شدند؛ ۲۳ تست موجود منطق workspace پاس شد. لینک‌های مستندات و ایندکس مشخصات هماهنگ‌اند.
- بررسی تعاملی شامل Checkbox عادی/جزئی/غیرفعال/خطا، رادیو با کلید جهت، حرکت RTL سوییچ، Select تاریک، نشان‌های معنایی، مقدار progress، Dialog/AlertDialog/Sheet با فوکوس محصور و بازگشت، Tooltip با hover و Toast تاریک بود.
- همهٔ ۱۴ بخش در عرض‌های ۳۲۰ و ۳۹۰px بدون سرریز ریشه بررسی شدند. حالت solid، forced colors، کاهش حرکت، کاهش شفافیت، کنتراست بیشتر و print، از جمله حفظ fallback هنگام hover/انتخاب، پاس شدند. چک‌باکس‌های تنظیمات خود کاتالوگ هم با کنترل مشترک بررسی شدند.
- جریان‌های ۱۳ دیالوگ مخزن، تأییدهای تو در تو، تغییر/حذف دسترسی، کلیدها، فوکوس جایگزین و بارگذاری تجمعی فایل‌ها پاس شدند. تب‌های داشبورد با baseline فعلی compact (۳۲px دسکتاپ و هدف موبایل مربوط به خود کنترل)، استقلال محتوا، صفحه‌کلید RTL، ۳۲۰/۳۹۰px و fallback دوباره بررسی شدند.
- `npm run build` اجرا شد، ولی Turbopack هنگام پردازش CSS به‌علت نداشتن مجوز bind پورت داخلی متوقف شد؛ همان محدودیت ثبت‌شدهٔ محیط در تحویل قبلی. موفقیت بیلد تولید ادعا نمی‌شود.

این شواهد، پذیرش انسانی صفحه‌خوان، کنتراست تمام ترکیب‌ها، همهٔ مرورگرها یا تأیید کامل WCAG نیستند. داده و رفتار محصول همچنان نمونه‌اند و به حساب کلاسور متصل نشده‌اند.

## اعتبارسنجی انتقال CSS به Tailwind — ۲۰۲۶/۱۱/۱۴

پس از حذف شش فایل CSS متریال و انتقال قواعد مصرف‌شده به کلاس‌های Tailwind، `ui:check`، `lint`، `build` و ۲۳ تست موجود فضای کار موفق بودند. بررسی لینک‌های مستندات و شاخص مشخصات نیز موفق بود. کنترل جدید `check-style-contracts.mjs` فقط CSS متغیرهای توکن و تم را در این پوشه مجاز می‌داند.

در مرورگر، ثبت فرم، Select، محصورکردن/بازگرداندن فوکوس مودال، منوی تو‌در‌تو و تم تاریک پورتال بررسی شدند. کاتالوگ، اسناد فضای کار و وایرفریم در عرض‌های ۳۹۰، ۷۶۸ و ۱۴۴۰ سرریز افقی نداشتند. حالت بدون شفافیت، چاپ و forced-colors تاری را حذف کردند؛ reduced-motion حرکت دکمه را حذف کرد. ظاهر نمونه چیدمان نیز بازبینی شد. این بررسی‌ها ادعای تأیید کامل WCAG یا همهٔ مرورگرها نیستند.

## اعتبارسنجی Master Refactor — مرجع ثبت d124673

ثبت مستندات: ۲۰۲۶/۱۱/۱۴. نتایج زیر در کار اجرایی قبل از کامیت `d124673` به دست آمده‌اند؛ به‌روزرسانی این فایل، اجرای دوبارهٔ آن آزمون‌ها محسوب نمی‌شود.

- `npm run ui:check`: بررسی ۱۱۰ فایل React از نظر سقف ۲۰۰ خط فیزیکی، شناسه تست، RTL، شعاع و ممنوعیت Select بومی.
- ESLint و production build، شامل TypeScript و بررسی توکن‌ها، موفق بودند. ESLint به‌طور مستقل max-lines را اعمال می‌کند.
- ۲۳ تست موجود در `test/workspace-mutations.test.mjs`، `test/workspace-documents.test.mjs` و `test/workspace-collaboration.test.mjs` پاس شدند.
- بررسی مرورگر شامل ثبت فرم، Select، بازگشت/محصور ماندن فوکوس Modal، منوی داخل Modal، Portal تاریک محلی، Hover و opt-outهای شفافیت/حرکت بود. در عرض ۳۹۰px، کاتالوگ، اسناد فضای کار و وایرفریم سرریز افقی یا خطای کنسول نداشتند؛ کنترل‌ها و کانتینرهای اصلی قابل مشاهده شناسه تست داشتند.

این شواهد، تأیید همهٔ مرورگرها، تمام جریان‌ها، کنتراست همهٔ ترکیب‌ها، WCAG کامل، آزمون انسانی صفحه‌خوان یا کاربردپذیری با کاربر واقعی نیست. `validation.json` و تصاویر قدیمی را شاهد اجرای فعلی ننامید. برای اجرای جدید و دامنهٔ آن از [docs/RAG.md](../../docs/RAG.md) و [راهنمای تحویل](../../docs/DESIGN_HANDOFF.md) استفاده کنید.

## تاریخچهٔ اعتبارسنجی مراحل A–F

# تحویل نهایی سیستم طراحی کلاسور

مرجع جاری تحویل نسخه۰٫۲ در [راهنمای تحویل طراحی و موارد باز](../../docs/DESIGN_HANDOFF.md) است. گزارش مراحل A–F زیر تاریخچه کتابخانه است؛ قواعد جاری پنل (از جمله بارگذاری خودکار) و محدودیت‌های آزمون انسانی در راهنمای جدید ثبت شده‌اند.

مراحل A تا F برای کتابخانه طراحی تکمیل شدند. ۱۳ بخش در `/` و ۲۲ قرارداد در بخش «تحویل طراحی» قابل مشاهده‌اند. محدوده، سیستم طراحی فارسی/RTL و روشن است؛ هیچ API، آپلود، ذخیره‌سازی یا انتشار محصول اضافه نشده است.

## پوشش و مصرف

`coverage.ts` به ازای هر شناسه `lib/design-system/components.json` نام React، فایل‌های واقعی، props، کاربرد، مورد نامناسب، صفحه‌کلید و مثال را مشخص می‌کند؛ گونه‌ها، حالت‌ها و auditIssueRefs مستقیماً از مرجع گرفته می‌شوند. نبود یک نگاشت خطا ایجاد می‌کند. تست نهایی وجود هر ۲۲ فایل/قرارداد، لنگر نمونه، حالت‌ها و ارجاع UX را بررسی می‌کند. در خود کاتالوگ، قراردادها با details قابل بازکردن‌اند و نمونه کد فارسی/لاتین دارند.

| دسته | قراردادها | نمونه |
| --- | --- | --- |
| اقدام و فرم | button، text-field، select، choice، file-input | #buttons / #inputs |
| وضعیت | badge، identity | #status |
| ناوبری | tabs، breadcrumb، pagination | #navigation |
| داده | data-table، action-menu | #data و #overlays |
| بازخورد | feedback، system-state، progress | #feedback |
| لایه | dialog، drawer، toast، tooltip | #overlays |
| الگو | permission-action، stepper، approval-context | #patterns |

اجزای عمومی در `components/ui` مستقل از کاتالوگ هستند. قاب نمونه و fixtureها در `components/design-system` قرار دارند. مستندات تحویل از صفحه سروری به قاب تعاملی با children ارسال می‌شوند؛ بنابراین داده قراردادها صرفاً برای یک تعامل به Client Component تبدیل نشده است. فونت محلی و direction provider سراسری‌اند. ناوبری با کلیک یا اسکرول بخش جاری را نشان می‌دهد و عنوان مسیر نمایشی هماهنگ است.

## اختلاف‌های پذیرفته‌شده

- پایه‌های تعاملی shadcn از خانواده Base UI هستند؛ Checkbox/Radio/Switch به جای markup بومی مرجع، input مخفی فرم دارند. serialize و رفتار صفحه‌کلید بررسی شده‌اند.
- Dialog/AlertDialog/Sheet جای dialog بومی مرجع را گرفته‌اند؛ رفتار modal، عنوان، Escape و فوکوس حفظ شده‌اند. Sheet از سمت چپ RTL و با عرض ۴۰۰ باز می‌شود.
- Toast با جزء رسمی رجیستری shadcn Base UI در `components/ui/toast.tsx` پیاده‌سازی شده است؛ Toaster مشترک در layout و toast.add حالت‌های Default/Success/Info/Warning/Error را ارائه می‌دهند. low priority اعلان polite را مدیریت می‌کند و ریشه تعاملی آن از الگوی dialog اعلان کتابخانه پیروی می‌کند. دکمه بستن فارسی همیشه برای دسترس‌پذیری قابل کشف است. سازگاری API قبلی در status-toast.tsx نگهداری شده است.
- progress بومی حفظ شد؛ Select طبق درخواست ۲۰۲۶/۱۰/۲۴ با نسخه Base UI shadcn جایگزین شد و name/value به ورودی مخفی فرم منتقل می‌شوند. جزئیات نام‌گذاری variant و توکن‌های تکمیلی در CONTROLS و FOUNDATIONS ثبت شده‌اند. سایزهای تزئینی کاتالوگ به توکن عمومی تبدیل نشده‌اند.
- منو از Positioner خود Base UI برای برخورد با لبه و جابه‌جایی هنگام اسکرول استفاده می‌کند؛ علت غیرفعال‌بودن خارج منو پایدار است.
- ارتفاع پیش‌فرض Button و IconButton از control-height مصرف می‌شود: عادی ۴۰ و در تراکم compact برابر ۳۶؛ اندازه‌های صریح کوچک و بزرگ ۳۲/۴۸ می‌مانند و هدف لمس حداقل ۴۴ است.

## بررسی‌های اجراشده

روی نسخه production علاوه بر build، TypeScript، lint و بررسی همگام‌بودن ۸۵ توکن:

- آزمون مرحله C: فرم خالی/معتبر، حفظ ورودی، readonly/disabled، FormData، radio در RTL، Space برای انتخاب‌ها، بارگذاری و جلوگیری از کلیک تکراری، فایل معتبر/نوع و حجم نامعتبر/پاک‌کردن، شناسه‌های یکتا و اندازه‌های ۳۲/۴۰/۴۸ و لمس ۴۴.
- آزمون D: Tab/جهت‌ها/Home/End، مرز صفحه‌بندی، Tab محصور در dialog، Escape و بازگشت فوکوس، انصراف اولیه مخرب و backdrop، Sheet چپ و موبایل، منو، Toast و Tooltip. دکمه Toast از پیش‌فرض aria-hidden کتابخانه خارج شد؛ Tooltip صراحتاً role و ارتباط شرح دارد و در حالت بسته ارجاع ناموجود ایجاد نمی‌کند.
- آزمون E: انتخاب همه/جزئی/پاک‌کردن، padding ۱۸/۱۲، حالت‌های جدول، مهمان مسدود در دکمه و منو، درخواست ویرایشگر، حفظ عنوان و مبنای نسخه، تعهد صریح نهایی، بازیابی موفقیت ناقص و چهار هویت مستقل.
- آزمون F: هر ۲۲ قرارداد، ۱۳ بخش، بازکردن همه مستندات، عرض‌های ۳۶۰/۶۳۹/۶۴۰/۶۴۱/۶۹۹/۷۰۰/۷۰۱/۱۰۲۳/۱۰۲۴/۱۰۲۵/۱۴۴۰، متن بلند، شبیه‌سازی بزرگ‌نمایی با عرض ۷۲۰ و اندازه ریشه ۲۰۰٪، نبود سرریز سند، شناسه و ارجاع شرح، کاهش حرکت، کپی موفق/مسیر نبود Clipboard و پایان خودکار Toast در ۶۵۰۰ میلی‌ثانیه.
- اسکن axe با قواعد WCAG 2 A/AA و 2.1 AA برای کاتالوگ و لایه‌های باز اجرا شد. کنتراست شماره‌های فهرست و تب‌های غیرفعال و role نشان موقت اصلاح شدند. نتایج دقیق، موارد نیازمند بررسی دستی و تصاویر در `.codex/qa-stage-f` ثبت‌اند؛ صفر violation گزارش‌شده به معنی تأیید همه معیارهای دسترس‌پذیری نیست.
- متن سفید روی primary برابر ۶٫۴۴:۱ و border.control روی سفید برابر ۳٫۵۳:۱ است. رنگ‌های معنایی و جزئیات مبانی در FOUNDATIONS ثبت شده‌اند. کنترل‌های غیرفعال از محاسبه الزامی کنتراست متن معاف‌اند؛ متن علت مستقل و خواناست.
- axe چهار گره را برای کنتراست نیازمند بررسی دستی دانست: سه متن روی شبکه/گرادیان کارت هنری و یک fallback آواتار با تشخیص هم‌پوشانی. متن روی کارت هنری سفید شد؛ حتی با فرض محافظه‌کارانه ترکیب ۱۰٪ سفید در پس‌زمینه بنفش، کنتراست آن بیشتر از ۵:۱ است. متن fallback با رنگ‌های خنثی حدود ۵٫۹۷:۱ دارد. این محاسبه رنگ‌های تعریف‌شده، جای بررسی انسانی کل خروجی را نمی‌گیرد.

## حدود تأیید

آزمون انسانی یکپارچه صفحه‌خوان اجرا نشده است. بررسی دستی نهایی با صفحه‌خوان و مرورگرهای هدف محصول لازم است؛ شواهد خودکار جایگزین آن نیستند. تم تیره، ماتریس واقعی مجوز، سرویس ویرایشگرها، نام قطعی انواع محتوای Office و رفتار عملیاتی انتشار/حذف همچنان تصمیم‌های محصول‌اند. این موارد مانع تکمیل کتابخانه و نمونه‌های فعلی نیستند و به‌عنوان قابلیت ساخته‌شده معرفی نشده‌اند.

## اجرای بررسی‌ها

به‌روزرسانی سایدبار: آزمون `.codex/qa-sidebar/verify.mjs` حالت کامل و آیکونی دسکتاپ، میان‌بر صفحه‌کلید، پنل RTL موبایل، محصورکردن و بازگرداندن فوکوس، بستن با Escape و دکمه، انتخاب مقصد، اسکرول مستقل و شش عرض از ۳۶۰ تا ۱۴۴۰ را بررسی می‌کند. اسکن axe در صفحه و پنل باز بدون violation بود. آزمون F نیز با ساختار جدید فهرست، ۲۲ قرارداد و ۱۱ عرض را دوباره بررسی کرد.

```powershell
npm run tokens:check
npm run lint
npm run build
npm run start -- --port 3101
$env:QA_URL = 'http://localhost:3101'
node .codex/qa-stage-c/verify.mjs
node .codex/qa-stage-d/verify.mjs
node .codex/qa-stage-e/verify.mjs
node .codex/qa-stage-f/verify.mjs
node .codex/qa-sidebar/verify.mjs
```

اسکریپت‌های مرورگر به Playwright و axe-core در پوشه موقت `clasor-design-qa` و Chrome نصب‌شده دستگاه وابسته‌اند؛ این وابستگی‌های QA وارد dependency محصول نشده‌اند. برای دستگاه دیگر مسیر runtime در اسکریپت‌های QA باید تنظیم شود. تصاویر و JSON نتایج برای بازبینی نگهداری شده‌اند.
