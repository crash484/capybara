import { pgTable, serial, varchar, text, timestamp, boolean, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  slug: varchar("slug", { length: 150 }).notNull().unique(),
  createdAt: timestamp("created_at").default(sql`NOW()`),
  updatedAt: timestamp("updated_at").default(sql`NOW()`),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  content: text("content").notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("created_at").default(sql`NOW()`),
  updatedAt: timestamp("updated_at").default(sql`NOW()`),
});


export const postCategories = pgTable(
  "post_categories",
  {
    postId: serial("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    categoryId: serial("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.postId, table.categoryId] }),
  })
);


export const postsRelations = relations(posts, ({ many }) => ({
  categories: many(postCategories),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(postCategories),
}));
