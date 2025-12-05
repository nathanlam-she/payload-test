'use server'

import config from '@/payload.config'
import { handleServerFunctions as payloadHandleServerFunctions } from '@payloadcms/next/layouts'

export async function handleServerFunctions(args: any) {
  return payloadHandleServerFunctions({
    ...args,
    config,
  })
}
