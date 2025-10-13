import "dotenv/config";
import { db } from "../src/server/db";
import { posts, categories, postCategories } from "../src/server/db/schema";
import slugify from "slugify";

// Utility to create slugs
const makeSlug = (name: string) => slugify(name, { lower: true, strict: true });

async function main() {
  console.log("🌱 Starting database seed...");

  // 1️⃣ Clear existing data (optional but safe for dev)
  await db.delete(postCategories);
  await db.delete(posts);
  await db.delete(categories);

  // 2️⃣ Create Categories
  const categoryData = [
    { name: "Technology", description: "All about tech and software" },
    { name: "Lifestyle", description: "Health, habits, and productivity" },
    { name: "Science", description: "Discoveries and innovation" },
    { name: "Travel", description: "Places, adventures, and guides" },
  ];

  const insertedCategories = await db
    .insert(categories)
    .values(
      categoryData.map((c) => ({
        name: c.name,
        description: c.description,
        slug: makeSlug(c.name),
      }))
    )
    .returning();

  console.log(`✅ Inserted ${insertedCategories.length} categories`);

  // 3️⃣ Create Posts
  const postData = [
    {
      title: "Building a Full-Stack App with Next.js & Drizzle",
      content:
        "Learn how to integrate Drizzle ORM with Next.js and PostgreSQL to build a modern full-stack app.",
      published: true,
      categoryIds: [insertedCategories[0].id, insertedCategories[2].id],
    },
    {
      title: "10 Habits of Highly Effective Developers",
      content:
        "Productivity, focus, and continuous learning are the core traits that make developers stand out.",
      published: true,
      categoryIds: [insertedCategories[1].id],
    },
    {
      title: "Exploring Quantum Computing Basics",
      content:
        "Quantum computing promises exponential performance improvements — here's what you should know.",
      published: false,
      categoryIds: [insertedCategories[2].id],
    },
  ];

  const insertedPosts = [];

  for (const post of postData) {
    const slug = makeSlug(post.title);
    const [newPost] = await db
      .insert(posts)
      .values({
        title: post.title,
        content: post.content,
        slug,
        published: post.published,
      })
      .returning();

    insertedPosts.push(newPost);

    if (post.categoryIds?.length) {
      await db.insert(postCategories).values(
        post.categoryIds.map((catId) => ({
          postId: newPost.id,
          categoryId: catId,
        }))
      );
    }
  }

  console.log(`✅ Inserted ${insertedPosts.length} posts`);
  console.log("🌿 Seeding complete!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
