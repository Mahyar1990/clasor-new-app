import type { Metadata } from "next";
import localFont from "next/font/local";
import { DirectionProvider } from "@/components/ui/direction";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

// Existing product assets; retain the product's IRANYekan license obligations.
const yekan = localFont({
  src: [
    { path: "./design-assets/IRANYekanRegular.ttf", weight: "400", style: "normal" },
    { path: "./design-assets/IRANYekanMedium.ttf", weight: "500", style: "normal" },
    { path: "./design-assets/IRANYekanBold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-iranyekan",
  fallback: ["Tahoma", "sans-serif"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "سیستم طراحی کلاسور",
  description: "کتابخانه طراحی فارسی و راست‌به‌چپ کلاسور",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html data-test-id="layout-html-1"
      lang="fa"
      dir="rtl"
      className={`${yekan.variable} h-full antialiased`}
    >
      <body data-test-id="layout-body-2" className="min-h-full flex flex-col">
        <DirectionProvider direction="rtl">{children}<Toaster /></DirectionProvider>
      </body>
    </html>
  );
}
