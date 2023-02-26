import prisma from '.'
import {IUser} from "@/types/user.type";

// Used to select individual data in a select
export const IUserSelect = {
  id: true,
  email: true,
  firstname: true,
  lastname: true,
  phone: true,
}
export async function getUsers() {
  try {
    const users: IUser[] = await prisma.user.findMany({
      select: IUserSelect,
    })
    console.log('users', users)
    return { users }
  } catch (error) {
    throw error
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
    const user: IUser | null = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: IUserSelect,
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user: IUser | null = await prisma.user.findUnique({
      where: { email: email },
      select: IUserSelect,
    })
    return { user }
  } catch (error) {
    return { error }
  }
}
