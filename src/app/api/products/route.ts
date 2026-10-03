import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, eq, ilike, or } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    let query = db.select().from(products).$dynamic();

    if (category && category !== "all") {
      query = query.where(eq(products.category, category as "ring" | "necklace" | "bracelet" | "earring" | "set" | "other"));
    }

    if (featured === "true") {
      query = query.where(eq(products.featured, true));
    }

    if (search) {
      query = query.where(or(ilike(products.name, `%${search}%`), ilike(products.description, `%${search}%`)));
    }

    const result = await query.orderBy(desc(products.createdAt));
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در دریافت محصولات" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await db.insert(products).values(body).returning();
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در ایجاد محصول" }, { status: 500 });
  }
}
