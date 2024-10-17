export interface IAppAlertModel {
  isDisplayAlert: boolean
  alertType: 'error' | 'info' | 'warning' | 'success' | undefined
  message: string
}
