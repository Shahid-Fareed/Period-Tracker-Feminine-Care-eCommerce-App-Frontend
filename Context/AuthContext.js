import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("skipLogin").then((value) => {
      if (value == null || value === "") {
        setIsLoggedIn(false);
      } else if (value === "true") {
        AsyncStorage.getItem("LoginDetails").then((value) => {
          if (value == null || value === "") {
            setIsLoggedIn(false);
          } else {
            setIsLoggedIn(true);
          }
        });
      }
    });
  }, [navigation]);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = async () => {
    setIsLoggedIn(false);
    // Additional logout logic such as clearing AsyncStorage or other state
    await AsyncStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook to consume AuthContext
export const useAuth = () => useContext(AuthContext);
