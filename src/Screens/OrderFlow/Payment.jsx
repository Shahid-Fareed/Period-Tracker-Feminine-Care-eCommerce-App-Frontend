import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Touchable,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Colors from "../../Contants/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import UserServices from "../../Services/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoaderComponent from "../../Reuseable/LoaderComponent";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { commaSperate } from "../../Contants/Helper";
import { emptyCart } from "../../Redux/actions/Actions";

const Payment = ({ navigation }) => {
  const [promeCode, setPromoCode] = useState("");
  const [userUniqueName, setUserUniqueName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [shippingInformation, setShippingInformation] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [discountType, setDiscountType] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isDisable, setIsDisabled] = useState(true);
  const [token, setToken] = useState(true);
  const [subScriptionName, setSubScriptionName] = useState("One Time");
  const [couponeMessage, setCouponeMessage] = useState("");
  const [customer, setCustomer] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [usedCoupons, setUsedCoupons] = useState([]);

  const dispatch = useDispatch();

  console.log(" shippingInformation.cityValue", shippingInformation);

  useEffect(() => {
    const getData = () => {
      AsyncStorage.getItem("AppliedCoupons").then((value) => {
        setUsedCoupons(JSON.parse(value));
      });
    };

    getData();
  }, []);

  const getShippingInfoFromAStorage = async () => {
    const data = await AsyncStorage.getItem("ShippingInfo");

    console.log("data", data);

    const token = await AsyncStorage.getItem("Token");
    setToken(token);
    const newData = JSON.parse(data);
    if (newData != null) {
      setShippingInformation(newData);
    }
  };

  const cartItems = useSelector((state) => state);

  const totalCartPrice = cartItems.reduce(
    (a, c) => a + c.salePrice * c.quantity,
    0
  );
  let discountAmount = 0;
  if (discountType === "fixedvalue") {
    discountAmount = discount; // Calculate discount amount
  }
  if (discountType === "percentage") {
    discountAmount = (totalCartPrice * discount) / 100; // Calculate discount amount
  }
  const discountedPrice = totalCartPrice - discountAmount; // Subtract discount amount from totalCartPrice

  console.log("discountedPrice", discountAmount);

  const getUser = (customerId) => {
    UserServices.getUserById(customerId).then((res) => setCustomer(res));
  };

  useLayoutEffect(() => {
    const getCustomerID = async () => {
      const value = await AsyncStorage.getItem("customerId");
      const valye = await AsyncStorage.getItem("subscriptionName");
      if (value !== null) {
        // console.log(JSON.parse(value));
        setUserUniqueName(JSON.parse(value));
        getUser(JSON.parse(value));
      }
      if (valye !== null) {
        setSubScriptionName(JSON.parse(valye));
      }
    };
    getShippingInfoFromAStorage();
    getCustomerID();
  }, []);

  const CreateNotification = (message) => {
    const body = {
      user_id: userUniqueName,
      message: message,
    };
    // UserServices.CreateNotification(body)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  };

  const removeStorge = async () => {
    await AsyncStorage.removeItem("subscriptionName");
  };

  const handleCompleteOrder = () => {
    // alert("Order Placed");
    setModalVisible(true);
    setIsLoading(true);

    const body = {
      userId: userUniqueName,
      postalcode: shippingInformation.ZipCode,
      cart: cartItems,
      name: shippingInformation.fullName,
      email: shippingInformation.Email,
      address: shippingInformation.address,
      city: shippingInformation.cityValue || shippingInformation.city,
      contact: shippingInformation.number,
      country: shippingInformation.country,
      zipCode: shippingInformation.ZipCode,
      shippingCost: 0,
      discount: discountAmount,
      subTotal: totalCartPrice,
      total: discountedPrice,
      paymentMethod: paymentMethod,
      subscriptionType: subScriptionName,
      token: token,
      usedPromoCode: promeCode,
      trackingnumber: "",
    };

    if (subScriptionName === "One Time") {
      // console.log("subScriptionName");
      UserServices.PlaceOrder(body)
        .then((res) => {
          AsyncStorage.setItem("OrderRes", JSON.stringify(res)).then(
            (value) => {
              navigation.navigate("OrderCompleted");
              setModalVisible(false);
              setIsLoading(false);

              removeStorge();
              dispatch(emptyCart());
            }
          );
          CreateNotification("Your order has been placed successfully!");
        })
        .catch((err) => {
          console.log(err.message);
          setModalVisible(false);
          setIsLoading(false);
        });
    } else {
      console.log("Hello", body);
      UserServices.CreateSubscription(body)
        .then((res) => {
          console.log("CreateSubscription");
          AsyncStorage.setItem("OrderRes", JSON.stringify(res)).then(
            (value) => {
              navigation.navigate("OrderCompleted");
              removeStorge();
              dispatch(emptyCart());
              setModalVisible(false);
              setIsLoading(false);
            }
          );
          CreateNotification(
            "You've successfully subscribed to an auto-repeat plan!"
          );
        })
        .catch((err) => {
          console.log(err.message);
          setModalVisible(false);
          setIsLoading(false);
        });
    }

    removeStorge();
    dispatch(emptyCart());
  };
  const CouponCodeCheck = () => {
    setIsDisabled(false);
    setModalVisible(true);
    setCouponeMessage("");
    // console.log("hello");

    const check = customer.applyedCoupon.some((el) => el === promeCode);
    // console.log("dsada", check);

    // if (!check) {
    UserServices.CouponCheck({
      code: promeCode,
      ammount: totalCartPrice,
      customerId: userUniqueName,
    })
      .then((res) => {
        setModalVisible(false);
        // console.log("resdasdas", res);
        setCouponeMessage("Coupon applied");
        if (res.message === "Coupon used successfully") {
          setDiscountType(res.updatedCoupon.discountIn);
          setDiscount(res.updatedCoupon.discountValue);

          UserServices.couponAddtoCustomers({
            coupons: promeCode,
            customeId: userUniqueName,
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
        setModalVisible(false);
        setCouponeMessage("Invalid coupon.");
      });

    Keyboard.dismiss();
  };

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.screen}>
          {/* Number ROW */}
          {isModalVisible ? (
            <LoaderComponent isModalVisible={isModalVisible} />
          ) : null}

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
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
          <View
            style={{
              flex: 1,
              paddingHorizontal: wp(5),
              marginTop: wp(11),
              marginBottom: 120,
            }}
          >
            <View>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-Bold",
                  fontSize: 16,
                  marginBottom: 18,
                  color: "#9b2890",
                }}
              >
                Apply Coupon Code
              </Text>
            </View>
            {/* PromeCode */}
            <View
              style={{
                borderWidth: 1,
                borderColor: "#9b2890",
                flexDirection: "row",
                height: hp(5),
                justifyContent: "center",
                borderBottomEndRadius: wp(5),
                borderTopEndRadius: wp(5),
                borderTopStartRadius: wp(4.5),
                borderBottomStartRadius: wp(4.5),
              }}
            >
              <View style={{ width: wp(80), justifyContent: "center" }}>
                <KeyboardAvoidingView
                  enabled
                  behavior={Platform.OS === "ios" ? "padding" : "padding"}
                >
                  <TextInput
                    value={promeCode}
                    onChangeText={setPromoCode}
                    placeholder="Enter your promo code"
                    style={{ paddingLeft: wp(5), color: "#9b2890" }}
                    // editable={isDisable}
                    // editable={false}
                    placeholderTextColor={"#9b2890"}
                    keyboardType="default"
                  />
                </KeyboardAvoidingView>
              </View>

              <TouchableOpacity
                style={{
                  width: wp(10),
                  width: wp(10),
                  backgroundColor: "#9b2890",
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={CouponCodeCheck}
              >
                <AntDesign name="arrowright" size={15} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 10, marginTop: 5 }}>
              <KeyboardAvoidingView
                enabled
                behavior={Platform.OS === "ios" ? "padding" : "padding"}
              >
                {couponeMessage !== "" ? (
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: "Causten-Regular",
                      fontSize: 16,
                      color: "#9b2890",
                    }}
                  >
                    {couponeMessage}
                  </Text>
                ) : null}
              </KeyboardAvoidingView>
            </View>
          </View>
          <View>
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
              borderBottomEndRadius={0}
              borderBottomStartRadius={0}
              borderRadius={20}
              borderColor={"#d2c9d0"}
            />
            <View style={styles.container}>
              <Text allowFontScaling={false} style={styles.textStyle}>
                Order Details
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text allowFontScaling={false} style={styles.textStyleMedium}>
                Subtotal
              </Text>
              <Text allowFontScaling={false} style={styles.textStyleMedium}>
                Rs{commaSperate(totalCartPrice)}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text allowFontScaling={false} style={styles.textStyleMedium}>
                Discount
              </Text>
              <Text allowFontScaling={false} style={styles.textStyleMedium}>
                Rs{commaSperate(discountAmount)}
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
                Total
              </Text>
              <Text allowFontScaling={false} style={styles.textStyleMedium}>
                Rs{commaSperate(discountedPrice)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleCompleteOrder}
              disabled={isLoading}
            >
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
                {isLoading ? (
                  <ActivityIndicator size="small" color="#9b2890" />
                ) : (
                  <>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: "#9b2890",
                        fontSize: 16,
                        fontFamily: "Causten-SemiBold",
                      }}
                    >
                      Place Order
                    </Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

export default Payment;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: 20,
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
    marginVertical: 15,
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
