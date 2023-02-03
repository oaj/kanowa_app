import {Role} from "@prisma/client";

const API_URL = "http://localhost:3000/api/user/";

export const getUserById = async (id: number) => {

  return fetch(API_URL + id, {
    method: 'GET',
    headers: {
      'Content-type': 'Application/json',
    },
  })
};

export const getUserByEmail = (email: string) => {


  return fetch(API_URL + "getByEmail/" + email);
};

export const saveManagedUser = (id: number | undefined, firstname: string, lastname: string, email: string, role: Role) => {
  console.log('id', id)
  console.log('id', !!id)

  return fetch(API_URL + (id ? id : ''), {
    method: id ? 'PUT':'POST',
    headers: {
      'Content-type': 'Application/json',
    },
    body: JSON.stringify({
      id: id,
      firstname: firstname,
      lastname: lastname,
      email: email,
      role: role
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
}

// export const registerUser = (username: string, email: string, password: string, firstName: string, lastName: string, langKey: string) => {
//
//   return axiosInstance.post(API_URL + "register", {
//     username,
//     email,
//     password,
//     firstName,
//     lastName,
//     langKey
//   });
// };
//
// export const activateUser = (activationKey: string) => {
//   return axiosInstance.get(API_URL + "activate/" + activationKey)
// };
//
// export const saveProfileUser = (profileUser: IProfile) => {
//   return axiosInstance.post(API_URL + "saveProfile", profileUser, {headers: authHeader()});
// };
//
// //----------------------------------- ManagedUser ----------------------------------------
//
// // const fixOneManagedUser = (response: AxiosResponse<any>) => {
// //   response.data.createdDate = new Date(response.data.createdDate);
// //   response.data.lastModifiedDate = new Date(response.data.lastModifiedDate);
// //   return response;
// // }
//
// const fixManyManagedUsers = (response: AxiosResponse<any>) => {
//   const users: IViewManagedUser[] = response.data;
//   users.map(user => {
//     user.created = new Date(user.created);
//     user.lastModified = new Date(user.lastModified);
//     return user;
//   })
//   response.data = users;
//   return response;
// }
//
// export const getAllUsers = () => {
//   return axiosInstance.get(API_URL + "all",
//     {headers: authHeader()})
//     .then(response => fixManyManagedUsers(response));
// };
