import React from "react";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreenView from "../screens/HomeScreenView";
import { heightPercentage } from "../utilities/dimension";
import ProfileScreenView from "../screens/ProfileScreenView";
import { INavigationParamList } from "../models/navigationModel";
import { appConfig } from "../configs";
import ListJadwalScreenView from "../screens/jadwal/ListJadwalScreenView";
import AttendanceScreenView from "../screens/attendance/ListAttendanceScreenView";

const Tab = createBottomTabNavigator<INavigationParamList>();

export function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { minHeight: heightPercentage(7) },
        headerTitleStyle: {
          fontFamily: "lato",
          color: appConfig.colors.primary,
        },
        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case "Home":
              return <Feather name="home" size={20} color={color} />;
            case "Attendance":
              return <Ionicons name="list" size={20} color={color} />;
            case "Jadwal":
              return <Ionicons name="calendar" size={20} color={color} />;
            case "Profile":
              return <AntDesign name="user" size={20} color={color} />;
            default:
              break;
          }
        },
        tabBarActiveTintColor: appConfig.colors.primary,
        tabBarInactiveTintColor: appConfig.colors.gray,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreenView} />
      <Tab.Screen name="Attendance" component={AttendanceScreenView} />

      <Tab.Screen name="Jadwal" component={ListJadwalScreenView} />
      <Tab.Screen
        name="Profile"
        options={{ tabBarLabel: "My Profile" }}
        component={ProfileScreenView}
      />
    </Tab.Navigator>
  );
}
