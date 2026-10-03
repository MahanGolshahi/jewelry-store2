import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.select().from(orders).orderBy(desc(orders.createdAt));
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در دریافت سفارشات" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    let totalPrice = body.totalPrice;
    let productName = body.productName;

    if (body.productId) {
      const product = await db.select().from(products).where(eq(products.id, body.productId));
      if (product[0]) {
        productName = product[0].name;
        const qty = body.quantity || 1;
        const price = parseFloat(product[0].price as string);
        const discount = product[0].discount || 0;
        totalPrice = Math.round(price * qty * (1 - discount / 100)).toString();
      }
    }

    const result = await db.insert(orders).values({
      fullName: body.fullName,
      phone: body.phone,
      email: body.email || null,
      address: body.address,
      city: body.city,
      productId: body.productId || null,
      productName: productName || null,
      quantity: body.quantity || 1,
      totalPrice: totalPrice || null,
      notes: body.notes || null,
      status: "pending",
    }).returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در ثبت سفارش" }, { status: 500 });
  }
}
