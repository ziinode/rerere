import { pgTable, text, serial, integer, boolean, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Product model
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  discountPrice: real("discount_price"),
  material: text("material").notNull(),
  category: text("category").notNull(),
  sizes: text("sizes").array().notNull(),
  colors: text("colors").array().notNull(),
  images: text("images").array().notNull(),
  isNew: boolean("is_new").default(false),
  isSale: boolean("is_sale").default(false),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

// Cart item model (for in-memory cart)
export const cartItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
  size: z.string(),
  color: z.string(),
});

// Order model
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerAddress: text("customer_address").notNull(),
  items: jsonb("items").notNull(), // Array of cart items
  total: real("total").notNull(),
  status: text("status").notNull().default("pending"),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
});

// Define types
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
