import "server-only"
import prisma from '.'

export async function getColonies() {
    try {
        const colonies = await prisma.colony.findMany({
            include: {
                president: true,
                treasurer: true,
                secretary: true,
            }
        })
        console.log('getColonies', colonies)
        return { colonies }
    } catch (error) {
        throw error
    }
}

export async function getColonyById(id: number) {
    try {
        const colony = await prisma.colony.findUnique({
            where: { id: Number(id) },
            // include: { tweets: true }
        })
        return { colony }
    } catch (error) {
        return { error }
    }
}
