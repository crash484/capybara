"use client"
import { useEffect } from "react"
import { useAppStore } from "@/store/useGlobalStore"

export default function Home() {
  const { categories, setCategories, posts, setPosts } = useAppStore()

  useEffect(() => {
    const fetchData = async () => {
      const catRes = await fetch("/api/trpc/category.getAll")
      const postRes = await fetch("/api/trpc/post.getAll")

      const cats = await catRes.json()
      const psts = await postRes.json()

      setCategories(cats.result.data)
      setPosts(psts.result.data)
    }

    fetchData()
  }, [])

  return (
    <div className="p-8 space-y-6">
      {/* Categories Section */}
      <div className="flex flex-wrap gap-3">
        {categories?.map((cat) => (
          <div
            key={cat.id}
            className="px-4 py-2 border rounded-lg cursor-pointer hover:bg-muted transition"
          >
            {cat.name}
          </div>
        ))}
      </div>

      {/* Posts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
              {post.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
