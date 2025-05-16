import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { CheckBox } from "@rneui/themed";
import React, { useCallback, useState } from "react";
import {
  Image,
  SafeAreaView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Colors from "../../Contants/Colors";
import UserServices from "../../Services/UserService";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const DeliveryAddressTwo = ({ navigation }) => {
  const [address, setAddress] = useState(null);
  const [allAddress, setAllAddress] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const [defaultAddress, setDefaultAddress] = useState(null);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("customerId").then((value) => {
        getData(JSON.parse(value));
        getAllAddress(JSON.parse(value));
      });
    }, [navigation])
  );

  const getData = (customerId) => {
    UserServices.getDefaultAddress(customerId)
      .then((res) => {
        setAddress(res);
        setDefaultAddress(res);
      })
      .catch((err) => console.log(err));
  };

  const nextPress = () => {
    const data = {
      fullName: address?.name,
      Email: address?.email,
      number: address?.contact,
      address: address?.address,
      country: address?.country,
      city: address?.city,

      ZipCode: address?.zipCode,
    };
    AsyncStorage.setItem("ShippingInfo", JSON.stringify(data))
      .then((res) => {
        navigation.navigate("OrderSummary");
      })
      .catch((err) => console.log(err));
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressConfirm = (item) => {
    setModalVisible(false);
    setAddress(item);
  };

  const getAllAddress = (customerId) => {
    UserServices.getAddress(customerId)
      .then((res) => {
        setAllAddress(res);
      })
      .catch((err) => console.log(err.message));
  };

  const onAddressChange = (item) => {
    setDefaultAddress(null);
    setDefaultAddress(item);
  };

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.screen}>
        {/* Number ROW */}
        <View
          style={{
            paddingHorizontal: wp(8),
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  borderRadius: wp(10),
                  borderWidth: 1,
                  borderColor: "#9b2890",
                  backgroundColor: "#9b2890",
                  width: wp(13),
                  height: wp(13),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 20,
                    fontFamily: "Causten-Medium",
                    color: Colors.White,
                  }}
                >
                  1
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 15,
                  fontFamily: "Causten-Medium",
                  color: "#9b2890",
                }}
              >
                Shipping
              </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  borderRadius: wp(10),
                  borderWidth: 1,
                  borderColor: "#9b2890",
                  backgroundColor: "transparent",
                  width: wp(13),
                  height: wp(13),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 20,
                    fontFamily: "Causten-Medium",
                    color: "#9b2890",
                  }}
                >
                  2
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 15,
                  fontFamily: "Causten-Medium",
                  color: "#9b2890",
                }}
              >
                Summary
              </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  borderRadius: wp(10),
                  borderWidth: 1,
                  borderColor: "#9b2890",
                  backgroundColor: "transparent",
                  width: wp(13),
                  height: wp(13),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 20,
                    fontFamily: "Causten-Medium",
                    color: "#9b2890",
                  }}
                >
                  3
                </Text>
              </View>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 15,
                  fontFamily: "Causten-Medium",
                  color: "#9b2890",
                }}
              >
                Payment
              </Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: wp(5), paddingVertical: wp(10) }}>
            <TouchableOpacity onPress={toggleModal}>
              <>
                <BlurView
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderRadius: 20,
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                  }}
                  blurType="light"
                  intensity={Platform.OS === "ios" ? 0 : 200}
                  borderWidth={1}
                  borderRadius={20}
                  borderColor={"#d2c9d0"}
                />
                <View
                  style={{
                    backgroundColor: "transparent",
                    height: wp(10),
                    justifyContent: "center",
                    paddingLeft: wp(3),
                    paddingRight: wp(3),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: "#9b2890",
                        fontFamily: "Causten-Bold",
                        fontSize: 16,
                      }}
                    >
                      Delivery Address
                    </Text>
                    <Image
                      source={require("../../../assets/resources/ManageShippingAddress.png")}
                      style={{ resizeMode: "contain", width: 20, height: 20 }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    paddingLeft: wp(3),
                    paddingVertical: wp(3),
                    borderColor: Colors.Grey,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "#9b2890",
                      fontFamily: "Causten-Regular",
                      fontSize: 16,
                      paddingBottom: 5,
                    }}
                  >
                    {address?.name}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "#9b2890",
                      fontFamily: "Causten-Regular",
                      fontSize: 16,
                      paddingBottom: 5,
                    }}
                  >
                    {address?.address} , {address?.city}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "#9b2890",
                      fontFamily: "Causten-Regular",
                      fontSize: 16,
                      paddingBottom: 5,
                    }}
                  >
                    {address?.zipCode} - {address?.country}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "#9b2890",
                      fontFamily: "Causten-Regular",
                      fontSize: 16,
                      paddingBottom: 5,
                    }}
                  >
                    {address?.contact}
                  </Text>
                </View>
              </>
            </TouchableOpacity>

            <View style={{ marginTop: wp(85) }}>
              <TouchableOpacity onPress={() => nextPress()}>
                <View
                  style={{
                    marginVertical: wp(6),
                    alignItems: "center",
                    backgroundColor: "#9b2890",
                    height: hp(6),
                    justifyContent: "center",
                    borderRadius: 15,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: Colors.White,
                      fontSize: 16,
                      fontFamily: "Causten-SemiBold",
                    }}
                    disabled={address === null ? true : false}
                  >
                    Continue
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#9b2890",
                    width: wp(95),
                    alignItems: "center",
                    paddingVertical: 10,
                    color: "#9b2890",
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: "Causten-Bold",
                      fontSize: 18,
                      color: "#9b2890",
                    }}
                  >
                    Delivery Address
                  </Text>
                </View>

                <ScrollView>
                  {allAddress &&
                    allAddress.map((el, index) => (
                      <TouchableOpacity
                        onPress={() => onAddressChange(el)}
                        style={{
                          flexDirection: "row",
                          borderBottomWidth: 1,
                          borderBottomColor: Colors.lightGrey,
                        }}
                      >
                        <CheckBox
                          checked={el?._id === defaultAddress?._id}
                          onPress={() => onAddressChange(el)}
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                          checkedColor={"#9b2890"}
                          uncheckedColor={"#9b2890"}
                        />
                        <View
                          style={{
                            marginTop: wp(2.6),
                            width: wp(100),
                            paddingBottom: 15,
                          }}
                        >
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: "Causten-Bold",
                              fontSize: 16,
                              marginBottom: 4,
                              color: "#9b2890",
                            }}
                          >
                            {el?.name}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: "Causten-Regular",
                              fontSize: 16,
                              marginBottom: 4,
                              color: "#9b2890",
                            }}
                          >
                            {el?.address} , {el?.city}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: "Causten-Regular",
                              fontSize: 16,
                              marginBottom: 4,
                              color: "#9b2890",
                            }}
                          >
                            {el?.zipCode} - {el?.country}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: "Causten-Regular",
                              fontSize: 16,
                              color: "#9b2890",
                            }}
                          >
                            {el?.contact}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
                <TouchableOpacity
                  style={{
                    marginVertical: wp(6),
                    alignItems: "center",
                    backgroundColor: "#9b2890",
                    height: hp(6),
                    justifyContent: "center",
                    borderRadius: 15,
                    width: wp(60),
                  }}
                  onPress={() => onPressConfirm(defaultAddress)}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: Colors.White,
                      fontSize: 16,
                      fontFamily: "Causten-SemiBold",
                    }}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default DeliveryAddressTwo;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: 20,
  },
  blur: {
    opacity: 0.5,
    backgroundColor: "#000000",
    width: wp(100),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 20,
    width: wp("95%"),
    height: "50%",
    alignItems: "center",
    borderWidth: 1,
  },
});
