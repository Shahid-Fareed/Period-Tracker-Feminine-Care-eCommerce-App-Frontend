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
  Button,
  ActivityIndicator,
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
import { Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const SideBarNew = ({
  isLoading,
  setIsLoading,
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState("+92 42-111-767-311");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [SubscrtiptionStatus, setSubscrtiptionStatus] = useState(true);

  const getUSerName = (id) => {
    UserServices.getUserName(id)
      .then((res) => {
        setFullName(res);
      })
      .catch((err) => console.log(err.message));
  };

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("customerId").then((value) => {
        checkSub(JSON.parse(value));
        getUSerName(JSON.parse(value));
      });
    }, [navigation])
  );

  const checkSub = (id) => {
    UserServices.checkSubscrtiption(id)
      .then((res) => {
        if (res == []) {
          setSubscrtiptionStatus(false);
        } else {
          setSubscrtiptionStatus(true);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [navigation]);

  const OpenPhoneDialer = () => {
    if (Platform.OS == "android") {
      Linking.openURL(`tel:${phone}`);
      setIsDrawerOpen(false);
    } else if (Platform.OS == "ios") {
      Linking.openURL(`telprompt:${phone}`);
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    AsyncStorage.getItem("customerId").then((value) => {
      var name = JSON.parse(value);
      setUserName(name);
    });
    AsyncStorage.getItem("LoginDetails").then((value) => {
      var data = JSON.parse(value);
      // setFullName(data.full_name);
      setIsLoading(false);
    });
  }, [navigation]);

  const handleOnPressDeleteAccount = (userName) => {
    AsyncStorage.clear().then((res) => {
      UserServices.ChangeCustomerStatus(userName)
        .then((res) => {
          setTimeout(() => {
            setModalVisible(false);
            setIsDrawerOpen(false);
            navigation.navigate("Welcome");
          }, 1000);
        })
        .catch((err) => console.log(err.message));
    });
  };

  const handleOnPressLogOut = () => {
    AsyncStorage.clear().then((res) => {
      setTimeout(() => {
        setIsDrawerOpen(false);
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
        style={{ flex: 1, borderRadius: 20 }}
      >
        <BlurView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            borderRadius: 20,
            borderColor: "#fff",
            borderWidth: 0.4,
          }}
          // blurType="light"
          intensity={Platform.OS === "ios" ? 0 : 150}
        />
        <SafeAreaView style={styles.sidebar}>
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              marginLeft: wp(5),
              width: wp(63),
            }}
          >
            <View
              style={{
                width: wp(73),
                height: hp(13),
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 10,
                paddingLeft: wp(3),
              }}
            >
              <Image
                source={require("../../assets/resources/profile.png")}
                style={{ marginRight: 10, width: 80, height: 80 }}
                resizeMode="contain"
              />

              {isLoading ? (
                <ActivityIndicator color={"#9b2890"} />
              ) : (
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Causten-Black",
                    fontSize: 22,
                    color: "#9b2890",
                  }}
                >
                  {fullName?.split(" ")[0]}
                  {fullName?.split(" ")[1] ? (
                    <>
                      {"\n"}
                      {fullName?.split(" ")[1]}
                    </>
                  ) : null}
                  {fullName?.split(" ")[2] ? (
                    <>
                      {"\n"}
                      {fullName?.split(" ")[2]}
                    </>
                  ) : null}
                </Text>
              )}
            </View>
          </View>
          <View style={{ marginLeft: wp(7), marginTop: wp(10), flex: 7 }}>
            <View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("EditProfile")}
                  style={{ flexDirection: "row" }}
                >
                  <Image
                    source={require("../../assets/resources/EditProfile.png")}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 20,
                      marginBottom: 20,
                    }}
                  />
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: "Causten-Medium",
                      fontSize: 16,
                      color: "#9b2890",
                    }}
                  >
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              </View>
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
                    width: 20,
                    height: 20,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Causten-Medium",
                    fontSize: 16,
                    color: "#9b2890",
                  }}
                >
                  Cycle History
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate("MarkPreviousCycle")}
                style={{ flexDirection: "row" }}
              >
                <Image
                  source={require("../../assets/resources/CycleIcon.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text allowFontScaling={false} 
                  style={{
                    fontFamily: "Causten-Medium",
                    fontSize: 16,
                    color: "#9b2890",
                  }}
                >
                  Mark Previous Cycle
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => navigation.navigate("OrderHistory")}
                style={{ flexDirection: "row" }}
              >
                <Image
                  source={require("../../assets/resources/Cart.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Causten-Medium",
                    fontSize: 16,
                    color: "#9b2890",
                  }}
                >
                  My Orders
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                // onPress={() => navigation.navigate("SubscriptionHistory")}
                onPress={() => {
                  SubscrtiptionStatus === true
                    ? navigation.navigate("SubscriptionHistory")
                    : navigation.navigate("Subscription");
                }}
              >
                <Image
                  source={require("../../assets/resources/SubscriptionManager.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Causten-Medium",
                    fontSize: 16,
                    color: "#9b2890",
                  }}
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
                    width: 20,
                    height: 20,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Causten-Medium",
                    fontSize: 16,
                    color: "#9b2890",
                  }}
                >
                  Manage Shipping Address
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("MarkPreviousCycle")}
                style={{ flexDirection: "row" }}
              >
                <Image
                  source={require("../../assets/resources/markpreviouscycle.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Causten-Medium",
                    fontSize: 16,
                    color: "#9b2890",
                  }}
                >
                  Add Previous Cycles
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
                    width: 20,
                    height: 20,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Causten-Medium",
                    fontSize: 16,
                    color: "#9b2890",
                  }}
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
                    width: 20,
                    height: 20,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Causten-Medium",
                    fontSize: 16,
                    color: "#9b2890",
                  }}
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
                    width: 20,
                    height: 20,
                    marginRight: 20,
                    marginBottom: 20,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Causten-Medium",
                    fontSize: 16,
                    color: "#9b2890",
                  }}
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
              marginBottom: wp(4),
            }}
            onPress={() => handleOnPressLogOut()}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "white",
                width: wp(40),
                height: wp(9),
                borderRadius: 20,
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
                  fontSize: 16,
                  color: "#9b2890",
                }}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: wp(5),
            }}
            // onPress={() => handleOnPressLogOut()}
            onPress={() =>
              Linking.openURL("")
            }
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Causten-Medium",
                fontSize: 10,
                color: Colors.textLight,
                color: "#9b2890",
              }}
            >
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <LinearGradient
                colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
                start={{ x: 0, y: 0.3 }}
                end={{ x: 0.3, y: 1 }}
                style={{ borderRadius: 15 }}
              >
                <BlurView
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderColor: "#fff",
                    borderWidth: 1,
                    borderRadius: 15,
                  }}
                  blurType="light"
                  intensity={Platform.OS === "ios" ? 0 : 10}
                />
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
                        color: "#9b2890",
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
                        color: "#9b2890",
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
                        backgroundColor: "#9b2890",
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
                        borderColor: "#9b2890",
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
              </LinearGradient>
            </View>
          </Modal>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

SideBarNew.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: navigation.state.index === 0, // Hide tab bar when this screen is open
  };
};

export default SideBarNew;

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: 40,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  modal: {
    backgroundColor: "transparent",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
