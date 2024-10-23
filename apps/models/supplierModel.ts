import { IRootModel } from './rootModel'

export interface ISupplierModel extends IRootModel {
  supplierId: number
  supplierName: number
  supplierContact: number
}

export interface ISupplierUpdateRequestModel {
  supplierId: number
  supplierName?: number
  supplierContact?: number
}

export interface ISupplierCreateRequestModel {
  supplierName: number
  supplierContact: number
}
