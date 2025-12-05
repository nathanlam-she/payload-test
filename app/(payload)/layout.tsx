import config from '@/payload.config'
import '@payloadcms/next/css'
import './admin/custom.css'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { handleServerFunctions } from './actions'
import { importMap } from './admin/importMap.js'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <RootLayout
    config={config}
    importMap={importMap}
    serverFunction={handleServerFunctions}
  >
    {children}
  </RootLayout>
)

export default Layout
