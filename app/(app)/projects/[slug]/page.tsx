import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { RichTextParser } from '@/components/RichTextParser'
import { getSettings } from '@/app/i18n'

type Args = {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    lang?: string
  }>
}

const ProjectPage = async ({ params, searchParams }: Args) => {
  const { slug } = await params
  const { lang = 'en' } = await searchParams
  const payload = await getPayload({ config })
  const t = (await getSettings(payload, lang)).project
  
  const projects = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: lang as 'en' | 'zh',
  })

  const project = projects.docs[0]

  if (!project) {
    return notFound()
  }

  const coverUrl = (project.coverImage as any)?.url

  return (
    <div className="bg-white min-h-screen">
       {/* Hero Header */}
       <div className="h-[400px] w-full bg-slate-900 relative flex items-center justify-center overflow-hidden">
          {coverUrl && (
             <div 
                className="absolute inset-0 opacity-50 bg-cover bg-center"
                style={{ backgroundImage: `url(${coverUrl})` }}
            />
          )}
          <div className="relative z-10 text-center px-4">
             <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{project.title}</h1>
             <p className="text-xl text-blue-200 uppercase tracking-widest">{project.clientName}</p>
          </div>
       </div>

       <div className="container mx-auto px-6 py-12 max-w-4xl">
           <div className="flex gap-4 mb-8 text-sm text-gray-500 border-b pb-4">
               <span>{t.completed} {project.completionDate ? new Date(project.completionDate).toLocaleDateString() : t.ongoing}</span>
           </div>

           <div className="prose lg:prose-xl text-slate-700">
              <RichTextParser content={project.content} />
           </div>
       </div>
    </div>
  )
}

export default ProjectPage
