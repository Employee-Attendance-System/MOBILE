import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BASE_COLOR } from "../utilities/baseColor";
import LoginScreenView from "../screens/LoginScreenView";
import { useAppContext } from "../context/app.context";
import { INavigationParamList } from "../models/navigationModel";
import { TabNavigation } from "./tabNavigation";
import SignUpScreenView from "../screens/SignInScreenView";
import AttendanceScreenView from "../screens/attendance/ListAttendanceScreenView";
import ListScheduleScreenView from "../screens/schedule/ListScheduleScreen";
import CreateScheduleScreenView from "../screens/schedule/CreateScheduleScreen";
import EditScheduleScreenView from "../screens/schedule/EditScheduleScreen";
import DetailAttendanceScreenView from "../screens/attendance/DetailAttendanceScreenView";
import ListScheduleHistoryScreenView from "../screens/schedule/ListHistoryScheduleScreen";

const Stack = createNativeStackNavigator<INavigationParamList>();

export default function StackNavigations() {
  const { init } = useAppContext();

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "lato",
          color: BASE_COLOR.text.primary,
        },
      }}
    >
      {init.isAuth === true && (
        <>
          <Stack.Screen
            name="Main"
            component={TabNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Schedule" component={ListScheduleScreenView} />
          <Stack.Screen
            name="ScheduleHistory"
            component={ListScheduleHistoryScreenView}
          />
          <Stack.Screen
            name="CreateSchedule"
            component={CreateScheduleScreenView}
          />
          <Stack.Screen
            name="EditSchedule"
            component={EditScheduleScreenView}
          />
          <Stack.Screen name="Attendance" component={AttendanceScreenView} />
          <Stack.Screen
            name="DetailAttendance"
            component={DetailAttendanceScreenView}
          />
        </>
      )}

      {init.isAuth === false && (
        <>
          <Stack.Screen name="Login" component={LoginScreenView} />
          <Stack.Screen name="SignUp" component={SignUpScreenView} />
        </>
      )}
    </Stack.Navigator>
  );
}
