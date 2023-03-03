import {Role} from "@prisma/client";

export interface IUser {
  id: number | null,
  username?: string
  email: string,
  firstname: string,
  lastname: string,
  phone: string | null,
  role: Role | null
  active: boolean
  createdAt: Date | null
}

// Used for user profile
export interface IProfile {
  id: string,
  firstName: string,
  lastName: string,
  langKey: string
}

export interface IViewManagedUser {
  id: string | null,
  username: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: string | null,
  role: Role,
  activated: boolean,
  blocked: boolean,
  imageUrl: string,
  langKey: string,
  // createdBy: string,
  createdAt: Date,
  // lastModifiedBy: string,
  updatedAt: Date,
}

export interface IEditManagedUser {
  id: string | null,
  firstName: string,
  lastName: string,
  email: string,
  role: Role;
}

// export type IRole = Role.USER | 'ROLE_MODERATOR' | 'ROLE_ADMIN' | 'ROLE_GOD';
// export type IRole = 'ROLE_USER' | 'ROLE_MODERATOR' | 'ROLE_ADMIN' | 'ROLE_GOD';
type RoleWebType = {
  key: Role,
  label: string
}
const ROLE_NONE: RoleWebType = {
  key: Role.NONE,
  label: '----'
}
const ROLE_USER: RoleWebType = {
  key: Role.USER,
  label: 'User'
}
const ROLE_ADMIN: RoleWebType = {
  key: Role.ADMIN,
  label: 'Admin',
}
const ROLE_GOD: RoleWebType = {
  key: Role.GOD,
  label: 'God'
}
export const RoleTypes = {
  ROLE_NONE: ROLE_NONE,
  ROLE_USER: ROLE_USER,
  ROLE_ADMIN: ROLE_ADMIN,
  ROLE_GOD: ROLE_GOD,
  values: [ROLE_USER, ROLE_ADMIN, ROLE_GOD],
  valueOf: (key: string | undefined) => {
    return RoleTypes.values.find(value => value.key === key);
  }
}
