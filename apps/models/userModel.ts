import { IRootModel } from './rootModel'

export interface IUserModel extends IRootModel {
  userId: string
  userName: string
  userEmail: string
  userPassword: string
  userPhoneNumber: string
  userPhoto: string
  userRole: 'user' | 'admin' | 'superAdmin'
}

export interface IUserUpdateRequestModel {
  userId: string
  userName?: string
  userEmail?: string
  userPassword?: string
  userPhoneNumber?: string
  userPhoto?: string
  userRole?: 'user' | 'admin' | 'superAdmin' | string
}

export interface IUserCreateRequestModel {
  userName: string
  userEmail: string
  userPassword: string
  userPhoneNumber: string
  userPhoto: string
  userRole: 'user' | 'admin' | 'superAdmin' | string
}

export interface IUserLoginRequestModel {
  userName: string
  userPassword: string
}
