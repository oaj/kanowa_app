import prisma from '.'

export async function getUsers() {
  try {
    const users = await prisma.user.findMany()
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
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    })
    return { user }
  } catch (error) {
    return { error }
  }
}
