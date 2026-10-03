import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsClient from "./ProductsClient";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";

async function getAllProducts() {
  try {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const allProducts = await getAllProducts();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f8f5ef]">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1a3a2a] to-[#0d2419] pt-28 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              محصولات{" "}
              <span style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                ما
              </span>
            </h1>
            <p className="text-gray-300 text-lg">مجموعه‌ای کامل از بهترین طلا و جواهرات</p>
          </div>
        </div>

        <ProductsClient initialProducts={allProducts} />
      </div>
      <Footer />
    </>
  );
}
