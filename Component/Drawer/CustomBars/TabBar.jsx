import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import {
  Octicons,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const TabBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleTabPress = (tabName) => {
    navigation.navigate(tabName);
  };
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardIsVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardIsVisible(false);
      }
    );

    // Clean up listeners when component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (keyboardIsVisible) {
    return null; // Hide the tab bar when keyboard is open
  }

  return (
    <LinearGradient
      colors={["#fae3df", "#f0c9c1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        width: "100%",
        height: 65,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => handleTabPress("Main")}
        style={styles.tabButton}
      >
        <View style={styles.tabContent}>
          <Octicons
            name="home"
            size={24}
            color={route?.name === "Main" ? "#E81F76" : "#9b2890"}
            style={{ marginBottom: 2 }}
          />
          <Text
            style={[
              styles.tabText,
              { color: route?.name === "Main" ? "#E81F76" : "#9b2890" },
            ]}
          >
            Home
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Calender", { screen: "Calender" })}
        style={styles.tabButton}
      >
        <View style={styles.tabContent}>
          <AntDesign
            name="calendar"
            size={24}
            color={route?.name === "Calender" ? "#E81F76" : "#9b2890"}
            style={{ marginBottom: 2 }}
          />
          <Text
            style={[
              styles.tabText,
              { color: route?.name === "Calender" ? "#E81F76" : "#9b2890" },
            ]}
          >
            Calendar
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CycleHistory", { screen: "CycleHistory" })
        }
        style={styles.tabButton}
      >
        <View style={styles.tabContent}>
          <Entypo
            name="cycle"
            size={24}
            color={route?.name === "CycleHistory" ? "#E81F76" : "#9b2890"}
            style={{ marginBottom: 2 }}
          />
          <Text
            style={[
              styles.tabText,
              { color: route?.name === "CycleHistory" ? "#E81F76" : "#9b2890" },
            ]}
          >
            My Cycle
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("BlogList", { screen: "BlogList" })}
        style={styles.tabButton}
      >
        <View style={styles.tabContent}>
          <MaterialCommunityIcons
            name="newspaper"
            size={24}
            color={route?.name === "BlogList" ? "#E81F76" : "#9b2890"}
            style={{ marginBottom: 2 }}
          />
          <Text
            style={[
              styles.tabText,
              { color: route?.name === "BlogList" ? "#E81F76" : "#9b2890" },
            ]}
          >
            Blogs
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Products", { screen: "Products" })}
        style={styles.tabButton}
      >
        <View style={styles.tabContent}>
          <MaterialCommunityIcons
            name="cart-check"
            size={24}
            color={route?.name === "Products" ? "#E81F76" : "#9b2890"}
            style={{ marginBottom: 2 }}
          />
          <Text
            style={[
              styles.tabText,
              { color: route?.name === "Products" ? "#E81F76" : "#9b2890" },
            ]}
          >
            Products
          </Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    fontFamily: "Causten-Medium",
  },
});

export default TabBar;
