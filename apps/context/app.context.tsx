/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useReducer } from 'react'
import { IInitModel } from '../models/initModel'
import { IAppAlertModel } from '../models/appAlertModel'

export interface AppContextTypes {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
  appAlert: IAppAlertModel
  setAppAlert: (value: IAppAlertModel) => void
  init: IInitModel
  setInit: (value: IInitModel) => void
}

export enum AppAction {
  IS_LOADING = 'IS_LOADING',
  APP_ALERT = 'APP_ALERT',
  INIT = 'INIT'
}

type State = {
  isLoading: boolean | unknown
  appAlert: IAppAlertModel | unknown
  init: IInitModel | unknown
}

type Action = { type: AppAction; payload?: State }
type Dispatch = (action: Action) => void

type AppContextType = {
  state: State
  dispatch: Dispatch
}

export const AppContext = createContext<AppContextType | any>(undefined)

function appReducer(state: State, action: Action) {
  switch (action.type) {
    case AppAction.IS_LOADING: {
      return { ...state, isLoading: action.payload?.isLoading }
    }
    case AppAction.APP_ALERT: {
      return { ...state, appAlert: action.payload?.appAlert }
    }
    case AppAction.INIT: {
      return { ...state, init: action.payload?.init }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    appAlert: { isDisplayAlert: false, message: '', alertType: undefined },
    isLoading: false,
    init: {
      settings: {
        settingId: '',
        settingBanner: '',
        settingWhatsappNumber: ''
      },
      isAuth: false
    }
  })

  const value = { state, dispatch }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext(): AppContextTypes {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider')
  }
  return {
    ...context,
    ...context.state,
    setIsLoading: (value: boolean) => {
      return context.dispatch({
        type: AppAction.IS_LOADING,
        payload: {
          isLoading: value
        }
      })
    },
    setAppAlert: (value: IAppAlertModel) => {
      return context.dispatch({
        type: AppAction.APP_ALERT,
        payload: {
          appAlert: value
        }
      })
    },

    setInit: (value: boolean) => {
      return context.dispatch({
        type: AppAction.INIT,
        payload: {
          init: value
        }
      })
    }
  }
}
