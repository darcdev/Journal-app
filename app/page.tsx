import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'

export default function Home() {
  const { userId } = auth()

  let hrefOnAuth = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center justify-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">The best Journal app, period.</h1>
        <p className="text-2xl text-white/60 mb-4">
          This is the best app for tracking your mood through out your life. All
          you have todo is be honest.
        </p>
        <div>
          <Link href={hrefOnAuth}>
            <button className="bg-blue-600 px-4  py-2 rounded-lg text-xl">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
