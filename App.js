import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/Navigation/AppNavgation";
import { Provider } from "react-redux";
import store from "./src/Redux/store/Store";
import { AuthProvider } from "./Context/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Causten-Black": require("./assets/fonts/Causten-Black.otf"),
    "Causten-Bold": require("./assets/fonts/Causten-Bold.otf"),
    "Causten-ExtraBold": require("./assets/fonts/Causten-ExtraBold.otf"),
    "Causten-ExtraLight": require("./assets/fonts/Causten-ExtraLight.otf"),
    "Causten-Light": require("./assets/fonts/Causten-Light.otf"),
    "Causten-Medium": require("./assets/fonts/Causten-Medium.otf"),
    "Causten-Regular": require("./assets/fonts/Causten-Regular.otf"),
    "Causten-SemiBold": require("./assets/fonts/Causten-SemiBold.otf"),
    "Causten-Thin": require("./assets/fonts/Causten-Thin.otf"),
  });

  useEffect(() => {
    const hideSplash = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplash();

    // Cleanup function
    return () => {
      // Perform any cleanup if necessary
    };
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthProvider>
          <AppNavigation />
          <StatusBar style="auto" />
        </AuthProvider>
      </NavigationContainer>
    </Provider>
  );
}
