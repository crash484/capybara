"use client"
import { useEffect } from "react"
import { useAppStore,useGlobalStore } from "@/store/useGlobalStore"


export default function Home() {
  const { categories, setCategories, posts, setPosts } = useAppStore()
  const { loading,setLoading,error,setError} = useGlobalStore();

  useEffect(() => {
    const fetchData = async () => {
      const catRes = await fetch("/api/trpc/category.getAll")
      const postRes = await fetch("/api/trpc/post.getAll")

      if(!catRes || !postRes) setError(true)

      setLoading(true);

      const cats = await catRes.json()
      const psts = await postRes.json()

      setCategories(cats.result.data)
      setPosts(psts.result.data)
      console.log(cats.result.data)
      setLoading(false);
    }

    fetchData()
  }, [])

  if(loading) return <p> loading...</p>
  if(error) return <p> error in loading pls try again</p>
  return (
    <div className="p-8 space-y-6">
      {/* Categories Section */}
      <div className="flex flex-wrap gap-3">
        {categories?.map((cat) => (
          <a
            key={cat.id}
            className="px-4 py-2 border rounded-lg cursor-pointer hover:bg-muted transition"
            href={`/category/${cat.id}`}
          >
            {cat.name}
          </a>
        ))}
      </div>

      {/* Posts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.map((post) => (
          <a
            key={post.id}
            href={`/post/${post.slug}`}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
              {post.content}
            </p>
          </a>
        ))}
      </div>
      <a href="/post/new" className="rounded-lg border-2 p-3 hover:bg-violet-100 dark:hover:bg-gray-800">
      Create  a new post
      </a>
    </div>
  )
}
