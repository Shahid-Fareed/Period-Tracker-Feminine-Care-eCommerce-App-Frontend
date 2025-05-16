import {
  FlatList,
  Image,
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../../Contants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import Counter from "../../Reuseable/Counter";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserServices from "../../Services/UserService";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { commaSperate } from "../../Contants/Helper";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state);
  const [address, setAddress] = useState(false);

  const totalCartPrice = cartItems.reduce(
    (a, c) => a + c.salePrice * c.quantity,
    0
  );

  useFocusEffect(
    React.useCallback(() => {
      // Hide the tabBar
      navigation.setOptions({ tabBarVisible: false });

      return () => {
        // Show the tabBar when the screen is no longer focused
        navigation.setOptions({ tabBarVisible: true });
      };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [navigation])
  );

  const getData = () => {
    AsyncStorage.getItem("DefaultShippingAddress").then((value) => {
      setAddress(JSON.parse(value));
      TrackUserActivity(value, "Cart Screen", "On Screen");
    });
  };

  const renderItem = ({ item }) => {
    // console.log(item.productName.split(" - ")[2]);

    return (
      <>
        <View
          style={{
            width: wp(90),
            height: wp(20),
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: 20,
              overflow: "hidden",
            }}
            blurType="light"
            intensity={Platform.OS === "ios" ? 0 : 100}
            borderWidth={1}
            borderRadius={20}
            borderColor={"#d2c9d0"}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // justifyContent: "space-around",
            }}
          >
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <Image
                source={{ uri: item.productImage[0] }}
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: "contain",
                  justifyContent: "space-between",
                }}
              />
            </View>
            <View style={{ paddingRight: 20 }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-SemiBold",
                  fontSize: 14,
                  color: "#9b2890",
                }}
                numberOfLines={3}
              >
                {item.productName.split(" - ")[0]}
                {"\n"}
                {item.productName.split(" - ")[1]}
                {item.productName.split(" - ")[2] ? (
                  <>
                    {"\n"}
                    {item.productName.split(" - ")[2]}
                  </>
                ) : null}
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-Bold",
                  fontSize: 16,
                  color: "#9b2890",
                }}
              >
                Rs{commaSperate(item.salePrice)}
              </Text>
            </View>
            <View style={{ position: "absolute", right: 10 }}>
              <Counter item={item} />
            </View>
          </View>
        </View>
      </>
    );
  };

  const onPressCheckOut = () => {
    if (address == true) {
      navigation.navigate("DeliveryAddressTwo");
    } else {
      navigation.navigate("DeliveryAddress");
    }
  };

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      {cartItems.length > 0 ? (
        <SafeAreaView style={styles.screen}>
          <>
            <View
              style={{
                flex: 1,
                paddingHorizontal: wp(5),
                marginTop: wp(11),
                marginBottom: 20,
              }}
            >
              <View style={{}}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Causten-Bold",
                    fontSize: 16,
                    marginBottom: 20,
                    color: "#9b2890",
                  }}
                >
                  {cartItems.length} Item(s)
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <FlatList
                  data={cartItems}
                  keyExtractor={(item) => item._id}
                  renderItem={renderItem}
                  initialNumToRender={4}
                  windowSize={8}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>

            <View style={{}}>
              <BlurView
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  borderRadius: 20,
                  overflow: "hidden",
                  borderTopColor: "#d2c9d0",
                }}
                blurType="light"
                intensity={Platform.OS === "ios" ? 0 : 100}
                borderTopWidth={1}
                borderRadius={20}
                borderTopColor={"#d2c9d0"}
              />
              <View style={styles.container}>
                <Text allowFontScaling={false} style={styles.textStyle}>
                  Order Details
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text allowFontScaling={false} style={styles.textStyleMedium}>
                  Total Amount
                </Text>
                <Text allowFontScaling={false} style={styles.textStyleMedium}>
                  Rs{commaSperate(totalCartPrice)}
                </Text>
              </View>
              <View style={styles.rowContainer}>
                <Text allowFontScaling={false} style={styles.textStyleMedium}>
                  Shipping Charges
                </Text>
                <Text allowFontScaling={false} style={styles.textStyleMedium}>
                  Rs0
                </Text>
              </View>
              <View
                style={[
                  styles.rowContainer,
                  { borderBottomWidth: 0, paddingBottom: 0 },
                ]}
              >
                <Text allowFontScaling={false} style={styles.textStyleMedium}>
                  Total Payable
                </Text>
                <Text allowFontScaling={false} style={styles.textStyleMedium}>
                  Rs{commaSperate(totalCartPrice)}
                </Text>
              </View>
              <TouchableOpacity onPress={onPressCheckOut}>
                <View
                  style={{
                    marginVertical: wp(6),
                    alignItems: "center",
                    backgroundColor: "#fff",
                    height: hp(4.5),
                    justifyContent: "center",
                    borderRadius: 15,
                    width: wp(50),
                    alignSelf: "center",
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "#9b2890",
                      fontSize: 16,
                      fontFamily: "Causten-SemiBold",
                    }}
                  >
                    Check out
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Causten-SemiBold",
                fontSize: 18,
                color: "#9b2890",
              }}
            >
              Cart Is Empty
            </Text>
          </View>
        </SafeAreaView>
      )}
    </LinearGradient>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  detailContainer: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  container: {
    flexDirection: "row",
    backgroundColor: "transparent",
    marginVertical: 20,
    justifyContent: "center",
  },
  textStyle: {
    color: "#9b2890",
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "flex-start",
    fontFamily: "Causten-Bold",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingBottom: 10,
    marginHorizontal: 30,
    borderBottomColor: "#9b2890",
    borderBottomWidth: 1,
  },
  textStyleMedium: {
    fontSize: 16,
    color: "#9b2890",
    fontFamily: "Causten-SemiBold",
  },
});
