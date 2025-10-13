import { router, publicProcedure} from "../trpc"
import { db } from "@/server/db"
import {categories,postCategories} from "@/server/db/schema"
import { eq } from "drizzle-orm"
import slugify from "slugify"
import { createCategorySchema,updateCategorySchema,deleteCategorySchema } from "../zodSchemas"
import { z } from "zod"

export const categoryRouter = router({
    //adll 
    getAll: publicProcedure.query(async ()=>{
        return db.select().from(categories);
    }),

  create: publicProcedure
    .input(createCategorySchema)
    .mutation(async ({ input }) => {
      const slug = slugify(input.name, { lower: true });
      const [newCategory] = await db
        .insert(categories)
        .values({
          name: input.name,
          description: input.description,
          slug,
        })
        .returning();

      return newCategory;
    }),

  update: publicProcedure
    .input(updateCategorySchema)
    .mutation(async ({ input }) => {
      const { id, ...rest } = input;
      const [updatedCategory] = await db
        .update(categories)
        .set(rest)
        .where(eq(categories.id, id))
        .returning();

      return updatedCategory;
    }),

  delete: publicProcedure
    .input(deleteCategorySchema)
    .mutation(async ({ input }) => {
      await db.delete(categories).where(eq(categories.id, input.id));
      return { success: true };
    }),

  getCategoriesByPostId: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ input }) => {
        return db
        .select()
        .from(postCategories)
        .where(eq(postCategories.postId, input.postId));
  }),
})