"use client";
import { useState } from "react";

const subjects = [
  "استعلام قیمت",
  "سفارش ساخت اختصاصی",
  "پیگیری سفارش",
  "ضمانت و مرجوعی",
  "مشاوره خرید",
  "شکایت و انتقاد",
  "پیشنهاد و همکاری",
  "سایر",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    body: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.body) {
      setError("لطفاً فیلدهای ستاره‌دار را تکمیل کنید.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("خطا در ارسال پیام. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-[#c9a84c]/20 p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6">
          ✅
        </div>
        <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">پیام شما ارسال شد!</h2>
        <p className="text-gray-600 mb-6">
          کارشناسان ما در اسرع وقت با شماره <strong>{form.phone}</strong> با شما تماس خواهند گرفت.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ fullName: "", phone: "", email: "", subject: "", body: "" });
          }}
          className="px-6 py-3 rounded-xl font-bold text-[#1a3a2a] transition-colors"
          style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)" }}
        >
          ارسال پیام جدید
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#c9a84c]/20 p-8">
      <h2 className="text-2xl font-black text-[#1a3a2a] mb-8 flex items-center gap-2">
        <span>💬</span>
        ارسال پیام
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-gray-700 font-bold text-sm mb-2">
            نام و نام خانوادگی <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="علی محمدی"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#c9a84c] text-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold text-sm mb-2">
            شماره تماس <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="۰۹۱۲۱۲۳۴۵۶۷"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#c9a84c] text-sm"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold text-sm mb-2">ایمیل (اختیاری)</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ali@example.com"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#c9a84c] text-sm"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold text-sm mb-2">موضوع پیام</label>
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#c9a84c] text-sm bg-white"
          >
            <option value="">-- انتخاب موضوع --</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-bold text-sm mb-2">
          متن پیام <span className="text-red-500">*</span>
        </label>
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          rows={6}
          placeholder="پیام خود را اینجا بنویسید..."
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#c9a84c] text-sm resize-none"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-600 text-sm flex items-center gap-2">
          <span>❌</span>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl font-black text-lg text-[#1a3a2a] transition-all duration-300 disabled:opacity-60 hover:opacity-90"
        style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080, #c9a84c)" }}
      >
        {loading ? "در حال ارسال..." : "📨 ارسال پیام"}
      </button>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        {[
          { icon: "⚡", label: "پاسخ سریع" },
          { icon: "🔒", label: "اطلاعات محرمانه" },
          { icon: "💯", label: "پشتیبانی کامل" },
        ].map((g) => (
          <div key={g.label} className="bg-[#f8f5ef] rounded-xl p-3">
            <div className="text-xl mb-1">{g.icon}</div>
            <div className="text-xs text-gray-600 font-medium">{g.label}</div>
          </div>
        ))}
      </div>
    </form>
  );
}
