import React, { useCallback, useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "../../Component/Drawer/CustomBars/TabBar";
import Symptoms from "../Screens/Symptoms/Symptoms";
import CycleHistory from "../Screens/CycleHistory/CycleHistory";
import Calender from "../Screens/Calender/Calender";
import CycleDetail from "../Screens/CycleDetail/CycleDetail";
import BlogList from "../Screens/Blog/BlogList";
import BlogsDetailsScreen from "../Screens/Blog/BlogsDetailsScreen";
import Products from "../Screens/Products/Products";
import ProductsDetail from "../Screens/Products/ProductsDetail";
import CartScreen from "../Screens/Cart/CartScreen";
import DeliveryAddress from "../Screens/OrderFlow/DeliveryAddress";
import DeliveryAddressTwo from "../Screens/OrderFlow/DeliveryAddressTwo";
import OrderSummary from "../Screens/OrderFlow/OrderSummary";
import Payment from "../Screens/OrderFlow/Payment";
import OrderCompleted from "../Screens/OrderFlow/OrderCompleted";
import CustomeDrawer from "../../Component/Drawer/CustomeDrawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../Contants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import Welcome from "../Screens/Welcome/Welcome";
import Subscription from "../Screens/OrderFlow/Subscription";
import Notification from "../Screens/Notification/Notification";
import EditProfile from "../Screens/EditProfile/EditProfile";
import OrderHistory from "../Screens/OrderHistory/OrderHistory";
import OrderDetail from "../Screens/OrderHistory/OrderDetail";
import TermAndContditions from "../Screens/TermAndContditions/TermAndContditions";
import Address from "../Screens/Address/Address";
import AddAddress from "../Screens/Address/AddAddress";
import PeriodEdit from "../Screens/PeriodEdit/PeriodEdit";
import { useAuth } from "../../Context/AuthContext";
import { useSelector } from "react-redux";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyCalendarStack = ({ navigation }) => {
  return (
    <Tab.Navigator
      tabBar={() => <TabBar />}
      initialRouteName="Calender"
      screenOptions={{
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Tab.Screen
        name="Calender"
        component={Calender}
        options={{
          headerShown: true,
          headerTitle: "Calendar",
          headerBackground: () => (
            <LinearGradient
              colors={["#fdf7ea", "#f9e3be"]}
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.6, y: 0.6 }}
            />
          ),
          headerTintColor: Colors.Black,
          headerTitleStyle: {
            fontSize: 20,
            color: "#9b2890",
            fontFamily: "Causten-Bold",
          },
          headerTitleAlign: "center",
          headerTintColor: "#9b2890",
          headerBackTitle: "",
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
              style={{ marginLeft: wp(4) }}
              onPress={() => navigation.navigate("Home")}
            >
              <AntDesign name="arrowleft" size={24} color="#9b2890" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Symptoms"
        component={Symptoms}
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackground: () => (
            <LinearGradient
              colors={["#fdf7ea", "#f9e3be"]}
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
              style={{ marginLeft: wp(4) }}
              onPress={() => navigation.navigate("Home")}
            >
              <AntDesign name="arrowleft" size={24} color="#9b2890" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};
const MyCycleStack = ({ navigation }) => {
  return (
    <Tab.Navigator
      tabBar={() => <TabBar />}
      initialRouteName="CycleHistory"
      screenOptions={{
        headerTitle: "Cycle Details",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="CycleHistory"
        component={CycleHistory}
        options={{
          headerShown: true,
          headerTitle: "Cycle History",
          headerBackground: () => (
            <LinearGradient
              colors={["#fdf7ea", "#f9e3be"]}
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.6, y: 0.6 }}
            />
          ),
          headerTintColor: Colors.Black,
          headerTitleStyle: {
            fontSize: 20,
            color: "#9b2890",
            fontFamily: "Causten-Bold",
          },
          headerTitleAlign: "center",
          headerTintColor: "#9b2890",
          headerBackTitle: "",
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
              style={{ marginLeft: wp(4) }}
              onPress={() => navigation.navigate("Home")}
            >
              <AntDesign name="arrowleft" size={24} color="#9b2890" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="CycleDetail"
        component={CycleDetail}
        options={{
          headerShown: true,
          headerTitle: "Cycle Details",
          headerBackground: () => (
            <LinearGradient
              colors={["#fdf7ea", "#f9e3be"]}
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.6, y: 0.6 }}
            />
          ),
          headerTintColor: Colors.Black,
          headerTitleStyle: {
            fontSize: 20,
            color: "#9b2890",
            fontFamily: "Causten-Bold",
          },
          headerTitleAlign: "center",
          headerTintColor: "#9b2890",
          headerBackTitle: "",
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
              style={{ marginLeft: wp(4) }}
              onPress={() => navigation.navigate("Home")}
            >
              <AntDesign name="arrowleft" size={24} color="#9b2890" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};
const BlogStack = ({ navigation }) => {
  return (
    <Tab.Navigator
      tabBar={() => <TabBar />}
      initialRouteName="BlogList"
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="BlogList"
        component={BlogList}
        options={{
          headerShown: true,
          headerTitle: "All Blogs",
          headerBackground: () => (
            <LinearGradient
              colors={["#fdf7ea", "#f9e3be"]}
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.6, y: 0.6 }}
            />
          ),
          headerTintColor: Colors.Black,
          headerTitleStyle: {
            fontSize: 20,
            color: "#9b2890",
            fontFamily: "Causten-Bold",
          },
          headerTitleAlign: "center",
          headerTintColor: "#9b2890",
          headerBackTitle: "",
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
              style={{ marginLeft: wp(4) }}
              onPress={() => navigation.navigate("Home")}
            >
              <AntDesign name="arrowleft" size={24} color="#9b2890" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="BlogsDetailsScreen"
        component={BlogsDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: "Blog Article",
          headerBackground: () => (
            <LinearGradient
              colors={["#fdf7ea", "#f9e3be"]}
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.6, y: 0.6 }}
            />
          ),
          headerTintColor: Colors.Black,
          headerTitleStyle: {
            fontSize: 20,
            color: "#9b2890",
            fontFamily: "Causten-Bold",
          },
          headerTitleAlign: "center",
          headerTintColor: "#9b2890",
          headerBackTitle: "",
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
              style={{ marginLeft: wp(4) }}
              // onPress={() => navigation.navigate("Home")}
              onPress={() =>
                navigation.navigate("BlogList", { screen: "BlogList" })
              }
            >
              <AntDesign name="arrowleft" size={24} color="#9b2890" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};
const ProductStack = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };
  const [address, setAddress] = useState(false);

  const items = useSelector((state) => state);
  useFocusEffect(
    useCallback(() => {
      getData();
    }, [navigation])
  );

  const getData = () => {
    AsyncStorage.getItem("DefaultShippingAddress").then((value) => {
      setAddress(JSON.parse(value));
    });
  };

  return (
    <Tab.Navigator
      tabBar={() => <TabBar />}
      initialRouteName="Products"
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          headerShown: true,
          headerTitle: "Products",
          headerBackground: () => (
            <LinearGradient
              colors={["#fdf7ea", "#f9e3be"]}
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.6, y: 0.6 }}
            />
          ),
          headerTintColor: Colors.Black,
          headerTitleStyle: {
            fontSize: 20,
            color: "#9b2890",
            fontFamily: "Causten-Bold",
          },
          headerTitleAlign: "center",
          headerTintColor: "#9b2890",
          headerBackTitle: "",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("CartScreen")}
              style={{
                flexDirection: "row",
              }}
            >
              {items?.length === 0 ? null : (
                <View
                  style={{
                    backgroundColor: "#9b2890",
                    width: wp(5),
                    height: hp(2.5),
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: Colors.White,
                      fontFamily: "Causten-Medium",
                    }}
                  >
                    {items?.length}
                  </Text>
                </View>
              )}
              <Image
                source={require("../../assets/resources/Cart.png")}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 30,
                  marginRight: wp(3.5),
                }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={goBack}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="#9b2890"
                style={{ marginLeft: wp(4) }}
              />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="ProductsDetail"
        component={ProductsDetail}
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackground: () => (
            <LinearGradient
              colors={["#fdf7ea", "#f9e3be"]}
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.6, y: 0.6 }}
            />
          ),
          headerTintColor: Colors.Black,
          headerTitleStyle: {
            fontSize: 20,
            color: "#9b2890",
            fontFamily: "Causten-Bold",
          },
          headerTitleAlign: "center",
          headerTintColor: "#9b2890",
          headerBackTitle: "",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("CartScreen")}
              style={{
                flexDirection: "row",
              }}
            >
              {items?.length === 0 ? null : (
                <View
                  style={{
                    backgroundColor: "#9b2890",
                    width: wp(5),
                    height: hp(2.5),
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: Colors.White,
                      fontFamily: "Causten-Medium",
                    }}
                  >
                    {items?.length}
                  </Text>
                </View>
              )}
              <Image
                source={require("../../assets/resources/Cart.png")}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 30,
                  marginRight: wp(3.5),
                }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              // onPress={goBack}
              onPress={() =>
                navigation.navigate("Products", { screen: "Products" })
              }
            >
              <AntDesign
                name="arrowleft"
                size={24}
                color="#9b2890"
                style={{ marginLeft: wp(4) }}
              />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerShown: true,
          headerTitle: "MyCart",
          headerBackground: () => (
            <LinearGradient
              colors={["#fdf7ea", "#f9e3be"]}
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.6, y: 0.6 }}
            />
          ),
          headerTintColor: Colors.Black,
          headerTitleStyle: {
            fontSize: 20,
            color: "#9b2890",
            fontFamily: "Causten-Bold",
          },
          headerTitleAlign: "center",
          headerTintColor: "#9b2890",
          headerBackTitle: "",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("CartScreen")}
              style={{
                flexDirection: "row",
              }}
            >
              {items?.length === 0 ? null : (
                <View
                  style={{
                    backgroundColor: "#9b2890",
                    width: wp(5),
                    height: hp(2.5),
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: Colors.White,
                      fontFamily: "Causten-Medium",
                    }}
                  >
                    {items?.length}
                  </Text>
                </View>
              )}
              <Image
                source={require("../../assets/resources/Cart.png")}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 30,
                  marginRight: wp(3.5),
                }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Products", { screen: "Products" });
              }}
            >
              <AntDesign
                name="arrowleft"
                size={24}
                color="#9b2890"
                style={{ marginLeft: wp(4) }}
              />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="DeliveryAddress"
        component={DeliveryAddress}
        options={{
          headerShown: true,
          headerTitle: "Delivery Address",
          headerBackground: () => (
            <LinearGradient
              colors={["#fdf7ea", "#f9e3be"]}
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.6, y: 0.6 }}
            />
          ),
          headerTintColor: Colors.Black,
          headerTitleStyle: {
            fontSize: 20,
            color: "#9b2890",
            fontFamily: "Causten-Bold",
          },
          headerTitleAlign: "center",
          headerTintColor: "#9b2890",
          headerBackTitle: "",
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
            <TouchableOpacity style={{ marginLeft: wp(4) }} onPress={goBack}>
              <AntDesign name="arrowleft" size={24} color="#9b2890" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="DeliveryAddressTwo"
        component={DeliveryAddressTwo}
        options={{
          headerShown: true,
          headerTitle: "Delivery Address",
          headerBackground: () => (
            <LinearGradient
              colors={["#fdf7ea", "#f9e3be"]}
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.6, y: 0.6 }}
            />
          ),
          headerTintColor: Colors.Black,
          headerTitleStyle: {
            fontSize: 20,
            color: "#9b2890",
            fontFamily: "Causten-Bold",
          },
          headerTitleAlign: "center",
          headerTintColor: "#9b2890",
          headerBackTitle: "",
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
            <TouchableOpacity style={{ marginLeft: wp(4) }} onPress={goBack}>
              <AntDesign name="arrowleft" size={24} color="#9b2890" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="OrderSummary"
        component={OrderSummary}
        options={{
          headerShown: true,
          headerTitle: "Order Summary",
          headerBackground: () => (
            <LinearGradient
              colors={["#fdf7ea", "#f9e3be"]}
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.6, y: 0.6 }}
            />
          ),
          headerTintColor: Colors.Black,
          headerTitleStyle: {
            fontSize: 20,
            color: "#9b2890",
            fontFamily: "Causten-Bold",
          },
          headerTitleAlign: "center",
          headerTintColor: "#9b2890",
          headerBackTitle: "",
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
            <TouchableOpacity style={{ marginLeft: wp(4) }} onPress={goBack}>
              <AntDesign name="arrowleft" size={24} color="#9b2890" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: true,
          headerTitle: "Payment",
          headerBackground: () => (
            <LinearGradient
              colors={["#fdf7ea", "#f9e3be"]}
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.6, y: 0.6 }}
            />
          ),
          headerTintColor: Colors.Black,
          headerTitleStyle: {
            fontSize: 20,
            color: "#9b2890",
            fontFamily: "Causten-Bold",
          },
          headerTitleAlign: "center",
          headerTintColor: "#9b2890",
          headerBackTitle: "",
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
              style={{ marginLeft: wp(4) }}
              onPress={() => navigation.navigate("CartScreen")}
            >
              <AntDesign name="arrowleft" size={24} color="#9b2890" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="OrderCompleted"
        component={OrderCompleted}
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackground: () => (
            <LinearGradient
              colors={["#fdf7ea", "#f9e3be"]}
              style={{
                flex: 1,
                backgroundColor: "transparent",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.6, y: 0.6 }}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: wp(4) }}
              onPress={() => navigation.navigate("Home")}
            >
              <AntDesign name="arrowleft" size={24} color="#9b2890" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};
const Subscriptionscreen = ({ navigation }) => {
  const [address, setAddress] = useState(false);

  const items = useSelector((state) => state);
  useFocusEffect(
    useCallback(() => {
      getData();
    }, [navigation])
  );

  const getData = () => {
    AsyncStorage.getItem("DefaultShippingAddress").then((value) => {
      setAddress(JSON.parse(value));
    });
  };
  return (
    <Stack.Navigator
      initialRouteName="Subscription"
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          display: "none",
        },
        headerTitle: "",
        headerBackground: () => (
          <LinearGradient
            colors={["#fdf7ea", "#f9e3be"]}
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
            // onPress={() => navigation.navigate("CartScreen")}
            onPress={() => {
              navigation.navigate("Products", {
                screen: "CartScreen",
              });
            }}
            style={{
              flexDirection: "row",
            }}
          >
            {items?.length === 0 ? null : (
              <View
                style={{
                  backgroundColor: "#9b2890",
                  width: wp(5),
                  height: hp(2.5),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 100,
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    color: Colors.White,
                    fontFamily: "Causten-Medium",
                  }}
                >
                  {items?.length}
                </Text>
              </View>
            )}
            <Image
              source={require("../../assets/resources/Cart.png")}
              resizeMode="contain"
              style={{
                width: 24,
                height: 30,
              }}
            />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <AntDesign name="arrowleft" size={24} color="#9b2890" />
          </TouchableOpacity>
        ),
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{ tabBarVisible: false }}
      />
    </Stack.Navigator>
  );
};
const Notificationcreen = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Notification"
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          display: "none",
        },
        headerTitle: "Notification",
        headerBackground: () => (
          <LinearGradient
            colors={["#fdf7ea", "#f9e3be"]}
            style={{
              flex: 1,
              backgroundColor: "transparent",
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 0.6 }}
          />
        ),
        headerTintColor: Colors.Black,
        headerTitleStyle: {
          fontSize: 20,
          color: "#9b2890",
          fontFamily: "Causten-Bold",
        },
        headerTitleAlign: "center",
        headerTintColor: "#9b2890",
        headerBackTitle: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <AntDesign name="arrowleft" size={24} color="#9b2890" />
          </TouchableOpacity>
        ),
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ tabBarVisible: false }}
      />
    </Stack.Navigator>
  );
};
const Drawewrstack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="EditProfile"
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          display: "none",
        },
        headerTitle: "Edit Profile",
        headerBackground: () => (
          <LinearGradient
            colors={["#fdf7ea", "#f9e3be"]}
            style={{
              flex: 1,
              backgroundColor: "transparent",
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 0.6 }}
          />
        ),
        headerTintColor: Colors.Black,
        headerTitleStyle: {
          fontSize: 20,
          color: "#9b2890",
          fontFamily: "Causten-Bold",
        },
        headerTitleAlign: "center",
        headerTintColor: "#9b2890",
        headerBackTitle: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <AntDesign name="arrowleft" size={24} color="#9b2890" />
          </TouchableOpacity>
        ),
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ tabBarVisible: false }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{ tabBarVisible: false, headerTitle: "Order History" }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{ tabBarVisible: false, headerTitle: "Order Detail" }}
      />
      <Stack.Screen
        name="TermAndContditions"
        component={TermAndContditions}
        options={{ tabBarVisible: false, headerTitle: "Term & Contditions" }}
      />
    </Stack.Navigator>
  );
};
const EditAddres = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Address"
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          display: "none",
        },
        headerTitle: "Address",
        headerBackground: () => (
          <LinearGradient
            colors={["#fdf7ea", "#f9e3be"]}
            style={{
              flex: 1,
              backgroundColor: "transparent",
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 0.6 }}
          />
        ),
        headerTintColor: Colors.Black,
        headerTitleStyle: {
          fontSize: 20,
          color: "#9b2890",
          fontFamily: "Causten-Bold",
        },
        headerTitleAlign: "center",
        headerTintColor: "#9b2890",
        headerBackTitle: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <AntDesign name="arrowleft" size={24} color="#9b2890" />
          </TouchableOpacity>
        ),
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Address"
        component={Address}
        options={{ tabBarVisible: false }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();

  return (
    <>
      {!isLoggedIn ? (
        <AuthNavigation />
      ) : (
        <Drawer.Navigator
          gestureEnabled={false}
          screenOptions={{ headerShown: false, gestureEnabled: false }}
          drawerContent={(props) => <CustomeDrawer {...props} />}
          initialRouteName="Main"
        >
          <Drawer.Screen name="Main" component={MainNavigation} />
          <Drawer.Screen name="Calender" component={MyCalendarStack} />
          <Drawer.Screen name="CycleHistory" component={MyCycleStack} />
          <Drawer.Screen name="BlogList" component={BlogStack} />
          <Drawer.Screen name="Products" component={ProductStack} />
          <Drawer.Screen name="Welcome" component={Welcome} />
          <Drawer.Screen name="Subscription" component={Subscriptionscreen} />
          <Drawer.Screen name="Notification" component={Notificationcreen} />
          <Drawer.Screen name="Drawerscreen" component={Drawewrstack} />
          <Drawer.Screen name="Address" component={EditAddres} />
          <Drawer.Screen name="PeriodEdit" component={PeriodEdit} />
          <Drawer.Screen
            name="AddAddress"
            component={AddAddress}
            options={{
              headerShown: true,
              tabBarStyle: {
                display: "none",
              },
              headerTitle: "Add Address",
              headerBackground: () => (
                <LinearGradient
                  colors={["#fdf7ea", "#f9e3be"]}
                  style={{
                    flex: 1,
                    backgroundColor: "transparent",
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.6, y: 0.6 }}
                />
              ),
              headerTintColor: Colors.Black,
              headerTitleStyle: {
                fontSize: 20,
                color: "#9b2890",
                fontFamily: "Causten-Bold",
              },
              headerTitleAlign: "center",
              headerTintColor: "#9b2890",
              headerBackTitle: "",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Address")}
                >
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color="#9b2890"
                    style={{ marginLeft: wp(4) }}
                  />
                </TouchableOpacity>
              ),
              headerTitleAlign: "center",
            }}
          />
        </Drawer.Navigator>
      )}
    </>
  );
};

function AppNavigation() {
  return <DrawerNavigator />;
}
export default AppNavigation;
