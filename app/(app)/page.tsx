import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { RichTextParser } from '@/components/RichTextParser'
import Link from 'next/link'
import { getSettings } from '@/app/i18n'

const Page = async (props: { searchParams: Promise<{ lang?: string }> }) => {
  const { lang = 'en' } = await props.searchParams
  const payload = await getPayload({ config })
  const t = (await getSettings(payload, lang)).home
  
  // Fetch Global Homepage
  const homePage = await payload.findGlobal({
    slug: 'homepage',
    locale: lang as 'en' | 'zh',
  })

  // Fetch 3 recent Projects
  const projects = await payload.find({
    collection: 'projects',
    limit: 3,
    sort: '-completionDate',
    locale: lang as 'en' | 'zh',
  })

  if (!homePage) {
    return <div className="container mx-auto p-10">Please configure the Homepage Global in Admin.</div>
  }

  const heroUrl = (homePage.heroImage as any)?.url || '' 

  return (
    <div>
      {/* HERO SECTION */}
      <div className="relative h-[600px] w-full bg-slate-900 flex items-center justify-center text-center text-white overflow-hidden">
        {/* Background Image Overlay */}
        {heroUrl && (
            <div 
                className="absolute inset-0 opacity-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroUrl})` }}
            />
        )}
        <div className="relative z-10 max-w-4xl px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">{homePage.heroTitle}</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                {homePage.heroSubtitle}
            </p>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 uppercase tracking-widest text-center">
                {homePage.aboutTitle || t.aboutTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-slate-600">
                <RichTextParser content={homePage.aboutContent} />
            </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-widest">{t.featuredProjects}</h2>
                <Link href={`/projects?lang=${lang}`} className="text-blue-600 font-semibold hover:underline">
                    {t.viewAll} &rarr;
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {projects.docs.length === 0 && (
                    <p className="text-gray-500">No projects found. Add them in the Admin panel.</p>
                )}
                {projects.docs.map((project) => {
                    const coverUrl = (project.coverImage as any)?.url
                    
                    return (
                    <Link href={`/projects/${project.slug}?lang=${lang}`} key={project.id} className="group block bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden">
                        <div className="h-48 bg-gray-200 relative overflow-hidden">
                            {coverUrl && (
                                <img src={coverUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            )}
                            <div className="absolute bottom-0 left-0 bg-slate-900 text-white text-xs px-3 py-1">
                                {project.clientName}
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                            <p className="text-gray-600 line-clamp-3 text-sm">{project.summary}</p>
                        </div>
                    </Link>
                )})}
            </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-white border-t border-gray-200 text-slate-900">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
            <div>
                <h2 className="text-3xl font-bold mb-8 uppercase tracking-widest text-slate-900">{t.contactUs}</h2>
                <div className="space-y-4 text-lg text-gray-600">
                    <p><strong className="text-slate-900">{t.email}</strong> {homePage.contactEmail}</p>
                    <p><strong className="text-slate-900">{t.phone}</strong> {homePage.contactPhone}</p>
                    <p><strong className="text-slate-900">{t.address}</strong><br/>{homePage.officeAddress}</p>
                </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-slate-900">{t.getInTouch}</h3>
                <p className="text-gray-500 mb-4">{t.interested}</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded font-bold hover:bg-blue-700 transition-colors w-full shadow-sm">
                    {t.sendMessage}
                </button>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Page
