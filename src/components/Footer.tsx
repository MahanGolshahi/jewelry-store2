import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0d2419] text-gray-300 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl border-2 border-[#c9a84c] bg-[#1a3a2a]">
                💎
              </div>
              <div>
                <div className="text-[#f0d080] font-bold text-lg">طلافروشی زرین</div>
                <div className="text-[#c9a84c] text-xs">Zarrin Gold</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              بیش از ۳۰ سال تجربه در عرضه بهترین طلا و جواهرات اصیل ایرانی. کیفیت، اصالت و اعتماد شعار ماست.
            </p>
            <div className="flex gap-3">
              {["📘", "📸", "📢", "🐦"].map((icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-[#1a3a2a] border border-[#c9a84c]/30 flex items-center justify-center text-base hover:border-[#c9a84c] hover:bg-[#2d5a3d] transition-all duration-300">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#f0d080] font-bold text-base mb-5 pb-2 border-b border-[#c9a84c]/30">
              دسترسی سریع
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "صفحه اصلی" },
                { href: "/products", label: "محصولات" },
                { href: "/portfolio", label: "نمونه کارها" },
                { href: "/order", label: "ثبت سفارش" },
                { href: "/contact", label: "تماس با ما" },
                { href: "/about", label: "درباره ما" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[#f0d080] transition-colors flex items-center gap-2">
                    <span className="text-[#c9a84c] text-xs">◆</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[#f0d080] font-bold text-base mb-5 pb-2 border-b border-[#c9a84c]/30">
              دسته‌بندی محصولات
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/products?category=ring", label: "انگشتر طلا" },
                { href: "/products?category=necklace", label: "گردنبند طلا" },
                { href: "/products?category=bracelet", label: "دستبند طلا" },
                { href: "/products?category=earring", label: "گوشواره طلا" },
                { href: "/products?category=set", label: "ست طلا" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[#f0d080] transition-colors flex items-center gap-2">
                    <span className="text-[#c9a84c] text-xs">◆</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#f0d080] font-bold text-base mb-5 pb-2 border-b border-[#c9a84c]/30">
              اطلاعات تماس
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5">📍</span>
                <span className="text-sm text-gray-400">تهران، بازار بزرگ طلا، راسته طلافروشان، پلاک ۱۲</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#c9a84c]">📞</span>
                <a href="tel:+982112345678" className="text-sm text-gray-400 hover:text-[#f0d080] transition-colors">۰۲۱-۱۲۳۴۵۶۷۸</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#c9a84c]">📱</span>
                <a href="tel:+989121234567" className="text-sm text-gray-400 hover:text-[#f0d080] transition-colors">۰۹۱۲-۱۲۳۴۵۶۷</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#c9a84c]">✉️</span>
                <a href="mailto:info@zarringold.ir" className="text-sm text-gray-400 hover:text-[#f0d080] transition-colors">info@zarringold.ir</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a84c] mt-0.5">🕐</span>
                <div className="text-sm text-gray-400">
                  <div>شنبه تا چهارشنبه: ۹ - ۲۰</div>
                  <div>پنجشنبه: ۹ - ۱۴</div>
                  <div>جمعه: تعطیل</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Gold Price Ticker */}
        <div className="bg-[#1a3a2a] border border-[#c9a84c]/30 rounded-xl px-6 py-4 mb-8">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <span className="text-[#f0d080] font-bold">قیمت لحظه‌ای طلا:</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">مثقال ۱۸ عیار:</span>
              <span className="text-green-400 font-bold">۴۲,۸۵۰,۰۰۰ تومان</span>
              <span className="text-green-400 text-xs">▲ ۲.۳%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">گرم ۱۸ عیار:</span>
              <span className="text-green-400 font-bold">۳,۵۶۰,۰۰۰ تومان</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">انس جهانی:</span>
              <span className="text-[#f0d080] font-bold">$۲,۳۸۵</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#c9a84c]/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© ۱۴۰۴ طلافروشی زرین — تمامی حقوق محفوظ است</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#f0d080] transition-colors">حریم خصوصی</a>
            <a href="#" className="hover:text-[#f0d080] transition-colors">قوانین و مقررات</a>
            <a href="#" className="hover:text-[#f0d080] transition-colors">ضمانت اصالت</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
