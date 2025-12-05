import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import { RichTextParser } from '@/components/RichTextParser'

type Args = {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    lang?: string
  }>
}

const BlogPost = async ({ params, searchParams }: Args) => {
  const { slug } = await params
  const { lang = 'en' } = await searchParams
  const payload = await getPayload({ config })
  
  const posts = await payload.find({
    collection: 'posts',
    locale: lang as 'en' | 'es',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const post = posts.docs[0]

  if (!post) {
    return notFound()
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-500 mb-8 pb-4 border-b">
         {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString() : 'Draft'}
      </div>
      
      <div className="prose lg:prose-xl">
         <RichTextParser content={post.content} />
      </div>
    </div>
  )
}

export default BlogPost
