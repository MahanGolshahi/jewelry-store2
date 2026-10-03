import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db } from "@/db";
import { portfolioItems } from "@/db/schema";
import { desc } from "drizzle-orm";
import PortfolioClient from "./PortfolioClient";

async function getPortfolio() {
  try {
    return await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
  } catch {
    return [];
  }
}

export default async function PortfolioPage() {
  const items = await getPortfolio();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f8f5ef]">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1a3a2a] to-[#0d2419] pt-28 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/20 border border-[#c9a84c]/40 rounded-full px-5 py-2 mb-6 text-[#f0d080] text-sm font-medium">
              <span>🎨</span>
              <span>نمونه کارهای ما</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              هنر{" "}
              <span style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                طلاسازی
              </span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">گوشه‌ای از آثار هنری استادان ماهر ما</p>
            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-[#1a3a2a] text-sm hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)" }}
            >
              <span>🔨</span>
              ثبت سفارش ساخت
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-[#1a3a2a] py-8">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "۱۰۰۰+", label: "طرح اجرا شده" },
              { value: "۳۰+", label: "سال تجربه" },
              { value: "۵+", label: "استاد ماهر" },
              { value: "۱۰۰%", label: "رضایت مشتری" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black mb-1" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {s.value}
                </div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">نمونه کاری یافت نشد</h3>
              <p className="text-gray-400 mb-6">داده‌های نمونه را بارگذاری کنید</p>
              <a
                href="/api/seed"
                className="inline-block px-6 py-3 rounded-full text-white text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #1a3a2a, #2d5a3d)" }}
              >
                بارگذاری داده‌های نمونه
              </a>
            </div>
          ) : (
            <PortfolioClient items={items} />
          )}

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-br from-[#1a3a2a] to-[#0d2419] rounded-3xl p-10 text-center">
            <h2 className="text-3xl font-black text-white mb-4">
              سفارش طلا با{" "}
              <span style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                طرح اختصاصی
              </span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              طرح دلخواه خود را به ما بدهید یا از نمونه کارهای موجود الهام بگیرید. استادان ما با دقت و مهارت سفارش شما را می‌سازند.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/order"
                className="px-8 py-4 rounded-full font-bold text-lg text-[#1a3a2a] hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)" }}
              >
                ثبت سفارش
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full font-bold text-lg text-[#f0d080] border-2 border-[#c9a84c] hover:bg-[#c9a84c]/20 transition-all"
              >
                مشاوره رایگان
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
