import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../Contants/Colors";
import { useValidation } from "react-native-form-validator";
import UserServices from "../../Services/UserService";
import saveToAsyncStorageCredentials from "../../Global/Functions";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { BlurView } from "expo-blur";
import DateTimePickerModal from "../../Packages/react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";
import { useAuth } from "../../../Context/AuthContext";
import * as Device from "expo-device";
import CustomDatePicker from "../../../Component/CustomeDatePicker";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("myNotificationChannel", {
      name: "A channel is needed for the permissions prompt to appear",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId = "b0d1e8fa-d70f-4721-92a2-05beac2b4cae";
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

const Welcome = ({ navigation }) => {
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState("");
  const [dob, setDob] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [isLoading, setIsLoading] = useState("");

  const [openDatePickerDob, setOpenDatePickerDob] = useState(false);
  const [selectDateOfBirth, setSelectDateOfBirth] = useState(new Date());
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [channels, setChannels] = useState([]);
  // OLD
  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) => {
  //     if (token) {
  //       setExpoPushToken(token);
  //       AsyncStorage.setItem("token", JSON.stringify(token)); // Move inside the callback
  //       console.log("Token saved successfully:", token);
  //     }
  //   });

  //   if (Platform.OS === "android") {
  //     Notifications.getNotificationChannelsAsync().then((value) =>
  //       setChannels(value ?? [])
  //     );
  //   }

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     notificationListener.current &&
  //       Notifications.removeNotificationSubscription(
  //         notificationListener.current
  //       );
  //     responseListener.current &&
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
        AsyncStorage.setItem("token", JSON.stringify(token));
        console.log("Token saved successfully:", token);
      }
    });

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }

    // Save the subscriptions so we can remove them later
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  const { validate, isFieldInError, getErrorsInField, isFormValid } =
    useValidation({
      state: { dob, name, phoneNumber },
    });

  const handleOpenDatePickerDob = () => {
    setOpenDatePickerDob(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpenDatePickerDob(false);
    setSelectedDateOfBirth(true);
    setSelectDateOfBirth(currentDate);
    setDob(moment(currentDate).format("DD-MM-YYYY"));
  };
  const onChangeTwo = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpenDatePickerDob(false);
    setSelectedDateOfBirth(true);
    setSelectDateOfBirth(currentDate);
    setDob(moment(currentDate).format("DD-MM-YYYY"));
  };

  const onSignIn = () => {
    setIsLoading(true);
    validate({
      name: { required: true },
      dob: { required: true },
      phoneNumber: { required: true },
    });

    if (isFormValid()) {
      var body = {
        name: name,
        dateOfBirth: selectDateOfBirth,
        phoneNumber: phoneNumber,
        token: expoPushToken,
      };

      console.log("body", body);

      UserServices.loginUser(body)
        .then((res) => {
          setIsLoading(false);
          saveToAsyncStorageCredentials("customerId", res.data.customerId);
          TrackUserActivity(
            res.data.customerId,
            "On Login Screen",
            "ON-Screen"
          );
          saveToAsyncStorageCredentials("LoginDetails", res.data);
          saveToAsyncStorageCredentials("skipLogin", true);
          if (res.message === "Existing User") {
            login();
          } else if (res.message === "New User") {
            navigation.navigate("LastPeriodStart");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error.message);
        });
    }
  };
  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatePicker = () => {
    setOpenDatePickerDob(true);
  };

  const hideDatePicker = () => {
    setOpenDatePickerDob(false);
  };

  // console.log("expoPushToken", expoPushToken);

  const handleConfirm = (date) => {
    const currentDate = date;
    // setOpenDatePickerDob(false);
    setSelectedDateOfBirth(true);
    setSelectDateOfBirth(currentDate);
    setDob(moment(currentDate).format("DD-MM-YYYY"));
    hideDatePicker();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          source={require("../../../assets/resources/WelcomeScreen.png")}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1 }}>
              {/* {openDatePickerDob && (
                <View
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    position: "absolute",
                    bottom: 250,
                    zIndex: 1,
                  }}
                >
                  {Platform.OS == "ios" ? (
                    <>
                      <DateTimePickerModal
                        isVisible={true}
                        mode="date"
                        value={selectDateOfBirth}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                      />
                    </>
                  ) : (
                    <DateTimePicker
                      textColor="white"
                      testID="dateTimePicker"
                      title="From"
                      value={selectDateOfBirth}
                      mode="date"
                      is24Hour={false}
                      display={"spinner"}
                      onChange={onChange}
                      style={{
                        color: Colors.Black,
                        backgroundColor: "#9E1A97",
                      }}
                      positiveButton={{ color: "red" }}
                      confirmBtnText="OK"
                    />
                  )}
                </View>
              )} */}

              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                  <Text allowFontScaling={false} style={styles.heading}>
                    Welcome to
                  </Text>
                  <Image
                    style={styles.image}
                    source={require("../../../assets/resources/heartpurple.png")}
                  />
                </View>
              </TouchableWithoutFeedback>

              <ScrollView
                style={{
                  marginTop: wp("25%"),
                  width: wp(80),
                  alignSelf: "center",
                }}
              >
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
                    intensity={Platform.OS === "ios" ? 0 : 100}
                    borderWidth={1}
                    borderRadius={20}
                    borderColor={"#d2c9d0"}
                  />
                  <View
                    style={{
                      width: wp(80),
                      backgroundColor: "transparent",
                      height: wp(80),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <KeyboardAvoidingView
                      enabled
                      behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                      <TextInput
                        placeholder="Full Name"
                        style={styles.inputField}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholderTextColor="#000"
                      />
                      {isFieldInError("name") &&
                        getErrorsInField("name").map((errorMessage) => (
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: "red",
                              marginHorizontal: wp(3),
                              marginBottom: wp(3),
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
                      <TouchableOpacity
                        style={styles.inputFieldDate}
                        onPress={handleOpenDatePickerDob}
                      >
                        <TextInput
                          pointerEvents="none"
                          editable={false}
                          placeholder={"Date of Birth"}
                          placeholderTextColor="#000"
                          value={
                            selectedDateOfBirth == false
                              ? ""
                              : moment(selectDateOfBirth).format("DD MMM, YYYY")
                          }
                          underlineColorAndroid="transparent"
                          style={{ color: Colors.Black }}
                        />
                      </TouchableOpacity>
                      {isFieldInError("dob") &&
                        getErrorsInField("dob").map((errorMessage) => (
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: "red",
                              marginHorizontal: wp(3),
                              marginBottom: wp(3),
                              marginTop: wp(-4),
                            }}
                          >
                            Pleaase select date of birth
                          </Text>
                        ))}
                    </KeyboardAvoidingView>
                    <KeyboardAvoidingView
                      enabled
                      behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                      <TextInput
                        placeholder="Phone Number"
                        style={styles.inputField}
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        maxLength={11}
                        placeholderTextColor="#000"
                        keyboardType="phone-pad"
                      />
                      {isFieldInError("phoneNumber") &&
                        getErrorsInField("phoneNumber").map((errorMessage) => (
                          <Text
                            allowFontScaling={false}
                            style={{
                              color: "red",
                              marginHorizontal: wp(3),
                              marginBottom: wp(10),
                              marginTop: wp(-4),
                            }}
                          >
                            Please share Phone Number
                          </Text>
                        ))}
                    </KeyboardAvoidingView>
                    {isLoading ? (
                      <>
                        <ActivityIndicator size="large" color="#fff" />
                      </>
                    ) : (
                      <>
                        <TouchableOpacity onPress={() => onSignIn()}>
                          <View style={styles.button}>
                            <Text
                              allowFontScaling={false}
                              style={styles.buttonText}
                            >
                              Sign in
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              </ScrollView>
              {openDatePickerDob && (
                <CustomDatePicker
                  // isVisible={true}
                  value={selectDateOfBirth}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: wp("60%"),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    width: wp("80%"),
    height: wp("80%"),
    margin: 0,
  },
  heading: {
    fontFamily: "Causten-Bold",
    fontSize: 32,
    fontWeight: "400",
    color: "#fff",
    paddingBottom: 20,
  },
  inputField: {
    height: hp("6%"),
    width: wp("70%"),
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#f4d4e6",
    marginBottom: wp("5%"),
    paddingLeft: wp(4),
    backgroundColor: "rgba(224,158,200,0.7)",
  },
  inputFieldDate: {
    height: hp("6%"),
    width: wp("70%"),
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#f4d4e6",
    marginBottom: wp("5%"),
    paddingLeft: wp(4),
    justifyContent: "center",
    backgroundColor: "rgba(224,158,200,0.7)",
  },
  button: {
    borderRadius: 23,
    backgroundColor: "#e82174",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: hp("6%"),
    width: wp("70%"),
  },
  buttonText: {
    color: Colors.White,
    fontFamily: "Causten-Bold",
    fontSize: 16,
  },
});
