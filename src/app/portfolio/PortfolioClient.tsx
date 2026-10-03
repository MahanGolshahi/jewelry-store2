"use client";
import { useState } from "react";

type PortfolioItem = {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  category: "ring" | "necklace" | "bracelet" | "earring" | "set" | "other";
  karat: "18k" | "21k" | "24k" | "750" | "916" | null;
  weight: string | null;
  createdAt: Date | null;
};

const categoryLabels: Record<string, string> = {
  ring: "انگشتر",
  necklace: "گردنبند",
  bracelet: "دستبند",
  earring: "گوشواره",
  set: "ست",
  other: "سایر",
};

const categories = [
  { value: "all", label: "همه" },
  { value: "ring", label: "انگشتر" },
  { value: "necklace", label: "گردنبند" },
  { value: "bracelet", label: "دستبند" },
  { value: "earring", label: "گوشواره" },
  { value: "set", label: "ست" },
];

export default function PortfolioClient({ items }: { items: PortfolioItem[] }) {
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  const filtered = category === "all" ? items : items.filter((i) => i.category === category);

  return (
    <div>
      {/* Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              category === cat.value
                ? "text-[#1a3a2a] shadow-lg scale-105"
                : "bg-white text-gray-600 hover:bg-[#c9a84c]/20 border border-[#c9a84c]/30"
            }`}
            style={category === cat.value ? { background: "linear-gradient(135deg, #c9a84c, #f0d080)" } : {}}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#c9a84c]/20 hover:border-[#c9a84c]/60 hover:shadow-xl hover:shadow-[#c9a84c]/15 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            onClick={() => setSelected(item)}
          >
            <div className="relative overflow-hidden aspect-square bg-[#f8f5ef]">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">💍</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a2a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <div className="text-[#f0d080] font-bold text-sm mb-1">🔍 مشاهده جزئیات</div>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className="bg-[#1a3a2a]/80 backdrop-blur-sm text-[#f0d080] text-xs font-medium px-2 py-1 rounded-full">
                  {categoryLabels[item.category]}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-[#1a3a2a] mb-1">{item.title}</h3>
              {item.description && <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>}
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                {item.karat && <span className="bg-[#c9a84c]/15 text-[#9a7a20] px-2 py-0.5 rounded-full font-medium">{item.karat}</span>}
                {item.weight && <span>وزن: {item.weight} گرم</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.imageUrl && (
              <div className="aspect-video relative">
                <img
                  src={selected.imageUrl}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-2xl font-black text-[#1a3a2a]">{selected.title}</h2>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors flex-shrink-0 text-lg"
                >
                  ×
                </button>
              </div>
              {selected.description && <p className="text-gray-600 leading-relaxed mb-4">{selected.description}</p>}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-[#1a3a2a] text-[#f0d080] text-xs font-bold px-3 py-1.5 rounded-full">
                  {categoryLabels[selected.category]}
                </span>
                {selected.karat && (
                  <span className="bg-[#c9a84c]/20 text-[#9a7a20] text-xs font-bold px-3 py-1.5 rounded-full">
                    عیار: {selected.karat}
                  </span>
                )}
                {selected.weight && (
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full">
                    وزن: {selected.weight} گرم
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <a
                  href="/order"
                  className="flex-1 py-3 rounded-xl text-center font-bold text-[#1a3a2a] text-sm transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)" }}
                >
                  سفارش مشابه
                </a>
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition-colors"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
