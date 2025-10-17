"use client";

import { useState } from "react";
import { trpc } from "@/lib/utils/trpc";

export default function CategoryManager() {
  const { data: categories, isLoading, refetch } = trpc.category.getAll.useQuery();
  const createCategory = trpc.category.create.useMutation();
  const updateCategory = trpc.category.update.useMutation();
  const deleteCategory = trpc.category.delete.useMutation();

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  // Create
  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      await createCategory.mutateAsync({ name: newName, description: newDescription });
      setNewName("");
      setNewDescription("");
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  // Update
  const handleUpdate = async (id: number) => {
    try {
      await updateCategory.mutateAsync({ id, name: editingName, description: editingDescription });
      setEditingId(null);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory.mutateAsync({ id });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading categories...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">Category Manager</h2>

      {/* Create new category */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Category name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-1 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="border p-1 rounded flex-1"
        />
        <button onClick={handleCreate} className="bg-green-600 text-white px-2 rounded">
          Create
        </button>
      </div>

      {/* List categories */}
      <div className="space-y-2">
        {categories?.map((cat) => (
          <div key={cat.id} className="flex gap-2 items-center border p-2 rounded">
            {editingId === cat.id ? (
              <>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="border p-1 rounded flex-1"
                />
                <input
                  type="text"
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                  className="border p-1 rounded flex-1"
                />
                <button
                  onClick={() => handleUpdate(cat.id)}
                  className="bg-blue-600 text-white px-2 rounded"
                >
                  Save
                </button>
                <button onClick={() => setEditingId(null)} className="px-2 rounded border">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 font-medium">{cat.name}</span>
                {cat.description && <span className="flex-1 text-gray-500">{cat.description}</span>}
                <button
                  onClick={() => {
                    setEditingId(cat.id);
                    setEditingName(cat.name);
                    setEditingDescription(cat.description || "");
                  }}
                  className="bg-yellow-500 text-white px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="bg-red-600 text-white px-2 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
