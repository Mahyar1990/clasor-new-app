## Publish search, section drawer and short routes — 2026/11/17

The public header opens the source's two-mode search and public/private newsletter dialogs on both landing and reading pages. Search results link to addressable public documents; applied criteria and mode own list-session resets. News Read more uses the existing dialog navigation stack. Preview sign-in replaces Login with the avatar; local session retention is an explicit demonstration flag, not service authentication.

The selected document's folder ancestors are included in breadcrumbs and emphasized in the compact outline. Optional selection reveal uses the existing cumulative loading sentinel when required and never steals keyboard focus. The shared repository layout retains expanded folders, query and scroll during document navigation. The section drawer reserves a separate column between the right repository tree and full-width paper; below md it stacks above the content. Heading links update the reading viewport and focus the corresponding heading. Close restores its trigger, or the disclosure control if the bar is collapsed.

The expanded floating action group includes public version selection, reactions/counts, downloadable attachments, short-link copy and gated panel entry. `/clasor-pages/p/[documentId]` resolves only to a currently available public document; unavailable targets show recovery. URLs are local deterministic preview paths. Panel links require the sample account's explicit repository membership and reuse the existing protected new-tab handoff; they are absent for guests and other repositories.

## Publish routes and outline navigation — 2026/11/17

The catalogue's Clasor samples include the public landing `/clasor-pages/publish` and public documentation example. Each published repository links to `/clasor-pages/publish/[repositoryId]`; each document has `/clasor-pages/publish/[repositoryId]/[documentId]`. Public pages have their own brand/home navigation, without management controls. Unavailable/private repository or document routes show a recovery link and no content fallback.

The shared OutlineNavigation exposes disclosure buttons and document links, controlled selection and expanded folders. Each growing level loads ten at a time with skeletons through shared LoadMore. Desktop sidebar and article have independent scroll areas. A shared repository layout preserves loaded items, expanded folders, applied search and sidebar scroll while document routes change. Below md the right-hand Sheet supplies navigation, traps/restores focus and dismisses after ordinary selection; the center reading region remains available. Floating menus and dialogs use the existing Base UI/portal-theme contracts. Keyboard, local dark, disabled, empty and cumulative-list states are demonstrated independently on navigation/layout.

## Version commands under Options — 2026/11/17

Open Options → Versions to choose a snapshot or activate View all versions. The independent toolbar version button is removed. Both guarded version changes and the versions dialog now restore focus to the surviving Options trigger. The far-right dock toggle moves into the compact header row. Breadcrumbs and left-side mode/save/options share one row when there is room; tools wrap below on small screens. Document text is bold and the final version includes its approval/public status in parentheses. The submenu uses Base UI radio/keyboard navigation, portal theming and collision handling; no document event listeners or extra floating controller are added.

## Right-side dock and version-menu footer — 2026/11/17

This revision retires the overlay Sheet for reader tools. Classic's tools now sit in a compact nonmodal panel on the physical right of an RTL content row. Opening it reduces the iframe width; closing restores that width. Header controls and editor stay active while it is open. At narrow widths the panel is capped at 44% of the row and continues to reserve layout space. The active panel remains mounted; the close control restores the tools toggle. History remains edit-only and falls back to Tags in preview.

Version selection is a menu radio group followed by “مشاهده همه نسخه‌ها”. That action opens the existing versions dialog and returns focus to the version trigger on close. The separate versions icon is retired. Approvals, publication and preview download share the existing options menu; an independent edit/preview Switch stays visible. The drawer toggle is at the far right. The left action group orders Save/Autosave to the right of ModeSwitch, with Options at the far left. Dirty-navigation and approval dialogs return focus to their surviving version/options trigger. Public test IDs for the version trigger, Save, Autosave and tools toggle remain; the retired separate action-button IDs are replaced with menu item IDs.

## Compact reader and optional tabbed drawer — 2026/11/17

The new-tab reader now starts in preview with a compact toolbar instead of a permanent tools sidebar. The versions trigger still opens the existing navigable versions dialog; choosing a version there stays in that same large dialog. The toolbar Select switches the iframe's active snapshot. Changing mode or selection with dirty content is guarded by a compact decision dialog. Save/discard returns focus to the initiating mode/version control; approval returns to the surviving mode control.

Classic's tools open in the existing Base UI Sheet with a horizontally scrollable, unified tab bar: history only while editing, then tags, attachments, chat, comments and questions. Closing restores the toolbar toggle; Base UI owns trap, Escape and scroll locking. History selection falls back to Tags in preview. No panel or toggle is rendered for file, Word, flowchart or Excel. Closed tools consume no editor width. Keyboard and local portal themes use the existing primitives.

The reusable toolbar has its own interactive example on `/design-system/navigation`, separate from the full workspace preview on layout/overlays. Read-only and empty-version examples make unavailable controls inspectable. The former new-tab reader's bookmark/general-options/zoom/copy controls are intentionally retired under the updated content structure; document flags and the separate version-dialog controls remain.

## Reader navigation and document toolbar — 2026/11/17

The document browser puts Create opposite its breadcrumb on the first row. Search/filter disclosure remains immediately above the results, hidden initially. Filter, Sort and Close form one adjacent action group inside that section. Closing clears search/filter and restores focus to its trigger; multi-sort and explicit selection retain their existing semantics.

Document titles are native new-tab links; folder titles stay navigation buttons. Ctrl/Cmd/middle-click preserve native behavior. A link captures the latest local preview snapshot before navigation; a failed browser-storage handoff reports an error instead of opening stale data. Titles expose active document flags and the new-tab announcement to assistive technology.

`GlassModal size="viewport"` reserves a one-rem margin on each viewport edge and gives its body a flexible editor region. `NavigableGlassModal.push` accepts an optional presentation override; Back restores the preceding size, mounted form state, list scroll and originating focus. Version view/edit uses this override; create/clone stays compact. Parent-page Escape follows Base UI's normal whole-dialog dismissal. Escape inside the editor iframe is bridged to navigation Back (version pages) or Base UI Close (direct editing), without custom document keyboard listeners.

The new iframe route sits outside the product layout to avoid recursive shells/providers. Dynamic reader parameters are awaited within a page-local Suspense boundary. A hydration placeholder precedes browser snapshot lookup, preventing an incorrect unavailable flash for a newly created document.

## Catalogue route streaming — 2026/11/16

The catalogue section route now awaits params inside a page-local Suspense boundary. This satisfies Instant Navigation with Cache Components/Partial Prefetching, while retaining static section samples, metadata and notFound validation. Shared-layout boundaries alone cannot cover a client navigation below that layout.

## Document search disclosure — 2026/11/16

Document search/filter controls start closed. The visible Search and Filter button exposes aria-expanded/aria-controls; opening focuses the search input. The revealed section is the first child of the list region, immediately followed by the table/outline scroll area. Creation, view controls, selection, sort and result summaries stay above this section rather than between it and the data.

Both the toggle and the panel's Close control remove the section, clear draft/applied search and filters, and restore focus to the toggle. Clearing on close intentionally avoids invisible active restrictions. Sorting and explicit record selection remain intact. The same browser composition is used on personal/shared documents, repository workspaces and catalogue examples.

## Repository workspace — 2026/11/16

Selecting a repository card navigates to `/clasor-pages/repositories/[repositoryId]`. The dynamic route resolves asynchronous Next params inside Suspense. It renders the repository's image, metadata and options above a shared document browser. Back returns to the corresponding repository list. Invalid/deleted/left repositories show an unavailable state; a stable page-title ref provides focus fallback after header operations remove the card.

Document pages can switch between a table and a disclosure-based outline. The outline preserves parent context for search matches and allows folders to expand/collapse; it uses native buttons rather than claiming an incomplete ARIA tree keyboard contract. Both appearances use the same record menus, selection IDs, cumulative loading and sort/filter state. Desktop list regions fill remaining shell space so repository metadata does not clip the loading sentinel on shorter viewports.

## Independent library pages and compact creation — 2026/11/16

The Clasor sidebar links to `/clasor-pages/my-documents`, `/clasor-pages/shared-documents`, `/clasor-pages/my-repositories`, `/clasor-pages/shared-repositories`, `/clasor-pages/bookmarked-repositories`, `/clasor-pages/archived-repositories` and `/clasor-pages/published-repositories`. Each is a separate route with a shared layout/store and responsive full-width product shell. The dashboard remains its own page. Mobile selection closes the sidebar sheet.

`CreationStepper compact` displays the current stage and count with a small progress track, preserves a screen-reader ordered stage list, supports Back and Cancel, and commits only at the last stage. Creation/filter dialogs capture a stable theme anchor for portals and restore focus. Source flows and local data limits are described in PATTERNS.md.

Next cacheComponents can retain old route DOM in hidden React Activity trees. Browser checks scope record/control selectors to the visible route and wait for both the destination URL and heading after navigation; hidden cached instances are not duplicate visible controls.

## Header actions - 2026/11/16

GlassModal accepts an optional `themeAnchorRef`, passed to usePortalTheme, to preserve a local theme when focus moves into a portal. Header dialogs use the persistent header group as this anchor. Standard Base UI dismissal/trapping/restoration remains responsible for modal behavior; sign-out supplies a stable fallback after removing its account trigger.

The account dropdown uses a labeled Menu.Group and the existing user name/logout structure. Header actions have accessible names, dialog expansion state, a pending-invitation indicator and consistent compact glass targets. The admin control preserves the source navigation to the original Clasor admin page in a new tab; it does not open a fabricated settings form.

## ناوبری داخلی دیالوگ — ۲۰۲۶/۱۱/۱۶

`NavigableGlassModal` قرارداد GlassModal را حفظ می‌کند. فرزندان از `useDialogNavigation()` و توابع `push(title, content, origin?)` و `back()` استفاده می‌کنند. یک پنجره Base UI باقی می‌ماند؛ صفحات قبلی پنهان ولی mounted هستند تا تب، جستجو و فرم حفظ شوند. بازگشت، اسکرول و فوکوس trigger را بازیابی می‌کند؛ برای trigger حذف‌شده عنوان مقصد فوکوس می‌گیرد. Escape و بستن کل پنجره را می‌بندند؛ بازگشت فقط یک سطح را برمی‌گرداند. Base UI مالک focus trap، dismissal و scroll lock باقی می‌ماند.

`GlassModal.onBack` دکمه بازگشت با نام قابل دسترس دارد. `GlassOptionsMenu.onAction(id, label, trigger)` trigger پایدار ردیف را نیز می‌دهد. منوهای داخل GlassModal با زمینه ModalLayerContext، مانند Select در `--z-dialog + 2` قرار دارند تا فوتر روی گزینه‌ها نیفتد؛ منوی صفحه بیرون دیالوگ در --z-menu باقی می‌ماند؛ تم محلی portal حفظ می‌شود.

نمونه مستقل ناوبری، UploadProgress، PathPicker و محتوای زیر گزینه فعال RadioField در صفحات پوشش‌ها و چیدمان کاتالوگ از app/page.tsx و منوی دیزاین سیستم در دسترس است. عملیات اعضا، گروه‌ها، کلیدها، درخواست‌ها و نسخه‌های داشبورد همین الگو را مصرف می‌کنند.


## ناوبری و Overlay جاری — ۲۰۲۶/۱۱/۱۴

مرجع اجرا: [GlassSidebar](../../components/ui/GlassSidebar.tsx)، [GlassDropdown](../../components/ui/GlassDropdown.tsx)، [GlassModal](../../components/ui/GlassModal.tsx) و ورودی‌های عمومی `sidebar.tsx`، `dropdown-menu.tsx` و `toast.tsx`.

Hover لینک و آیتم منو white/20، blur و border-white/30 دارد؛ Active برابر white/30 با سایه است. حاشیه از ابتدا رزرو می‌شود تا اندازه تغییر نکند. محتوای Modal/Dropdown شیشه‌ای است و بک‌دراپ Modal مشکی نیمه‌شفاف و محو می‌ماند. ترتیب لایه‌ها بر پایهٔ متغیرهای z-index است؛ Popup منو بالاتر از پنل و هدر قرار می‌گیرد؛ پنجره‌ای که از گزینهٔ منو باز می‌شود، لایهٔ بالاتری دارد.

مدیریت فوکوس، Escape، کلیک بیرون، انتخاب با صفحه‌کلید و scroll lock متعلق به Base UI است. [usePortalTheme](../../hooks/use-portal-theme.ts) تم محلی و [withTestId](test-id.ts) شناسهٔ عمومی عنصر render را حفظ می‌کند. به جای کپی markup قدیمی، همین primitiveها را ترکیب کنید.

## تب‌بار مشترک شیشه‌ای — یک ظاهر

در تم تاریک، تب فعال و مسیر انتخاب‌شده با حاشیهٔ رنگ تم مشخص‌اند. در حالت بدون شفافیت و رنگ‌های اجباری، حاشیهٔ انتخاب باقی می‌ماند و حلقهٔ فوکوس نشانه‌ای مستقل است. پیوندهای مسیر زیرخط دارند؛ موقعیت جاری متن است، نه پیوند غیرفعال. پیش‌نمایش مسیر و صفحه‌بندی در کاتالوگ هر دو تم و مرزهای غیرفعال را نشان می‌دهد.

در `glass.tab` فقط رنگ زمینهٔ تب طی ۱۲۰ میلی‌ثانیه گذار دارد. حاشیه، سایه، محوشدگی و فوکوس بی‌درنگ تغییر می‌کنند؛ نه نشانگر می‌لغزد و نه محتوای پنل انیمیت می‌شود. در حالت کاهش حرکت و رنگ‌های اجباری گذار حذف می‌شود.

`ClasorTabs` و پایه‌های `TabsList`/`TabsTrigger` فقط یک ظاهر دارند: همان «تب‌های پیش‌فرض؛ سطح و انتخاب شیشه‌ای» انتخاب‌شده توسط مالک پروژه. ریل با tint/30% و blur/12px، حاشیهٔ سفید، شعاع ۱۲px و فاصلهٔ داخلی ۳px است. تب فعال زمینهٔ white/40، حاشیهٔ white/70 و سایهٔ برجستهٔ ملایم دارد؛ در تم تاریک زمینهٔ فعال white/15 است. قراردادهای `glass.tabsList` و `glass.tab` مالک مشترک هندسه و حالت‌ها هستند. گونه‌های line/segmented و قراردادهای نوری اختصاصی آن‌ها حذف شده‌اند؛ underline و گرادیان تزئینی جداگانه وجود ندارد.

API انتخاب کنترل‌شده/کنترل‌نشده، تب غیرفعال، `testIds` و ارتباط semantic تب/پنل حفظ شده است. `variant` دیگر جزو API نیست؛ نام عمومی `tabsListVariants` برای سازگاری import باقی مانده و فقط کلاس‌های همان یک ظاهر را می‌دهد. Base UI مسئول RTL، جهت‌ها، Home/End، انتخاب با فوکوس و دیده‌شدن تب انتخاب‌شده در نوار قابل پیمایش است. در حالت solid، انتخاب با سطح مات و حاشیه/متن اصلی متمایز است؛ forced colors انتخاب را با outline سیستم مشخص می‌کند و کاهش حرکت transition را متوقف می‌کند.

صفحهٔ ناوبری فقط یک نمونهٔ تب‌بار دارد؛ روشن/تاریک، عنوان بلند و غیرفعال‌بودن تب آخر در همان نمونه آزمایش می‌شوند. نمونهٔ تب در بخش مسیر/صفحه‌بندی و نمونه‌های مجزای بخش‌بندی‌شده/عنوان بلند حذف شدند. داشبورد، اشتراک مخزن، درخواست‌های مخزن و فعالیت‌های سند مستقیماً همین ترکیب را مصرف می‌کنند. `DashboardTabs` فقط چیدمان پنل، شناسه‌های عمومی و ارتفاع جمع‌وجور ۳۲px دسکتاپ را حفظ می‌کند؛ padding، سطح و سایه را تغییر نمی‌دهد. ارتفاع هدف موبایل ۴۴px باقی است. مصرف‌کنندگان workspace/wireframes نیز ظاهر پیش‌فرض مشترک را دریافت می‌کنند.

پیشنهاد قبلی تب بخش‌بندی‌شده در specs تاریخچهٔ تصمیم است و مجوز بازگرداندن ظاهر بازنشسته محسوب نمی‌شود.

## منوی گزینه‌های سند و مخزن

[GlassOptionsMenu](../../components/ui/GlassOptionsMenu.tsx) ترکیب عمومی Base UI برای منوهای چندسطحی است. `items` شامل شناسه، عنوان، آیکون، children، disabled، description، destructive و separatorBefore است؛ دادهٔ دامنه در کامپوننت عمومی قرار ندارد. عنوان رکورد و نوع آن در سربرگ شیشه‌ای می‌آیند. `withTestId` شناسهٔ trigger را حفظ می‌کند و `usePortalTheme` تم محلی را به Popup و زیرمنو منتقل می‌کند. قراردادهای `optionsPopup`، `optionsHeader` و `optionItem` در `classes.ts` مالک هندسه‌اند و متریال با `surface="liquid"` از `glass.liquidFloating` می‌آید: بازتاب مورب ثابت، لبهٔ داخلی روشن، سایه‌های داخلی آبی/بنفش و اشباع پس‌زمینه؛ برای دیده‌شدن محتوای پشت منو، tint روشن ۱۵٪ است و blur برای مهار جزئیات نوشته‌های پشت به ۱۰px تنظیم شده است؛ حالت تاریک برای خوانایی نوشتهٔ روشن از slate با ۶۵٪ استفاده می‌کند. بازتاب مورب کم‌رنگ است؛ `optionLabel` زیر نوشته‌های با وزن متوسط، لایهٔ سفید ۲۰٪ (در حالت تاریک slate با ۲۵٪) می‌گذارد تا تداخل متن پس‌زمینه کمتر شود. گزینهٔ زمینهٔ پرنوشته در کاتالوگ برای بررسی خوانایی در هر دو تم اضافه شده است. سطوح ساده‌تر همچنان پیش‌فرض `frosted` هستند.

گزینه‌های داشبورد بر اساس رابط کلاسور و کد عمومی آن تنظیم شده‌اند. سند زیرمنوهای ویرایش، محدودیت انتشار و فعالیت دارد؛ مخزن برای مالک، مدیر و عضو گزینه‌های متفاوت دارد و گزینهٔ مخزن منتشرشده مشروط است. این‌ها fixture نمایشی‌اند و مدل مجوز سرویس نیستند. سه‌نقطهٔ مخزن یک کنترل مستقل از دکمهٔ بازکردن مخزن است؛ دکمه‌ها تو در تو نیستند و فاصلهٔ ۱۶px از لبه حفظ شده است.

منوی بازشده داخل portal است و توسط فهرست اسکرول قطع نمی‌شود. Base UI ناوبری صفحه‌کلید، بازکردن زیرمنو، برخورد با لبهٔ صفحه، Escape، بستن بیرون و بازگرداندن فوکوس را مدیریت می‌کند. گزینه‌های غیرفعال قابل اجرا نیستند؛ انتخاب‌های فعال در پیش‌نمایش محلی نمایش داده می‌شوند و هیچ درخواست یا تغییری در حساب اصلی صورت نمی‌گیرد.

منو و زیرمنوها از قرارداد جمع‌وجور یکسان با عرض ۲۰۸px برای منوی اصلی و ۱۶۰px برای زیرمنو، متن ۱۱px، ردیف حداقل ۲۸px دسکتاپ و ۳۶px موبایل و قاب آیکون ۲۰px استفاده می‌کنند. سربرگ و آیکون آن نیز کوچک شده‌اند؛ بزرگ‌نمایی مرورگر یا transform برای کوچک‌سازی استفاده نمی‌شود.

نمونه‌های سند شخصی/اشتراکی، مخزن مالک/عضو، گزینهٔ حساس، زیرمنو و تم تاریک از طریق `GlassOptionsCatalogue` در `/design-system/overlays` و `/design-system/layout` قابل مشاهده‌اند. تمام همین اجزا در داشبورد مصرف می‌شوند.

## دیالوگ‌های گزینه‌های مخزن — ۲۰۲۶/۱۱/۱۶

دیالوگ‌های مخزن مستقیماً از عملیات هر ردیف در `/clasor-pages/dashboard` باز می‌شوند. منوی جداگانه حذف شده و نشانی قدیمی `/clasor-pages/repository-options` به داشبورد هدایت می‌شود. نمونه‌های مستقل صرفاً داخل کاتالوگ دیزاین سیستم باقی مانده‌اند. دیالوگ ویرایش کلاسور به‌صورت خواندنی مشاهده شد؛ ساختار بقیهٔ جریان‌ها با کد عمومی رابط موجود کلاسور تطبیق داده شد. نمونه‌ها شامل ویرایش عنوان/توضیح/تصویر، اشتراک‌گذاری اعضا و گروه‌ها، لینک با نقش/رمز/انقضا، انتشار، اعلانات، مدیریت فایل و کلید، صف‌های تأیید، نشان‌کردن، بایگانی/بازگردانی، ترک و حذف با ورود نام دقیق هستند. در کاتالوگ، نقش نمایشی مالک/مدیر/ویرایشگر قابل انتخاب است. این محدودیت‌های نمایشی جایگزین مجوز سمت سرور نیستند.

[GlassModal](../../components/ui/GlassModal.tsx) اکنون `size="sm|md|lg"`، `compact`، `surface="liquid"`، `icon`، `footer` و `finalFocus` می‌پذیرد. پیش‌فرض‌ها برای مصرف‌کنندگان قبلی حفظ شده‌اند. سطح liquid همان متریال منو با بک‌دراپ روشن‌تر است؛ حالت compact کنترل‌ها/عنوان‌ها را کوچک می‌کند و ارتفاع را به ۴۶rem یا فضای viewport محدود می‌کند. سربرگ و فوتر ثابت و بدنه مستقل پیمایش می‌شود. هندسهٔ fixed بعد از کلاس متریال اعمال می‌شود تا relative سطح liquid جای آن را نگیرد. Base UI مهار فوکوس، Escape، اسکرول لاک و بازگشت به دکمهٔ مبدأ، از جمله منوی گزینه‌ها، را مدیریت می‌کند.

[DialogSection](../../components/ui/DialogSection.tsx) بخش نام‌دار فرم با عنوان، شرح و سطح مشترک `glass.dialogSection` است. [CopyField](../../components/ui/CopyField.tsx) مقدار فقط‌خواندنی LTR، دکمهٔ کپی، بازخورد status و نمایش/پنهان‌سازی مقدار حساس دارد؛ اگر clipboard در دسترس نباشد، متن را برای کپی دستی انتخاب می‌کند. کنترل‌های فرم، Select، سوئیچ، ورودی فایل و تب‌بار موجود دوباره استفاده شده‌اند. دسترسی عضو/گروه قابل تغییر یا حذف با تأیید مستقل است؛ نقش مالک ثابت می‌ماند. تأییدهای حساس داخل دیالوگ از `DestructiveDialog` با همان سطح liquid جمع‌وجور استفاده می‌کنند. portal مربوط به AlertDialog تم محلی را حفظ می‌کند و backdrop/popup تأیید با لایه‌های dialog+2/dialog+3 بالاتر از پنجرهٔ والد قرار می‌گیرند. نمونهٔ همهٔ این اجزا در `RepositoryDialogsCatalogue` از مسیرهای `/design-system/overlays` و `/design-system/layout` در دسترس است؛ بخش layout تم محلی تاریک را هم منتقل می‌کند.

تمام تغییرات در حافظهٔ همین صفحه‌اند و با بازنشانی یا بارگذاری مجدد از بین می‌روند. بارگذاری فایل فقط metadata محلی می‌سازد، کلیدها DEMO هستند، لینک‌ها به example.com تعلق دارند و بازکردن «مخزن منتشرشده» صرفاً نشانی نمونه را نشان می‌دهد؛ این مورد در محصول اصلی لینک صفحه است. هیچ API، احراز هویت، رمزنگاری، ذخیره‌سازی یا انتشار واقعی افزوده نشده است. اطلاعات مخزن نیز در این صفحه به‌صورت دیالوگ نمونه نمایش داده می‌شود. پیش‌نمایش عمومی و بدون فرم حذف شده است؛ منوهای داشبورد و نمونه‌های کاتالوگ همان دیالوگ‌های واقعی محلی را باز می‌کنند.

فهرست‌های اعضا، فایل‌ها، کلیدها و درخواست‌ها از `PreviewList`، helper تجمعی و `LoadMore` مشترک استفاده می‌کنند: ۱۰ ردیف نخست، افزودن خودکار در انتهای قابل مشاهده، skeleton با تأخیر نمونهٔ ۶۰۰ms و حفظ ردیف‌ها؛ جستجو با remount شمارش را بازنشانی و بارگذاری معلق را لغو می‌کند. فهرست‌های کوتاه کنترل اضافه ندارند.

شواهد تاریخی پیاده‌سازی اولیه در ۲۰۲۶/۱۱/۱۶، روی working tree برنچ `feat/repository-options-dialogs` بر پایهٔ `1f275bc`: کنترل ساختاری ۱۴۹ فایل React، lint، TypeScript، لینک‌های مستندات و ایندکس مشخصات پاس شدند؛ ۲۳ تست منطق workspace پاس شد. بررسی Chrome شامل باز/بسته‌شدن ۱۳ دیالوگ، بازگشت فوکوس از منو و دکمه، ویرایش، لینک، کلید حساس، افزودن فایل و بارگذاری تجمعی، تصمیم درخواست، بایگانی/بازگردانی، نام دقیق حذف، تغییر/حذف دسترسی و تأیید تو در تو بود. عرض‌های ۳۲۰ و ۳۹۰px، portal تاریک محلی، حالت solid، forced colors و reduced motion بررسی شدند. build تولید در پردازش CSS با خطای شناخته‌شدهٔ مجوز پورت داخلی Turbopack متوقف شد؛ اجرای دوباره با دسترسی گسترده همان نتیجه را داشت. پذیرش انسانی صفحه‌خوان و کنتراست ادعا نمی‌شود.

## تکمیل لایه‌ها و ناوبری — ۲۰۲۶/۱۱/۱۶

Dialog، Sheet و Tooltip عمومی نیز `usePortalTheme` دارند. Contentهای Dialog/AlertDialog/Sheet یک `themeAnchorRef` اختیاری می‌گیرند؛ ترکیب‌های تأیید و DetailsSheet مرجع trigger پایدار را تأمین می‌کنند تا انتقال فوکوس هنگام بازشدن، تم مبدأ را از بین نبرد. `TooltipContent` یک `themeAnchorRef` اختیاری می‌گیرد و `HelpTooltip` آن را از trigger تأمین می‌کند؛ به این ترتیب بازشدن با hover هم تم محلی را حفظ می‌کند. observer صرفاً تغییر کلاس تم را دنبال می‌کند و جایگزین رویدادها یا رفتار Base UI نیست. سطح شناور تاریک ۶۵٪ slate دارد تا روی صفحه روشن خوانا بماند. Toast با قرارداد رنگ معنایی بعد از سطح پایه ترکیب می‌شود؛ Tooltip از سطح شناور مشترک استفاده می‌کند. نمونه مستقل هر مورد با toggle تاریک در بالای بخش «لایه و پیام» آمده است.

این مرحله در ابتدا سه گونهٔ تب داشت؛ طبق تصمیم بعدی مالک پروژه، اکنون تنها ظاهر پیش‌فرض شیشه‌ایِ بخش «تب‌بار مشترک» معتبر است. رفتار صفحه‌کلید و انتخاب حفظ شده‌اند.

## اتصال عملیات داشبورد و دیالوگ‌های سند — ۲۰۲۶/۱۱/۱۶

`ClasorDashboardRepositories` و `ClasorDashboardDocuments` وضعیت هر رکورد را با شناسهٔ پایدار نگهداری می‌کنند. جابه‌جایی میان تب‌ها یا باز/بسته‌کردن پنجره، ویرایش‌ها را از بین نمی‌برد و داده‌های دو رکورد به هم منتقل نمی‌شوند. تغییر نام، متن، نشان، دسترسی، تگ و فعالیت در همان نمونه بازتاب دارد. حذف سند یا حذف/بایگانی/ترک مخزن، ردیف مربوط را از فهرست فعال برمی‌دارد. لغو فرم‌های دارای فوتر تغییرات ذخیره‌نشده را کنار می‌گذارد؛ فرم‌های داخلیِ دسترسی و فعالیت با دکمهٔ خودشان اعمال می‌شوند و فوتر «بستن» دارند.

فوکوس پس از بستن به دکمهٔ عملیات همان ردیف برمی‌گردد. پیش از تأیید عملیاتی که ردیف/کنترل را حذف یا غیرفعال می‌کند، دیالوگ مقصد جایگزین پایدار را انتخاب می‌کند؛ در داشبورد عنوان پنل و در کاتالوگ دکمهٔ بازنشانی مقصد است. این انتخاب پیش از حذف DOM انجام می‌شود تا بازگشت فوکوس به trigger جداشده وابسته نباشد. Base UI همچنان مدیریت trapping، Escape، dismissal و scroll lock را انجام می‌دهد.

دیالوگ‌های سند شامل ویرایش نام/اولویت/توضیح، ویرایش متن ساده، تگ‌ها، انتقال به دسته، نسخه‌ها و پیش‌نمایش محتوای هر نسخه، عمومی‌سازی آخرین نسخه، دسترسی مستقیم، نظرات/پرسش‌ها و تأیید نشان/حذف هستند. ساختار فرم‌ها با کد عمومی رابط مشاهده‌شدهٔ کلاسور تطبیق داده شده است. ویرایشگر کامل سرویس در این نمونه به ویرایش متن ساده و نمای نسخه‌ها به یک دیالوگ محلی تبدیل شده؛ اتصال به سرویس یا ویرایشگر غنی محصول ادعا نمی‌شود. عمومی‌سازی نسخه وضعیت تأیید آن را تغییر نمی‌دهد؛ دسترسی مستقیم، محدودیت مخاطب انتشار و مسدودکردن در پنل مستقل‌اند.

مطابق منبع، کنترل‌های محدودیت دسترسی پنل، ایجاد لینک و محدودیت‌های انتشار در زمینهٔ داشبورد غیرفعال می‌مانند. `documentOptions` یک وضعیت اختیاری برای عنوان نشان/مخفی‌بودن، وجود رمز/لینک و زمینهٔ انتشار می‌گیرد؛ نمونهٔ «داخل مخزن · مالک» در کاتالوگ، دیالوگ‌های این گزینه‌ها را هم نشان می‌دهد: لینک با انقضای اختیاری، کپی/حذف لینک، رمز/حذف رمز، لیست سفید/سیاه و محدودیت پنل. این fixtureها مجوز واقعی نیستند.

`DocumentDialogsCatalogue` در بخش‌های overlays/layout و `TagPickerCatalogue` در inputs قرار دارند. نمونه‌های منوی قدیمی نیز از `GlassRecordMenuExample` و همان دیالوگ‌ها استفاده می‌کنند؛ متن placeholder عمومی حذف شده است. `PreviewList` برای فهرست‌های مخزن و سند مشترک و generic شده، ولی barrel قدیمی مخزن حفظ شده است. فعالیت و دسترسی‌های رو به رشد همان قرارداد تجمعی ۱۰تایی/۶۰۰ms را مصرف می‌کنند. همهٔ لینک‌ها example.com و همهٔ عملیات در حافظهٔ نمونه‌اند؛ حساب کلاسور تغییری نمی‌کند.

## تاریخچهٔ مرحله D

# مرحله D — ناوبری، بازخورد و لایه‌ها

به‌روزرسانی Toast — ۲۰۲۶/۱۰/۲۴: جزء رسمی [shadcn Base UI Toast](https://ui.shadcn.com/docs/components/base/toast) با CLI رجیستری نصب و در `components/ui/toast.tsx` با رنگ‌ها و RTL کلاسور تطبیق داده شد. `Toaster` یک بار در layout قرار دارد؛ کاتالوگ از `toast.add` استفاده می‌کند. پنج نمونه Default، Success، Info، Warning و Error در بخش «لایه و پیام» عنوان و شرح مستقل دارند. Default خنثی است و چهار حالت دیگر آیکون و رنگ معنایی مستقل دارند. بستن با برچسب فارسی، timeout=6500، priority=low و limit=3 حفظ شدند. API قبلی status-toast برای سازگاری به همین manager متصل است و کاتالوگ provider جداگانه نمی‌سازد.

```tsx
import { toast } from "@/components/ui/toast"

toast.add({
  title: "عملیات نمونه موفق بود",
  description: "این پیام صرفاً نمایشی است.",
  type: "success", // info | warning | error؛ نبود type یعنی Default
  priority: "low",
})
```

بررسی `.codex/qa-toast/verify.mjs` هر پنج حالت را از نظر عنوان/شرح، آیکون، رنگ مستقل، RTL، دکمه بستن و axe بررسی می‌کند؛ همچنین میزبان واحد، بستن خودکار، نمایش چند پیام، عرض موبایل و کاهش حرکت را کنترل می‌کند. نتایج و تصاویر در همان پوشه‌اند.

خروجی: ClasorTabs، ClasorBreadcrumb، ClasorPagination، Feedback، SystemState، ProgressIndicator/LoadingSkeleton، RowActionMenu، ConfirmationDialog/DestructiveDialog، DetailsSheet، HelpTooltip و StatusToastProvider/useStatusToast. اجزای قابل استفاده مجدد همگی در `components/ui` هستند. نمونه‌های مستقل در NavigationCatalogue قرار دارند؛ نمونه‌های موفقیت، حذف، بازیابی و صفحه‌بندی، داده واقعی را تغییر نمی‌دهند.

پایه‌های Tabs، Breadcrumb، Pagination، Alert، Skeleton، DropdownMenu، Dialog، AlertDialog، Sheet، Tooltip و Toast از رجیستری shadcn با سبک Base UI نصب شدند. به Sonner یا next-themes نیاز نیست. زمان‌بندی و پاک‌سازی Toast توسط primitive مدیریت می‌شود؛ بستن دستی نیز ممکن است.

| جزء | قرارداد مصرف و رفتار |
| --- | --- |
| ClasorTabs | label، items(value/label/content)، value/defaultValue و onValueChange؛ یک توقف Tab، فعال‌سازی خودکار با جهت‌ها، Home/End؛ Left در RTL به بعدی می‌رود |
| ClasorBreadcrumb | items(id/label/href)؛ آخرین بخش aria-current=page دارد؛ مسیر می‌شکند و chevron جهت‌دار آینه می‌شود |
| ClasorPagination | page/pageCount/onPageChange؛ شماره ۱ مبنا، مرزها disabled، صفحات زیاد خلاصه می‌شوند؛ داده را مصرف‌کننده تغییر می‌دهد |
| Feedback | tone، title، description، dataRetained?، action?؛ چهار سه‌تایی رنگ معنایی، متن و آیکون؛ role=status |
| SystemState | مدل جداگانه empty/permission-denied/partial-success/service-error؛ در موفقیت ناقص نام مورد ساخته‌شده و مرحله ناتمام حفظ می‌شود؛ onRecovery اختیاری |
| ProgressIndicator | label/value/max و animate اختیاری؛ progress بومی و درصد فوری؛ فقط پُری نوار گذار دارد و timer داخلی ندارد. LoadingSkeleton ثابت است و تزئینات را از دسترس‌پذیری حذف می‌کند. |
| RowActionMenu | rowLabel/items، open/defaultOpen/onOpenChange؛ نام trigger شامل زمینه ردیف، کلیدهای جهت و Escape، بازگشت فوکوس؛ علت گزینه غیرفعال همیشه خارج منو دیده می‌شود |
| ConfirmationDialog / DestructiveDialog | trigger، title، description، targetName، confirmLabel، onConfirm؛ open/defaultOpen/onOpenChange، loading/error، fallbackFocusRef اختیاری؛ Promise ناموفق لایه را باز نگه می‌دارد و خطا را نمایش می‌دهد |
| DetailsSheet | trigger/title/description/children و وضعیت بازبودن؛ width=400، سقف viewport و ارتفاع 100dvh؛ inline-end در RTL سمت چپ است |
| HelpTooltip | content و فرزند دارای نام قابل دسترس؛ focus/hover و Escape؛ فقط توضیح مکمل |
| Toast | Toaster مشترک در layout؛ toast.add({title,description,type,timeout,actionProps}) و toast.close(id)؛ پنج حالت، اعلان polite، بستن فارسی و محدودیت سه پیام |

لایه‌ها در portal دارای `dir=rtl` هستند. dialog/Sheet modal هستند؛ تمرکز محصور و اسکرول بدنه قفل می‌شود. Escape، دکمه بستن و backdrop در حالت idle دیالوگ عادی/Sheet را می‌بندند. AlertDialog با کلیک backdrop بسته نمی‌شود و تمرکز اولیه روی انصراف است. هنگام Promise در انتظار، بستن/لغو و تأیید دوباره مسدود است؛ متن دکمه باقی می‌ماند. پس از موفقیت لایه بسته می‌شود. در صورت حذف trigger، مصرف‌کننده باید fallbackFocusRef به یک مقصد پایدار بدهد؛ نام نقش جایگزین مجوز واقعی نیست.

z-indexهای dialog/menu/toast و backdrop از مبانی مصرف می‌شوند؛ Sheet چپ بدون آینه‌کردن دوباره مسیر حرکت بسته می‌شود. متن‌های طولانی می‌شکنند و خود لایه حداکثر ارتفاع و اسکرول مستقل دارد. کم‌شدن حرکت از قاعده سراسری تبعیت می‌کند.

بررسی این مرحله: TypeScript/build، lint و آزمون مرورگر تب RTL و Home/End، مرز صفحه‌بندی، مهار فوکوس دیالوگ، تمرکز امن مخرب، بازگشت فوکوس، Sheet دسکتاپ/موبایل، منو، Toast و Tooltip. شواهد در `.codex/qa-stage-d` ثبت می‌شوند. بررسی یکپارچه صفحه‌خوان انسانی در این مرحله انجام نشده است.

انتخابگر Select در portal یک لایه بالاتر از Dialog قرار می‌گیرد (--z-dialog + 2) تا گزینه‌های داخل فرم modal زیر backdrop پنهان نشوند. Popup داخلی در همان stacking context باقی می‌ماند.
## Catalogue page headings

The Accessibility catalogue links directly to live focus, contrast, reduced-motion, and solid-material exercises. Each exercise gives a procedure and an expected result in light and dark. Use the header theme and material preferences; use the device setting for reduced motion. The guide is not a report of completed manual testing or accessibility certification.

Each catalogue route has one page-level heading. Colors keeps its hero heading; the other sections use the shared header's route title. Embedded editor, reading and repository examples use subordinate headings and retain their test IDs and focus targets. `ReadingSurface` defaults to an `h1` for standalone use; `titleAs` sets the heading level for an embedded surface. The publication catalogue preserves its six-level outline data independently of the surrounding page's semantic heading levels.

## Feedback and recovery in both themes

Current account access and shared appearance are documented in [Clasor account appearance](CONTROLS.md#clasor-account-appearance). Publish sidebar close/reopen placement and its focus behavior are covered in [motion](MOTION.md). The account and publish tools catalogue examples provide local previews of the same interactions.

Empty states stay neutral; permission limits use info, partial success uses warning, and service errors use danger. Titles and descriptions state what happened regardless of color. Recovery controls wrap on narrow screens and the catalogue announces the result of each demo action. Determinate progress uses a matte track and a theme-specific fill; the semantic value, RTL direction and opacity-independent skeleton behavior remain unchanged.

## Theme ownership in overlay previews

The shared preview frame and the record-options preview pass their theme through React context, including across body-mounted portals. Menu, submenu, Select, tooltip, dialog and sheet in these scopes do not derive dark mode from current focus. Outside an explicit scope, existing anchor and focus fallbacks remain available. `addToastFrom(element, options)` captures the source theme for an individual toast; the shared viewport no longer changes with focus. The overlays catalogue includes a dialog with a Select, a nested menu, and a tooltip; sending an announcement from the submenu preserves the existing modal-layer rules.

## Handoff preview coverage

Each of the 22 handoff contracts links to a live sample anchor. The handoff distinguishes a local theme toggle from the shared catalogue theme control. Coverage means the example can be opened in both themes; it does not record manual contrast, keyboard, or screen-reader acceptance.
