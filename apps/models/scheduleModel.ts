import { IRootModel } from './rootModel'
import { IStoreModel } from './storeModel'

export interface IScheduleModel extends IRootModel {
  scheduleId: number
  scheduleName: string
  scheduleDescription: string
  scheduleStoreId: number
  scheduleStartDate: string
  scheduleEndDate: string
  scheduleStatus: 'waiting' | 'checkin' | 'checkout' | string
  store: IStoreModel
}

export interface IScheduleUpdateRequestModel {
  scheduleId: number
  scheduleName?: string
  scheduleDescription?: string
  scheduleStoreId?: number
  scheduleUserId?: number
  scheduleStartDate?: string
  scheduleEndDate?: string
  scheduleStatus?: 'waiting' | 'checkin' | 'checkout' | string
}

export interface IScheduleCreateRequestModel {
  scheduleName: string
  scheduleDescription: string
  scheduleStoreId: number
  scheduleStartDate: string
  scheduleEndDate: string
  scheduleStatus: 'waiting' | 'checkin' | 'checkout' | string
}
