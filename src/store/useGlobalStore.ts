import { create } from "zustand";
import { timestamp } from 'drizzle-orm/pg-core';
import { error } from "console";

interface GlobalState {
    user: string | null
    setUser:(user: string | null) => void;

    loading:boolean
    setLoading:(loading: boolean) => void

    error: boolean 
    setError: (error: boolean) => void
}

interface Category{
    id: number 
    name: string
    description?: string
    slug:string
}

interface Post{
    id:number
    title:string
    content:string
    slug:string
    categoryId: number
}

interface AppState{
    categories:Category[]
    setCategories:(categories: Category[]) => void
    addCategory: (category: Category) => void
    updateCategory: (id: number, updated: Partial<Category>) => void
    deleteCategory: (id: number) => void

    posts: Post[]
    setPosts: (posts : Post[]) => void
    addPost: (post: Post) => void
    updatePost:(id : number, updated: Partial<Post>) => void
    deletePost: (id: number)=> void
    selectedCategoryId: number|null
    setSelectedCategoryId: (id:number | null) => void
}

export const useAppStore = create<AppState>((set)=>({
    categories:[],
    setCategories: (categories) => set({categories}),
    addCategory:(category) => set((state) => ({categories: [...state.categories,category] })),
    updateCategory: (id, updated) => set((state)=>({categories: state.categories.map((c)=> c.id === id ? {...c,...updated} :c )
})),
    deleteCategory:(id) =>
        set((state)=>({
            categories: state.categories.filter((c)=> c.id !== id),
        })),

    posts: [],
    setPosts: (posts) => set({posts}),
    addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
    updatePost: (id, updated) =>
        set((state) => ({
            posts: state.posts.map((p) =>
                p.id === id ? { ...p, ...updated } : p
                ),
            })),
    deletePost: (id) =>
        set((state) => ({
            posts: state.posts.filter((p) => p.id !== id),
                })),
    selectedCategoryId:null,
    setSelectedCategoryId:(id)=> set({selectedCategoryId:id}),
}))

export const useGlobalStore = create<GlobalState>((set)=>({
    user:null,
    setUser:(user)=> set({user}),
    loading:true,
    setLoading:(loading)=> set({loading}),
    error:false,
    setError:(error)=> set({error})
}));