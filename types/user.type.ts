export interface IUser {
  id: string | null,
  email: string,
  firstName: string,
  lastName: string,
  phone: string | null,
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
  role: IRole,
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
  role: IRole;
}

export type IRole = 'ROLE_USER' | 'ROLE_MODERATOR' | 'ROLE_ADMIN' | 'ROLE_GOD';
type RoleType = {
  key: IRole,
  label: string
}
const ROLE_USER: RoleType = {
  key: 'ROLE_USER',
  label: 'User'
}
const ROLE_MODERATOR: RoleType = {
  key: 'ROLE_MODERATOR',
  label: 'Moderator'
}
const ROLE_ADMIN: RoleType = {
  key: 'ROLE_ADMIN',
  label: 'Admin',
}
const ROLE_GOD: RoleType = {
  key: 'ROLE_GOD',
  label: 'God'
}
export const RoleTypes = {
  ROLE_USER: ROLE_USER,
  ROLE_MODERATOR: ROLE_MODERATOR,
  ROLE_ADMIN: ROLE_ADMIN,
  ROLE_GOD: ROLE_GOD,
  values: [ROLE_USER, ROLE_MODERATOR, ROLE_ADMIN, ROLE_GOD],
  valueOf: (key: string | undefined) => {
    return RoleTypes.values.find(value => value.key === key);
  }
}
