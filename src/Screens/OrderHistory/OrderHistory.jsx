import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useCallback, useState } from "react";
import Colors from "../../Contants/Colors";
import UserServices from "../../Services/UserService";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { commaSperate } from "../../Contants/Helper";
import { BlurView } from "expo-blur";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";
import LoaderComponent from "../../Reuseable/LoaderComponent";

const OrderHistory = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("Pending");
  const [statusFlatListData, setStatusFlatListData] = useState([
    {
      _id: "63dc9801e86f99c09892edb5",
      name: "Pending",
      value: "Pending",
    },
    {
      _id: "63dc9801e86f99c09892edaf",
      name: "In Process",
      value: "In Process",
    },
    {
      _id: "63dc9801e86f99c09892edb0",
      name: "Delivered",
      value: "Delivered",
    },
    {
      _id: "63dc9801e86f99c09892edae",
      name: "Cancelled",
      value: "Cancelled",
    },
  ]);

  const [ordersList, setOrdersList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("customerId").then((value) => {
        getOrders(JSON.parse(value));
        TrackUserActivity(value, "Order History Screen", "On Screen");
      });
    }, [navigation])
  );

  // Status RENDER
  const renderItemCategoriesFlatList = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => setSelectedCategory(item?.value)}
          style={{
            marginRight: 10,
            backgroundColor:
              selectedCategory === item?.value ? "#9b2890" : "transparent",
            alignItems: "center",
            justifyContent: "center",
            height: hp(5),
            width: hp(15),
            borderRadius: 15,
            borderWidth: selectedCategory === item?.value ? 0 : 1,
            borderColor: selectedCategory === item?.value ? null : "#9b2890",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: "Causten-SemiBold",
              fontWeight: "bold",
              color:
                selectedCategory === item?.value ? Colors.White : "#9b2890",
            }}
          >
            {item?.name}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const getOrders = (customerId) => {
    setIsLoading(true);
    UserServices.getAllUserOrder(customerId)
      .then((res) => {
        setOrdersList(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  };

  const displayDataOnBaseOfStatus = (data) => {
    if (selectedCategory === "Delivered") {
      return data.filter((el) => el.status === "Delivered");
    } else if (selectedCategory === "In Process") {
      return data.filter((el) => el.status === "In Process");
    } else if (selectedCategory === "Cancelled") {
      return data.filter((el) => el.status === "Cancelled");
    } else if (selectedCategory == "Pending") {
      return data.filter((el) => el.status == "Pending");
    }
  };

  const allFilter = (data) => {
    const newData = displayDataOnBaseOfStatus(data);
    return newData;
  };

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.screen}>
        {isLoading ? (
          <LoaderComponent isModalVisible={isLoading} />
        ) : (
          <>
            <View style={styles.viewHeading}>
              <FlatList
                data={statusFlatListData}
                renderItem={renderItemCategoriesFlatList}
                keyExtractor={(item) => item?._id}
                style={{ flex: 1, backgroundColor: "transparent" }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <ScrollView>
              {allFilter(ordersList && ordersList).length === 0 ? (
                <>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      fontFamily: "Causten-Regular",
                      fontSize: 16,
                    }}
                  >
                    <Text allowFontScaling={false} style={{ color: "#9E1A97" }}>
                      No Record Found
                    </Text>
                  </View>
                </>
              ) : (
                allFilter(ordersList && ordersList).map((item) => (
                  <View style={{ marginVertical: 10 }}>
                    <View style={styles.container}>
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
                        intensity={Platform.OS === "ios" ? 0 : 100}
                        borderWidth={0.5}
                        borderRadius={20}
                        borderColor={"#fff"}
                      />
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontFamily: "Causten-SemiBold",
                            fontSize: 16,
                            color: "#9E1A97",
                          }}
                        >
                          Order No. {item?.orderId}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontFamily: "Causten-Regular",
                            fontSize: 16,
                            color: "#9E1A97",
                          }}
                        >
                          {moment(item?.createdAt).format("DD-MM-YYYY")}
                        </Text>
                      </View>
                      <View style={{ marginTop: 10, flexDirection: "row" }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontFamily: "Causten-SemiBold",
                            fontSize: 16,
                            color: "#9E1A97",
                          }}
                        >
                          Tracking number:{" "}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontFamily: "Causten-Regular",
                            fontSize: 16,
                            color: "#9E1A97",
                          }}
                        >
                          {item?.trackingnumber
                            ? item?.trackingnumber
                            : "No Number"}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: "Causten-SemiBold",
                              fontSize: 16,
                              color: "#9E1A97",
                            }}
                          >
                            Quantity:{" "}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: "Causten-Regular",
                              fontSize: 16,
                              color: "#9E1A97",
                            }}
                          >
                            {item?.cart?.length}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: "Causten-SemiBold",
                              fontSize: 16,
                              color: "#9E1A97",
                            }}
                          >
                            Total Price:{" "}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: "Causten-Regular",
                              fontSize: 16,
                              color: "#9E1A97",
                            }}
                          >
                            Rs{commaSperate(item?.total)}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          marginTop: 20,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("OrderDetail", {
                              id: item.orderId,
                            })
                          }
                          style={{
                            marginRight: 10,
                            backgroundColor: "#9E1A97",
                            alignItems: "center",
                            justifyContent: "center",
                            height: hp(4),
                            width: hp(15),
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: "#9E1A97",
                          }}
                        >
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: "Causten-SemiBold",
                              fontWeight: "bold",
                              color: "#fff",
                            }}
                          >
                            Details
                          </Text>
                        </TouchableOpacity>
                        {/* <Text allowFontScaling={false} 
                      style={{
                        fontFamily: "Causten-SemiBold",
                        fontSize: 16,
                        color: "#9E1A97",
                      }}
                    >
                      {item?.status}
                    </Text> */}
                      </View>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 10,
  },
  viewHeading: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: "space-around",
  },
  container: {
    marginHorizontal: 10,
    borderRadius: 20,
    height: hp(25),
    paddingHorizontal: wp(6),
    paddingVertical: wp(6),
    backgroundColor: "transparent",
  },
});
