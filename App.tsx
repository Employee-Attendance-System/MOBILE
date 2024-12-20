import React from "react";
import AppNavigations from "./apps/navigations";
import { NativeBaseProvider, extendTheme } from "native-base";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";
import _ from "lodash";
import "expo-dev-client";
import { AppProvider } from "./apps/context/app.context";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

LogBox.ignoreLogs(["Warning:..."]);
LogBox.ignoreAllLogs();
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

export const theme = extendTheme({ config });

type MyThemeType = typeof theme;

declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

export default function App() {
  const [loaded] = useFonts({
    lora: require("./assets/Font/Lora-VariableFont_wght.ttf"),
    lato: require("./assets/Font/Lato-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <AppProvider>
        <AppNavigations />
        <StatusBar barStyle="default" backgroundColor="#FFF" />
      </AppProvider>
    </NativeBaseProvider>
  );
}
