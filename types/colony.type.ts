import {IUser} from "./user.type";
import {IResidence} from "./residence.type";

export interface IColony {
  id?: string,
  name: string,
  created: Date,
  active: boolean,
  president: IUser | null,
  treasurer: IUser | null,
  secretary: IUser | null,
  type: string,
  lastModifiedBy: string,
  lastModifiedDate: Date,
  residences: IResidence[],
}

export interface IColonyManagement {
  id?: string,
  name: string,
  created: Date,
  createdBy: string,
  active: boolean,
  addressLine1: string,
  addressLine2: string,
  addressLine3: string,
  nearBy: string,
  city: string,
  type: string,
  roleNotificationsSuspended: string,
  president: IUser | null,
  treasurer: IUser | null,
  secretary: IUser | null,
  lastModifiedBy: string,
  lastModified: Date,
  residences: IResidence[],
}

type ColonyType = {
  key: string,
  label: string
}
const HOUSES: ColonyType = {
  key: 'HOUSES',
  label: 'houses'
}
const APARTMENTS: ColonyType = {
  key: 'APARTMENTS',
  label: 'Apartments'
}
export const ColonyTypes = {
  HOUSES: HOUSES,
  APARTMENTS: APARTMENTS,
  values: [HOUSES, APARTMENTS],
  valueOf: (key: string | undefined) => {
    return ColonyTypes.values.find(value => value.key === key);
  }
}

