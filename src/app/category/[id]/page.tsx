import CategoryClient from "./CategoryClient"

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const categoryId = Number(id)
  return <CategoryClient categoryId={categoryId} />
}
