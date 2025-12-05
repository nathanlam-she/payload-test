'use client'

import Link from 'next/link'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { getDictionary } from '@/app/i18n'

export const Header = ({ dicts }: { dicts?: { en: any, zh: any } }) => {
  const searchParams = useSearchParams()
  const lang = searchParams.get('lang') || 'en'
  // Use prop dictionary if available (dynamic), else fallback to static
  const t = dicts ? dicts[lang as 'en' | 'zh'] : getDictionary(lang).nav

  // Helper to append lang to links
  const getLink = (path: string) => `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`

  return (
    <header className="bg-white text-slate-900 p-4 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={getLink('/')} className="text-xl font-bold text-blue-900">
          InvestPlatform
        </Link>
        <nav className="flex gap-4 items-center">
          <Link href={getLink('/')} className="hover:text-blue-600 font-medium text-sm uppercase tracking-wide">
            {t.home}
          </Link>
          <Link href={getLink('/projects')} className="hover:text-blue-600 font-medium text-sm uppercase tracking-wide">
            {t.projects}
          </Link>
          <Link href="#contact" className="hover:text-blue-600 font-medium text-sm uppercase tracking-wide">
            {t.contact}
          </Link>
          <Link href="/admin" className="bg-slate-100 text-slate-900 border border-slate-300 px-4 py-2 rounded hover:bg-slate-200 text-sm font-medium transition-colors">
            {t.admin}
          </Link>
          <div className="flex gap-2 ml-4 border-l pl-4 border-gray-300">
            <Link href="?lang=en" className={`hover:text-blue-600 font-bold text-sm ${lang === 'en' ? 'text-blue-600' : 'text-gray-500'}`}>EN</Link>
            <Link href="?lang=zh" className={`hover:text-blue-600 font-bold text-sm ${lang === 'zh' ? 'text-blue-600' : 'text-gray-500'}`}>CN</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
