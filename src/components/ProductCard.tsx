"use client";
import Link from "next/link";
import { useState } from "react";

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

const categoryLabels: Record<string, string> = {
  ring: "انگشتر",
  necklace: "گردنبند",
  bracelet: "دستبند",
  earring: "گوشواره",
  set: "ست",
  other: "سایر",
};

export default function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  const priceNum = parseFloat(product.price);
  const discount = product.discount || 0;
  const discountedPrice = discount > 0 ? Math.round(priceNum * (1 - discount / 100)) : priceNum;

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("fa-IR").format(p) + " تومان";

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#c9a84c]/20 hover:border-[#c9a84c]/60 hover:shadow-xl hover:shadow-[#c9a84c]/15 transition-all duration-300 hover:-translate-y-1 group">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-[#f8f5ef]">
        {product.imageUrl && !imgError ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">💍</div>
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {discount}% تخفیف
            </span>
          )}
          {product.featured && (
            <span className="bg-[#c9a84c] text-[#1a3a2a] text-xs font-bold px-2 py-1 rounded-full">
              ویژه
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              ناموجود
            </span>
          )}
        </div>

        {/* Category badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-[#1a3a2a]/80 backdrop-blur-sm text-[#f0d080] text-xs font-medium px-2 py-1 rounded-full">
            {categoryLabels[product.category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-[#1a3a2a] text-base mb-1 line-clamp-1">{product.name}</h3>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          {product.karat && (
            <span className="bg-[#c9a84c]/15 text-[#9a7a20] font-medium px-2 py-0.5 rounded-full">
              {product.karat}
            </span>
          )}
          {product.weight && (
            <span>وزن: {product.weight} گرم</span>
          )}
        </div>

        {product.description && (
          <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{product.description}</p>
        )}

        {/* Price */}
        <div className="mb-4">
          <div className="text-[#1a3a2a] font-black text-lg">{formatPrice(discountedPrice)}</div>
          {discount > 0 && (
            <div className="text-gray-400 text-sm line-through">{formatPrice(priceNum)}</div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/order?product=${product.id}`}
            className={`flex-1 py-2.5 rounded-xl text-center text-sm font-bold transition-all duration-300 ${
              product.stock > 0
                ? "bg-gradient-to-r from-[#1a3a2a] to-[#2d5a3d] text-[#f0d080] hover:from-[#2d5a3d] hover:to-[#3d7a52]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {product.stock > 0 ? "ثبت سفارش" : "ناموجود"}
          </Link>
          <Link
            href={`/products/${product.id}`}
            className="px-3 py-2.5 rounded-xl border border-[#c9a84c]/40 text-[#c9a84c] text-sm font-bold hover:bg-[#c9a84c]/10 transition-all duration-300"
          >
            جزئیات
          </Link>
        </div>
      </div>
    </div>
  );
}
