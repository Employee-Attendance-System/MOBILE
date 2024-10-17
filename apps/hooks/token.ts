import { appConfig } from '../configs'
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
  saveDataToLocalStorage
} from '../utilities/localStorageDB'

export const useAuthToken = () => {
  const TOKEN_KEY = appConfig.localStorage.appKey

  const getToken = async (): Promise<string | null> => {
    return await getDataFromLocalStorage({ key: TOKEN_KEY })
  }

  const setToken = async (token: string): Promise<void> => {
    await saveDataToLocalStorage({ key: TOKEN_KEY, data: token })
  }

  const removeToken = async (): Promise<void> => {
    await removeDataFromLocalStorage({ key: TOKEN_KEY })
  }

  return {
    getToken,
    setToken,
    removeToken
  }
}
