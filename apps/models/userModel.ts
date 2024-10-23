import { IRootModel } from './rootModel'

export interface IUserModel extends IRootModel {
  userId: string
  userName: string
  userEmail: string
  userPassword: string
  userRole: 'admin' | 'spg' | 'supplier' | string
  userDeviceId: string
  userContact: string
}

export interface IUserUpdateRequestModel {
  userId: string
  userName?: string
  userEmail?: string
  userPassword?: string
  userRole?: 'admin' | 'spg' | 'supplier' | string
  userDeviceId?: string
  userContact?: string
}

export interface IUserCreateRequestModel {
  userName: string
  userEmail: string
  userPassword: string
  userRole: 'admin' | 'spg' | 'supplier' | string
  userDeviceId: string
  userContact: string
}

export interface IUserLoginRequestModel {
  userName: string
  userPassword: string
}
