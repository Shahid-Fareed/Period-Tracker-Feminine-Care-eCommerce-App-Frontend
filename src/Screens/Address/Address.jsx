import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Contants/Colors";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CheckBox, Icon } from "@rneui/themed";
import UserServices from "../../Services/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";
import LoaderComponent from "../../Reuseable/LoaderComponent";

const Address = ({ navigation }) => {
  const [address, setAddress] = useState([]);
  const [customerId, setCustomerId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("customerId").then((value) => {
        getData(JSON.parse(value));
        setCustomerId(JSON.parse(value));
        TrackUserActivity(value, "Address Screen", "On Screen");
      });
    }, [navigation])
  );

  const getData = (customerId) => {
    UserServices.getAddress(customerId)
      .then((res) => {
        setAddress(res);
      })
      .catch((err) => console.log(err.message));
  };

  const handleStatus = (id) => {
    setIsLoading(true);
    const body = {
      userId: customerId,
      addressId: id,
    };
    UserServices.changeAddressStatus(body)
      .then((res) => {
        getData(customerId);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={
          address.length === 0
            ? styles.Screen
            : {
                flex: 1,
                backgroundColor: "transparent",
                justifyContent: "center",
                // alignItems: "center",
              }
        }
      >
        {isLoading ? (
          <>
            <LoaderComponent isModalVisible={isLoading} />
          </>
        ) : (
          <>
            {address.length === 0 ? (
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
              <ScrollView>
                <>
                  {address &&
                    address.map((el) => (
                      <View
                        key={el._id}
                        style={{
                          width: wp(90),
                          height: wp(40),
                          marginTop: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          alignSelf: "center",
                        }}
                      >
                        <BlurView
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            borderRadius: 20,
                            // backgroundColor: "rgba(255, 255, 255, 0.5)",
                            overflow:"hidden"
                          }}
                          blurType="light"
                          intensity={Platform.OS === "ios" ? 0 : 100}
                          borderWidth={1}
                          borderRadius={20}
                          borderColor={"#d2c9d0"}
                        />
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <View>
                            <View
                              style={{
                                marginLeft: 10,
                              }}
                            >
                              <Text
                                allowFontScaling={false}
                                style={{
                                  fontFamily: "Causten-Bold",
                                  fontSize: 16,
                                  marginBottom: 12,
                                  color: "#9b2890",
                                }}
                              >
                                {el.name}
                              </Text>
                              <Text
                                allowFontScaling={false}
                                style={{
                                  fontFamily: "Causten-Medium",
                                  fontSize: 14,
                                  marginBottom: 4,
                                  color: "#9b2890",
                                }}
                              >
                                {el.address}
                              </Text>
                              <Text
                                allowFontScaling={false}
                                style={{
                                  fontFamily: "Causten-Medium",
                                  fontSize: 14,
                                  color: "#9b2890",
                                }}
                              >
                                {el.city}, {el.country}
                              </Text>
                            </View>
                            <CheckBox
                              allowFontScaling={false}
                              title="Use as default shipping address"
                              onPress={() => handleStatus(el._id)}
                              checked={el.isDefault}
                              textStyle={{ color: "#9b2890" }}
                              checkedIcon={
                                <Icon
                                  name="done"
                                  type="material"
                                  color={Colors.White}
                                  size={15}
                                  iconStyle={{
                                    marginRight: 10,
                                    backgroundColor: "#9b2890",
                                    borderRadius: 7,
                                    paddingHorizontal: 6,
                                    paddingVertical: 6,
                                  }}
                                />
                              }
                              uncheckedIcon={
                                <Icon
                                  name="check-box-outline-blank"
                                  type="material"
                                  color={"transparent"}
                                  size={15}
                                  iconStyle={{
                                    marginRight: 0,
                                    borderWidth: 1,
                                    borderColor: "#9b2890",
                                    borderRadius: 10,
                                    paddingHorizontal: 6,
                                    paddingVertical: 6,
                                  }}
                                />
                              }
                              containerStyle={{
                                padding: 0,
                                margin: 0,
                                marginTop: 20,
                                backgroundColor: "transparent",
                              }}
                            />
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("EditAddress", { id: el._id })
                            }
                          >
                            <Text
                              allowFontScaling={false}
                              style={{
                                fontFamily: "Causten-Medium",
                                fontSize: 16,
                                color: "#9b2890",
                                marginBottom: 12,
                              }}
                            >
                              Edit
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                </>
              </ScrollView>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate("AddAddress")}
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginRight: wp(8),
                marginBottom: wp(5),
              }}
            >
              <AntDesign name="pluscircle" size={36} color={"#9b2890"} />
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Address;

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
