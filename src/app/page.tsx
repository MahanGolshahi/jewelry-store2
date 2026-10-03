import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

async function getFeaturedProducts() {
  try {
    return await db.select().from(products).where(eq(products.featured, true)).orderBy(desc(products.createdAt)).limit(8);
  } catch {
    return [];
  }
}

const stats = [
  { value: "۳۰+", label: "سال تجربه" },
  { value: "۵۰۰۰+", label: "مشتری راضی" },
  { value: "۱۰۰%", label: "ضمانت اصالت" },
  { value: "۲۴/۷", label: "پشتیبانی" },
];

const categories = [
  { href: "/products?category=ring", emoji: "💍", label: "انگشتر", color: "from-yellow-900/20 to-yellow-700/20" },
  { href: "/products?category=necklace", emoji: "📿", label: "گردنبند", color: "from-green-900/20 to-green-700/20" },
  { href: "/products?category=bracelet", emoji: "🪬", label: "دستبند", color: "from-yellow-900/20 to-yellow-700/20" },
  { href: "/products?category=earring", emoji: "✨", label: "گوشواره", color: "from-green-900/20 to-green-700/20" },
  { href: "/products?category=set", emoji: "👑", label: "ست کامل", color: "from-yellow-900/20 to-yellow-700/20" },
  { href: "/products", emoji: "🏆", label: "همه محصولات", color: "from-green-900/20 to-green-700/20" },
];

const features = [
  {
    icon: "🏅",
    title: "ضمانت اصالت طلا",
    desc: "تمامی محصولات ما دارای شناسنامه طلا و اتحادیه طلافروشان هستند.",
  },
  {
    icon: "🚚",
    title: "ارسال ایمن سراسری",
    desc: "ارسال با پیک موتوری امن یا پست پیشتاز به تمام نقاط ایران.",
  },
  {
    icon: "💎",
    title: "ساخت سفارشی",
    desc: "امکان ساخت طلا با طرح اختصاصی و دلخواه شما توسط استادان ماهر.",
  },
  {
    icon: "🔄",
    title: "امکان تعویض",
    desc: "در صورت عدم رضایت، تعویض یا بازگشت وجه در ۱۰ روز کاری.",
  },
  {
    icon: "💰",
    title: "قیمت روز طلا",
    desc: "قیمت‌گذاری بر اساس نرخ روز طلا و حداقل اجرت ساخت.",
  },
  {
    icon: "📞",
    title: "مشاوره رایگان",
    desc: "مشاوره رایگان برای انتخاب بهترین طلا متناسب با بودجه شما.",
  },
];

const testimonials = [
  {
    name: "سارا احمدی",
    text: "واقعاً از کیفیت طلاهاشون راضی‌ام. ست عروسیم رو از اینجا خریدم و همه تعریفش رو کردن. قیمتم منصفانه بود.",
    stars: 5,
    product: "ست عروس ۱۸ عیار",
  },
  {
    name: "محمد رضایی",
    text: "برای هدیه سالگرد ازدواجم یه گردنبند سفارش دادم. خیلی سریع آماده شد و بسته‌بندیش هم خیلی شیک بود.",
    stars: 5,
    product: "گردنبند طلا",
  },
  {
    name: "نرگس محمدی",
    text: "چند بار از اینجا خرید کردم. هربار کیفیت عالی و خدمات خوب. اعتماد به جواهرفروش مهمه و این مغازه اعتمادم رو جلب کرده.",
    stars: 5,
    product: "دستبند و انگشتر",
  },
];

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/5705481/pexels-photo-5705481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d2419]/90 via-[#1a3a2a]/80 to-[#0d2419]/90" />

        {/* Decorative circles */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full border border-[#c9a84c]/20 animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full border border-[#c9a84c]/15 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full border border-[#c9a84c]/10 animate-pulse" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/20 border border-[#c9a84c]/40 rounded-full px-5 py-2 mb-6 text-[#f0d080] text-sm font-medium">
            <span>✨</span>
            <span>بیش از ۳۰ سال تجربه در صنعت طلا</span>
            <span>✨</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            طلافروشی{" "}
            <span style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080, #c9a84c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              زرین
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            از خرید آنلاین تا ساخت سفارشی — بهترین طلا و جواهرات اصیل ایرانی با ضمانت کامل اصالت
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 rounded-full text-[#1a3a2a] font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#c9a84c]/30"
              style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080, #c9a84c)" }}
            >
              مشاهده محصولات
            </Link>
            <Link
              href="/order"
              className="px-8 py-4 rounded-full text-[#f0d080] font-bold text-lg border-2 border-[#c9a84c] hover:bg-[#c9a84c]/20 transition-all duration-300"
            >
              ثبت سفارش
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 rounded-full text-white font-bold text-lg border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
            >
              نمونه کارها
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#c9a84c] animate-bounce">
          <span className="text-xs">اسکرول کنید</span>
          <span className="text-lg">↓</span>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1a3a2a] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black mb-1" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold Price Banner */}
      <section className="bg-gradient-to-r from-[#c9a84c] via-[#f0d080] to-[#c9a84c] py-3 overflow-hidden">
        <div className="flex items-center gap-8 text-[#1a3a2a] text-sm font-bold whitespace-nowrap animate-marquee">
          <span>💰 قیمت طلا ۱۸ عیار: ۳,۵۶۰,۰۰۰ تومان/گرم</span>
          <span>•</span>
          <span>🏆 انس جهانی طلا: $۲,۳۸۵</span>
          <span>•</span>
          <span>💎 مثقال طلا: ۴۲,۸۵۰,۰۰۰ تومان</span>
          <span>•</span>
          <span>✨ ارسال رایگان برای خریدهای بالای ۵۰ میلیون تومان</span>
          <span>•</span>
          <span>🎁 مشاوره رایگان: ۰۹۱۲-۱۲۳۴۵۶۷</span>
          <span>•</span>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 bg-[#f8f5ef]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a3a2a] mb-3 section-title">
              دسته‌بندی محصولات
            </h2>
            <p className="text-gray-600 mt-4">بهترین انتخاب را از میان محصولات متنوع ما بیابید</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`bg-gradient-to-br ${cat.color} border border-[#c9a84c]/30 rounded-2xl p-6 text-center hover:border-[#c9a84c] hover:shadow-lg hover:shadow-[#c9a84c]/20 transition-all duration-300 hover:-translate-y-1 group`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{cat.emoji}</div>
                <div className="text-[#1a3a2a] font-bold text-sm">{cat.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a3a2a] mb-3 section-title">
              محصولات ویژه
            </h2>
            <p className="text-gray-600 mt-4">منتخب بهترین طلاجات از کلکسیون طلافروشی زرین</p>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">💎</div>
              <p className="text-gray-500 mb-6">در حال بارگذاری محصولات...</p>
              <Link
                href="/api/seed"
                className="inline-block px-6 py-3 rounded-full text-white text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #1a3a2a, #2d5a3d)" }}
              >
                بارگذاری داده‌های نمونه
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[#1a3a2a] font-bold border-2 border-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-300"
            >
              مشاهده همه محصولات
              <span>←</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-[#f8f5ef]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a3a2a] mb-3 section-title">
              چرا طلافروشی زرین؟
            </h2>
            <p className="text-gray-600 mt-4">مزایایی که ما را از رقبا متمایز می‌کند</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-[#c9a84c]/20 hover:border-[#c9a84c]/60 hover:shadow-xl hover:shadow-[#c9a84c]/10 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="text-[#1a3a2a] font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a2a] to-[#0d2419]" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #c9a84c 0%, transparent 60%), radial-gradient(circle at 80% 50%, #c9a84c 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            طلای سفارشی با طرح{" "}
            <span style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>دلخواه</span>{" "}
            شما
          </h2>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            می‌توانید طرح موردنظر خود را به ما بدهید. استادان ماهر ما با دقت و ظرافت کامل سفارش شما را می‌سازند.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="px-8 py-4 rounded-full font-bold text-lg text-[#1a3a2a] transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080, #c9a84c)" }}
            >
              ثبت سفارش ساخت
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full font-bold text-lg text-[#f0d080] border-2 border-[#c9a84c] hover:bg-[#c9a84c]/20 transition-all duration-300"
            >
              مشاوره رایگان
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a3a2a] mb-3 section-title">
              نظرات مشتریان
            </h2>
            <p className="text-gray-600 mt-4">تجربه خرید مشتریان راضی ما</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[#f8f5ef] rounded-2xl p-6 border border-[#c9a84c]/20">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-[#c9a84c]">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a3a2a] to-[#2d5a3d] flex items-center justify-center text-[#f0d080] font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[#1a3a2a] text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.product}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 px-4 bg-[#f8f5ef]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a3a2a] mb-3 section-title">
              نمونه کارهای ما
            </h2>
            <p className="text-gray-600 mt-4">گوشه‌ای از هنر استادان ما</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "https://images.pexels.com/photos/29502923/pexels-photo-29502923.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
              "https://images.pexels.com/photos/29502496/pexels-photo-29502496.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
              "https://images.pexels.com/photos/32700179/pexels-photo-32700179.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
              "https://images.pexels.com/photos/28146843/pexels-photo-28146843.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
              "https://images.pexels.com/photos/30746014/pexels-photo-30746014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
              "https://images.pexels.com/photos/20858959/pexels-photo-20858959.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
            ].map((url, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer">
                <img
                  src={url}
                  alt={`نمونه کار ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a2a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-[#f0d080] font-bold text-sm">مشاهده جزئیات</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[#1a3a2a] font-bold border-2 border-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-300"
            >
              مشاهده همه نمونه کارها
              <span>←</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Quick */}
      <section className="py-16 px-4 bg-[#1a3a2a]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "📞",
                title: "تماس تلفنی",
                value: "۰۲۱-۱۲۳۴۵۶۷۸",
                sub: "شنبه تا چهارشنبه ۹ تا ۲۰",
                href: "tel:+982112345678",
              },
              {
                icon: "📱",
                title: "واتساپ و تلگرام",
                value: "۰۹۱۲-۱۲۳۴۵۶۷",
                sub: "پاسخگویی ۲۴ ساعته",
                href: "https://wa.me/989121234567",
              },
              {
                icon: "📍",
                title: "آدرس فروشگاه",
                value: "تهران، بازار بزرگ طلا",
                sub: "راسته طلافروشان، پلاک ۱۲",
                href: "#",
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="bg-[#2d5a3d] rounded-2xl p-6 flex items-center gap-4 border border-[#c9a84c]/20 hover:border-[#c9a84c]/60 hover:bg-[#3d7a52] transition-all duration-300 group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <div>
                  <div className="text-[#f0d080] font-bold text-sm mb-1">{item.title}</div>
                  <div className="text-white font-bold">{item.value}</div>
                  <div className="text-gray-400 text-xs">{item.sub}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
