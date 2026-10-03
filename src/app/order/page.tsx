import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderForm from "./OrderForm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";

async function getProducts() {
  try {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  } catch {
    return [];
  }
}

export default async function OrderPage() {
  const allProducts = await getProducts();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f8f5ef]">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1a3a2a] to-[#0d2419] pt-28 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/20 border border-[#c9a84c]/40 rounded-full px-5 py-2 mb-6 text-[#f0d080] text-sm font-medium">
              <span>🛒</span>
              <span>ثبت سفارش آنلاین</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              ثبت{" "}
              <span style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                سفارش
              </span>
            </h1>
            <p className="text-gray-300 text-lg">فرم زیر را تکمیل کنید و سفارش خود را ثبت کنید</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="bg-white rounded-2xl p-8 text-center text-gray-500">در حال بارگذاری فرم...</div>}>
                <OrderForm products={allProducts} />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Steps */}
              <div className="bg-white rounded-2xl border border-[#c9a84c]/20 p-6">
                <h3 className="font-bold text-[#1a3a2a] text-lg mb-5 flex items-center gap-2">
                  <span className="text-[#c9a84c]">📋</span>
                  مراحل ثبت سفارش
                </h3>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "انتخاب محصول", desc: "محصول یا سفارش ساخت خود را انتخاب کنید" },
                    { step: 2, title: "تکمیل اطلاعات", desc: "اطلاعات تماس و آدرس را وارد کنید" },
                    { step: 3, title: "تأیید سفارش", desc: "کارشناس ما با شما تماس می‌گیرد" },
                    { step: 4, title: "پرداخت و ارسال", desc: "پرداخت و ارسال ایمن به در منزل" },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-[#1a3a2a] flex-shrink-0" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)" }}>
                        {s.step}
                      </div>
                      <div>
                        <div className="font-bold text-[#1a3a2a] text-sm">{s.title}</div>
                        <div className="text-gray-500 text-xs">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-[#1a3a2a] rounded-2xl p-6">
                <h3 className="font-bold text-[#f0d080] text-lg mb-5">تضمین‌های ما</h3>
                <div className="space-y-3">
                  {[
                    { icon: "🏅", text: "ضمانت ۱۰۰% اصالت طلا" },
                    { icon: "🔒", text: "پرداخت امن و مطمئن" },
                    { icon: "🚚", text: "ارسال بیمه شده سراسری" },
                    { icon: "🔄", text: "امکان مرجوع در ۱۰ روز" },
                    { icon: "📞", text: "پشتیبانی ۲۴ ساعته" },
                  ].map((g) => (
                    <div key={g.text} className="flex items-center gap-3 text-sm text-gray-300">
                      <span>{g.icon}</span>
                      <span>{g.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-2xl border border-[#c9a84c]/20 p-6">
                <h3 className="font-bold text-[#1a3a2a] text-lg mb-4">نیاز به راهنمایی؟</h3>
                <p className="text-gray-600 text-sm mb-4">کارشناسان ما آماده پاسخگویی به سؤالات شما هستند.</p>
                <a
                  href="tel:+982112345678"
                  className="flex items-center gap-2 bg-[#1a3a2a] text-[#f0d080] px-4 py-3 rounded-xl font-bold text-sm hover:bg-[#2d5a3d] transition-colors"
                >
                  <span>📞</span>
                  <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
