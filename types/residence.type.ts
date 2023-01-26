import {IUser} from "./user.type";

export interface IResidence {
  id: string,
  doorNumber: string,
  colonyId: string,
  colonyName: string,
  owner: IUser,
  tenant: IUser,
  responsible: IUser,
  residenceTags:[]
}
