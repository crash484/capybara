"use client";

import { trpc } from "@/lib/utils/trpc";
import { useRouter } from "next/navigation";

export default function PostClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { data: post, isLoading, error } = trpc.post.getBySlug.useQuery({ slug });
  const deletePost = trpc.post.delete.useMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!post || post.length === 0) return <p>No post found for this slug.</p>;

  const currentPost = post[0];

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deletePost.mutateAsync({ id: currentPost.id });
      alert("Post deleted successfully");
      router.push("/"); // redirect after deletion
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{currentPost.title}</h1>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          disabled={deletePost.isPending}
        >
          {deletePost.isPending ? "Deleting..." : "Delete"}
        </button>
      </div>

      <p className="text-gray-500 text-sm">
        Published on {new Date(currentPost.createdAt).toLocaleDateString()}
      </p>

      <div className="prose dark:prose-invert">{currentPost.content}</div>
    </div>
  );
}
