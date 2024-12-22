import { IStoreModel } from "./storeModel";

export type INavigationParamList = {
  navigate(arg0: string): unknown;
  Main: undefined;
  Home: undefined;
  SignUp: undefined;
  Login: undefined;
  Profile: undefined;
  Notification: undefined;
  Schedule: undefined;
  CreateSchedule: undefined;
  EditSchedule: { id: number };
  Attendance: undefined;
  DetailAttendance: { attendanceId: number; store: IStoreModel };
  ScheduleHistory: undefined;
};
