import { NextResponse } from "next/server";
import { db } from "@/db";
import { products, portfolioItems } from "@/db/schema";

const sampleProducts = [
  {
    name: "انگشتر طلا گل رز ۱۸ عیار",
    description: "انگشتر زیبای طلا با طرح گل رز، مناسب برای بانوان. این انگشتر با دقت بالا ساخته شده و دارای نگین الماس اصل می‌باشد.",
    price: "85000000",
    weight: "3.50",
    karat: "18k" as const,
    category: "ring" as const,
    imageUrl: "https://images.pexels.com/photos/29502923/pexels-photo-29502923.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    stock: 5,
    featured: true,
    discount: 10,
  },
  {
    name: "گردنبند طلا قلب ۱۸ عیار",
    description: "گردنبند ظریف طلا با آویز قلب، انتخاب ایده‌آل برای هدیه. ساخت دست‌ساز با ظرافت ایرانی.",
    price: "120000000",
    weight: "5.20",
    karat: "18k" as const,
    category: "necklace" as const,
    imageUrl: "https://images.pexels.com/photos/29502924/pexels-photo-29502924.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    stock: 8,
    featured: true,
    discount: 0,
  },
  {
    name: "دستبند طلا ۲۱ عیار طرح ونیز",
    description: "دستبند کلاسیک طلا با طرح ونیز، مناسب برای استفاده روزانه و مجلسی. وزن ایده‌آل و راحت.",
    price: "98000000",
    weight: "4.80",
    karat: "21k" as const,
    category: "bracelet" as const,
    imageUrl: "https://images.pexels.com/photos/6716445/pexels-photo-6716445.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    stock: 3,
    featured: true,
    discount: 5,
  },
  {
    name: "گوشواره طلا آویز اشکی ۱۸ عیار",
    description: "گوشواره اشکی زیبا با طرح مدرن. مناسب برای مجالس و مهمانی‌ها. دارای قفل مطمئن.",
    price: "75000000",
    weight: "3.10",
    karat: "18k" as const,
    category: "earring" as const,
    imageUrl: "https://images.pexels.com/photos/30746014/pexels-photo-30746014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    stock: 10,
    featured: true,
    discount: 0,
  },
  {
    name: "ست طلا عروس ۱۸ عیار",
    description: "ست کامل طلا شامل گردنبند، دستبند، گوشواره و انگشتر. مناسب برای جهیزیه و عروسی.",
    price: "450000000",
    weight: "22.00",
    karat: "18k" as const,
    category: "set" as const,
    imageUrl: "https://images.pexels.com/photos/29502496/pexels-photo-29502496.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    stock: 2,
    featured: true,
    discount: 15,
  },
  {
    name: "انگشتر طلا حلقه ۲۴ عیار",
    description: "انگشتر ساده و کلاسیک طلا ۲۴ عیار، مناسب برای عقد و ازدواج. طراحی بی‌کلک و ماندگار.",
    price: "65000000",
    weight: "4.00",
    karat: "24k" as const,
    category: "ring" as const,
    imageUrl: "https://images.pexels.com/photos/20858959/pexels-photo-20858959.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    stock: 15,
    featured: false,
    discount: 0,
  },
  {
    name: "گردنبند طلا ظریف ۱۸ عیار",
    description: "گردنبند نازک و ظریف با آویز ستاره. انتخاب روزانه با ظرافت بی‌نظیر.",
    price: "55000000",
    weight: "2.50",
    karat: "18k" as const,
    category: "necklace" as const,
    imageUrl: "https://images.pexels.com/photos/32700179/pexels-photo-32700179.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    stock: 7,
    featured: false,
    discount: 0,
  },
  {
    name: "دستبند طلا بافت ۲۱ عیار",
    description: "دستبند بافت دست‌ساز با طرح سنتی ایرانی. نمادی از فرهنگ اصیل ایرانی.",
    price: "88000000",
    weight: "5.50",
    karat: "21k" as const,
    category: "bracelet" as const,
    imageUrl: "https://images.pexels.com/photos/28146843/pexels-photo-28146843.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    stock: 4,
    featured: false,
    discount: 0,
  },
];

const samplePortfolio = [
  {
    title: "انگشتر کلاسیک با نگین الماس",
    description: "ساخت سفارشی با طراحی اختصاصی مشتری",
    imageUrl: "https://images.pexels.com/photos/29502923/pexels-photo-29502923.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    category: "ring" as const,
    karat: "18k" as const,
    weight: "4.20",
  },
  {
    title: "ست عروس لوکس",
    description: "ست کامل طلا برای عروس با طراحی ایرانی",
    imageUrl: "https://images.pexels.com/photos/29502496/pexels-photo-29502496.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    category: "set" as const,
    karat: "18k" as const,
    weight: "25.00",
  },
  {
    title: "گردنبند سفارشی با سنگ یاقوت",
    description: "ساخت اختصاصی با سنگ یاقوت کبود اصل",
    imageUrl: "https://images.pexels.com/photos/32700179/pexels-photo-32700179.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    category: "necklace" as const,
    karat: "18k" as const,
    weight: "8.50",
  },
  {
    title: "دستبند مجلسی فیروزه‌ای",
    description: "ترکیب طلا و فیروزه اصل نیشابور",
    imageUrl: "https://images.pexels.com/photos/28146843/pexels-photo-28146843.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    category: "bracelet" as const,
    karat: "21k" as const,
    weight: "6.80",
  },
  {
    title: "گوشواره خوشه‌ای لوکس",
    description: "گوشواره مجلسی با ترکیب طلا و الماس",
    imageUrl: "https://images.pexels.com/photos/30746014/pexels-photo-30746014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    category: "earring" as const,
    karat: "18k" as const,
    weight: "5.10",
  },
  {
    title: "انگشتر عقد مدرن",
    description: "طراحی مدرن برای حلقه عقد",
    imageUrl: "https://images.pexels.com/photos/20858959/pexels-photo-20858959.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    category: "ring" as const,
    karat: "18k" as const,
    weight: "3.80",
  },
];

export async function GET() {
  try {
    await db.insert(products).values(sampleProducts).onConflictDoNothing();
    await db.insert(portfolioItems).values(samplePortfolio).onConflictDoNothing();
    return NextResponse.json({ message: "داده‌های نمونه با موفقیت اضافه شدند" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در اضافه کردن داده‌های نمونه" }, { status: 500 });
  }
}
