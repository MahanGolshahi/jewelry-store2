import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "طلافروشی زرین | طلا و جواهر اصیل ایرانی",
  description: "طلافروشی زرین - ارائه بهترین طلا و جواهرات اصیل با کیفیت عالی و قیمت مناسب. سفارش آنلاین، مشاوره رایگان.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Vazirmatn', 'Segoe UI', sans-serif", backgroundColor: "#f8f5ef" }}>
        {children}
      </body>
    </html>
  );
}
