"use client"

import { trpc } from "@/lib/utils/trpc"

export default function CategoryClient({ categoryId }: { categoryId: number }) {
  const { data: posts, isLoading, error } = trpc.post.getByCategoryId.useQuery({ categoryId })

  if (isLoading) return <p>Loading posts...</p>
  if (error) return <p>Error: {error.message}</p>

  if (!posts || posts.length === 0)
    return <p className="text-center text-muted-foreground">No posts found in this category.</p>

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Posts in Category #{categoryId}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => (window.location.href = `/post/${post.slug}`)}
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
