import {IUser} from "@/types/user.type";

const API_URL = "http://localhost:3000/api/colony/";

const isUserEmpty = (user: IUser | null) => {
    if (!user) return true;
    return !(user.id || user.email || user.firstname || user.lastname || user.phone);
}

export const saveColony = async (
    id: number | null,
    name: string,
    address: string,
    nearBy: string,
    city: string,
    roleNotificationsSuspended: boolean,
    active: boolean,
    type: string,
    president: IUser | null,
    treasurer: IUser | null,
    secretary: IUser | null
) => {
    // Here the users are checked to see if they are empty and should be set to null
    president = isUserEmpty(president) ? null : president;
    treasurer = isUserEmpty(treasurer) ? null : treasurer;
    secretary = isUserEmpty(secretary) ? null : secretary;

    return fetch(API_URL + (id ? id : ''), {
        method: id ? 'PUT' : 'POST',
        headers: {
            'Content-type': 'Application/json',
        },
        body: JSON.stringify({
            id: id,
            name: name,
            address: address,
            nearBy: nearBy,
            city: city,
            roleNotificationsSuspended: roleNotificationsSuspended,
            active: active,
            type: type,
            president: president,
            treasurer: treasurer,
            secretary: secretary,
        })
    }).then(response => {
        return response.json();
    }).catch(reason => {
        return reason.message
    })
};

export const registerColony = async (
    name: string,
    address: string,
    nearBy: string,
    city: string,
    firstname: string,
    lastname: string,
    email: string
) => {

    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json',
        },
        body: JSON.stringify({
            name,
            address,
            nearBy,
            city,
            firstname,
            lastname,
            email
        })
    }).then(response => {
        return response.json();
    }).catch(reason => {
        return reason.message
    });
};
//  replace string dates with Date Object
// const fixOne = (response: AxiosResponse<any>) => {
//   response.data.created = new Date(response.data.created);
//   response.data.lastModifiedDate = new Date(response.data.lastModifiedDate);
//   return response;
// }
//
// const fixMany = (response: AxiosResponse<any>) => {
//   const colonies: IColony[] = response.data;
//   colonies.map(colony => {
//     colony.created = new Date(colony.created);
//     colony.lastModifiedDate = new Date(colony.lastModifiedDate);
//     return colony;
//   })
//   response.data = colonies;
//   return response;
// }


// export const getAllColonies = () => {
//   return axiosInstance.get(API_URL + "manage-colonies", {headers: authHeader()})
//     .then(response => fixMany(response));
// };
//
// export const getById = async (id: string) => {
//   return axiosInstance.get(API_URL + "getById/" + id,
//     {headers: authHeader()})
//     .then((response) => fixOne(response));
// }

// ------------------------------------------------
// export const deleteColony = (id: string) => {
//
//   return fetch(API_URL + "manage-colonies/delete/" + id, {
//     headers: authHeader()})
//   .then(response => {
//     if (response.ok) {
//       return response;
//     } else {
//       throw new Error(response.statusText);
//     }
//   }).catch(reason => {
//     console.log('reason', reason)
//     return Promise.reject(reason.message)
//   });
// }

// const postFetch = () => {
//   return fetch(API_URL + '"ugg', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'Application/json',
//       ...authHeader(),
//     },
//     body: JSON.stringify({
//       name: 'Isabella'
//     })
//   })
// }
