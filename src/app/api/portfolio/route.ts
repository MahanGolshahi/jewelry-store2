import { NextResponse } from "next/server";
import { db } from "@/db";
import { portfolioItems } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در دریافت نمونه کارها" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await db.insert(portfolioItems).values(body).returning();
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در ایجاد نمونه کار" }, { status: 500 });
  }
}
