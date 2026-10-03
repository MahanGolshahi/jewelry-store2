import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f8f5ef]">
        {/* Header */}
        <div
          className="relative pt-28 pb-20 px-4 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0d2419 0%, #1a3a2a 50%, #0d2419 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #c9a84c 0%, transparent 60%)" }} />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              درباره{" "}
              <span style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                طلافروشی زرین
              </span>
            </h1>
            <p className="text-gray-300 text-lg">سه دهه تجربه، اعتماد و اصالت</p>
          </div>
        </div>

        {/* Story */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black text-[#1a3a2a] mb-6">
                  داستان ما
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    طلافروشی زرین در سال ۱۳۷۳ توسط استاد احمد زرین‌کار در قلب بازار بزرگ طلای تهران تأسیس شد. با بیش از سه دهه تجربه، ما به یکی از معتبرترین نام‌ها در صنعت طلا و جواهر ایران تبدیل شده‌ایم.
                  </p>
                  <p>
                    از همان ابتدا، اصول ما ساده اما محکم بوده است: کیفیت بی‌سازش، اصالت تضمین‌شده، و ارائه بهترین ارزش برای مشتریانمان. این اصول نه تنها باقی مانده‌اند، بلکه هر روز قوی‌تر می‌شوند.
                  </p>
                  <p>
                    امروز، با تیمی از استادان ماهر و هنرمند، هم محصولات آماده با طرح‌های روز دنیا ارائه می‌دهیم و هم خدمات ساخت سفارشی با دقت و ظرافت بی‌نظیر.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/5705481/pexels-photo-5705481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600"
                  alt="طلافروشی زرین"
                  className="rounded-3xl w-full object-cover aspect-square"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-[#c9a84c] to-[#f0d080] rounded-2xl p-4 text-center shadow-xl">
                  <div className="text-3xl font-black text-[#1a3a2a]">۳۰+</div>
                  <div className="text-[#1a3a2a] font-bold text-xs">سال تجربه</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-[#1a3a2a] mb-3 section-title">ارزش‌های ما</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🏅",
                  title: "اصالت",
                  desc: "تمامی محصولات ما دارای تأییدیه اتحادیه طلافروشان و شناسنامه معتبر هستند. هیچ‌گاه از اصالت طلاهایمان کوتاه نمی‌آییم.",
                },
                {
                  icon: "💎",
                  title: "کیفیت",
                  desc: "از انتخاب مواد اولیه تا تکمیل محصول، هر مرحله با دقت و کنترل کیفی سخت‌گیرانه انجام می‌شود.",
                },
                {
                  icon: "🤝",
                  title: "اعتماد",
                  desc: "بیش از ۵۰۰۰ مشتری راضی بهترین گواه اعتماد ما هستند. روابط بلندمدت با مشتریان افتخار ماست.",
                },
              ].map((v) => (
                <div key={v.title} className="text-center p-8 rounded-2xl border border-[#c9a84c]/20 hover:border-[#c9a84c]/60 hover:shadow-lg transition-all duration-300">
                  <div className="text-5xl mb-4">{v.icon}</div>
                  <h3 className="text-xl font-black text-[#1a3a2a] mb-3">{v.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-4 bg-[#f8f5ef]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-[#1a3a2a] mb-3 section-title">تیم متخصصان ما</h2>
              <p className="text-gray-600 mt-4">با تجربه‌ترین استادان طلاسازی</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "استاد احمد زرین‌کار", role: "بنیانگذار و مدیر", exp: "۳۵ سال تجربه", emoji: "👨‍💼" },
                { name: "استاد مجید طلایی", role: "طراح ارشد", exp: "۲۵ سال تجربه", emoji: "🎨" },
                { name: "خانم لیلا نقره‌کار", role: "کارشناس سنگ‌شناسی", exp: "۱۵ سال تجربه", emoji: "💎" },
                { name: "آقای رضا قلایی", role: "استاد ساخت", exp: "۲۰ سال تجربه", emoji: "🔨" },
              ].map((member) => (
                <div key={member.name} className="bg-white rounded-2xl p-6 text-center border border-[#c9a84c]/20 hover:border-[#c9a84c]/60 hover:shadow-lg transition-all duration-300">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1a3a2a] to-[#2d5a3d] flex items-center justify-center text-4xl mx-auto mb-4">
                    {member.emoji}
                  </div>
                  <h3 className="font-bold text-[#1a3a2a] mb-1">{member.name}</h3>
                  <div className="text-[#c9a84c] font-medium text-sm mb-1">{member.role}</div>
                  <div className="text-gray-400 text-xs">{member.exp}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section className="py-20 px-4 bg-[#1a3a2a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-white mb-3 section-title" style={{ color: "#f0d080" }}>مجوزها و تأییدیه‌ها</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: "🏆", title: "عضو اتحادیه", sub: "اتحادیه طلا و جواهر تهران" },
                { icon: "🎖️", title: "گواهی کیفیت", sub: "استاندارد ملی ایران" },
                { icon: "📜", title: "پروانه کسب", sub: "اداره اماکن عمومی" },
                { icon: "💯", title: "ضمانت‌نامه", sub: "اصالت طلا و جواهر" },
              ].map((c) => (
                <div key={c.title} className="bg-[#2d5a3d] rounded-2xl p-6 text-center border border-[#c9a84c]/20">
                  <div className="text-4xl mb-3">{c.icon}</div>
                  <div className="text-[#f0d080] font-bold mb-1">{c.title}</div>
                  <div className="text-gray-400 text-xs">{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-[#f8f5ef]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-[#1a3a2a] mb-4">آماده همکاری هستیم</h2>
            <p className="text-gray-600 mb-8">برای خرید، مشاوره یا سفارش ساخت با ما در تماس باشید.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 rounded-full font-bold text-[#1a3a2a] text-lg hover:opacity-90" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)" }}>
                تماس با ما
              </Link>
              <Link href="/products" className="px-8 py-4 rounded-full font-bold text-[#1a3a2a] text-lg border-2 border-[#1a3a2a] hover:bg-[#1a3a2a]/10 transition-colors">
                مشاهده محصولات
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
