import { getUserByClerkID } from '../../../utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { analyze } from '../../../utils/ai'

export const POST = async () => {
  const user = await getUserByClerkID()
  const entry = await prisma.journaEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!',
    },
  })

  const analysis = await analyze(entry.content)
  await prisma.analysis.create({
    data: {
      entryId: entry.id,
      userId: user.id,
      ...analysis,
    },
  })

  revalidatePath('/journal')
  return NextResponse.json({ data: entry })
}
