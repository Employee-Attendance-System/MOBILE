import { IRootModel } from './rootModel'

export interface ISchedule extends IRootModel {
  scheduleId: number
  scheduleName: string
  scheduleDescription: string
  scheduleTokoId: number
  scheduleSpgId: number
  scheduleStartDate: string
  scheduleEndDate: string
}

export interface IScheduleCreateRequest {
  scheduleId: number
  scheduleName: string
  scheduleDescription: string
  scheduleTokoId: number
  scheduleSpgId: number
  scheduleStartDate: string
  scheduleEndDate: string
}
