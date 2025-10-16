import CategoryClient from "./CategoryClient"

export default function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = Number(params.id)
  return <CategoryClient categoryId={categoryId} />
}
