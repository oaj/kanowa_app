import {IUser} from "@/types/user.type";

export const userCreate = (user: IUser) => {
    return {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role ? user.role : undefined,
    }
}
export const userConnect = (user: IUser) => {
    return {
        id: Number(user.id),
    }
}

export const userConnectOrCreate = (user: IUser) => {
    return {
        where: {email: user.email},
        create: {
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role ? user.role : undefined,
        }
    }
}
