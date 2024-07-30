import React from 'react'
import Editor from '../../../components/Editor'
import { getUserByClerkID } from '../../../../utils/auth'
import { prisma } from '../../../../utils/db'

const getEntry = async (id: string) => {
  const user = await getUserByClerkID()
  const entry = await prisma.journaEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

const EntryPage = async ({ params }) => {
  const entry: any = await getEntry(params.id)

  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage
