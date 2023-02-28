import {IUser} from "@/types/user.type";
import {IResidenceTag} from "@/types/residence.tag.type";

const API_URL = "http://localhost:3000/api/residence/";

export const saveResidence = async (
    id: number | null,
    colonyId: number,
    doorNumber: string,
    residenceTags: IResidenceTag[],
    owner: IUser | null,
    tenant: IUser | null,
    responsible: IUser | null,
) => {
    // Here the users are checked to see if they are empty and should be set to null
    owner = isUserEmpty(owner) ? null : owner;
    tenant = isUserEmpty(tenant) ? null : tenant;
    responsible = isUserEmpty(responsible) ? null : responsible;

    console.log('saveResidence before fetch')
    return fetch(API_URL + (id ? id : ''), {
        method: id ? 'PUT' : 'POST',
        headers: {
            'Content-type': 'Application/json',
        },
        body: JSON.stringify({
            id: id,
            colonyId: colonyId,
            doorNumber: doorNumber,
            residenceTags: residenceTags,
            owner: owner,
            tenant: tenant,
            responsible: responsible,
        })
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    }).catch(reason => {
        console.log('reason', reason)
        return Promise.reject(reason.message)
    });
};

const isUserEmpty = (user: IUser | null) => {
    if (!user) return true;
    return !(user.id || user.email || user.firstname || user.lastname || user.phone);
}


