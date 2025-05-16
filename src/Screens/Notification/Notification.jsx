import {
  Image,
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../Contants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import UserServices from "../../Services/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";
import { useNavigation } from "@react-navigation/native";

const Notification = ({ navigation }) => {
  const [getAllNotifications, setGetAllNotifications] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("customerId").then((value) => {
      GetNotification(JSON.parse(value));
      TrackUserActivity(value, "Notification Screen", "On Screen");
    });
    setTimeout(() => {}, 2000);
  }, [navigation]);

  const GetNotification = (customerId) => {
    UserServices.getUserNotification(customerId)
      .then((res) => {
        const result = res;
        var notificationArr = [];
        result.forEach((element) => {
          notificationArr.push(element);
        });
        setGetAllNotifications(notificationArr);
      })
      .catch((err) => console.log(err.message));
  };

  // console.log(getAllNotifications[0]);

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.screen}>
        {getAllNotifications.length > 0 ? (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {getAllNotifications?.map((el) => (
              <View style={styles.notificationContainer}>
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
                    overflow: "hidden",
                  }}
                  blurType="light"
                  intensity={Platform.OS === "ios" ? 0 : 100}
                  borderWidth={1}
                  borderRadius={20}
                  borderColor={"#d2c9d0"}
                />
                <Image
                  source={require("../../../assets/resources/profile.png")}
                  style={styles.notificationImage}
                />
                <View>
                  <Text allowFontScaling={false} style={styles.Heading}>
                    {el.message}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 14,
                fontFamily: "Causten-Medium",
                textTransform: "capitalize",
                color: "#9b2890",
              }}
            >
              No Notifications Found
            </Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Notification;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  notificationContainer: {
    backgroundColor: "transparent",
    width: wp("90%"),
    height: hp("10%"),
    borderRadius: 10,
    paddingLeft: wp(5),
    alignItems: "center",
    flexDirection: "row",
    marginTop: wp(3),
  },
  notificationImage: {
    width: wp("15%"),
    height: wp("15%"),
    resizeMode: "contain",
    marginRight: wp(2),
  },
  Heading: {
    fontFamily: "Causten-Regular",
    fontSize: 15,
    color: "#9b2890",
  },
  description: {
    fontFamily: "Causten-Medium",
    fontSize: 14,
  },
});
