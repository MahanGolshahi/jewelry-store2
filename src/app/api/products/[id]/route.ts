import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await db.select().from(products).where(eq(products.id, parseInt(id)));
    if (!result[0]) return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در دریافت محصول" }, { status: 500 });
  }
}
