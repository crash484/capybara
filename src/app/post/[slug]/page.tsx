import PostClient from "./PostClient"

export default function PostPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  return <PostClient slug={slug} />
}

