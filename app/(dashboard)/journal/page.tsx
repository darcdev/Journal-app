import { prisma } from '@/utils/db'
import { getUserByClerkID } from '../../../utils/auth'
import NewEntryCard from '../../components/NewEntryCard'
import EntryCard from '../../components/EntryCard'
import Link from 'next/link'
import Question from '../../components/Question'

const getEntries = async () => {
  const user = await getUserByClerkID()
  const entries = await prisma.journaEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8">Journal Entries</h2>
      <div>
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4 p-10">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
