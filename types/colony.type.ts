import {IUser} from "./user.type";
import {IResidence} from "./residence.type";
import {Colony, User, Residence} from "@prisma/client";
import {ColonyType} from "@prisma/client";

export type ColonyPlus = (Colony & { president: User, treasurer: User | null, secretary: User | null , residences?: Residence[]})


export interface IColony {
  id?: number,
  name: string,
  createdAt: Date,
  active: boolean,
  president: IUser,
  treasurer?: IUser | null,
  secretary?: IUser | null,
  type: ColonyType | null,
  updatedAt: Date,
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

type ColonyWebType = {
  key: ColonyType,
  label: string
}
const HOUSES: ColonyWebType = {
  key: ColonyType.HOUSES,
  label: 'houses'
}
const APARTMENTS: ColonyWebType = {
  key: ColonyType.APARTMENTS,
  label: 'Apartments'
}
export const ColonyWebTypes = {
  HOUSES: HOUSES,
  APARTMENTS: APARTMENTS,
  values: [HOUSES, APARTMENTS],
  valueOf: (key: string | undefined | null) => {
    return ColonyWebTypes.values.find(value => value.key === key);
  }
}

