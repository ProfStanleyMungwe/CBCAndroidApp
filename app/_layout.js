// ios 628373745324-50pr1qla2hiq4aqip97ht7vh0tmfee80.apps.googleusercontent.com
// andriod 628373745324-mvas87qbm8hgi1587pnrtp1f4l8alt48.apps.googleusercontent.com
import React, { useCallback, createContext, useState, useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View, SafeAreaView } from "react-native";
import { AppProvider } from "../components/globalContext";
import SideMenu from "../components/SideMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootSiblingParent } from "react-native-root-siblings";
import NetInfo from '@react-native-community/netinfo';

SplashScreen.preventAutoHideAsync();
export const AppContext = createContext();
export default function _layout() {
  const [data, setData] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [machineId, setMachineId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const getStoredUserID = async () => {
    try {
      const value = await AsyncStorage.getItem("user_id");
      const valueM = await AsyncStorage.getItem("machine_id");

      if (value !== null && valueM !== null) {
        setUser(value);
        setMachineId(valueM);
        return true;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  useEffect(() => {
    getStoredUserID();
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <RootSiblingParent>
      <AppContext.Provider
        value={{ data, setData, menuOpen, setMenuOpen, user, setUser, isConnected, machineId, setMachineId }}
      >
        <SideMenu />
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          
          <Stack.Screen
            name="chat"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="signin"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="signup"
            options={{
              headerShown: false,
            }}
          />
        </Stack>

        {/* {children} */}
      </AppContext.Provider>
    </RootSiblingParent>
  );
}
