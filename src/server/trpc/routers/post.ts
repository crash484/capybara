import { router, publicProcedure} from "../trpc"
import { db } from "@/server/db"
import {posts, postCategories} from "@/server/db/schema"
import { eq } from "drizzle-orm"
import slugify from "slugify"
import { createPostSchema,updatePostSchema,deletePostSchema } from "../zodSchemas"
import z from "zod"

export const postRouter = router({
    getAll: publicProcedure.query(async()=> {
        return db.select().from(posts);
    }),

    //on frontend say if null then say postnotfound
    getById: publicProcedure.input(deletePostSchema).query(async ({input}) =>{
        const [post] = await db.select().from(posts).where(eq(posts.id,input.id));
        return post || null
    }),

    //for creating new post
    create: publicProcedure.input(createPostSchema).mutation(async ({input}) =>{
            const slug = slugify(input.title, {lower:true});
            const [newPost] = await db.insert(posts).values({
                    title: input.title,
                    content: input.content,
                    slug,
                    published: input.published ?? false,
            }).returning();
        if(input.categoryIds?.length) {
            await db.insert(postCategories).values(
                input.categoryIds.map((categoryId)=>({
                    postId: newPost.id,
                    categoryId
                }))
            );
        }

        return newPost;
    }),

    //for updating the post
    update: publicProcedure.input(updatePostSchema).mutation(async ({input}) =>{
        const {id,...rest} = input;
        
        const [updatedPost] = await db.update(posts).set({...rest}).where(eq(posts.id,id)).returning();

        if(input.categoryIds) {
            await db.delete(postCategories).where(eq(postCategories.postId,id));
            await db.insert(postCategories).values(
                input.categoryIds.map((categoryId)=>({
                    postId: id,
                    categoryId
                }))
            );
        }

        return updatedPost;
    }),

    //deleting the post
    delete: publicProcedure.input(deletePostSchema).mutation(async({input}) =>{
        const reqq = await db.delete(posts).where(eq(posts.id,input.id));
        return reqq ?{success:true}:{success:false};
    }),

    //getting posts by categoryId
    getByCategoryId: publicProcedure.input(z.object({categoryId: z.number() })).query(async ({input}) =>{
        const result = await db.select({
            id:posts.id,
            title:posts.title,
            content:posts.title,
            slug:posts.slug,
            published: posts.published,
            createdAt: posts.createdAt
        })
        .from(posts)
        .innerJoin(postCategories, eq(posts.id, postCategories.postId))
        .where(eq(postCategories.categoryId, input.categoryId));

        return result;
    }),

    getBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async ({ input }) => {
            return await db
            .select()
            .from(posts)
            .where(eq(posts.slug, input.slug))
    }),
})