import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  ActivityIndicatorBase,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../Contants/Colors";
import UserServices from "../../Services/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useValidation } from "react-native-form-validator";
import moment from "moment";
import DateTimePickerModal from "../../Packages/react-native-modal-datetime-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [date, setDate] = useState(null);
  const [customerID, setCustomerID] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [openDatePickerDob, setOpenDatePickerDob] = useState(false);
  const [selectDateOfBirth, setSelectDateOfBirth] = useState(new Date());
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(false);

  const { validate, isFieldInError, getErrorsInField, isFormValid } =
    useValidation({
      state: { date, name },
    });

  useEffect(() => {
    AsyncStorage.getItem("customerId").then((value) => {
      setCustomerID(JSON.parse(value));
      TrackUserActivity(value, "Edit Profile Screen", "On Screen");
    });
  }, [navigation]);

  const handleSubmit = () => {
    setIsLoading(true);

    console.log("hi");
    validate({
      name: { required: true },
      date: { required: true },
    });

    if (isFormValid()) {
      const body = {
        name: name,
        date: date,
      };

      console.log("body", body);

      UserServices.updateProfile(customerID, body)
        .then((res) => {
          setIsLoading(false);
          navigation.navigate("Main", { screen: "Home" });
        })
        .catch((error) => console.log(err));
    }
  };

  const Submit = () => {
    console.log("Test");
  };

  const hideDatePicker = () => {
    setOpenDatePickerDob(false);
  };

  const handleOpenDatePickerDob = () => {
    setOpenDatePickerDob(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpenDatePickerDob(false);
    setSelectedDateOfBirth(true);
    setSelectDateOfBirth(currentDate);
    setDate(moment(currentDate).format("DD-MM-YYYY"));
  };

  const handleConfirm = (date) => {
    const currentDate = date;
    // setOpenDatePickerDob(false);
    setSelectedDateOfBirth(true);
    setSelectDateOfBirth(currentDate);
    setDate(moment(currentDate).format("DD-MM-YYYY"));
    hideDatePicker();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient
        colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0.6, y: 0.6 }}
        style={{ flex: 1 }}
      >
        <>
          {openDatePickerDob && (
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
          )}

          {/* {isLoading ? <LoaderComponent isModalVisible={isLoading} /> : null} */}
          <View style={styles.container}>
            <KeyboardAvoidingView
              enabled
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TextInput
                placeholder="Full Name"
                style={styles.inputField}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholderStyle={{
                  fontFamily: "Causten-Bold",
                  color: "red",
                }}
                placeholderTextColor="#9E1A97"
              />

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
                    This Field Is Required
                  </Text>
                ))}
            </KeyboardAvoidingView>
            <KeyboardAvoidingView
              enabled
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TouchableOpacity onPress={handleOpenDatePickerDob}>
                <TextInput
                  pointerEvents="none"
                  editable={false}
                  placeholder={"Date of Birth"}
                  style={styles.inputField}
                  value={
                    selectedDateOfBirth == false
                      ? ""
                      : moment(selectDateOfBirth).format("DD MMM, YYYY")
                  }
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#9E1A97"
                />

                {isFieldInError("date") &&
                  getErrorsInField("date").map((errorMessage) => (
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: "red",
                        marginHorizontal: wp(3),
                        marginBottom: wp(3),
                        marginTop: wp(-4),
                      }}
                    >
                      This Field Is Required
                    </Text>
                  ))}
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
          {isLoading ? (
            <>
              <ActivityIndicator
                size="large"
                color="#9b2890"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  position: "absolute",
                  bottom: 40,
                  alignSelf: "center",
                }}
              />
            </>
          ) : (
            <>
              <KeyboardAvoidingView
                enabled
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TouchableOpacity
                  onPress={handleSubmit}
                  //   disabled={isLoading}
                  style={styles.button}
                >
                  <Text allowFontScaling={false} style={styles.buttonText}>
                    Save
                  </Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </>
          )}
        </>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
  },

  inputField: {
    height: hp("7%"),
    width: wp("70%"),
    borderWidth: 1,
    borderRadius: 23,
    borderColor: Colors.SecondaryOne,
    marginBottom: wp("5%"),
    paddingLeft: wp(4),
    justifyContent: "center",
  },
  button: {
    borderRadius: 23,
    backgroundColor: Colors.SecondaryOne,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: hp("6%"),
    width: wp("70%"),
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  buttonText: {
    color: Colors.White,
    fontFamily: "Causten-Bold",
    fontSize: 16,
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
});
