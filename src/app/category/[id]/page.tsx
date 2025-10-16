import CategoryClient from "./CategoryClient"

export default function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = Number(params.id) // or parseInt if you prefer
  return <CategoryClient categoryId={categoryId} />
}
