import { IRootModel } from './rootModel'

export interface ITokoModel extends IRootModel {
  tokoId: number
  tokoName: string
  tokoLongitude: string
  tokoLatitude: string
}

export interface ITokoUpdateRequestModel {
  tokoId: number
  tokoName?: string
  tokoLongitude?: string
  tokoLatitude?: string
}

export interface ITokoCreateRequestModel {
  tokoName: string
  tokoLongitude: string
  tokoLatitude: string
}
