import { IRootModel } from './rootModel'

export interface IGpsLocation extends IRootModel {
  gpsLocationId: string
  gpsLocationUserId: string
  gpsLocationLatitude: string
  gpsLocationLongitude: string
  user: {
    userName: string
  }
}

export interface IGpsLocationCreateRequest {
  gpsLocationLatitude: string
  gpsLocationLongitude: string
}

export interface IGpsLocationUpdateRequest {
  gpsLocationId: string
  gpsLocationUserId: string
  gpsLocationLatitude: string
  gpsLocationLongitude: string
}
