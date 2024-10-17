import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BASE_COLOR } from "../utilities/baseColor";
import LoginScreenView from "../screens/LoginScreenView";
import { useAppContext } from "../context/app.context";
import { INavigationParamList } from "../models/navigationModel";
import { TabNavigation } from "./tabNavigation";
import SignUpScreenView from "../screens/SignInScreenView";
import AttendanceScreenView from "../screens/attendance/ListAttendanceScreenView";
import CreateJadwalScreenView from "../screens/jadwal/CreateJadwalScreenView";
import ListJadwalScreenView from "../screens/jadwal/ListJadwalScreenView";

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
          <Stack.Screen name="Jadwal" component={ListJadwalScreenView} />
          <Stack.Screen
            name="CreateJadwal"
            component={CreateJadwalScreenView}
          />
          <Stack.Screen name="Attendance" component={AttendanceScreenView} />
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
