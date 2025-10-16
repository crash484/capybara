"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";
import dynamic from "next/dynamic";
import MarkdownEditor from '../../components/markdown';

export default function NewPost() {
  const { data: categories, isLoading } = trpc.category.getAll.useQuery();
  const createPost = trpc.post.create.useMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleCategoryChange = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost.mutateAsync({
        title,
        content,
        categoryIds: selectedCategories,
        published: true,
      });
      alert("Post created");
      setTitle("");
      setContent("");
      setSelectedCategories([]);
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded dark:bg-gray-800"
        />

        <MarkdownEditor content={content} setContent={setContent} />

        {isLoading ? (
          <p>Loading categories...</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories?.map((cat) => (
              <label key={cat.id} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => handleCategoryChange(cat.id)}
                />
                {cat.name}
              </label>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
