"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: string;
  karat: string | null;
  category: string;
  imageUrl: string | null;
  discount: number | null;
  stock: number;
};

const categoryLabels: Record<string, string> = {
  ring: "انگشتر",
  necklace: "گردنبند",
  bracelet: "دستبند",
  earring: "گوشواره",
  set: "ست",
  other: "سایر",
};

export default function OrderForm({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderRef, setOrderRef] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    productId: "",
    quantity: "1",
    notes: "",
    orderType: "product", // product or custom
    customDescription: "",
    customBudget: "",
  });

  useEffect(() => {
    const productId = searchParams.get("product");
    if (productId) {
      setForm((f) => ({ ...f, productId }));
    }
  }, [searchParams]);

  const selectedProduct = products.find((p) => p.id === parseInt(form.productId));
  const discountedPrice = selectedProduct
    ? Math.round(parseFloat(selectedProduct.price) * (1 - (selectedProduct.discount || 0) / 100))
    : 0;
  const totalPrice = discountedPrice * parseInt(form.quantity || "1");
  const formatPrice = (p: number) => new Intl.NumberFormat("fa-IR").format(p) + " تومان";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.address || !form.city) {
      setError("لطفاً تمام فیلدهای ستاره‌دار را تکمیل کنید.");
      return;
    }
    if (form.orderType === "product" && !form.productId) {
      setError("لطفاً محصول مورد نظر را انتخاب کنید.");
      return;
    }

    setLoading(true);
    try {
      const body =
        form.orderType === "product"
          ? {
              fullName: form.fullName,
              phone: form.phone,
              email: form.email || undefined,
              address: form.address,
              city: form.city,
              productId: parseInt(form.productId),
              quantity: parseInt(form.quantity),
              notes: form.notes || undefined,
            }
          : {
              fullName: form.fullName,
              phone: form.phone,
              email: form.email || undefined,
              address: form.address,
              city: form.city,
              productName: "سفارش ساخت سفارشی",
              quantity: 1,
              notes: `سفارش ساخت: ${form.customDescription} | بودجه: ${form.customBudget}`,
            };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("خطا در ثبت سفارش");
      const data = await res.json();
      setOrderRef(`ZR-${String(data.id).padStart(5, "0")}`);
      setSubmitted(true);
    } catch {
      setError("خطا در ارسال سفارش. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-[#c9a84c]/20 p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
        <h2 className="text-2xl font-black text-[#1a3a2a] mb-3">سفارش شما ثبت شد!</h2>
        <div className="bg-[#f8f5ef] rounded-xl p-4 mb-6">
          <div className="text-gray-500 text-sm mb-1">کد پیگیری سفارش:</div>
          <div className="text-2xl font-black text-[#c9a84c]">{orderRef}</div>
        </div>
        <p className="text-gray-600 mb-2">کارشناسان ما در اسرع وقت با شماره <strong>{form.phone}</strong> با شما تماس خواهند گرفت.</p>
        <p className="text-gray-500 text-sm mb-8">ساعات پاسخگویی: شنبه تا چهارشنبه ۹ تا ۲۰ — پنجشنبه ۹ تا ۱۴</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="px-6 py-3 rounded-xl border-2 border-[#c9a84c] text-[#c9a84c] font-bold hover:bg-[#c9a84c]/10 transition-colors"
          >
            مشاهده محصولات
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl font-bold text-[#1a3a2a] transition-colors"
            style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)" }}
          >
            بازگشت به خانه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#c9a84c]/20 p-8">
      <h2 className="text-2xl font-black text-[#1a3a2a] mb-8 flex items-center gap-2">
        <span>📝</span>
        فرم ثبت سفارش
      </h2>

      {/* Order Type */}
      <div className="mb-8">
        <label className="block text-[#1a3a2a] font-bold mb-3">نوع سفارش</label>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "product", icon: "🛍️", label: "خرید محصول موجود" },
            { value: "custom", icon: "🔨", label: "سفارش ساخت اختصاصی" },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                form.orderType === opt.value
                  ? "border-[#c9a84c] bg-[#c9a84c]/10"
                  : "border-gray-200 hover:border-[#c9a84c]/50"
              }`}
            >
              <input
                type="radio"
                name="orderType"
                value={opt.value}
                checked={form.orderType === opt.value}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-2xl">{opt.icon}</span>
              <span className="font-bold text-sm text-[#1a3a2a]">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Product Selection */}
      {form.orderType === "product" && (
        <div className="mb-6">
          <label className="block text-[#1a3a2a] font-bold mb-2">
            انتخاب محصول <span className="text-red-500">*</span>
          </label>
          <select
            name="productId"
            value={form.productId}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#c9a84c] bg-white text-sm"
          >
            <option value="">-- محصول را انتخاب کنید --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id} disabled={p.stock === 0}>
                {p.name} {p.karat ? `(${p.karat})` : ""} — {new Intl.NumberFormat("fa-IR").format(parseFloat(p.price))} تومان{p.stock === 0 ? " [ناموجود]" : ""}
              </option>
            ))}
          </select>

          {selectedProduct && (
            <div className="mt-3 bg-[#f8f5ef] rounded-xl p-4 flex items-center gap-4">
              {selectedProduct.imageUrl && (
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-16 h-16 rounded-lg object-cover" />
              )}
              <div className="flex-1">
                <div className="font-bold text-[#1a3a2a] text-sm">{selectedProduct.name}</div>
                <div className="text-xs text-gray-500">{categoryLabels[selectedProduct.category]} | {selectedProduct.karat}</div>
                <div className="text-[#c9a84c] font-black">{formatPrice(discountedPrice)}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quantity */}
      {form.orderType === "product" && selectedProduct && (
        <div className="mb-6">
          <label className="block text-[#1a3a2a] font-bold mb-2">تعداد</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, quantity: String(Math.max(1, parseInt(f.quantity) - 1)) }))}
              className="w-10 h-10 rounded-full border-2 border-[#c9a84c] text-[#c9a84c] font-black text-xl flex items-center justify-center hover:bg-[#c9a84c]/10 transition-colors"
            >
              −
            </button>
            <span className="w-12 text-center font-black text-lg text-[#1a3a2a]">{form.quantity}</span>
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, quantity: String(Math.min(selectedProduct.stock, parseInt(f.quantity) + 1)) }))}
              className="w-10 h-10 rounded-full border-2 border-[#c9a84c] text-[#c9a84c] font-black text-xl flex items-center justify-center hover:bg-[#c9a84c]/10 transition-colors"
            >
              +
            </button>
            <span className="text-sm text-gray-500">موجودی: {selectedProduct.stock} عدد</span>
          </div>
          {selectedProduct && (
            <div className="mt-3 bg-[#1a3a2a] rounded-xl px-4 py-3 flex justify-between items-center">
              <span className="text-gray-300 text-sm">مجموع:</span>
              <span className="text-[#f0d080] font-black text-lg">{formatPrice(totalPrice)}</span>
            </div>
          )}
        </div>
      )}

      {/* Custom Order */}
      {form.orderType === "custom" && (
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-[#1a3a2a] font-bold mb-2">
              توضیحات سفارش ساخت <span className="text-red-500">*</span>
            </label>
            <textarea
              name="customDescription"
              value={form.customDescription}
              onChange={handleChange}
              rows={4}
              placeholder="طرح، نوع طلا، سنگ مورد نظر، ابعاد و هر جزئیاتی که می‌خواهید..."
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#c9a84c] text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-[#1a3a2a] font-bold mb-2">بودجه تقریبی</label>
            <input
              type="text"
              name="customBudget"
              value={form.customBudget}
              onChange={handleChange}
              placeholder="مثال: ۵۰ میلیون تومان"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#c9a84c] text-sm"
            />
          </div>
        </div>
      )}

      <div className="border-t border-gray-100 pt-6 mb-6" />

      {/* Personal Info */}
      <h3 className="font-bold text-[#1a3a2a] text-lg mb-4 flex items-center gap-2">
        <span>👤</span>
        اطلاعات شخصی
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
        <div className="md:col-span-2">
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
      </div>

      {/* Address */}
      <h3 className="font-bold text-[#1a3a2a] text-lg mb-4 flex items-center gap-2">
        <span>📍</span>
        آدرس تحویل
      </h3>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-gray-700 font-bold text-sm mb-2">
            شهر <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="تهران"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#c9a84c] text-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold text-sm mb-2">
            آدرس کامل <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={3}
            placeholder="خیابان، کوچه، پلاک، واحد..."
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#c9a84c] text-sm resize-none"
          />
        </div>
      </div>

      {/* Notes */}
      <div className="mb-8">
        <label className="block text-gray-700 font-bold text-sm mb-2">توضیحات تکمیلی</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="هر توضیح اضافه‌ای برای سفارش..."
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
        className="w-full py-4 rounded-xl font-black text-lg text-[#1a3a2a] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 hover:scale-[1.01]"
        style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080, #c9a84c)" }}
      >
        {loading ? "در حال ثبت سفارش..." : "🛒 ثبت سفارش"}
      </button>

      <p className="text-center text-gray-500 text-xs mt-4">
        با ثبت سفارش، با قوانین و مقررات طلافروشی زرین موافقت می‌کنید.
      </p>
    </form>
  );
}
