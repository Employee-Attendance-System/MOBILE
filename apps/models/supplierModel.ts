import { IRootModel } from "./rootModel";

export interface ISupplierModel extends IRootModel {
  userId: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: "admin" | "spg" | "supplier" | string;
  userDeviceId: string;
  userContact: string;
  userSupplierId: number;
}
