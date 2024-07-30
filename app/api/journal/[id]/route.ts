import { getUserByClerkID } from '../../../../utils/auth'
import { prisma } from '../../../../utils/db'
import { NextResponse } from 'next/server'
import { analyze } from '../../../../utils/ai'
import { revalidatePath } from 'next/cache'

export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json()
  const user = await getUserByClerkID()
  const updatedEntry = await prisma.journaEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  const analysis = await analyze(content)

  const savedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      entryId: updatedEntry.id,
      ...analysis,
    },
    update: analysis,
  })

  revalidatePath(`/journal/${updatedEntry.id}`)

  return NextResponse.json({ ...updatedEntry, analysis: savedAnalysis })
}
