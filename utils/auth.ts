import { auth } from '@clerk/nextjs/server'
import { prisma } from './db'

export const getUserByClerkID = async (opts = {}) => {
  const { userId } = auth()

  const user = prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
  })

  return user
}
