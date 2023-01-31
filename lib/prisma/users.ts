import prisma from '.'
import {User} from "@prisma/client";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany()
    console.log('getUsers', users)
    return { users }
  } catch (error) {
    return { error }
  }
}

// export async function createUser(user: User) {
//   try {
//     const userFromDB = await prisma.user.create({ data: user })
//     return { user: userFromDB }
//   } catch (error) {
//     return { error }
//   }
// }

export async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      // include: { tweets: true }
    })
    return { user }
  } catch (error) {
    return { error }
  }
}
