import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f8f5ef]">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1a3a2a] to-[#0d2419] pt-28 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              تماس{" "}
              <span style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                با ما
              </span>
            </h1>
            <p className="text-gray-300 text-lg">همیشه آماده پاسخگویی به سؤالات شما هستیم</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Info Cards */}
              {[
                {
                  icon: "📞",
                  title: "تلفن تماس",
                  items: ["۰۲۱-۱۲۳۴۵۶۷۸", "۰۲۱-۸۷۶۵۴۳۲۱"],
                  sub: "شنبه تا چهارشنبه: ۹ تا ۲۰ | پنجشنبه: ۹ تا ۱۴",
                },
                {
                  icon: "📱",
                  title: "موبایل و پیام‌رسان",
                  items: ["۰۹۱۲-۱۲۳۴۵۶۷"],
                  sub: "واتساپ، تلگرام — پاسخگویی ۲۴ ساعته",
                },
                {
                  icon: "✉️",
                  title: "ایمیل",
                  items: ["info@zarringold.ir", "order@zarringold.ir"],
                  sub: "پاسخ در کمتر از ۲۴ ساعت",
                },
                {
                  icon: "📍",
                  title: "آدرس فروشگاه",
                  items: ["تهران، بازار بزرگ طلا"],
                  sub: "راسته طلافروشان، پلاک ۱۲ | کد پستی: ۱۱۱۱۱-۱۱۱۱۱",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl border border-[#c9a84c]/20 p-6 hover:border-[#c9a84c]/60 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-[#1a3a2a] mb-2">{item.title}</h3>
                      {item.items.map((i) => (
                        <div key={i} className="text-gray-700 font-medium text-sm mb-0.5">{i}</div>
                      ))}
                      <div className="text-gray-500 text-xs mt-1">{item.sub}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Social */}
              <div className="bg-[#1a3a2a] rounded-2xl p-6">
                <h3 className="font-bold text-[#f0d080] mb-4">شبکه‌های اجتماعی</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "📸", label: "اینستاگرام", handle: "@zarringold" },
                    { icon: "📢", label: "کانال تلگرام", handle: "@zarringold_ir" },
                    { icon: "📘", label: "فیسبوک", handle: "Zarrin Gold" },
                    { icon: "🐦", label: "توییتر", handle: "@zarringold" },
                  ].map((s) => (
                    <a key={s.label} href="#" className="bg-[#2d5a3d] rounded-xl p-3 hover:bg-[#3d7a52] transition-colors">
                      <div className="text-2xl mb-1">{s.icon}</div>
                      <div className="text-[#f0d080] font-bold text-xs">{s.label}</div>
                      <div className="text-gray-400 text-xs">{s.handle}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />

              {/* Map placeholder */}
              <div className="mt-8 bg-white rounded-2xl border border-[#c9a84c]/20 overflow-hidden">
                <div className="bg-[#f8f5ef] h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-3">🗺️</div>
                    <div className="font-bold text-[#1a3a2a] mb-1">موقعیت فروشگاه</div>
                    <div className="text-gray-500 text-sm">تهران، بازار بزرگ طلا، راسته طلافروشان، پلاک ۱۲</div>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 px-4 py-2 rounded-full text-sm font-bold text-[#1a3a2a] hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)" }}
                    >
                      مشاهده در نقشه
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
