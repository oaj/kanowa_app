import {IUser} from "@/types/user.type";

export function userJson(user: IUser) {
    return {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
    }
}