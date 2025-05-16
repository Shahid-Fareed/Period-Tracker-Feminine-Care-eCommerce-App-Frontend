import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Contants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserServices from "../../Services/UserService";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableWithoutFeedback } from "react-native";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";
import DropDownPicker from "react-native-dropdown-picker";
import { useValidation } from "react-native-form-validator";

const AddAddress = ({ navigation }) => {
  const [customerId, setcustomerId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [isDefault, setisDefault] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  console.log("city", city);

  const [items, setItems] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [open, setOpen] = useState(false);

  const foundCityItem = cityList.find((item) => item.label === city);
  const newCitty = foundCityItem ? foundCityItem.value : "";
  console.log("newCitty", newCitty);

  const {
    validate,
    isFieldInError,
    getErrorsInField,
    getErrorMessages,
    isFormValid,
  } = useValidation({
    state: {
      name,
      address,
      city,
      state,
      country,
      email,
      contact,
    },
  });

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

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("customerId").then((value) => {
        placeholderTextColor = "#000";
        setcustomerId(JSON.parse(value));
        placeholderTextColor = "#000";
        TrackUserActivity(value, "Add Address Screen", "On Screen");
        placeholderTextColor = "#000";
      });
      getActiveCities();
    }, [navigation])
  );

  const AddData = () => {
    validate({
      fullName: { required: true },
      name: { required: true },
      address: { required: true },
      city: { required: true },
      state: { required: true },
      country: { required: true },
      email: { required: true },
      contact: { required: true },
    });

    if (isFormValid()) {
      setIsLoading(true);
      const body = {
        customerId: customerId,
        name: name,
        address: address,
        city: newCitty,
        state: state,
        zipCode: zipCode,
        country: country,
        email: email,
        contact: contact,
        isDefault: isDefault,
      };
      UserServices.addAddress(body)
        .then((res) => {
          navigation.navigate("Address");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
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
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ScrollView
            style={{ marginTop: wp("10%") }}
            showsVerticalScrollIndicator={false}
          >
            <TextInput
              placeholder="Full Name"
              style={styles.inputField}
              value={name}
              placeholderTextColor="#9b2890"
              onChangeText={setName}
            />
            {isFieldInError("name") &&
              getErrorsInField("name").map((errorMessage) => (
                <Text
                  allowFontScaling={false}
                  style={{
                    color: "red",
                    marginTop: wp(-4),
                  }}
                >
                  This Field is required
                </Text>
              ))}
            <TextInput
              placeholder="Address"
              style={styles.inputField}
              value={address}
              placeholderTextColor="#9b2890"
              onChangeText={setAddress}
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
                  This Field is required
                </Text>
              ))}
            <DropDownPicker
              open={open}
              value={city}
              items={items}
              setOpen={setOpen}
              setValue={setCity}
              // setItems={setItems}
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
              style={styles.inputField}
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
                  This Field is required
                </Text>
              ))}

            <TextInput
              placeholder="State/Province"
              style={styles.inputField}
              value={state}
              placeholderTextColor="#9b2890"
              onChangeText={setState}
            />
            {isFieldInError("state") &&
              getErrorsInField("state").map((errorMessage) => (
                <Text
                  allowFontScaling={false}
                  style={{
                    color: "red",

                    marginTop: wp(-4),
                  }}
                >
                  This Field is required
                </Text>
              ))}

            <TextInput
              placeholder="Postal / Zip code"
              style={styles.inputField}
              value={zipCode}
              placeholderTextColor="#9b2890"
              onChangeText={setZipCode}
            />
            <TextInput
              placeholder="Country"
              style={styles.inputField}
              value={country}
              placeholderTextColor="#9b2890"
              onChangeText={setCountry}
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
                  This Field is required
                </Text>
              ))}
            <TextInput
              placeholder="Contact Number"
              style={styles.inputField}
              value={contact}
              maxLength={11}
              placeholderTextColor="#9b2890"
              onChangeText={setContact}
              keyboardType="number-pad"
            />
            {isFieldInError("contact") &&
              getErrorsInField("contact").map((errorMessage) => (
                <Text
                  allowFontScaling={false}
                  style={{
                    color: "red",

                    marginTop: wp(-4),
                  }}
                >
                  This Field is required
                </Text>
              ))}
            <TextInput
              placeholder="Email"
              style={styles.inputField}
              value={email}
              placeholderTextColor="#9b2890"
              onChangeText={setEmail}
            />
            {isFieldInError("email") &&
              getErrorsInField("email").map((errorMessage) => (
                <Text
                  allowFontScaling={false}
                  style={{
                    color: "red",

                    marginTop: wp(-4),
                  }}
                >
                  This Field is required
                </Text>
              ))}
            {isLoading ? (
              <>
                <ActivityIndicator size="large" color="#9b2890" />
              </>
            ) : (
              <TouchableOpacity onPress={() => AddData()}>
                <View style={styles.button}>
                  <Text allowFontScaling={false} style={styles.buttonText}>
                    Save
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    backgroundColor: "transparent",
  },
  button: {
    borderRadius: 23,
    backgroundColor: Colors.SecondaryOne,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: hp("7%"),
    width: wp("70%"),
  },
  buttonText: {
    color: Colors.White,
    fontFamily: "Causten-Bold",
    fontSize: 16,
  },
});
