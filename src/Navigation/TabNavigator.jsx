import { Image, TouchableOpacity } from "react-native";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../../Component/Drawer/CustomBars/TabBar";
import Home from "../Screens/Home/Home";
import Calender from "../Screens/Calender/Calender";
import CycleHistory from "../Screens/CycleHistory/CycleHistory";
import BlogList from "../Screens/Blog/BlogList";
import Products from "../Screens/Products/Products";
import { Octicons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      tabBar={() => <TabBar />}
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          top: -5,
          tabBarHideOnKeyboard: true,
        },
        tabBarActiveTintColor: "#338AFF",
        tabBarStyle: {
          height: 80,
          elevation: 1,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 1,
          shadowRadius: 10,
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={size} color={color} />
          ),
          tabBarLabel: "Home",
          headerTitle: "",
          headerShown: true,
          headerBackground: () => (
            <LinearGradient
              colors={["#f6dfab", "#f9e3be"]}
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.6, y: 0.6 }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Notification")}
            >
              <Image
                source={require("../../assets/resources/bell.png")}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                  marginRight: wp(4),
                }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation?.openDrawer();
              }}
            >
              <Image
                source={require("../../assets/resources/profile.png")}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "contain",
                  marginLeft: wp(4),
                }}
              />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen name="MyCalender" component={Calender} />
      <Tab.Screen name="MyCycleHistory" component={CycleHistory} />
      <Tab.Screen name="MyBlogList" component={BlogList} />
      <Tab.Screen name="MyProducts" component={Products} />
    </Tab.Navigator>
  );
}
