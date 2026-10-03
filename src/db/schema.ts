import { pgTable, serial, text, varchar, numeric, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const orderStatusEnum = pgEnum("order_status", ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]);
export const categoryEnum = pgEnum("category", ["ring", "necklace", "bracelet", "earring", "set", "other"]);
export const karatEnum = pgEnum("karat", ["18k", "21k", "24k", "750", "916"]);
export const messageStatusEnum = pgEnum("message_status", ["unread", "read", "replied"]);

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  price: numeric("price", { precision: 12, scale: 0 }).notNull(),
  weight: numeric("weight", { precision: 8, scale: 2 }),
  karat: karatEnum("karat"),
  category: categoryEnum("category").notNull(),
  imageUrl: text("image_url"),
  stock: integer("stock").notNull().default(0),
  featured: boolean("featured").default(false),
  discount: integer("discount").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 200 }),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  productId: integer("product_id").references(() => products.id),
  productName: varchar("product_name", { length: 200 }),
  quantity: integer("quantity").notNull().default(1),
  totalPrice: numeric("total_price", { precision: 12, scale: 0 }),
  notes: text("notes"),
  status: orderStatusEnum("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 200 }),
  subject: varchar("subject", { length: 300 }),
  body: text("body").notNull(),
  status: messageStatusEnum("status").default("unread"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  category: categoryEnum("category").notNull(),
  karat: karatEnum("karat"),
  weight: numeric("weight", { precision: 8, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
});
