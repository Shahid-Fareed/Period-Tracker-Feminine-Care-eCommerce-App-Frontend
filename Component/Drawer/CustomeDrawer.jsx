import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Constants from "expo-constants";
import UserServices from "../Drawer/Services/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Colors from "../Drawer/Colors";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../Context/AuthContext";

const StatusBarHeight = Constants.statusBarHeight;

const CustomDrawer = (props) => {
  const { logout } = useAuth();

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState("+92 42-111-767-311");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    });
  }, [navigation]);

  const handleOnPressDeleteAccount = (userName) => {
    setIsLoading(true);

    AsyncStorage.removeItem("skipStorage").then((res) => {
      UserServices.ChangeCustomerStatus(userName)
        .then((res) => {
          setIsLoading(false);
          setModalVisible(false);
          // Navigate to Welcome screen
          navigation.navigate("Welcome");
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err.message);
        });
    });
  };

  const handleOnPressLogOut = () => {
    logout();
  };
  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.3, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image
            style={{ marginRight: 10, width: 60, height: 60 }}
            source={require("../../assets/resources/profile.png")}
          />
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: "Causten-SemiBold",
              fontSize: 18,
              color: "#9b2890",
            }}
          >
            {fullName}
          </Text>
        </View>
        <DrawerContentScrollView {...props}>
          <TouchableOpacity
            style={{ backgroundColor: "transparent" }}
            onPress={() =>
              navigation.navigate("Drawerscreen", { screen: "EditProfile" })
            }
          >
            <View style={styles.textcontainer}>
              <Image
                source={require("../../assets/resources/EditProfile.png")}
                resizeMode="contain"
                style={styles.image}
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
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "transparent" }}
            onPress={() => navigation.navigate("CycleHistory")}
          >
            <View style={styles.textcontainer}>
              <Image
                source={require("../../assets/resources/CycleIcon.png")}
                resizeMode="contain"
                style={styles.image}
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
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity style={{ backgroundColor: "transparent" }}>
            <View style={styles.textcontainer}>
              <Image
                source={require("../../assets/resources/CycleIcon.png")}
                resizeMode="contain"
                style={styles.image}
              />
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-Medium",
                  fontSize: 16,
                  color: "#9b2890",
                }}
              >
                Mark Previous Cycle
              </Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{ backgroundColor: "transparent" }}
            onPress={() =>
              navigation.navigate("Drawerscreen", { screen: "OrderHistory" })
            }
          >
            <View style={styles.textcontainer}>
              <Image
                source={require("../../assets/resources/Cart.png")}
                resizeMode="contain"
                style={styles.image}
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
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "transparent" }}
            onPress={() => navigation.navigate("Subscription")}
          >
            <View style={styles.textcontainer}>
              <Image
                source={require("../../assets/resources/SubscriptionManager.png")}
                resizeMode="contain"
                style={styles.image}
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
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "transparent" }}
            onPress={() => navigation.navigate("Address")}
          >
            <View style={styles.textcontainer}>
              <Image
                source={require("../../assets/resources/ManageShippingAddress.png")}
                resizeMode="contain"
                style={styles.image}
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
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "transparent" }}
            onPress={() => OpenPhoneDialer()}
          >
            <View style={styles.textcontainer}>
              <Image
                source={require("../../assets/resources/CallSupport.png")}
                resizeMode="contain"
                style={styles.image}
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
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "transparent" }}
            onPress={() =>
              navigation.navigate("Drawerscreen", {
                screen: "TermAndContditions",
              })
            }
          >
            <View style={styles.textcontainer}>
              <Image
                source={require("../../assets/resources/TermsAndConditions.png")}
                resizeMode="contain"
                style={styles.image}
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
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "transparent" }}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.textcontainer}>
              <Image
                source={require("../../assets/resources/Trash.png")}
                resizeMode="contain"
                style={styles.image}
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
            </View>
          </TouchableOpacity>
        </DrawerContentScrollView>
        <View style={{ top: -130, alignSelf: "center" }}>
          <TouchableOpacity
            onPress={() => handleOnPressLogOut()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: wp(3),
            }}
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
            }}
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
        </View>
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
                  overflow: "hidden",
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
      </View>
    </LinearGradient>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBarHeight,
    flex: 1,
    borderRightWidth: 1,
    borderColor: "#fff",
  },
  titleContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  textcontainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    marginBottom: 25,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 15,
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
