/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { appConfig } from '../configs'
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage
} from '../utilities/localStorageDB'

export interface GetTableDataTypes {
  url: string
  pagination?: boolean | true
  page?: number | 0
  size?: number | 10
  filters?: any
}

export const getHeaders = async () => {
  const token = await getDataFromLocalStorage({ key: appConfig.localStorage.appKey })
  return {
    Authorization: `Bearer ${token}`
  }
}

export class ServiceHttp {
  private baseUrl = appConfig.baseUrl

  public async get({ path }: { path: string }) {
    try {
      const headers = await getHeaders()
      const result = await axios.get(this.baseUrl + path, {
        headers
      })
      return result.data.data
    } catch (error: any) {
      console.log(error.response?.data?.error_message || error.message)

      if (error.response && error.response.status === 401) {
        await removeDataFromLocalStorage({ key: appConfig.localStorage.appKey })
      }

      throw Error(error.response?.data?.error_message || error.message)
    }
  }

  public async post({ path, body }: { path: string; body: any }) {
    try {
      const headers = await getHeaders()
      const result = await axios.post(this.baseUrl + path, body, {
        headers
      })
      return result.data
    } catch (error: any) {
      console.log(error.response?.data?.error_message || error.message)
      if (error.response && error.response.status === 401) {
        await removeDataFromLocalStorage({ key: appConfig.localStorage.appKey })
      }

      throw Error(error.response?.data?.error_message || error.message)
    }
  }

  public async patch({ path, body }: { path: string; body: any }) {
    try {
      const headers = await getHeaders()
      const result = await axios.patch(this.baseUrl + path, body, {
        headers
      })
      return result.data
    } catch (error: any) {
      console.log(error.response?.data?.error_message || error.message)

      if (error.response && error.response.status === 401) {
        await removeDataFromLocalStorage({ key: appConfig.localStorage.appKey })
      }

      throw Error(error.response?.data?.error_message || error.message)
    }
  }

  public async remove({ path }: { path: string }) {
    try {
      const headers = await getHeaders()
      const result = await axios.delete(this.baseUrl + path, {
        headers
      })
      return result.data
    } catch (error: any) {
      console.log(error.response?.data?.error_message || error.message)

      if (error.response && error.response.status === 401) {
        await removeDataFromLocalStorage({ key: appConfig.localStorage.appKey })
      }

      throw Error(error.response?.data?.error_message || error.message)
    }
  }

  public async getTableData(params: GetTableDataTypes) {
    const { url, pagination, page, size, filters } = params
    try {
      const queryFilter = new URLSearchParams(filters).toString()
      const headers = await getHeaders()
      const result = await axios.get(
        `${url}?pagination=${pagination}&page=${page}&size=${size}&${queryFilter}`,
        {
          headers
        }
      )

      return {
        ...result.data.data,
        page: page,
        size: size
      }
    } catch (error: any) {
      console.log(error.response?.data?.error_message || error.message)

      if (error.response && error.response.status === 401) {
        await removeDataFromLocalStorage({ key: appConfig.localStorage.appKey })
      }

      throw Error(error.response?.data?.error_message || error.message)
    }
  }
}
