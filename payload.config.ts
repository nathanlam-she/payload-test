import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { 
  lexicalEditor, 
  FixedToolbarFeature, 
  InlineToolbarFeature, 
  LinkFeature, 
  UploadFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  ParagraphFeature,
  HeadingFeature,
  OrderedListFeature,
  UnorderedListFeature
} from '@payloadcms/richtext-lexical'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Pages } from './collections'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Homepage } from './globals/Homepage'
import { Settings } from './globals/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Pages,
    Projects,
    Media,
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
  ],
  globals: [
    Homepage,
    Settings,
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      LinkFeature({}),
      UploadFeature({
        collections: {
          media: {
            fields: [
              {
                name: 'alt',
                type: 'text',
                label: 'Alt Text',
              },
            ],
          },
        },
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || 'demo-secret-key-123',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
  }),
  sharp,
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Chinese',
        code: 'zh',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
})
