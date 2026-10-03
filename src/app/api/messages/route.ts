import { NextResponse } from "next/server";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.select().from(messages).orderBy(desc(messages.createdAt));
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در دریافت پیام‌ها" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.fullName || !body.phone || !body.body) {
      return NextResponse.json({ error: "اطلاعات ناقص است" }, { status: 400 });
    }

    const result = await db.insert(messages).values({
      fullName: body.fullName,
      phone: body.phone,
      email: body.email || null,
      subject: body.subject || null,
      body: body.body,
      status: "unread",
    }).returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در ارسال پیام" }, { status: 500 });
  }
}
