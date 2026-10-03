import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

const categoryLabels: Record<string, string> = {
  ring: "انگشتر",
  necklace: "گردنبند",
  bracelet: "دستبند",
  earring: "گوشواره",
  set: "ست",
  other: "سایر",
};

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product;
  try {
    const result = await db.select().from(products).where(eq(products.id, parseInt(id)));
    product = result[0];
  } catch {
    return notFound();
  }

  if (!product) return notFound();

  const priceNum = parseFloat(product.price as string);
  const discount = product.discount || 0;
  const discountedPrice = discount > 0 ? Math.round(priceNum * (1 - discount / 100)) : priceNum;
  const formatPrice = (p: number) => new Intl.NumberFormat("fa-IR").format(p) + " تومان";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f8f5ef]">
        {/* Breadcrumb */}
        <div className="bg-[#1a3a2a] pt-24 pb-6 px-4">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-[#f0d080]">خانه</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#f0d080]">محصولات</Link>
            <span>/</span>
            <span className="text-[#f0d080]">{product.name}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="bg-white rounded-3xl overflow-hidden border border-[#c9a84c]/20 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative bg-[#f8f5ef] aspect-square lg:aspect-auto lg:min-h-96">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl">💍</div>
                )}
                {discount > 0 && (
                  <div className="absolute top-6 right-6 bg-red-500 text-white font-black text-lg px-4 py-2 rounded-full">
                    {discount}% تخفیف
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#1a3a2a] text-[#f0d080] text-xs font-bold px-3 py-1.5 rounded-full">
                    {categoryLabels[product.category]}
                  </span>
                  {product.karat && (
                    <span className="bg-[#c9a84c]/20 text-[#9a7a20] text-xs font-bold px-3 py-1.5 rounded-full">
                      {product.karat}
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-[#c9a84c] text-[#1a3a2a] text-xs font-bold px-3 py-1.5 rounded-full">
                      ⭐ محصول ویژه
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-black text-[#1a3a2a] mb-4 leading-snug">{product.name}</h1>

                {product.description && (
                  <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                )}

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 mb-8 bg-[#f8f5ef] rounded-2xl p-4">
                  {product.weight && (
                    <div>
                      <div className="text-gray-500 text-xs mb-1">وزن</div>
                      <div className="font-bold text-[#1a3a2a]">{product.weight} گرم</div>
                    </div>
                  )}
                  {product.karat && (
                    <div>
                      <div className="text-gray-500 text-xs mb-1">عیار</div>
                      <div className="font-bold text-[#1a3a2a]">{product.karat}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-gray-500 text-xs mb-1">دسته‌بندی</div>
                    <div className="font-bold text-[#1a3a2a]">{categoryLabels[product.category]}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs mb-1">موجودی</div>
                    <div className={`font-bold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                      {product.stock > 0 ? `${product.stock} عدد موجود` : "ناموجود"}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="text-3xl font-black text-[#1a3a2a] mb-1">{formatPrice(discountedPrice)}</div>
                  {discount > 0 && (
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 line-through">{formatPrice(priceNum)}</span>
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                        صرفه‌جویی: {formatPrice(priceNum - discountedPrice)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/order?product=${product.id}`}
                    className={`flex-1 py-4 rounded-xl text-center font-bold text-lg transition-all duration-300 ${
                      product.stock > 0
                        ? "bg-gradient-to-r from-[#1a3a2a] to-[#2d5a3d] text-[#f0d080] hover:opacity-90"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {product.stock > 0 ? "🛒 ثبت سفارش" : "❌ ناموجود"}
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-4 rounded-xl border-2 border-[#c9a84c] text-[#c9a84c] font-bold text-center hover:bg-[#c9a84c]/10 transition-all duration-300"
                  >
                    📞 مشاوره
                  </Link>
                </div>

                {/* Guarantees */}
                <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                  {[
                    { icon: "🏅", label: "ضمانت اصالت" },
                    { icon: "🔄", label: "۱۰ روز مرجوعی" },
                    { icon: "🚚", label: "ارسال ایمن" },
                  ].map((g) => (
                    <div key={g.label} className="bg-[#f8f5ef] rounded-xl p-3">
                      <div className="text-2xl mb-1">{g.icon}</div>
                      <div className="text-xs text-gray-600 font-medium">{g.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="mt-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[#1a3a2a] font-bold hover:text-[#c9a84c] transition-colors"
            >
              ← بازگشت به محصولات
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
