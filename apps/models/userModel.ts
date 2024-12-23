import { IRootModel } from "./rootModel";

export interface IUserModel extends IRootModel {
  userId: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: "admin" | "spg" | "supplier" | string;
  userDeviceId: string;
  userContact: string;
  userSupplierId: number;
}

export interface IUserUpdateRequestModel {
  userName?: string;
  userEmail?: string;
  userPassword?: string;
  userRole?: "admin" | "spg" | "supplier" | string;
  userDeviceId?: string;
  userContact?: string;
  userSupplierId?: number;
}

export interface IUserCreateRequestModel {
  userName: string;
  userPassword: string;
  userRole: "admin" | "spg" | "supplier" | string;
  userDeviceId: string;
  userContact: string;
  userSupplierId: number;
}

export interface IUserLoginRequestModel {
  userName: string;
  userPassword: string;
  userDeviceId: string;
}
