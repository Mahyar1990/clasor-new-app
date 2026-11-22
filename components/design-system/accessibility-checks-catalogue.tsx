import Link from "next/link";
import { glass } from "@/lib/design-system/classes";
import { catalogueHref, type CatalogueSection } from "./catalogue-sections";
import { Sample } from "./sample";

const checks: {
  id: string;
  title: string;
  instructions: string;
  expected: string;
  examples: { section: CatalogueSection; anchor: string; label: string }[];
}[] = [
  {
    id: "keyboard-focus",
    title: "فوکوس و صفحه‌کلید",
    instructions: "با Tab و Shift+Tab بین کنترل‌ها حرکت کنید. تب‌ها را با کلیدهای جهت عوض کنید. منو یا دیالوگ را باز کنید، با Escape ببندید و محل فوکوس را بررسی کنید.",
    expected: "فوکوس همیشه دیده می‌شود، با انتخاب اشتباه گرفته نمی‌شود و پس از بستن به کنترل بازکننده برمی‌گردد. فیلد فقط‌خواندنی قابل فوکوس است؛ غیرفعال وارد ترتیب Tab نمی‌شود.",
    examples: [
      { section: "inputs", anchor: "glass-control-states", label: "فوکوس و حالت‌های فیلد" },
      { section: "navigation", anchor: "glass-default-tabs", label: "تب‌ها و فوکوس در RTL" },
      { section: "overlays", anchor: "glass-layer-states", label: "بازگشت فوکوس در لایه‌ها" },
    ],
  },
  {
    id: "contrast",
    title: "کنتراست و خوانایی",
    instructions: "متن اصلی، متن راهنما، نشان خطا و حلقهٔ فوکوس را روی سطح واقعیِ نمونه اندازه بگیرید. برای منو، زمینهٔ پرنوشته را هم فعال کنید.",
    expected: "متن و فوکوس در هر دو تم خوانا هستند و وضعیت‌هایی مثل خطا یا موفقیت فقط با رنگ منتقل نمی‌شوند.",
    examples: [
      { section: "colors", anchor: "semantic-title", label: "رنگ‌های معنایی" },
      { section: "status", anchor: "glass-status-states", label: "خوانایی نشان‌ها و هویت" },
      { section: "overlays", anchor: "glass-options-title", label: "منو روی زمینهٔ پرنوشته" },
    ],
  },
  {
    id: "reduced-motion",
    title: "کاهش حرکت",
    instructions: "کاهش حرکت را در دستگاه فعال کنید. دکمه را هاور کنید، منو و دیالوگ را باز و بسته کنید و مقدار نوار پیشرفت را تغییر دهید.",
    expected: "جابه‌جایی دکمه و گذارهای منو، دیالوگ و نوار حذف می‌شوند. مقدار پیشرفت و نتیجهٔ عمل همچنان فوری نمایش داده می‌شوند.",
    examples: [
      { section: "buttons", anchor: "glass-actions-catalogue", label: "حرکت دکمه‌ها" },
      { section: "overlays", anchor: "glass-layer-states", label: "حرکت دیالوگ و اعلان" },
      { section: "feedback", anchor: "glass-feedback-states", label: "پیشرفت و اسکلت بارگذاری" },
    ],
  },
  {
    id: "solid-material",
    title: "حالت بدون شفافیت",
    instructions: "از «نمای سطح» در هدر، «بدون شفافیت» را انتخاب کنید. همان نمونه را با حالت شیشه‌ای مقایسه کنید و منوی آن را باز کنید.",
    expected: "سطح نمونه و منوی شناور خوانا و مات‌اند؛ انتخاب، خطا و فوکوس همچنان از هم قابل تشخیص‌اند.",
    examples: [
      { section: "layout", anchor: "material-title", label: "سطح، ورودی و منوی نمونه" },
      { section: "inputs", anchor: "glass-control-states", label: "کنترل‌ها روی سطح مات" },
    ],
  },
];

export function AccessibilityChecksCatalogue() {
  return <Sample title="آزمون عملی دسترس‌پذیری" description="هر آزمون را یک‌بار در «روشن» و یک‌بار در «تاریک» انجام دهید. از انتخاب‌گر تم در هدر استفاده کنید؛ انتخاب شما با رفتن به صفحهٔ نمونه حفظ می‌شود.">
    <ol data-test-id="accessibility-checks" className="grid gap-4 md:grid-cols-2">
      {checks.map(check => <li key={check.id} data-test-id={`accessibility-check-${check.id}`} className={`${glass.contentSurface} min-w-0 space-y-3 p-4 text-sm leading-body`}>
        <h4 data-test-id={`accessibility-title-${check.id}`} className="font-semibold">{check.title}</h4>
        <p data-test-id={`accessibility-instructions-${check.id}`}>{check.instructions}</p>
        <p data-test-id={`accessibility-expected-${check.id}`} className="text-muted-foreground"><strong data-test-id={`accessibility-expected-label-${check.id}`}>نتیجهٔ مورد انتظار:</strong> {check.expected}</p>
        <ul data-test-id={`accessibility-examples-${check.id}`} className="flex flex-wrap gap-x-4 gap-y-2">
          {check.examples.map(example => <li key={example.anchor} data-test-id={`accessibility-example-${check.id}-${example.anchor}`}>
            <Link data-test-id={`accessibility-link-${check.id}-${example.anchor}`} className={`${glass.breadcrumbLink} inline-flex min-h-11 items-center text-[color:var(--panel-link)]`} href={`${catalogueHref(example.section)}#${example.anchor}`}>{example.label}</Link>
          </li>)}
        </ul>
      </li>)}
    </ol>
  </Sample>;
}
