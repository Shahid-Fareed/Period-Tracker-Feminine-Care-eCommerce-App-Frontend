import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  BackHandler,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../Contants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../Redux/actions/Actions";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { commaSperate } from "../../Contants/Helper";
import { useFocusEffect } from "@react-navigation/native";

const OrderCompleted = ({ navigation }) => {
  const [orderRes, setOrderRes] = useState(null);
  const dispatch = useDispatch();

  const GetData = async () => {
    const value = await AsyncStorage.getItem("OrderRes");
    const newValue = JSON.parse(value);

    setOrderRes(newValue);
  };

  const removeStorge = async () => {
    await AsyncStorage.removeItem("subscriptionName");
  };

  useEffect(() => {
    GetData();
    removeStorge();
    dispatch(emptyCart());
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      GetData();
    }, [])
  );

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("HomeStack", {
        screen: "Home",
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.screen}>
        <View
          style={{
            backgroundColor: Colors.White,
            width: wp(20),
            height: wp(20),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 80,
            elevation: 5,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 1 },
            borderRadius: 100,
          }}
        >
          <Image
            source={require("../../../assets/resources/tick.png")}
            style={{ width: 30, height: 30 }}
          />
        </View>
        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 10 }}
        >
          <Text allowFontScaling={false} style={styles.textStyleBold}>
            Thank you
          </Text>
          <Text allowFontScaling={false} style={styles.textStyleMedium}>
            Your order has been received
          </Text>
        </View>

        <View style={styles.detailContainer}>
          <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: 20,
              // backgroundColor: "rgba(255, 255, 255, 0.5)",
              overflow: "hidden",
            }}
            blurType="light"
            intensity={Platform.OS === "ios" ? 0 : 200}
            borderWidth={1}
            borderRadius={20}
            borderColor={"#d2c9d0"}
          />
          <View style={styles.rowContainer}>
            <Text allowFontScaling={false} style={styles.textBold}>
              Order Number:
            </Text>
            <Text allowFontScaling={false} style={styles.textMedium}>
              {orderRes?.orderId}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text allowFontScaling={false} style={styles.textBold}>
              Date:
            </Text>
            <Text allowFontScaling={false} style={styles.textMedium}>
              {moment(orderRes?.createdAt).format("DD-MM-YYYY")}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text allowFontScaling={false} style={styles.textBold}>
              Total:
            </Text>
            <Text allowFontScaling={false} style={styles.textMedium}>
              Rs{commaSperate(orderRes?.total)}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text allowFontScaling={false} style={styles.textBold}>
              Payment Method:
            </Text>
            <Text allowFontScaling={false} style={styles.textMedium}>
              {orderRes?.paymentMethod}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OrderCompleted;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyleBold: {
    fontSize: 16,
    color: "#9b2890",
    fontFamily: "Causten-Bold",
  },
  textStyleMedium: {
    fontSize: 16,
    color: "#9b2890",
    fontFamily: "Causten-Medium",
  },
  textMedium: {
    flex: 1,
    fontSize: 14,
    color: "#9b2890",
    fontFamily: "Causten-Medium",
  },
  textBold: {
    flex: 1,
    fontSize: 14,
    color: "#9b2890",
    fontFamily: "Causten-Bold",
  },
  detailContainer: {
    width: "85%",
    backgroundColor: "transparent",
    padding: 20,
    borderRadius: 8,
    marginTop: 10,
    margin: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
});
