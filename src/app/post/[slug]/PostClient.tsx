"use client"

import { trpc } from "@/lib/utils/trpc"

export default function PostClient({ slug }: { slug: string }) {
  const { data: post, isLoading, error } = trpc.post.getBySlug.useQuery({ slug })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  if (!post || post.length === 0)
    return <p>No post found for this slug.</p>

  const currentPost = post[0]

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{currentPost.title}</h1>
      <p className="text-gray-500 text-sm mb-8">
        Published on {new Date(currentPost.createdAt).toLocaleDateString()}
      </p>
      <div className="prose dark:prose-invert">
        {currentPost.content}
      </div>
    </div>
  )
}
