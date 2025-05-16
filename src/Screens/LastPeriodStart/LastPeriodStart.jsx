import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Colors from "../../Contants/Colors";
import UserServices from "../../Services/UserService";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LastPeriodStart = ({ navigation }) => {
  let initialDate = moment().format("DD/MM/YYYY");

  const [selected, setSelected] = useState(initialDate);
  const [customerID, setCustomerId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  console.log("isDisabled", isDisabled);

  useEffect(() => {
    if (moment(selected).isAfter(moment())) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false); // Make sure to reset disabled state if needed
    }
  }, [selected]);

  function getPrevMonth(currentMonth) {
    // Create a new Date object with the current month
    let prevMonth = new Date(currentMonth);

    // Set the date of the new Date object to 0 to get the last day of the previous month
    prevMonth.setDate(0);
    // Return the previous month
    return prevMonth;
  }

  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().split("T")[0]
  );

  const markedDates = {
    [selected]: {
      selected: true,
      disableTouchEvent: true,
      selectedColor: Colors.DateSelect,
      selectedTextColor: Colors.Black,
    },
  };

  useEffect(() => {
    const getCustomerID = async () => {
      try {
        const value = await AsyncStorage.getItem("customerId");
        // console.log("customerId", value);

        if (value !== null) {
          setCustomerId(JSON.parse(value));
          TrackUserActivity(value, "Last Period Start Screen", "On Screen");
        }
      } catch (error) {
        console.error("Error retrieving customer ID:", error);
      }
    };

    // Call getCustomerID once when the component mounts
    const interval = setInterval(() => {
      getCustomerID();
    }, 2000);

    // Clear any existing intervals when the component unmounts
    return () => clearInterval(interval);
  }, [navigation]);

  const onNextPress = () => {
    setIsLoading(true);
    const body = {
      customerId: customerID,
      startDate: moment(selected).format("DD/MM/YYYY"),
    };

    UserServices.addLastPeriodDate(body)
      .then((res) => {
        const data = {
          start_date: selected,
          user_id: customerID,
        };
        navigation.navigate("QuestionsOne");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  };

  const onSkipPress = () => {
    navigation.navigate("QuestionsOne");
  };

  const onDayPress = (day) => {
    console.log("day", day?.dateString);

    setSelected(day.dateString);
  };

  return (
    <>
      <LinearGradient
        colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0.6, y: 0.6 }}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.screen}>
          <View style={styles.headerContainer}>
            <Text allowFontScaling={false} style={styles.headerTextStyle}>
              When did your last period start?
            </Text>
          </View>
          <View
            style={{
              width: wp(100),
              height: hp(85),
              justifyContent: "space-around",
            }}
          >
            <Calendar
              theme={theme}
              markedDates={markedDates}
              current={getPrevMonth(currentMonth)}
              // Other props you want to pass
              hideArrows={true}
              enableSwipeMonths={false}
              disableArrowLeft={true}
              disableArrowRight={true}
              hideExtraDays={true}
              onDayPress={onDayPress}
            />
            <Calendar
              theme={theme}
              markedDates={markedDates}
              current={currentMonth}
              hideArrows={true}
              enableSwipeMonths={false}
              disableArrowLeft={true}
              disableArrowRight={true}
              hideExtraDays={true}
              onDayPress={onDayPress}
            />
          </View>
          <View style={{ flexGrow: 0.8 }}>
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={onSkipPress}
              >
                <Text allowFontScaling={false} style={styles.buttonText}>
                  Skip
                </Text>
              </TouchableOpacity>
              {isLoading ? (
                <View style={styles.buttonStyle}>
                  <ActivityIndicator size="large" color="#9E1A97" />
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={onNextPress}
                    disabled={isDisabled}
                  >
                    <Text allowFontScaling={false} style={styles.buttonText}>
                      Next
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default LastPeriodStart;

const theme = {
  "stylesheet.calendar.header": {
    dayHeader: {
      color: "#9b2890",
      fontSize: 18,
      fontFamily: "Causten-Regular",
    },
  },
  "stylesheet.day.basic": {
    todayText: {
      color: "#9b2890",
      fontWeight: "700",
    },
  },
  calendarBackground: "transparent",
  dayTextColor: "#9b2890",
  monthFormat: "MMMM",
  textDayFontFamily: "Causten-Regular",
  textMonthFontFamily: "Causten-Bold",
  arrowColor: "#000000",
  textSectionTitleColor: "#9b2890",
  textSectionTitleDisabledColor: "#9b2890",
  textMonthFontSize: 24,
  monthTextColor: "#9b2890",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  headerContainer: {
    justifyContent: "center",
    paddingTop: 50,
    alignItems: "center",
  },
  headerTextStyle: {
    fontFamily: "Causten-Medium",
    fontSize: 20,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
    paddingBottom: 10,
  },
  buttonStyle: {
    width: "25%",
    alignItems: "center",
    padding: 1,
  },
  buttonText: {
    fontSize: 22,
    color: Colors.Black,
    fontFamily: "Causten-Regular",
  },
});
