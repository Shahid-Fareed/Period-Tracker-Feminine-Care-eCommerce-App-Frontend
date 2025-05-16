import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Colors from "../../Contants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useValidation } from "react-native-form-validator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import UserServices from "../../Services/UserService";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const DeliveryAddress = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("Pakistan");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [ZipCode, setZipCode] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [Email, setEmail] = useState("");
  const [items, setItems] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [open, setOpen] = useState(false);
  const foundCityItem = cityList.find((item) => item.label === city);
  const newCitty = foundCityItem ? foundCityItem.value : "";

  // console.log("items:", items);

  const handleEmailChange = (text) => {
    const trimmedEmail = text.trim();
    setEmail(trimmedEmail.toLowerCase());
  };
  // console.log("cityList", cityList);
  // console.log("foundCityItem", foundCityItem);
  // console.log("newCitty", newCitty);

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();

  const getShippingInfoFromAStorage = async () => {
    const data = await AsyncStorage.getItem("ShippingInfo");
    const newData = JSON.parse(data);
    console.log("newData", newData.city);
    if (data != null) {
      setFullName(newData.fullName);
      setNumber(newData.number);
      setAddress(newData.address);
      setCountry(newData.country || "Pakistan");
      setCity(newData.city);
      setZipCode(newData.ZipCode);
      setEmail(newData.Email);
    }
  };

  const getActiveCities = () => {
    UserServices.getActiveCities()
      .then((res) => {
        setCityList(res);
        let dataArray = [];

        for (let i = 0; i < res.length; i++) {
          const element = res[i];

          let obj = {
            label: element.label,
            value: element.label,
          };

          dataArray.push(obj);
        }

        setItems(dataArray);
      })
      .catch((err) => console.log(err));
  };

  useLayoutEffect(() => {
    getShippingInfoFromAStorage();
    getActiveCities();
  }, []);

  const SaveShippingInfoToAStorage = async () => {
    const data = {
      fullName: fullName,
      Email: Email,
      number: number,
      address: address,
      country: country,
      city: city,
      cityValue: newCitty,
    };
    AsyncStorage.setItem("ShippingInfo", JSON.stringify(data));
  };

  useEffect(() => {
    SaveShippingInfoToAStorage();
  }, [
    fullName,
    number,
    address,
    country,
    city,
    Email,
    newCitty,
    foundCityItem,
  ]);

  const {
    validate,
    isFieldInError,
    getErrorsInField,
    getErrorMessages,
    isFormValid,
  } = useValidation({
    state: {
      fullName,
      number,
      address,
      country,
      city,
      Email,
    },
  });

  const nextPress = () => {
    setPhoneNumberError("");
    setEmailError("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!Email || !emailRegex.test(Email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    // Validate required fields
    validate({
      fullName: { required: true },
      number: { required: true },
      address: { required: true },
      country: { required: true },
      city: { required: true },
      Email: { required: true },
    });

    // Validate phone number length
    if (!number || number.length < 11) {
      setPhoneNumberError("Please share 11-digit phone number");
      return;
    }

    // Check if the entire form is valid
    if (isFormValid()) {
      navigation.navigate("OrderSummary");
    }
  };

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView style={styles.screen}>
            {/* Number ROW */}
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
            {/* FORM */}
            <View style={{ alignSelf: "center", marginTop: wp(10) }}>
              <View
                style={{
                  width: wp("80%"),
                  backgroundColor: "transparent",
                  height: hp(60),
                  borderRadius: 20,
                }}
              >
                <BlurView
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                  blurType="light"
                  intensity={Platform.OS === "ios" ? 0 : 200}
                  borderWidth={1}
                  borderRadius={8}
                  borderColor={"#d2c9d0"}
                />
                <View style={{ alignSelf: "center", marginTop: wp(4) }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: "#9b2890",
                      fontSize: 16,
                      fontFamily: "Causten-Medium",
                    }}
                  >
                    Delivery Address
                  </Text>
                </View>

                <View style={{ paddingLeft: wp(8), paddingRight: wp(4) }}>
                  <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                  >
                    <TextInput
                      value={fullName}
                      onChangeText={setFullName}
                      placeholder="Full Name"
                      style={{
                        width: wp(65),
                        borderBottomWidth: 1,
                        height: hp(5),
                        borderBottomColor: "#9b2890",
                        marginBottom: wp(5),
                      }}
                      placeholderTextColor={"#9b2890"}
                    />
                    {isFieldInError("fullName") &&
                      getErrorsInField("fullName").map((errorMessage) => (
                        <Text
                          allowFontScaling={false}
                          style={{
                            color: "red",
                            marginTop: wp(-4),
                          }}
                        >
                          Please share name
                        </Text>
                      ))}
                  </KeyboardAvoidingView>
                  <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                  >
                    <TextInput
                      value={number}
                      onChangeText={setNumber}
                      ref={ref_input3}
                      maxLength={11}
                      placeholder="Contact Number"
                      style={{
                        width: wp(65),
                        borderBottomWidth: 1,
                        height: hp(5),
                        borderBottomColor: "#9b2890",
                        marginBottom: wp(5),
                      }}
                      placeholderTextColor={"#9b2890"}
                      keyboardType="phone-pad"
                    />
                    {phoneNumberError ? (
                      <Text style={styles.errorText}>{phoneNumberError}</Text>
                    ) : null}
                    {isFieldInError("number") &&
                      getErrorsInField("number").map((errorMessage) => (
                        <Text
                          allowFontScaling={false}
                          style={{
                            color: "red",
                            marginTop: wp(-4),
                          }}
                        >
                          {/* {errorMessage} */}
                        </Text>
                      ))}
                  </KeyboardAvoidingView>

                  <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                  >
                    <TextInput
                      value={Email}
                      onChangeText={handleEmailChange}
                      ref={ref_input4}
                      placeholder="Email"
                      style={{
                        width: wp(65),
                        borderBottomWidth: 1,
                        height: hp(5),
                        borderBottomColor: "#9b2890",
                        marginBottom: wp(5),
                      }}
                      placeholderTextColor={"#9b2890"}
                    />
                    {emailError ? (
                      <Text style={styles.errorText}>{emailError}</Text>
                    ) : null}
                    {isFieldInError("Email") &&
                      getErrorsInField("Email").map((errorMessage) => (
                        <Text
                          allowFontScaling={false}
                          style={{
                            color: "red",
                            marginTop: wp(-4),
                          }}
                        >
                          Please share email
                        </Text>
                      ))}
                  </KeyboardAvoidingView>
                  <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                  >
                    <TextInput
                      value={address}
                      onChangeText={setAddress}
                      ref={ref_input5}
                      placeholder="Address"
                      style={{
                        width: wp(65),
                        borderBottomWidth: 1,
                        height: hp(5),
                        borderBottomColor: "#9b2890",
                        marginBottom: wp(5),
                      }}
                      placeholderTextColor={"#9b2890"}
                    />
                    {isFieldInError("address") &&
                      getErrorsInField("address").map((errorMessage) => (
                        <Text
                          allowFontScaling={false}
                          style={{
                            color: "red",
                            marginTop: wp(-4),
                          }}
                        >
                          Please share address
                        </Text>
                      ))}
                  </KeyboardAvoidingView>
                  <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                  >
                    <TextInput
                      placeholder="Country"
                      value={country}
                      ref={ref_input6}
                      onChangeText={setCountry}
                      style={{
                        width: wp(65),
                        borderBottomWidth: 1,
                        height: hp(5),
                        borderBottomColor: "#9b2890",
                        marginBottom: wp(5),
                      }}
                      placeholderTextColor={"#9b2890"}
                    />
                    {isFieldInError("country") &&
                      getErrorsInField("country").map((errorMessage) => (
                        <Text
                          allowFontScaling={false}
                          style={{
                            color: "red",
                            marginTop: wp(-4),
                          }}
                        >
                          Please share country
                        </Text>
                      ))}
                  </KeyboardAvoidingView>
                  <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                  >
                    <DropDownPicker
                      open={open}
                      value={city}
                      items={items}
                      setOpen={setOpen}
                      setValue={setCity}
                      // setItems={setItems}
                      searchable={true}
                      listMode="MODAL"
                      placeholder={"Select City"}
                      modalContentContainerStyle={{
                        backgroundColor: "transparent",
                      }}
                      arrowIconStyle={{
                        width: 20,
                        height: 20,
                        color: "#9b2890",
                      }}
                      GradientBackground={() => (
                        <LinearGradient
                          colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
                          start={{ x: 0, y: 0.3 }}
                          end={{ x: 0.6, y: 0.6 }}
                          style={{ flex: 1 }}
                        />
                      )}
                      placeholderStyle={{ color: "#9b2890" }}
                      style={{
                        backgroundColor: "transparent",
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        height: hp(5),
                        borderBottomColor: "#9b2890",
                        marginBottom: wp(8),
                        marginTop: wp(-2),
                        marginLeft: -4,
                      }}
                    />

                    {isFieldInError("city") &&
                      getErrorsInField("city").map((errorMessage) => (
                        <Text
                          allowFontScaling={false}
                          style={{
                            color: "red",
                            marginTop: wp(-4),
                          }}
                        >
                          Please share city
                        </Text>
                      ))}
                  </KeyboardAvoidingView>
                  <KeyboardAvoidingView
                    enabled
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                  >
                    <TextInput
                      placeholder="Zip/Postal Code"
                      value={ZipCode}
                      ref={ref_input7}
                      onChangeText={setZipCode}
                      style={{
                        width: wp(65),
                        borderBottomWidth: 1,
                        height: hp(5),
                        borderBottomColor: "#9b2890",
                        marginBottom: wp(5),
                      }}
                      placeholderTextColor={"#9b2890"}
                      keyboardType="numeric"
                    />
                  </KeyboardAvoidingView>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => nextPress()}
              disabled={newCitty === ""}
              style={{
                alignSelf: "center",
                width: "80%",

              }}
            >
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
                >
                  Continue
                </Text>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

export default DeliveryAddress;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: wp(8),
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginTop: wp(-4),
  },
});
