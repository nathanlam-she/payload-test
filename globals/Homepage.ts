import { GlobalConfig } from 'payload'
import { autoTranslateGlobal } from '../hooks/autoTranslateGlobal'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  hooks: {
    afterChange: [autoTranslateGlobal],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              required: true,
              localized: true,
              label: 'Hero Headline',
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              localized: true,
              label: 'Hero Subtext',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Background Image',
            },
          ]
        },
        {
          label: 'About Section',
          fields: [
             {
               name: 'aboutTitle',
               type: 'text',
               defaultValue: 'About Us',
               localized: true,
             },
             {
               name: 'aboutContent',
               type: 'richText',
               localized: true,
             },
          ]
        },
        {
          label: 'Contact Info',
          fields: [
            {
              name: 'contactEmail',
              type: 'email',
            },
            {
              name: 'contactPhone',
              type: 'text',
            },
            {
              name: 'officeAddress',
              type: 'textarea',
            },
          ]
        }
      ]
    },
    // Legacy fields (hidden or kept for migration safety, but let's just replace them since it's a demo)
  ],
}
