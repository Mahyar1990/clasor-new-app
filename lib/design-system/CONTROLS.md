## Compact document editor toolbar — 2026/11/17

`DocumentEditorToolbar` is a controlled composition of existing Button, Checkbox and shadcn Select controls. It receives version options/selection, preview/edit mode, permissions, dirty/autosave state and callbacks. Product rules remain in the reader module. The standalone example on `/design-system/navigation` demonstrates the classic/file/Office control matrix, preview/edit, read-only permission, an empty disabled version list, unsaved changes, RTL and local dark mode. The complete page example lives on layout/overlays and includes a simulated save failure with retained edits; both are reachable through the catalogue menu.

Preview shows version selection/management, Edit when permitted, and PDF/file download. Editing replaces Download with Approve draft, Approve and publish, optional Autosave and a Save icon only while dirty. The file family omits Autosave. Classic alone offers the drawer toggle. Controls wrap on narrow screens; the iframe consumes the remaining height. Empty version lists disable version selection, management and entering edit mode. No alternate tab appearance is introduced.

`EditorFrame` adds optional `minimal` and `printRequest` props. Minimal removes duplicate inner document chrome. An increasing print request uses the existing origin/source/session-validated bridge and waits for ready state; the editor waits for fonts before opening the browser print dialog. PDF saving uses that native dialog, not a text file relabeled as PDF. The iframe's document header and decorative paper border/shadow are omitted in print.

## Document controls and stable upload completion — 2026/11/17

`UploadProgress` reserves the same action-rail width during and after upload. At 100% (unless cancelled), “آپلود موفق” replaces Retry and Cancel; the existing progress element, value, width and height remain intact. Cancellation retains the retry path.

`IdentifierInput` accepts multiple identifiers separated by spaces, Enter, ASCII comma or Persian comma, including pasted text. It preserves order, removes duplicates, commits the remaining token on blur and supplies individually named remove buttons with focus restored to the input. It consumes the existing field/input/Badge contracts.

`RecipientPicker` is a controlled, searchable multi-select for existing user/group options; IDs use separate namespaces. Its bounded scroll region appends ten records automatically with the shared loading component. Query changes reset pending loading; selected IDs remain intact. Panel restrictions supply only active members and groups of the selected repository, never pending invitees or arbitrary identifiers.

`VersionBadges` composes the existing ApprovalBadge, LatestBadge and VisibilityBadge. Draft, approved, pending, public and latest appearances have one source of truth. `DocumentFlags` supplies accessible compact row icons or labeled badges for bookmark, publication hiding, audience/password/expiry restrictions and panel restrictions. Hidden and restricted are independent states.

Representative interactions for these controls and `EditorFrame` render in `DocumentInteractionsCatalogue` through the normal catalogue (`app/page.tsx` → shared section composition, layout/overlays). The stacked-version example also consumes the canonical badges.

## Integrated search and aligned actions — 2026/11/16

CompactSearch now renders one continuous field: its optional title/content Select is inside the field and Apply touches the input edge. `glass.searchGroup/searchMode/searchInput/searchApply` own the shared surfaces and separators, with a visible group focus ring and local dark/opaque/forced-color support. Base UI still handles the Select popup and keyboard behavior.

`FormActions` gives related buttons one wrapping flex row, consistent heights and explicit gaps instead of margins on independent inline buttons. Key generation/save use it before and after generated values appear; request, tag-confirmation and activity actions reuse it. TextField's optional action slot places an input and its action on the same control row, leaving validation messages underneath. TagManager uses this slot; invitation/member/access add controls match the associated field height.

`OptionsButton` has one fixed variant/size and preserves explicit public IDs and Base UI render refs. The structural guard rejects newly authored Button/IconButton three-dot variants outside this shared component. Representative vertical record groups, options and aligned action rows are rendered through app/page.tsx on layout/overlays.

## Compact search, repository tags and batch controls — 2026/11/16

`CompactSearch` is a bounded native search form with an Apply button and Enter submission. Its optional Base UI Select places title/content mode beside the document query. Draft text/mode are separate from applied query state; creation controls occupy a different row. Filter dialogs no longer duplicate the search-mode field. Folder-only filtering clears/disables content type and template constraints; bookmark/template descriptions explain their effect on results.

`TagManager` creates/removes repository vocabulary, with nonempty/duplicate-name validation and cumulative list loading. It has no selection state. `TagPicker` selects existing repository tags for documents or filtering; its compact search, selected chips and flat option rows remain keyboard usable. Repository tag deletion uses a navigation page within one dialog and confirms removal from affected documents. Direct draft-tag deletion restores focus to the name field.

`BatchActions` provides an explicit selection mode, a 10-item count/limit, Move/Delete and End selection. Unselected checkboxes disable at ten, while selected records can still be unchecked. Public test IDs remain stable across table/outline appearances. Independent catalogue examples are reachable through app/page.tsx on layout/overlays.

## Library controls — 2026/11/16

`MultiSortEditor` accepts field options, ordered SortRules and onValueChange. Criteria are unique, independently ascending/descending and keyboard-reorderable with up/down buttons. A stable optional rule ID preserves control identity when changing its field. The Clasor composition exposes kind, name, priority, creation date and modification date; an empty criterion list preserves source order.

`SelectField` forwards its explicit data-test-id to the visible trigger, not Base UI's hidden form inputs. Empty-value options display their own label. `Button variant="plain"` supports flat clickable data content while keeping keyboard focus and hover/pressed states. `GlassTile` keeps the main open action separate from its top-end options control. These controls have interactive catalogue examples through app/page.tsx on layout/overlays.

## Compact attachments - 2026/11/16

AttachmentPicker(value, onValueChange, accept, maxFiles?, maxSizeBytes?, testId) is a controlled, compact composition. Items have stable IDs and File objects; accept is an extension suffix list. It validates the batch before appending, preserves existing items on errors and supports removing/replacing files. Removing returns focus to Add after the controlled value commits. A count, file names/sizes and associated error/help text are exposed; there is no drop-zone-sized card or remote upload.

The feedback composition uses the source limits: six files, one MiB each; JPG, JPEG, PNG, WEBP, PDF, TXT, MPEG and MP4. A representative interactive example is rendered on the inputs catalogue, including selection, removal, limit and format/size errors.

## Follow-up controls - 2026/11/16

UploadProgress announces an explicit success status beside the meter at 100%; retry and cancel remain disabled after completion. PathPicker uses the shared Breadcrumb primitives, RTL chevron separators and aria-current on the selected destination. Both updated states are rendered in DialogPatternsCatalogue.

RecordGroup(title, description?, children, testId) is a shared glass composition with a named section, shared header and a logical start accent. It visually groups related records without merging their identities, content or actions. The independent example and the interactive version groups are available on the overlays/layout catalogue pages.

## کنترل‌های دیالوگ جمع‌وجور — ۲۰۲۶/۱۱/۱۶

- `UploadProgress(name, value, cancelled?, onRetry, onCancel)` از ProgressIndicator بومی و قرارداد شیشه‌ای استفاده می‌کند. نام فایل، درصد و دکمه‌های آیکونی تلاش مجدد/لغو نام دارند؛ در ۱۰۰٪ هر دو غیرفعال‌اند. زمان‌بندی در مصرف‌کننده است. نمونه مخزن شبیه‌سازی محلی با cleanup هنگام لغو، تلاش مجدد و unmount دارد؛ فایل یک بار در پایان اضافه می‌شود.
- `PathPicker(nodes, value, onValueChange)` مسیر را با آرایه شناسه‌های پایدار می‌گیرد، فرزندان سطح فعلی را نشان می‌دهد و با انتخاب دسته به سطح بعد می‌رود. breadcrumb ریشه/اجداد و بازگشت دارد؛ برگ مقصد معتبر است. انتخاب مسیر انتقال را ثبت نمی‌کند؛ فرم والد آن را ثبت می‌کند.
- `RadioField.options[].content` در حالت کنترل‌شده فقط زیر گزینه انتخاب‌شده نمایش داده می‌شود؛ محتوای گزینه دیگر در DOM نیست.
- `CopyField.compact` فضای خالی پیام کپی را حذف می‌کند؛ live region باقی می‌ماند و پیام موفقیت/انتخاب متن نمایش داده می‌شود. ردیف کلید نمونه مصرف آن است.
- `glass.compactRecord` سطح، تم، حالت بدون شفافیت و forced colors ردیف‌های عضو/گروه/فایل/نسخه را یکپارچه می‌کند.


## کنترل‌های جاری — ۲۰۲۶/۱۱/۱۴

[Button](../../components/ui/button.tsx)، [Input](../../components/ui/input.tsx)، [Select](../../components/ui/select.tsx) و [SolidForm](../../components/ui/SolidForm.tsx) مرجع اجرا هستند؛ ظاهر و سیاست حالت‌ها قراردادهای Tailwind در [classes.ts](classes.ts) هستند. فایل CSS مستقل کنترل‌ها حذف شده است.

Input پیش از فوکوس white/40 با حاشیه خاکستری و سایه داخلی است؛ در دارک white/10. فوکوس بنفش و خطا معنایی است. دکمه اصلی purple/60 و Hover آن purple/80؛ ثانویه white/50 با حاشیه و سایه پایه؛ Ghost/Close از white/10 به white/20 می‌رود. حرکت Hover فقط برای کنترل فعال است و در کاهش حرکت غیرفعال می‌شود.

Select بومی HTML ممنوع است. Trigger و Content همان shadcn Base UI، شیشه‌ای و با شناسه تست‌اند؛ `select-parts.tsx` بخش‌های کوچک را نگه می‌دارد. `name` و serialization primitive را حفظ کنید، ولی تست‌ها را روی کنترل قابل مشاهده بنویسید. قواعد قاب ماتِ گزارش قدیمی برای فرم جاری معتبر نیستند.

## تکمیل سطوح انتخاب و وضعیت — ۲۰۲۶/۱۱/۱۶

Checkbox/Radio در حالت عادی white/40 و در انتخاب purple/60 دارند؛ انتخاب جزئی آیکون مستقل خود را حفظ می‌کند. Switch ریل فرورفته و دستگیره روشن با حرکت RTL دارد. قراردادهای `choice`، `switchTrack` و `switchThumb` در `classes.ts` مالک ظاهر، خطا، فوکوس و fallback هستند. بدون شفافیت و forced colors محوشدگی حذف و انتخاب با رنگ سیستم/آیکون باقی می‌ماند. Base UI مسئول رفتار است.

نشان‌های وضعیت و Feedback از `statusSurface` و رنگ‌های معنایی مشترک استفاده می‌کنند. Avatar و مرحله‌های ایجاد از متریال GlassEmblem استفاده می‌کنند؛ نمونه مراحل فعلی/تکمیل‌شده/در انتظار را با دکمه ادامه بررسی کنید. Progress همچنان عنصر بومی دارای label/value/max است و فقط track/value شیشه‌ای شده‌اند. نمونه‌های روشن/تاریک در `/design-system/inputs`، `/design-system/status` و `/design-system/feedback` در دسترس‌اند. فایل انتخاب‌شده نیز قاب شیشه‌ای مشترک دارد.

## انتخاب‌گر برچسب — ۲۰۲۶/۱۱/۱۶

[TagPicker](../../components/ui/TagPicker.tsx) ترکیب عمومی جستجو، چیپ‌های قابل حذف و چک‌باکس گزینه‌های ثابت است. `label`، `value: string[]`، `options: string[]`، `onValueChange` و `testId` لازم‌اند؛ `disabled`، `description` و `error` اختیاری‌اند. گزینه‌ها از مصرف‌کننده می‌آیند؛ ساخت تگ یا درخواست سرویس انجام نمی‌دهد. Enter در جستجو فرم بیرونی را ثبت نمی‌کند، Space انتخاب را تغییر می‌دهد و حذف چیپ فوکوس را به جستجو برمی‌گرداند. نام قابل دسترس، ارتباط خطا، RTL، تم و fallback از کنترل‌های مشترک می‌آیند. جستجوی بدون نتیجه، انتخاب خالی، غیرفعال و خطا در بخش inputs قابل بررسی‌اند. گزینه‌های ثابت فرم، فهرست دادهٔ صفحه‌بندی‌شونده نیستند.

## تاریخچهٔ مرحله C

# کنترل‌های پایه — تحویل مرحله C

این گزارش تحویل C است؛ مراحل D تا F نیز تکمیل شده‌اند و وضعیت نهایی در VALIDATION.md آمده است. سه بخش جدید در مسیر `/` با لنگرهای `#buttons`، `#inputs` و `#status` قابل مشاهده‌اند. در مجموع شش بخش کاتالوگ آماده‌اند.

## اجزای ساخته‌شده

تمام اجزای قابل استفاده مجدد در `components/ui` قرار دارند. پایه‌های Field، Label، Input، Textarea، Select، Checkbox، RadioGroup، Switch، Badge و Avatar با CLI رجیستری رسمی shadcn، سبک `base-nova` و RTL فعال نصب شدند. Separator وابستگی Field است. هیچ کتابخانه فرم یا سرویس جدیدی اضافه نشد.

| قرارداد مرجع | خروجی |
| --- | --- |
| button | Button بازطراحی‌شده و IconButton با نام قابل دسترس الزامی |
| text-field | TextField، SearchField و TextareaField بر پایه Field/Input/Textarea |
| select | SelectField با Select مبتنی بر Base UI |
| choice | CheckboxField، RadioField و SwitchField با پایه‌های Base UI |
| file-input | FileInput تک‌فایلی با دکمه فارسی، نام/اندازه، محدودیت قابل تنظیم و پاک‌کردن |
| badge | ApprovalBadge، VisibilityBadge، LatestBadge و RoleBadge |
| identity | Identity با Avatar، حروف اول نام یا متن صریح هویت نامشخص |

`components/design-system/controls-catalogue.tsx` فقط داده و تعامل نمونه را نگهداری می‌کند؛ اجزای UI به نام‌های ساختگی، داده نمونه یا همین صفحه وابسته نیستند.

## قرارداد استفاده

### Button و IconButton

نگاشت primary مرجع به `variant="default"`، secondary مرجع به `outline` و quiet به `ghost` است. `destructive` پر و `destructive-outline` حاشیه‌دار است. گونه `secondary` پایه shadcn برای سازگاری حفظ شده و جایگزین secondary مرجع نیست.

اندازه‌های `sm`، `default` و `lg` ارتفاع‌های ۳۲/۴۰/۴۸ دارند. IconButton اندازه‌های `icon-sm`، `icon` و `icon-lg` و `aria-label` الزامی دارد. در pointer:coarse هدف دکمه حداقل ۴۴ است. hover اصلی و pressed از توکن‌های مستقل استفاده می‌کنند؛ فوکوس outline با فاصله مشخص دارد.

`loading` دکمه را غیرفعال، `aria-busy` را فعال، spinner تزئینی را نمایش و برچسب موجود را حفظ می‌کند. `loadingLabel` در ناحیه status اعلام می‌شود. `disabledReason` وقتی disabled باشد، متن دائمی بیرون دکمه و ارتباط aria-describedby ایجاد می‌کند؛ مصرف‌کننده باید علت محدودیت واقعی را تأمین کند. `onClick` همان قرارداد Base UI را حفظ می‌کند. نمونه async علاوه بر disabled، guard مستقل و پاک‌سازی timer در unmount دارد.

### فیلدها

TextField، SearchField، TextareaField خواص بومی مانند `name`، `required`، `readOnly`، `disabled`، `value/defaultValue` و `onChange` را نگه می‌دارند. `onValueChange` مقدار رشته را دریافت می‌کند. از value و defaultValue هم‌زمان استفاده نشود. عنوان `label` الزامی و placeholder صرفاً مکمل است.

خواص مشترک: `description`، `error`، `disabledReason` و `id` اختیاری. در نبود id از useId استفاده می‌شود. شناسه کمک، خطا و علت محدودیت با `aria-describedby` مصرف‌کننده ادغام و خطا با `aria-invalid` و FieldError اعلام می‌شود. readOnly امکان خواندن، انتخاب و کپی را نگه می‌دارد؛ disabled به معنی عدم تعامل است.

```tsx
"use client"
import { useState } from "react"
import { TextField } from "@/components/ui/text-field"

export function TitleExample() {
  const [title, setTitle] = useState("")
  return <TextField label="عنوان سند" name="title" required
    description="عنوانی کوتاه و مشخص وارد کنید."
    value={title} onValueChange={setTitle} />
}
```

SelectField علاوه بر خواص مشترک، `options` با value/label/disabled می‌گیرد. طبق درخواست ۲۰۲۶/۱۰/۲۴، Select مبتنی بر Base UI جایگزین NativeSelect شد؛ Popup با direction=rtl و ورودی مخفی فرم استفاده می‌شود. اعتبارسنجی و موفقیت فرم کاتالوگ محلی‌اند و ورودی را پاک نمی‌کنند.

SelectField خواص name، form، required، disabled، readOnly و value/defaultValue را از Select.Root حفظ می‌کند؛ تغییر مقدار فقط با onValueChange است و onChange بومی select دیگر API این ترکیب نیست. placeholder در حالت بدون مقدار نمایش داده می‌شود و مقدار هر گزینه با label فارسی آن نگاشت می‌شود.

### انتخاب‌ها و معنای فرم

CheckboxField و SwitchField قرارداد Base UI برای `checked/defaultChecked`، `onCheckedChange`، `name`، `value`، `required` و `disabled` را حفظ می‌کنند. Checkbox همچنین indeterminate دارد و آن را با خط افقی، رنگ و `aria-checked=mixed` نمایش می‌دهد. RadioField گروهی از options با value/label/disabled/disabledReason و `value/defaultValue`، `onValueChange` و یک name مشترک می‌گیرد. گروه با fieldset/legend نام‌گذاری می‌شود.

تفاوت آگاهانه با HTML مرجع: بخش قابل مشاهده checkbox/radio/switch از primitive خانواده Base UI است و input بومی مخفی برای فرم دارد. رفتار Space، جهت‌های RTL رادیو و serialize شدن نام/مقدار با FormData بررسی شدند. کنترل غیرفعال از تعامل کنار گذاشته می‌شود؛ علت آن در متن باقی می‌ماند. شکل checkbox/radio برای لمس به مربع ۴۴ تبدیل نشده؛ هدف با ناحیه hit اطراف و برچسب ۴۴ پیکسلی تأمین می‌شود.

### مقیاس فضای کار محصول

در فضای کار محصول، کلاس‌های workspace ارتفاع کنترل دسکتاپ را ۳۶ و در عرض موبایل/اشاره‌گر لمسی ۴۴ پیکسل می‌کنند؛ متن ورودی خوانا می‌ماند. Button نشانگرهای `data-variant` و `data-size` را برای ترکیب ظاهر منتشر می‌کند. سایه و مقیاس محصول به کلاس‌های workspace و portal آن محدودند و مقدار توکن تولیدشده یا پیش‌فرض کاتالوگ را تغییر نمی‌دهند. جزئیات تصمیم‌ها در مشخصات `specs/20261031-210821-compact-layered-workspace.md` آمده است.

### FileInput

خواص اصلی: `label`، `name`، `accept?`، `maxSizeBytes?`، `restrictionsText?`، `onFileChange(File | null)` و خواص مشترک فیلد. محدودیت پیش‌فرض تجاری وجود ندارد. محدودیت یک مگابایت و txt/pdf فقط fixture کاتالوگ است.

انتخاب‌گر بومی فایل پشت یک دکمه فارسی shadcn قرار دارد. نام کامل با bdi و اندازه به بایت نمایش داده می‌شود. نوع با پسوند یا MIME و wildcard بررسی می‌شود. خطای انتخاب، filename و راهنمای اصلاح را نگه می‌دارد، input را با customValidity نامعتبر و callback را null می‌کند. انتخاب معتبر File را برمی‌گرداند. پاک‌کردن مقدار input و خطای محلی را پاک و فوکوس را به دکمه قابل مشاهده برمی‌گرداند. اعتبارسنجی بومی فایل اجباری نیز فوکوس را به همان دکمه برمی‌گرداند.

خود جزء هیچ ارسال شبکه‌ای ندارد. انتخاب فایل uncontrolled است؛ value/defaultValue و multiple در props آن وجود ندارند. اعتبارسنجی محلی موفق به معنی ذخیره یا ارسال فایل نیست.

### وضعیت و هویت

ApprovalBadge از ApprovalStatus، VisibilityBadge از Visibility، LatestBadge از VersionStatus و RoleBadge از DisplayRole مستقل استفاده می‌کنند. previous نشان آخرین نسخه نمی‌سازد. همه نشان‌ها متن دارند و نقش‌ها خنثی‌اند. Badge پایه shadcn به هندسه و رنگ‌های معنایی کلاسور تطبیق داده شده است. DisplayRole برای مصرف محصول، owner (مالک)، admin (مدیر مخزن)، editor، writer، viewer (مشاهده‌گر) و anonymous (بازدیدکننده واردنشده) را جدا می‌کند؛ manager/guest برای سازگاری نمونه‌های قدیمی باقی‌اند. این قرارداد صرفاً نمایشی است و هیچ نقشی را به مجوز واقعی تبدیل نمی‌کند.

Identity مدل هویت معلوم/نامعلوم را می‌گیرد. تصویر اختیاری است؛ حروف اول نام یا نماد تزئینی و متن fallback صریح نمایش داده می‌شود. Avatar از درخت دسترس‌پذیری حذف شده تا نام دوبار خوانده نشود. هویت، نقش و مجوز از هم نتیجه‌گیری نمی‌شوند.

## وضعیت پوشش و بررسی

هفت قرارداد مرجع بالا در مرحله C پوشش دارند. گونه‌ها و حالت‌های مرجع شامل انتظار/محدودیت دکمه، ورودی invalid/readonly/disabled، انتخاب checked/unchecked/mixed، فایل empty/selected/invalid/disabled و هویت معلوم/نامعلوم در نمونه‌ها یا تعامل قابل مشاهده‌اند. hover، pressed و focus رفتار واقعی CSS/صفحه‌کلیدند؛ برچسب جعلی حالت جایگزین آن‌ها نشده است. ارجاع‌های UX همان هفت شناسه در `lib/design-system/components.json` هستند.

- `npm run build`، بررسی توکن‌ها و TypeScript در build و `npm run lint` موفق بودند.
- آزمون مرورگر: اعتبارسنجی عنوان خالی و فاصله خالی، حفظ ورودی، فوکوس خطا، انتخاب بومی، radio در RTL، Space برای checkbox/switch، حالت mixed و FormData موفق بودند.
- بارگذاری برچسب را نگه داشت، busy اعلام شد و کلیک تکراری اجرا نشد. رنگ hover برابر rgb(96,54,149) و pressed برابر rgb(77,43,120) بود.
- انتخاب فایل معتبر، رد نوع نامعتبر و فایل بزرگ، پاک‌کردن و بازگشت فوکوس بررسی شد. هیچ درخواست غیر GET در تعامل‌های تست ثبت نشد.
- شناسه تکراری یا ارجاع aria-describedby ناموجود دیده نشد. چند نمونه هم‌زمان از هر گروه در صفحه حضور دارند.
- ارتفاع‌های ۳۲/۴۰/۴۸، هدف دکمه لمسی حداقل ۴۴ و نبود سرریز سند در عرض‌های ۳۶۰/۶۴۰/۷۰۰/۱۰۲۴/۱۴۴۰ تأیید شد؛ خطای JavaScript ثبت نشد. تصاویر دسکتاپ و موبایل بازبینی شدند.
- شواهد و اسکریپت محلی در `.codex/qa-stage-c` هستند. اسکریپت از Playwright نصب‌شده در پوشه موقت QA و Chrome موجود دستگاه استفاده می‌کند؛ وابستگی QA به package.json محصول افزوده نشده است.

تست یکپارچه صفحه‌خوان و پوشش کامل مرورگرها هنوز انجام نشده و در مرحله F باقی است. مجوز واقعی، آپلود، ذخیره‌سازی، تأیید مخرب، جدول و لایه‌ها جزو تحویل این مرحله نیستند. مرحله بعد D، ناوبری، بازخورد و لایه‌هاست.
