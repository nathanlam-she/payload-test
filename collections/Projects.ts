import { CollectionConfig } from 'payload'
import { autoTranslateProject } from '../hooks/autoTranslateProject'
import { formatSlug } from '../hooks/formatSlug'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [autoTranslateProject],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true, // Slugs must be unique
      index: true,  // Index for fast lookup
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'clientName',
      type: 'text',
      label: 'Client / Partner',
    },
    {
      name: 'completionDate',
      type: 'date',
    },
  ],
}
