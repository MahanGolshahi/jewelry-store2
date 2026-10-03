"use client";
import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  weight: string | null;
  karat: "18k" | "21k" | "24k" | "750" | "916" | null;
  category: "ring" | "necklace" | "bracelet" | "earring" | "set" | "other";
  imageUrl: string | null;
  stock: number;
  featured: boolean | null;
  discount: number | null;
  createdAt: Date | null;
};

const categories = [
  { value: "all", label: "همه", emoji: "🏆" },
  { value: "ring", label: "انگشتر", emoji: "💍" },
  { value: "necklace", label: "گردنبند", emoji: "📿" },
  { value: "bracelet", label: "دستبند", emoji: "🪬" },
  { value: "earring", label: "گوشواره", emoji: "✨" },
  { value: "set", label: "ست", emoji: "👑" },
];

const karats = ["همه", "18k", "21k", "24k"];
const sortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "price_asc", label: "ارزان‌ترین" },
  { value: "price_desc", label: "گران‌ترین" },
  { value: "discount", label: "بیشترین تخفیف" },
];

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [karat, setKarat] = useState("همه");
  const [sort, setSort] = useState("newest");
  const [showInStock, setShowInStock] = useState(false);

  const filtered = useMemo(() => {
    let res = [...initialProducts];

    if (search) {
      res = res.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (category !== "all") {
      res = res.filter((p) => p.category === category);
    }

    if (karat !== "همه") {
      res = res.filter((p) => p.karat === karat);
    }

    if (showInStock) {
      res = res.filter((p) => p.stock > 0);
    }

    switch (sort) {
      case "price_asc":
        res.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price_desc":
        res.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "discount":
        res.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        break;
    }

    return res;
  }, [initialProducts, search, category, karat, sort, showInStock]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#c9a84c]/20 p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-[#1a3a2a] font-bold text-sm mb-2">جستجو</label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="نام محصول را جستجو کنید..."
                className="w-full border border-[#c9a84c]/30 rounded-xl pr-10 pl-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] bg-[#f8f5ef]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c9a84c]">🔍</span>
            </div>
          </div>

          {/* Karat */}
          <div>
            <label className="block text-[#1a3a2a] font-bold text-sm mb-2">عیار</label>
            <select
              value={karat}
              onChange={(e) => setKarat(e.target.value)}
              className="w-full border border-[#c9a84c]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] bg-[#f8f5ef]"
            >
              {karats.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-[#1a3a2a] font-bold text-sm mb-2">مرتب‌سازی</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border border-[#c9a84c]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] bg-[#f8f5ef]"
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                category === cat.value
                  ? "bg-[#1a3a2a] text-[#f0d080] shadow-lg"
                  : "bg-[#f8f5ef] text-gray-600 hover:bg-[#c9a84c]/20 border border-[#c9a84c]/30"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* In Stock Toggle */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-11 h-6 rounded-full transition-colors duration-300 relative ${showInStock ? "bg-[#1a3a2a]" : "bg-gray-300"}`}
              onClick={() => setShowInStock(!showInStock)}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${showInStock ? "right-0.5" : "left-0.5"}`} />
            </div>
            <span className="text-sm font-medium text-gray-700">فقط موجود</span>
          </label>
          <span className="text-sm text-gray-500">({filtered.length} محصول)</span>
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-xl font-bold text-gray-600 mb-2">محصولی یافت نشد</h3>
          <p className="text-gray-400">فیلترهای جستجو را تغییر دهید</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
