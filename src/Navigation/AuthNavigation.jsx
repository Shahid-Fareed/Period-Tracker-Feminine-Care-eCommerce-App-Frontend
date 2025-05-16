import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Welcome from "../Screens/Welcome/Welcome";
import LastPeriodStart from "../Screens/LastPeriodStart/LastPeriodStart";
import QuestionsOne from "../Screens/Questions/QuestionsOne";
import QuestionsTwo from "../Screens/Questions/QuestionsTwo";
import QuestionsThree from "../Screens/Questions/QuestionsThree";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const navigation = useNavigation();
  const [initialRoute, setInitialRoute] = useState("Welcome");

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LastPeriodStart"
        component={LastPeriodStart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuestionsOne"
        component={QuestionsOne}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="QuestionsTwo"
        component={QuestionsTwo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuestionsThree"
        component={QuestionsThree}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
