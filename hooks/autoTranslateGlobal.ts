import { GlobalAfterChangeHook } from 'payload'

export const autoTranslateGlobal: GlobalAfterChangeHook = async ({ doc, req, global }) => {
  // If we are saving English, check if we need to generate Chinese
  if (req.locale === 'en') {
    const { payload } = req
    
    // Fetch the Global in Chinese to check if it exists
    const zhDoc = await payload.findGlobal({
      slug: global.slug as any,
      locale: 'zh',
      depth: 0,
    })

    const updates: any = {}
    let hasUpdates = false

    // Helper to check and translate
    const checkAndTranslate = (field: string) => {
      if (doc[field] && (!zhDoc[field] || zhDoc[field] === '')) {
        updates[field] = `[CN] ${doc[field]}`
        hasUpdates = true
      }
    }

    // List of fields to attempt translation on
    checkAndTranslate('heroTitle')
    checkAndTranslate('heroSubtitle')
    checkAndTranslate('aboutTitle')
    // checkAndTranslate('contactEmail') // Emails usually don't need translation
    // checkAndTranslate('officeAddress') // Address might need it

    if (doc.officeAddress && (!zhDoc.officeAddress || zhDoc.officeAddress === '')) {
       updates.officeAddress = `[CN] ${doc.officeAddress}`
       hasUpdates = true
    }

    // If we have updates, write them to the 'zh' locale
    if (hasUpdates) {
      try {
        await payload.updateGlobal({
          slug: global.slug as any,
          locale: 'zh',
          data: updates,
        })
        console.log(`Auto-translated Global ${global.slug} to Chinese`)
      } catch (error) {
        console.error('Error auto-translating global:', error)
      }
    }
  }

  return doc
}
