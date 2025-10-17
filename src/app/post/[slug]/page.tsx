import PostClient from "./PostClient"

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <PostClient slug={slug} />
}
