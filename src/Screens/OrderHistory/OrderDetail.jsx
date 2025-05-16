import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import React, { useCallback, useState } from "react";
import Colors from "../../Contants/Colors";
import UserServices from "../../Services/UserService";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Counter from "../../Reuseable/Counter";
import { LinearGradient } from "expo-linear-gradient";
import { commaSperate } from "../../Contants/Helper";
import { BlurView } from "expo-blur";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";

const OrderDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [order, setOrder] = useState(null);

  useFocusEffect(
    useCallback(() => {
      UserServices.getOrderById(id)
        .then((res) => {
          setOrder(res);
        })
        .catch((err) => console.log(err.message));
    }, [navigation])
  );

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.screen}>
        <View style={{ paddingHorizontal: Platform.OS === "ios" ? 20 : 0 }}>
          {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Text allowFontScaling={false} style={{ fontFamily: "Causten-SemiBold", fontSize: 16, color: "#9b2890" }}>
            Order # {order?.orderId}
          </Text>
          <Text allowFontScaling={false} style={{ fontFamily: "Causten-SemiBold", fontSize: 16, color: "#9b2890" }}>
            {moment(order?.createdAt).format("DD-MM-YYYY")}
          </Text>
        </View> */}
          {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
           <Text allowFontScaling={false} style={{ fontFamily: "Causten-SemiBold", fontSize: 16, color: "#9b2890" }}>
            Tracking #:{" "}
          </Text> 
           <Text allowFontScaling={false}
            style={{
              fontFamily: "Causten-SemiBold",
              fontSize: 16,
              color: "#9b2890",
            }}
          >
            {order?.status}
          </Text> 
      </View>*/}
          <View style={{}}>
            {/* <Text allowFontScaling={false}
            style={{
              fontFamily: "Causten-SemiBold",
              fontSize: 16,
              color: "#9b2890",
            }}
          >
            Order information
          </Text> */}

            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                width: wp(100),
                marginTop: 10,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-SemiBold",
                  fontSize: 16,
                  color: "#9b2890",
                  width: wp(50),
                }}
              >
                Order #:
              </Text>
              <View style={{ width: wp(50) }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Causten-Medium",
                    fontSize: 14,
                    color: "#9b2890",
                  }}
                >
                  {order?.orderId}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                width: wp(100),
                marginTop: 10,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-SemiBold",
                  fontSize: 16,
                  color: "#9b2890",
                  width: wp(50),
                }}
              >
                Order Date:
              </Text>
              <View style={{ width: wp(50) }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Causten-Medium",
                    fontSize: 14,
                    color: "#9b2890",
                  }}
                >
                  {moment(order?.createdAt).format("DD-MM-YYYY")}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                width: wp(100),
                marginTop: 10,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-SemiBold",
                  fontSize: 16,
                  color: "#9b2890",
                  width: wp(50),
                }}
              >
                Shipping Address:
              </Text>
              <View style={{ width: wp(50) }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Causten-Medium",
                    fontSize: 14,
                    color: "#9b2890",
                  }}
                >
                  {order?.address},{order?.city},
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Causten-Medium",
                    fontSize: 14,
                    color: "#9b2890",
                  }}
                >
                  {order?.zipCode}, {order?.country}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-SemiBold",
                  fontSize: 16,
                  color: "#9b2890",
                  width: wp(50),
                }}
              >
                Payment method:
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-Medium",
                  fontSize: 14,
                  color: "#9b2890",
                }}
              >
                {order?.paymentMethod}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-SemiBold",
                  fontSize: 16,
                  color: "#9b2890",
                  width: wp(50),
                }}
              >
                Order Price:
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-Medium",
                  fontSize: 14,
                  color: "#9b2890",
                }}
              >
                Rs{commaSperate(order?.total)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-SemiBold",
                  fontSize: 16,
                  color: "#9b2890",
                  width: wp(50),
                }}
              >
                Discount:{" "}
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-Medium",
                  fontSize: 14,
                  color: "#9b2890",
                }}
              >
                Rs{commaSperate(order?.discount)}
              </Text>
            </View>
          </View>

          <View style={{}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Causten-Bold",
                fontSize: 16,
                marginTop: 20,
                marginBottom: 10,
                color: "#9b2890",
              }}
            >
              Item(s) ({order?.cart?.length})
            </Text>

            {order?.cart?.map((item, index) => (
              <>
                <ScrollView
                  contentContainerStyle={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    // justifyContent: "space-around",
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
                      // backgroundColor: "rgba(255, 255, 255, 0.5)",
                      overflow:"hidden"
                    }}
                    blurType="light"
                    intensity={Platform.OS === "ios" ? 0 : 100}
                    borderWidth={1}
                    borderRadius={20}
                    borderColor={"#fff"}
                  />
                  {/* <ScrollView>
          </ScrollView> */}

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
                      numberOfLines={1}
                    >
                      {item.productName} ({item.quantity})
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
                </ScrollView>
              </>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 20,
  },
  unSelected: {
    backgroundColor: Colors.White,
    marginBottom: 10,
  },
  unSelectedText: {
    color: "#9b2890",
    fontFamily: "Causten-Medium",
    fontSize: 14,
  },
});
