import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserServices from "../../Services/UserService";
import Colors from "../../Contants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from "moment";
import CycleDetailCard from "../../Reuseable/CycleDetailCard";
import IconWithText from "../../Reuseable/IconWithText";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const RANGE = 1;
const initialDate = new Date();

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
};

LocaleConfig.defaultLocale = "en";

const CustomHeader = ({ month }) => {
  return (
    <View style={{}}>
      <View
        style={{
          alignItems: "center",
          borderBottomWidth: 0.4,
          width: wp(90),
          paddingBottom: 10,
          borderBottomColor: "white",
        }}
      >
        <Text
          allowFontScaling={false}
          style={{ color: "#9b2890", fontSize: 22, fontFamily: "Causten-Bold" }}
        >
          {month}
        </Text>
      </View>
    </View>
  );
};

const CycleDetail = ({ route, navigation }) => {
  const [customerId, setCustomerId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cycleData, setCycleData] = useState(route.params.itemData);
  const [focusDate, setFocusDate] = useState("");
  const [date, setDate] = useState(new Date());
  const [markedSymptoms, setMarkedSymptoms] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);
  const [selectedMarked, setSelectedMarked] = useState(null);
  const [selected, setSelected] = useState(cycleData.last_Mens_Start);

  const [status, setStatus] = useState("");

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("customerId").then((value) => {
        setCustomerId(JSON.parse(value));
        getSymptomData(JSON.parse(value));
        TrackUserActivity(value, "Cycle Detail Screen", "On Screen");
      });

      const diff =
        moment(cycleData.last_Mens_End).diff(
          moment(cycleData.last_Mens_Start),
          "days"
        ) + 1;

      if (diff >= 2 || diff <= 5) {
        setStatus("Normal");
      } else {
        setStatus("Abnormal");
      }
    }, [navigation])
  );

  const getSymptomData = (customerId) => {
    UserServices.symptonsDates(customerId)
      .then((res) => {
        // setMarkedDates(res.data);
        const markedDatesObj = {};
        let datesToMark = res.data;

        datesToMark.forEach((date) => {
          markedDatesObj[date] = {
            color: "#FA89BA",
            selected: true,
            textColor: Colors.Black,
            startingDay: true,
            endingDay: true,
          };
        });

        setMarkedDates(markedDatesObj);
      })
      .catch((err) => console.log(err.message));
  };

  const onDayPress = (day) => {
    const body2 = {
      current_date: day,
    };
    UserServices.ShowSymptom(customerId, body2)
      .then((res) => {
        setMarkedSymptoms(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        activeOpacity={0.6}
        style={{
          marginRight: 5,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Image
          source={{ uri: item?.imageUrl }}
          style={{
            width: wp(13),
            height: wp(13),
            resizeMode: "contain",
            marginVertical: 5,
            marginTop: 10,
          }}
        />
        <Text
          allowFontScaling={false}
          style={{
            ...styles.textStyleLight,
            fontFamily: "Causten-Medium",
            color: "#9b2890",
          }}
        >
          {item?.subCategoryName}
        </Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.screen}>
        <ScrollView>
          <View style={styles.rectangularContainer1}>
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
              borderWidth={0.5}
              borderRadius={20}
              borderColor={"#fff"}
            />
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 16,
                fontFamily: "Causten-Bold",
                color: "#9b2890",
              }}
            >
              {moment(cycleData.last_Mens_Start).format("MMM DD")}
              {" - "}
              {moment(cycleData.last_Mens_End).format("MMM DD")}
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: "row",
                marginVertical: wp(2),
              }}
            >
              {route.params.cycleColors.map((item, i) => (
                <View
                  key={i}
                  style={[
                    styles.circleStyle,
                    { backgroundColor: item.backgroundColor },
                  ]}
                />
              ))}
            </ScrollView>
          </View>

          <CycleDetailCard
            topHeading={"Cycle length"}
            days={cycleData.cycleDay + " days"}
            not={cycleData.cycle_type == "normal" ? "" : "not "}
            report={cycleData.cycle_type}
            status={cycleData.cycle_type}
          />

          <View style={styles.rectangularContainer2}>
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
              borderWidth={0.5}
              borderRadius={20}
              borderColor={"#fff"}
            />
            <View style={{ padding: 15 }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 16,
                  fontFamily: "Causten-Bold",
                  color: "#9b2890",
                }}
              >
                Period length
              </Text>

              <View style={styles.container}>
                <Text allowFontScaling={false} style={styles.textStyle1}>
                  {moment(cycleData.last_Mens_End).diff(
                    moment(cycleData.last_Mens_Start),
                    "days"
                  ) + 1}
                </Text>
                <Text allowFontScaling={false} style={styles.textStyleMedium}>
                  {status}
                </Text>
              </View>
            </View>
            <View style={styles.borderStyle} />
            <View style={{ padding: 15 }}>
              {status == "Normal" ? (
                <>
                  <Text allowFontScaling={false} style={styles.textStyleMedium}>
                    Your period length is{" "}
                    <Text
                      allowFontScaling={false}
                      style={{ fontFamily: "Causten-Bold" }}
                    >
                      within the normal
                    </Text>{" "}
                    medical range (2-7) days
                  </Text>
                </>
              ) : (
                <>
                  <Text allowFontScaling={false} style={styles.textStyleMedium}>
                    Your period length is not{" "}
                    <Text
                      allowFontScaling={false}
                      style={{ fontFamily: "Causten-Bold" }}
                    >
                      within the normal
                    </Text>{" "}
                    medical range (2-7) days
                  </Text>
                </>
              )}
            </View>
          </View>

          {cycleData.cycle_type == "normal" ? (
            <View style={styles.rectangularContainer1}>
              <IconWithText
                text={
                  "Your period lasted from " +
                  moment(cycleData.last_Mens_Start).format("MMM DD, YYYY") +
                  " to " +
                  moment(cycleData.last_Mens_Start)
                    .add(4, "days")
                    .format("MMM DD, YYYY")
                }
                imageUrl={require("../../../assets/resources/group_201.png")}
              />
              <IconWithText
                text={
                  "It’s likely for your fertile window to have lasted from " +
                  moment(cycleData.last_Mens_Start)
                    .add(9, "d")
                    .format("MMM DD, YYYY") +
                  " to " +
                  moment(cycleData.last_Mens_Start)
                    .add(13, "d")
                    .format("MMM DD, YYYY")
                }
                imageUrl={require("../../../assets/resources/group_40.png")}
              />
              <IconWithText
                text={
                  "You most likely ovulated on " +
                  moment(cycleData.last_Mens_Start)
                    .add(11, "d")
                    .format("MMM DD, YYYY")
                }
                imageUrl={require("../../../assets/resources/group_41.png")}
              />
            </View>
          ) : null}

          <View style={{ height: wp(84), backgroundColor: "transparent" }}>
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
                borderColor: "#ffff",
              }}
              blurType="light"
              intensity={Platform.OS === "ios" ? 0 : 100}
              borderWidth={0.5}
              borderRadius={20}
              borderColor={"#d2c9d0"}
            />
            <CalendarList
              current={focusDate == "" ? date : focusDate}
              renderHeader={(date) => (
                <CustomHeader month={date.toString("MMMM")} />
              )}
              pastScrollRange={RANGE}
              calendarHeaderStyle={{ fontSize: 30 }}
              futureScrollRange={RANGE}
              hideArrows={true}
              hideDayNames={false}
              theme={theme}
              onDayPress={(day1) => {
                onDayPress(day1.dateString);
              }}
              markedDates={markedDates}
              showWeekNumbers={false}
              enableSwipeMonths={true}
              markingType={"period"}
              monthFormat={"MMMM"}
            />
          </View>
        </ScrollView>
        {markedSymptoms.length > 0 && (
          <View
            style={{
              backgroundColor: Colors.Grey,
              padding: 10,
              paddingHorizontal: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{ ...styles.textStyleLight, textAlign: "left" }}
              >
                {moment(selected).format("MMMM DD")}
              </Text>
              <TouchableOpacity onPress={() => setMarkedSymptoms([])}>
                <Image
                  source={require("../../../assets/resources/cancel.png")}
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={markedSymptoms}
              renderItem={renderItem}
              focusable={true}
              keyExtractor={(item) => item.id}
              style={{ marginTop: 0 }}
            />
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CycleDetail;

const theme = {
  "stylesheet.calendar.header": {
    dayHeader: {
      color: "#9b2890",
      fontSize: 16,
      fontFamily: "Causten-Regular",
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
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  rectangularContainer: {
    flexDirection: "column",
    margin: wp(5),
    backgroundColor: "transparent",
    borderRadius: 8,
    paddingBottom: wp(10),
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  rectangularContainer1: {
    flexDirection: "column",
    margin: wp(5),
    paddingVertical: wp(3),
    padding: 12,
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  rectangularContainer2: {
    flexDirection: "column",
    margin: wp(5),
    paddingBottom: wp(3),
    backgroundColor: "transparent",
  },
  dotNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  textStyle: {
    fontSize: 18,
    color: "#9b2890",
    fontFamily: "Causten-Medium",
    paddingHorizontal: 15,
    padding: 10,
  },
  textStyleMedium: {
    fontSize: 14,
    fontFamily: "Causten-Medium",
    color: "#9b2890",
  },
  textStyle1: {
    fontSize: 16,
    color: "#9b2890",
    fontFamily: "Causten-Bold",
  },
  borderStyle: {
    height: 0.5,
    backgroundColor: Colors.lightGrey,
  },
  circleStyle: {
    height: wp(2.8),
    width: wp(2.8),
    borderRadius: 100,
    marginRight: 1,
    backgroundColor: Colors.lightGrey,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: wp(2),
  },
  textStyleLight: {
    fontSize: 12,
    color: "#9b2890",
    fontFamily: "Causten-Medium",
    textAlign: "center",
  },
  imageStyle: {
    width: wp(15),
    height: wp(15),
    resizeMode: "contain",
  },
});
