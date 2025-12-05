import { CollectionAfterChangeHook } from 'payload'

export const autoTranslateProject: CollectionAfterChangeHook = async ({ doc, req, operation }) => {
  // Only run on create or update
  if (operation !== 'create' && operation !== 'update') return doc

  // If we are saving English, check if we need to generate Chinese
  if (req.locale === 'en') {
    // We need to fetch the current Chinese version to see if it's empty
    // Note: 'doc' usually contains the data for the locale being saved (en)
    
    const { payload } = req
    
    // Fetch the document in Chinese to check if it exists
    const zhDoc = await payload.findByID({
      collection: 'projects',
      id: doc.id,
      locale: 'zh',
      depth: 0,
    })

    const updates: any = {}
    let hasUpdates = false

    // 1. Translate Title
    if (doc.title && (!zhDoc.title || zhDoc.title === '')) {
      // TODO: Call real API here. For now, simulated translation.
      updates.title = `[CN] ${doc.title}` 
      hasUpdates = true
    }

    // 2. Translate Summary
    if (doc.summary && (!zhDoc.summary || zhDoc.summary === '')) {
      updates.summary = `[CN] ${doc.summary} (Translated)`
      hasUpdates = true
    }

    // If we have updates, write them to the 'zh' locale
    if (hasUpdates) {
      try {
        await payload.update({
          collection: 'projects',
          id: doc.id,
          locale: 'zh',
          data: updates,
        })
        console.log(`Auto-translated Project ${doc.id} to Chinese`)
      } catch (error) {
        console.error('Error auto-translating:', error)
      }
    }
  }

  return doc
}
