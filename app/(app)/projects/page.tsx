import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { getSettings } from '@/app/i18n'

const ProjectsIndex = async (props: { searchParams: Promise<{ lang?: string }> }) => {
  const { lang = 'en' } = await props.searchParams
  const payload = await getPayload({ config })
  const t = (await getSettings(payload, lang)).project
  const projects = await payload.find({
    collection: 'projects',
    sort: '-completionDate',
    locale: lang as 'en' | 'zh',
  })

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-12 uppercase tracking-widest text-center">{t.ourProjects}</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.docs.length === 0 && (
                <p className="text-center col-span-3 text-gray-500">{t.noProjects}</p>
            )}
            {projects.docs.map((project) => {
                const coverUrl = (project.coverImage as any)?.url
                
                return (
                <Link href={`/projects/${project.slug}?lang=${lang}`} key={project.id} className="group block bg-white shadow-md hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden">
                    <div className="h-64 bg-gray-200 relative overflow-hidden">
                        {coverUrl && (
                             <img src={coverUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        )}
                        <div className="absolute bottom-0 left-0 bg-slate-900 text-white text-xs px-3 py-1">
                            {project.clientName}
                        </div>
                    </div>
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{project.title}</h2>
                        <div className="text-sm text-gray-400 mb-4">
                            {t.completed} {project.completionDate ? new Date(project.completionDate).toLocaleDateString() : t.ongoing}
                        </div>
                        <p className="text-gray-600 line-clamp-3">{project.summary}</p>
                    </div>
                </Link>
            )})}
        </div>
      </div>
    </div>
  )
}

export default ProjectsIndex
