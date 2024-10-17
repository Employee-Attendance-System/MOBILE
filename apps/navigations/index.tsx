import React, { useEffect, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useAuthToken } from "../hooks/token";
import { useAppContext } from "../context/app.context";
import StackNavigations from "./stackNavigation";
import HomeSceenSkeleton from "../components/skeleton/screens/HomeScreen";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(238, 77, 45)",
  },
};

export default function AppNavigations() {
  const { setInit, init } = useAppContext();
  const { getToken } = useAuthToken();
  const [isLoading, setIsLoading] = useState(true);

  const initApp = async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      // const isAuth = token !== null
      const isAuth = true;

      setInit({ ...init, isAuth });
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initApp();
  }, []);

  if (isLoading) return <HomeSceenSkeleton />;

  return (
    <NavigationContainer theme={MyTheme}>
      <StackNavigations />
    </NavigationContainer>
  );
}
