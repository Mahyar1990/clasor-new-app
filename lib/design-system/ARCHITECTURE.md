## معماری جاری — ۲۰۲۶/۱۱/۱۴

مرجع بازیابی: [docs/RAG.md](../../docs/RAG.md). مالک ظاهر مشترک [classes.ts](classes.ts) و [MATERIALS.md](MATERIALS.md) است.

- تمام primitiveها و ترکیب‌های مستقل از محصول در `components/ui` هستند؛ قاب و دادهٔ نمونه در `components/design-system` و جریان محصول در `components/workspace` می‌ماند.
- `AppLayout` یک Template است؛ Header/Sidebar/Modal/Table/Form ترکیب‌های بالاتر و `GlassCard` سطح معنایی مشترک‌اند. اتم‌های Button/Input/Select از خانوادهٔ shadcn Base UI استفاده می‌کنند.
- `sidebar.tsx`، `dropdown-menu.tsx`، `field.tsx` و `toast.tsx` ورودی عمومی پایدارند؛ پیاده‌سازی به `*-part-*` تقسیم شده است. فایل‌های React، با احتساب خطوط خالی و توضیح، حداکثر ۲۰۰ خط‌اند.
- `tokens.json` منبع تولید CSS و `theme.css` فقط مالک متغیرهاست. قواعد ظاهری به قرارداد Tailwind در `classes.ts` منتقل شده‌اند؛ هندسهٔ کاتالوگ در `components/design-system/catalogue-layout.ts` است. CSS هندسهٔ مسیرها در layer components قرار دارد؛ override سراسری متریال نداریم.
- شناسهٔ تست کانتینرها و کنترل‌ها صریح است؛ `withTestId` تعارض شناسه در Base UI render را رفع و `usePortalTheme` تم محلی Portal را حفظ می‌کند.
- کتابخانهٔ HTML مستقل و NativeSelect بازنشسته‌اند؛ Main Wrapperها شیشه‌ای‌اند. نام عمومی SolidForm/SolidDataTable به معنی قاب سفید و مات نیست.

## تاریخچهٔ معماری پیش از Master Refactor

متن زیر برای تصمیم‌های قبلی حفظ شده است؛ مقادیر ظاهری یا مسیرهای ناسازگار آن قرارداد جاری نیستند.

# قرارداد مرحله A — کتابخانه UI کلاسور

تاریخ: ۲۰۲۶/۱۰/۲۳. وضعیت: مراحل A تا F تکمیل؛ [گزارش نهایی و حدود تأیید](VALIDATION.md). قرارداد اولیه زیر همراه تصمیم‌های اجرا در FOUNDATIONS، CONTROLS، NAVIGATION و PATTERNS نگهداری شده است.

## نتیجه بررسی کد موجود

صفحه `app/page.tsx` سه بخش رنگ، تایپوگرافی و هندسه را با state محلی، کپی رنگ و فونت محلی نمایش می‌دهد. این صفحه قالب اولیه Next.js نیست؛ گزارش قبلی DESIGN_STEPS درباره آن قدیمی است. اجزای نمونه هنوز داخل صفحه‌اند و از کتابخانه shadcn استفاده نمی‌کنند. `components/ui/button.tsx` تنها جزء مستقل موجود است و باید با توکن‌ها، اندازه‌ها و RTL کلاسور تطبیق یابد.

تنظیم shadcn از نوع `base-nova` و خانواده Base UI است. MCP فهرست رجیستری را بررسی کرد: Field، Native Select، Direction، Checkbox، Radio Group، Switch، Badge، Avatar، Tabs، Breadcrumb، Pagination، Table، Dropdown Menu، Alert، Empty، Skeleton، Dialog، AlertDialog، Sheet و Tooltip موجودند. نصب همه در این مرحله لازم نیست؛ هرکدام هنگام پیاده‌سازی همان مرحله افزوده می‌شوند.

## محل نگهداری و وابستگی‌ها

مطابق درخواست کاربر، **تمام اجزای قابل استفاده مجدد، شامل ترکیب‌های کلاسور، داخل `components/ui` هستند**. پیشنهاد قبلی `components/clasor` کنار گذاشته می‌شود. فایل‌های پایه نام shadcn را حفظ می‌کنند؛ ترکیب‌ها نام مستقل دارند و پایه‌ها را import می‌کنند. برای مثال `text-field.tsx` از `field.tsx` و `input.tsx` استفاده می‌کند. وابستگی معکوس از پایه به ترکیب یا کاتالوگ مجاز نیست.

- `components/ui`: پایه‌های shadcn و ترکیب‌های مستقل از داده نمونه.
- `components/design-system`: فقط قاب نمونه، سوییچ تراکم، کپی رنگ و مستندات کاتالوگ؛ جزء محصولی در آن تعریف نمی‌شود.
- `lib/design-system/models.ts`: مدل‌های نمایشی مستقل از React و سرویس.
- `lib/design-system/tokens.json`: منبع اصلی توکن؛ خروجی CSS قابل مصرف در مرحله B در `lib/design-system/tokens.css` تولید می‌شود. کپی موجود `app/design-assets/tokens.json` در همان مرحله با منبع اصلی یکپارچه می‌شود.
- `app/design-assets/IRANYekan*.ttf`: محل فعلی و منتخب فونت ۴۰۰/۵۰۰/۷۰۰؛ در B بارگذاری به layout منتقل می‌شود و مجوز دارایی حفظ می‌گردد.

هیچ وابستگی جدیدی در A اضافه نمی‌شود. کتابخانه فرم یا موتور جدول فعلاً لازم نیست. تم روشن، داده ساختگی محلی و عدم اتصال سرویس دامنه این برنامه‌اند.

## قواعد مشترک props

قرارداد پایه‌های shadcn/Base UI حفظ می‌شود؛ wrapperها قابلیت‌های لازم HTML مانند `name`، `required`، `readOnly`، `id` و `aria-*` را عبور می‌دهند. props پیشنهادی زیر قرارداد ترکیب‌اند، نه ادعای پیاده‌سازی فعلی.

- مقداردهی دوگانه فقط برای ورودی‌ها، انتخاب‌ها، Tabs و لایه‌های باز/بسته: یکی از `value/defaultValue` یا `checked/defaultChecked` یا `open/defaultOpen`؛ تغییر با callback متناظر. این دو شیوه هم‌زمان استفاده نمی‌شوند. امضای callback پایه بازنویسی نمی‌شود؛ wrapper مقدارمحور نام صریح `onValueChange` دارد.
- فیلد ترکیبی: `id?`, `label`, `description?`, `error?`, `required?`, `disabled?`, `disabledReason?`. در نبود id از `useId` استفاده می‌شود؛ کمک و خطا شناسه جدا دارند و در `aria-describedby` با شناسه‌های مصرف‌کننده ادغام می‌شوند. وجود خطا `aria-invalid` را فعال می‌کند. علت محدودیت کنار کنترل می‌ماند.
- `loading` فقط برای اقدام یا بارگذاری واقعی نمونه است؛ مقدار متنی وضعیت و برچسب دکمه حفظ می‌شود، `aria-busy` اعمال و اجرای تکراری مسدود می‌شود. این prop به تمام اجزا تحمیل نمی‌شود.
- `Availability` در models قرارداد ترکیب‌های دارای محدودیت است؛ primitiveهای shadcn API اصلی خود را حفظ می‌کنند. متن علت غیرخالی باید در مصرف‌کننده تأمین شود.
- callbackها متعلق به مرز کلاینت‌اند؛ از Server Component به Client Component تابع معمولی ارسال نمی‌شود. داده اولیه قابل سریال‌سازی است و handler در نمونه کلاینت تعریف می‌شود.

## پوشش ۲۲ قرارداد

مالک تمام ردیف‌ها کتابخانه `components/ui` است. مسیرها نسبت به همین پوشه‌اند. گونه‌ها، حالت‌ها، قواعد و `auditIssueRefs` هر ردیف **عیناً از شیء با همان id در `lib/design-system/components.json` لازم‌الاجرا هستند**؛ این سند آن‌ها را با وضعیت پیاده‌سازی اشتباه نمی‌گیرد. جدول بخش ۴ DESIGN_STEPS فهرست خلاصه حالت‌هاست. تصمیم‌های افزوده مهاجرت در ستون قرارداد و بخش بعد مشخص‌اند.

| id مرجع | نام React و فایل مقصد | قرارداد ترکیب / داده | صفحه‌کلید و مرز اجرا | auditIssueRefs |
| --- | --- | --- | --- | --- |
| button | Button / IconButton؛ `button.tsx`, `icon-button.tsx` | variant، size، loading، loadingLabel، onClick؛ نام الزامی برای آیکونی | Tab، Enter/Space؛ Client مطابق Base UI | UX07, UX12, UX22, UX24 |
| text-field | TextField / SearchField / TextareaField؛ `text-field.tsx` | قرارداد فیلد + value/defaultValue، onValueChange؛ readonly مستقل | ویرایش بومی، Tab؛ Client برای اتصال فیلد و شناسه‌ها | UX14, UX15 |
| select | SelectField؛ `select-field.tsx` | قرارداد فیلد + options با value/label/disabled، value/defaultValue، onValueChange | جهت‌ها، Home/End، Enter و Escape؛ Client | UX03 |
| choice | CheckboxField / RadioField / SwitchField؛ `choice-field.tsx` | قرارداد فیلد؛ checked/defaultChecked برای checkbox/switch؛ value/defaultValue و name مشترک برای RadioGroup | Space؛ جهت‌ها در radio به primitive واگذار؛ Client | UX12, UX22 |
| file-input | FileInput؛ `file-input.tsx` | قرارداد فیلد + accept?، maxSizeBytes?، restrictionsText?، onFileChange(File یا null)؛ انتخاب و پاک‌کردن داخلی | Tab، فعال‌سازی انتخاب/حذف با Enter/Space؛ Client؛ بدون value برنامه‌ای برای input فایل | UX15 |
| badge | ApprovalBadge / VisibilityBadge / LatestBadge / RoleBadge؛ `status-badge.tsx` | به‌ترتیب ApprovalStatus، Visibility، VersionStatus، DisplayRole؛ متن فارسی؛ previous نشان latest ندارد | غیرتعاملی؛ Server-compatible | UX03, UX20 |
| identity | Identity؛ `identity.tsx` | identity: Identity؛ متن fallback صریح؛ avatar اختیاری | غیرتعاملی؛ متن Server-compatible و Avatar در مرز کوچک Client | UX04, UX23 |
| tabs | ClasorTabs؛ `clasor-tabs.tsx` | items با value/label/content، value/defaultValue، onValueChange؛ فعال‌سازی خودکار برای محتوای محلی | یک توقف Tab؛ Left بعدی، Right قبلی، Home/End؛ Client | UX08, UX12 |
| breadcrumb | ClasorBreadcrumb؛ `clasor-breadcrumb.tsx` | items با id/label/href؛ آخرین بخش جاری و بدون لینک | Tab فقط لینک‌ها، Enter؛ Server-compatible | UX08 |
| pagination | ClasorPagination؛ `clasor-pagination.tsx` | page، pageCount، onPageChange؛ کنترل‌شده؛ شماره ۱ مبنا؛ مرزها disabled | Tab، Enter/Space؛ Client؛ نمونه فقط نشانگر صفحه را تغییر می‌دهد | — |
| data-table | DataTable؛ `data-table.tsx` | rows، columns، getRowId، density، state؛ selectedIds و onSelectionChange؛ انتخاب همه فقط rows موجود | جدول بومی؛ Tab روی checkbox و منو؛ Space انتخاب؛ Client | UX04, UX05, UX09 |
| action-menu | RowActionMenu؛ `row-action-menu.tsx` | rowLabel، items با id/label/onSelect/disabledReason؛ open/defaultOpen، onOpenChange | Up/Down، Home/End، Escape و بازگشت به trigger؛ Client | UX07, UX12, UX22 |
| feedback | Feedback؛ `feedback.tsx` | tone، title، description، dataRetained?، action اختیاری با label/onAction | Tab و فعال‌سازی اقدام اختیاری؛ متن Server-compatible | UX14, UX15, UX16, UX17, UX21 |
| system-state | SystemState؛ `system-state.tsx` | state: SystemState؛ onRecovery?؛ بازیابی در خطا/موفقیت ناقص الزام مصرف‌کننده | فقط اقدام توقف Tab دارد؛ متن Server-compatible | UX02, UX10, UX14, UX16, UX17 |
| progress | ProgressIndicator / LoadingSkeleton؛ `progress-indicator.tsx` | progress: label، value، max؛ skeleton: ابعاد و decorative=true؛ فاقد timer داخلی | غیرتعاملی؛ progress بومی؛ Server-compatible | — |
| dialog | ConfirmationDialog / DestructiveDialog؛ `confirmation-dialog.tsx` | open/defaultOpen، onOpenChange، title، description، targetName، confirmLabel، onConfirm، loading، error?، fallbackFocusRef? | Tab محصور، Escape، بازگشت فوکوس؛ مخرب: تمرکز اولیه لغو؛ Client | UX03, UX20 |
| drawer | DetailsSheet؛ `details-sheet.tsx` | open/defaultOpen، onOpenChange، title، description، children، fallbackFocusRef? | Tab محصور، Escape، دکمه بستن و بازگشت فوکوس؛ Client | UX07 |
| toast | StatusToast؛ `status-toast.tsx` | message، duration=6500، onDismiss؛ میزبان واحد و close label فارسی | Tab به بستن، Enter/Space؛ اعلان polite؛ Client | UX21 |
| tooltip | HelpTooltip؛ `help-tooltip.tsx` | content، children با نام قابل دسترس مستقل | hover/focus و Escape؛ aria-describedby؛ Client | UX12 |
| permission-action | PermissionAction؛ `permission-action.tsx` | permission: ResolvedPermission، onDirectApproval، onRequestApproval، loading؛ نقش ورودی این جزء نیست | Tab و Enter/Space فقط برای اقدام مجاز؛ علت blocked دائمی؛ Client | UX22, UX24 |
| stepper | CreationStepper؛ `creation-stepper.tsx` | steps، currentStep، onStepChange، children، onCommit، commitLabel، loading، error?؛ state فرم نزد مصرف‌کننده | Tab، Enter/Space؛ aria-current=step؛ فقط onCommit ایجاد را نمایندگی می‌کند؛ Client | UX01, UX14, UX19 |
| approval-context | ApprovalContext؛ `approval-context.tsx` | context: ApprovalContext؛ چهار هویت مستقل، زمان‌ها رشته ISO و نمایش محلی؛ pending فاقد تصمیم است | metadata معنایی dl؛ Server-compatible | UX23 |

## تصمیم‌های مهاجرت نسبت به مرجع HTML

۱. پایه‌ها از shadcn سبک Base UI نصب می‌شوند؛ کد Radix بدون تطبیق وارد نمی‌شود. progress بومی حفظ می‌شود؛ Select طبق درخواست ۲۰۲۶/۱۰/۲۴ به ترکیب shadcn Base UI مهاجرت کرد. برای فرم، hidden input و name/value primitiveها هنگام C بررسی می‌شوند.

۲. Button: primary → default، secondary مرجع → outline، quiet → ghost. مخرب حاشیه‌دار/پر صریح تعریف می‌شود. ابعاد ۳۲/۴۰/۴۸، هدف لمس ۴۴ و hover/pressed مستقل در B و C اعمال می‌شوند.

۳. Dialog/AlertDialog/Sheet جایگزین dialog بومی هستند؛ عنوان، شرح، حبس فوکوس، Escape، قفل اسکرول و بازگشت فوکوس باید حفظ شوند. Sheet در inline-end یعنی چپ RTL با عرض ۴۰۰ و سقف عرض viewport است. DetailsSheet و تأیید عادی در حالت idle با backdrop بسته می‌شوند؛ تأیید مخرب کلیک backdrop را نمی‌پذیرد و لغو/Escape را می‌پذیرد. هنگام اقدام pending، سیاست بستن تابع قابلیت لغو واقعی مصرف‌کننده است؛ نمونه نباید ادعای لغو عملیات غیرقابل‌لغو کند. اگر trigger حذف شده باشد fallbackFocusRef مقصد پایدار را مشخص می‌کند.

۴. رجیستری `sonner` موجود است و به sonner و next-themes وابسته است؛ وجود آن تأیید سازگاری رفتار یا الزام افزودن theme provider نیست. انتخاب نهایی toast در D پس از بررسی نصب فعلی Base UI و اعلان polite انجام می‌شود. این تنها انتخاب primitive باز این مرحله است و مانع تثبیت props نیست.

۵. ابعاد تأیید، دسترسی و آخرین نسخه جدا هستند؛ نقش از هویت و مجوز جداست. `models.ts` هیچ مجوزی از نقش محاسبه نمی‌کند. داده ساختگی در نمونه‌ها نگهداری می‌شود و وارد اجزای UI نمی‌شود.

۶. مستندات و محتوای ثابت در Server Component می‌مانند؛ state، clipboard، فایل، provider جهت و portal مرزهای کوچک Client دارند. هدف مرحله بعد حذف client بودن کل صفحه برای یک تعامل است؛ مرحله A صفحه فعلی را بازنویسی نمی‌کند.

## مبنای فنی و تحویل

پیش از این قرارداد، راهنماهای محلی Next.js در `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` و `02-project-structure.md` خوانده شدند. رجیستری shadcn از طریق MCP بررسی شد. `npx tsc --noEmit`، `npm run lint` و `npm run build` پس از افزودن مدل‌ها موفق بودند. این مرحله خروجی معماری دارد؛ هیچ ادعای آزمون مرورگر، تطبیق بصری، تست صفحه‌خوان یا تکمیل کنترل‌ها ندارد. پس از تأیید کاربر، مرحله B توکن‌ها، فونت سراسری، RTL و اختلاف‌های مبانی را تکمیل خواهد کرد.
