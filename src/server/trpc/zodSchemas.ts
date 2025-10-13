import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(2," category must atleast be 2 characters long"),
    description: z.string().optional(),
});

export const updateCategorySchema = z.object({
    id: z.number(),
    name: z.string().min(2).optional(),
    description: z.string().optional()
});

export const deleteCategorySchema = z.object({
    id: z.number()
})

//for the posts

export const createPostSchema = z.object({
    title: z.string().min(1,"the posts name must be atleast 1 char long"),
    content: z.string(),
    published: z.boolean(),
    categoryIds: z.array(z.number()).optional()
});

export const updatePostSchema = z.object({
    id: z.number(),
    title: z.string().optional(),
    content: z.string().optional(),
    published: z.boolean().optional(),
    categoryIds: z.array(z.number()).optional()
})

export const deletePostSchema = z.object({
    id: z.number()
})