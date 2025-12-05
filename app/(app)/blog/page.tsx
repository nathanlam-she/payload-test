import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Link from 'next/link'

const BlogIndex = async (props: { searchParams: Promise<{ lang?: string }> }) => {
  const { lang = 'en' } = await props.searchParams
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'posts',
    locale: lang as 'en' | 'es',
    sort: '-publishedDate',
  })

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-8">Investment Blog</h1>
      
      <div className="grid gap-6">
        {posts.docs.length === 0 && (
             <p>No posts found. Go to admin to create one.</p>
        )}
        {posts.docs.map((post) => (
          <Link 
            href={`/blog/${post.slug}?lang=${lang}`} 
            key={post.id}
            className="block p-6 bg-white rounded-lg border hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <div className="text-gray-500 text-sm mb-4">
              {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString() : 'Draft'}
            </div>
            <p className="text-gray-700">
              {post.summary}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogIndex
