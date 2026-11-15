## ناوبری و Overlay جاری — ۲۰۲۶/۱۱/۱۴

مرجع اجرا: [GlassSidebar](../../components/ui/GlassSidebar.tsx)، [GlassDropdown](../../components/ui/GlassDropdown.tsx)، [GlassModal](../../components/ui/GlassModal.tsx) و ورودی‌های عمومی `sidebar.tsx`، `dropdown-menu.tsx` و `toast.tsx`.

Hover لینک و آیتم منو white/20، blur و border-white/30 دارد؛ Active برابر white/30 با سایه است. حاشیه از ابتدا رزرو می‌شود تا اندازه تغییر نکند. محتوای Modal/Dropdown شیشه‌ای است و بک‌دراپ Modal مشکی نیمه‌شفاف و محو می‌ماند. ترتیب لایه‌ها بر پایهٔ متغیرهای z-index است؛ Popup منو بالاتر از پنل و هدر قرار می‌گیرد؛ پنجره‌ای که از گزینهٔ منو باز می‌شود، لایهٔ بالاتری دارد.

مدیریت فوکوس، Escape، کلیک بیرون، انتخاب با صفحه‌کلید و scroll lock متعلق به Base UI است. [usePortalTheme](../../hooks/use-portal-theme.ts) تم محلی و [withTestId](test-id.ts) شناسهٔ عمومی عنصر render را حفظ می‌کند. به جای کپی markup قدیمی، همین primitiveها را ترکیب کنید.

## تب‌بار مشترک شیشه‌ای

`ClasorTabs` دو گونه دارد: `line` (پیش‌فرض سازگار با مصرف‌کنندگان قبلی) و `segmented`. گونه جدید ریل شیشه‌ای تمام‌عرض با شعاع ۱۲px، blur/12px و سطح تب فعال برجسته دارد. قراردادهای `glass.segmentedTabs` و `glass.segmentedTab` در `classes.ts` مالک ظاهرند. Base UI رفتار، فوکوس و ارتباط تب و پنل را مدیریت می‌کند؛ داده تب‌ها می‌تواند `disabled` داشته باشد و API کنترل‌شده و کنترل‌نشده حفظ شده است.

متریال گونه بخش‌بندی‌شده یک ریل فرورفته با سایه داخلی، ته‌رنگ بسیار ملایم بنفش و فاصله داخلی ۶px دارد. تب فعال با نور مورب ثابت روی سطح، لبه روشن و سایه شناوری از ریل جدا می‌شود. tint پایه ۳۰٪ و blur برابر ۱۲px حفظ شده‌اند؛ نور سطح به‌صورت لایه تزئینی مستقل و بدون محوشدن متن اعمال می‌شود. این لایه رویداد اشاره‌گر نمی‌گیرد و در حالت بدون شفافیت، کنتراست بیشتر و forced colors حذف می‌شود. انیمیشن فقط برای تغییر opacity نور است؛ blur متحرک، اعوجاج متن و تعقیب نشانگر استفاده نمی‌شود و کاهش حرکت transition را حذف می‌کند.

گونه بخش‌بندی‌شده در داشبورد مصرف می‌شود؛ `DashboardTabs` فقط سازگاری شناسه‌های تست را حفظ می‌کند و پیاده‌سازی مستقلی ندارد. نمونه‌های دو و سه تب، حالت کنترل‌شده، تب غیرفعال، عنوان بلند و زمینه تیره در بخش ناوبری کاتالوگ (`/design-system/navigation`) قرار دارند. تنظیم «نمای سطح» و ترجیحات دسترس‌پذیری روی همان کنترل‌ها اعمال می‌شوند. متن کامل حفظ می‌شود؛ در عرض کم، ریل افقی پیمایش دارد و فوکوس تب باید در دید بماند.

## منوی گزینه‌های سند و مخزن

[GlassOptionsMenu](../../components/ui/GlassOptionsMenu.tsx) ترکیب عمومی Base UI برای منوهای چندسطحی است. `items` شامل شناسه، عنوان، آیکون، children، disabled، description، destructive و separatorBefore است؛ دادهٔ دامنه در کامپوننت عمومی قرار ندارد. عنوان رکورد و نوع آن در سربرگ شیشه‌ای می‌آیند. `withTestId` شناسهٔ trigger را حفظ می‌کند و `usePortalTheme` تم محلی را به Popup و زیرمنو منتقل می‌کند. قراردادهای `optionsPopup`، `optionsHeader` و `optionItem` در `classes.ts` مالک هندسه‌اند و متریال از `glass.floating` می‌آید.

گزینه‌های داشبورد بر اساس رابط کلاسور و کد عمومی آن تنظیم شده‌اند. سند زیرمنوهای ویرایش، محدودیت انتشار و فعالیت دارد؛ مخزن برای مالک، مدیر و عضو گزینه‌های متفاوت دارد و گزینهٔ مخزن منتشرشده مشروط است. این‌ها fixture نمایشی‌اند و مدل مجوز سرویس نیستند. سه‌نقطهٔ مخزن یک کنترل مستقل از دکمهٔ بازکردن مخزن است؛ دکمه‌ها تو در تو نیستند و فاصلهٔ ۱۶px از لبه حفظ شده است.

منوی بازشده داخل portal است و توسط فهرست اسکرول قطع نمی‌شود. Base UI ناوبری صفحه‌کلید، بازکردن زیرمنو، برخورد با لبهٔ صفحه، Escape، بستن بیرون و بازگرداندن فوکوس را مدیریت می‌کند. گزینه‌های غیرفعال قابل اجرا نیستند؛ انتخاب‌های فعال در پیش‌نمایش محلی نمایش داده می‌شوند و هیچ درخواست یا تغییری در حساب اصلی صورت نمی‌گیرد.

منو و زیرمنوها از قرارداد جمع‌وجور یکسان با عرض ۲۰۸px، متن ۱۱px، ردیف حداقل ۲۸px دسکتاپ و ۳۶px موبایل و قاب آیکون ۲۰px استفاده می‌کنند. سربرگ و آیکون آن نیز کوچک شده‌اند؛ بزرگ‌نمایی مرورگر یا transform برای کوچک‌سازی استفاده نمی‌شود.

نمونه‌های سند شخصی/اشتراکی، مخزن مالک/عضو، گزینهٔ حساس، زیرمنو و تم تاریک از طریق `GlassOptionsCatalogue` در `/design-system/overlays` و `/design-system/layout` قابل مشاهده‌اند. تمام همین اجزا در داشبورد مصرف می‌شوند.

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
| ProgressIndicator | label/value/max؛ progress بومی و عدد مشخص؛ timer داخلی ندارد؛ LoadingSkeleton تزئینات را از دسترس‌پذیری حذف می‌کند |
| RowActionMenu | rowLabel/items، open/defaultOpen/onOpenChange؛ نام trigger شامل زمینه ردیف، کلیدهای جهت و Escape، بازگشت فوکوس؛ علت گزینه غیرفعال همیشه خارج منو دیده می‌شود |
| ConfirmationDialog / DestructiveDialog | trigger، title، description، targetName، confirmLabel، onConfirm؛ open/defaultOpen/onOpenChange، loading/error، fallbackFocusRef اختیاری؛ Promise ناموفق لایه را باز نگه می‌دارد و خطا را نمایش می‌دهد |
| DetailsSheet | trigger/title/description/children و وضعیت بازبودن؛ width=400، سقف viewport و ارتفاع 100dvh؛ inline-end در RTL سمت چپ است |
| HelpTooltip | content و فرزند دارای نام قابل دسترس؛ focus/hover و Escape؛ فقط توضیح مکمل |
| Toast | Toaster مشترک در layout؛ toast.add({title,description,type,timeout,actionProps}) و toast.close(id)؛ پنج حالت، اعلان polite، بستن فارسی و محدودیت سه پیام |

لایه‌ها در portal دارای `dir=rtl` هستند. dialog/Sheet modal هستند؛ تمرکز محصور و اسکرول بدنه قفل می‌شود. Escape، دکمه بستن و backdrop در حالت idle دیالوگ عادی/Sheet را می‌بندند. AlertDialog با کلیک backdrop بسته نمی‌شود و تمرکز اولیه روی انصراف است. هنگام Promise در انتظار، بستن/لغو و تأیید دوباره مسدود است؛ متن دکمه باقی می‌ماند. پس از موفقیت لایه بسته می‌شود. در صورت حذف trigger، مصرف‌کننده باید fallbackFocusRef به یک مقصد پایدار بدهد؛ نام نقش جایگزین مجوز واقعی نیست.

z-indexهای dialog/menu/toast و backdrop از مبانی مصرف می‌شوند؛ Sheet چپ بدون آینه‌کردن دوباره مسیر حرکت بسته می‌شود. متن‌های طولانی می‌شکنند و خود لایه حداکثر ارتفاع و اسکرول مستقل دارد. کم‌شدن حرکت از قاعده سراسری تبعیت می‌کند.

بررسی این مرحله: TypeScript/build، lint و آزمون مرورگر تب RTL و Home/End، مرز صفحه‌بندی، مهار فوکوس دیالوگ، تمرکز امن مخرب، بازگشت فوکوس، Sheet دسکتاپ/موبایل، منو، Toast و Tooltip. شواهد در `.codex/qa-stage-d` ثبت می‌شوند. بررسی یکپارچه صفحه‌خوان انسانی در این مرحله انجام نشده است.

انتخابگر Select در portal یک لایه بالاتر از Dialog قرار می‌گیرد (--z-dialog + 1) تا گزینه‌های داخل فرم modal زیر backdrop پنهان نشوند. Popup داخلی در همان stacking context باقی می‌ماند.
