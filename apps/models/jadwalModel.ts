import { IRootModel } from './rootModel'

export interface IJadwalModel extends IRootModel {
  jadwalId: number
  jadwalName: string
  jadwalDescription: string
  jadwalTokoId: number
  jadwalUserId: number
  jadwalStartDate: string
  jadwalEndDate: string
  jadwalStatus: 'waiting' | 'checkin' | 'checkout' | string
}

export interface IJadwalUpdateRequestModel {
  jadwalId: number
  jadwalName?: string
  jadwalDescription?: string
  jadwalTokoId?: number
  jadwalUserId?: number
  jadwalStartDate?: string
  jadwalEndDate?: string
  jadwalStatus?: 'waiting' | 'checkin' | 'checkout' | string
}

export interface IJadwalCreateRequestModel {
  jadwalName: string
  jadwalDescription: string
  jadwalTokoId: number
  jadwalUserId: number
  jadwalStartDate: string
  jadwalEndDate: string
  jadwalStatus: 'waiting' | 'checkin' | 'checkout' | string
}
