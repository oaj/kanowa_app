import prisma from "@/lib/prisma";
import {userConnectOrCreate} from "@/lib/services/userService";
import {IColonySelect} from "@/lib/prisma/colonies";

export async function registerColony(name: string, address: string, nearBy: string, city: string, firstname: string, lastname: string, email: string) {

    // validate that name of colony is not taken
    const colony = await prisma.colony.findFirst({
        where: {name: name},
    })
    if (colony) {
        throw {field: 'name', message: 'Name is already taken!'}
    }

    const query: any = {}
    query.data = {
        name,
        address,
        nearBy,
        city,
    }
    query.data.president = {
        connectOrCreate: {
            where: {email: email},
            create: {
                email: email,
                firstname: firstname,
                lastname: lastname,
            }
        }
    }
    query.select = IColonySelect;

    let savedColony = null
    try {
        savedColony = await prisma.colony.create(query)
    } catch (error: any) {
        throw {message: error.message}
    }

    return savedColony
}
