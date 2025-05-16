import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../Contants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import UserServices from "../Services/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const SideBar = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState("+92 42-111-767-311");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");

  const OpenPhoneDialer = () => {
    if (Platform.OS == "android") {
      Linking.openURL(`tel:${phone}`);
    } else if (Platform.OS == "ios") {
      Linking.openURL(`telprompt:${phone}`);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("customerId").then((value) => {
      var name = JSON.parse(value);
      setUserName(name);
    });
    AsyncStorage.getItem("LoginDetails").then((value) => {
      var data = JSON.parse(value);
      setFullName(data.full_name);
      // setUserName(name);
    });
  }, [navigation]);

  const handleOnPressDeleteAccount = (userName) => {
    // setisloading(true);
    AsyncStorage.removeItem("skipStorage").then((res) => {
      UserServices.ChangeCustomerStatus(userName)
        .then((res) => {
          setTimeout(() => {
            // setisloading(false);
            navigation.navigate("Welcome");
          }, 2000);
        })
        .catch((err) => console.log(err.message));
    });
  };

  const handleOnPressLogOut = () => {
    AsyncStorage.removeItem("skipStorage").then((res) => {
      setTimeout(() => {
        // setisloading(false);
        navigation.navigate("Welcome");
      }, 2000);
    });
  };

  return (
    <>
      <LinearGradient
        colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0.3, y: 1 }}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.Screen}>
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              marginLeft: wp(5),
            }}
          >
            <View
              style={{
                backgroundColor: Colors.Grey,
                width: wp(90),
                height: hp(15),
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 10,
                paddingLeft: wp(3),
              }}
            >
              <Image
                source={require("../../assets/resources/profile.png")}
                style={{ marginRight: 10, width: 60, height: 60 }}
                resizeMode="contain"
              />
              <Text
                allowFontScaling={false}
                style={{ fontFamily: "Causten-SemiBold", fontSize: 18 }}
              >
                {fullName}
              </Text>
            </View>
          </View>
          <View style={{ marginLeft: wp(11), marginTop: wp(15), flex: 7 }}>
            <View>
              {/*
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../assets/resources/EditProfile.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  marginRight: 20,
                  marginBottom: 20,
                }}
              />
              <Text allowFontScaling={false}  style={{ fontFamily: "Causten-Medium", fontSize: 18 }}>
                Edit Profile
              </Text>
              </View>*/}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MyCycleStack", {
                    screen: "MyCycleScreen",
                  })
                }
                style={{ flexDirection: "row" }}
              >
                <Image
                  source={require("../../assets/resources/CycleIcon.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{ fontFamily: "Causten-Medium", fontSize: 18 }}
                >
                  Cycle History
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("MarkPreviousCycle")}
                style={{ flexDirection: "row" }}
              >
                <Image
                  source={require("../../assets/resources/CycleIcon.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{ fontFamily: "Causten-Medium", fontSize: 18 }}
                >
                  Mark Previous Cycle
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("OrderHistory")}
                style={{ flexDirection: "row" }}
              >
                <Image
                  source={require("../../assets/resources/Cart.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{ fontFamily: "Causten-Medium", fontSize: 18 }}
                >
                  My Orders
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("SubscriptionHistory")}
              >
                <Image
                  source={require("../../assets/resources/SubscriptionManager.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{ fontFamily: "Causten-Medium", fontSize: 18 }}
                >
                  Subscription Manager
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("Address")}
              >
                <Image
                  source={require("../../assets/resources/ManageShippingAddress.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{ fontFamily: "Causten-Medium", fontSize: 18 }}
                >
                  Manage Shipping Address
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => OpenPhoneDialer()}
                style={{ flexDirection: "row" }}
              >
                <Image
                  source={require("../../assets/resources/CallSupport.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{ fontFamily: "Causten-Medium", fontSize: 18 }}
                >
                  Call Support
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("TermAndContditions")}
              >
                <Image
                  source={require("../../assets/resources/TermsAndConditions.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{ fontFamily: "Causten-Medium", fontSize: 18 }}
                >
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => setModalVisible(true)}
              >
                <Image
                  source={require("../../assets/resources/Trash.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{ fontFamily: "Causten-Medium", fontSize: 18 }}
                >
                  Delete My Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: wp(7),
            }}
            onPress={() => handleOnPressLogOut()}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image
                source={require("../../assets/resources/logout.png")}
                style={{ width: wp(5), height: wp(5), marginRight: wp(1) }}
              />
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-Medium",
                  fontSize: 20,
                  color: Colors.textLight,
                }}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: "Causten-SemiBold",
                      fontSize: 16,
                      color: Colors.Black,
                      lineHeight: 20,
                    }}
                  >
                    Are you sure you want to delete
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: "Causten-SemiBold",
                      fontSize: 16,
                      color: Colors.Black,
                      lineHeight: 20,
                    }}
                  >
                    your account?
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.SecondaryOne,
                      width: wp(30),
                      height: wp(10),
                      marginRight: wp(5),
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 60,
                    }}
                    onPress={() => handleOnPressDeleteAccount(userName)}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontFamily: "Causten-SemiBold",
                        fontSize: 15,
                        color: Colors.White,
                      }}
                    >
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: Colors.SecondaryOne,
                      width: wp(30),
                      height: wp(10),
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 60,
                    }}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontFamily: "Causten-SemiBold",
                        fontSize: 15,
                        color: Colors.Black,
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: Colors.Grey,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
