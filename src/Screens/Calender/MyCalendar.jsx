import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../../Contants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFocusEffect } from "@react-navigation/native";
import CircleAndNameComponent from "../../Reuseable/CircleAndNameComponent";
import { CalendarList } from "react-native-calendars";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserServices from "../../Services/UserService";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import LoaderComponent from "../../Reuseable/LoaderComponent";

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
          style={{ color: "#9b2890", fontSize: 22, fontFamily: "Causten-Bold" }}
          allowFontScaling={false}
        >
          {month}
        </Text>
      </View>
    </View>
  );
};

const MyCalendar = (props) => {
  const {
    cycles,
    navigation,
    userUniqueName,
    getData,
    isModalVisible,
    setModalVisible,
  } = props;
  const [isEditPeriodPressed, setIsEditPeriodPressed] = useState(false);
  const [selectedPeriodDate, setSelectedPeriodDate] = useState(null);
  const [dateIndex, setDateIndex] = useState(0);
  const [dateRange, setDateRange] = useState([]);
  const [markedSymptoms, setMarkedSymptoms] = useState([]);
  const [focusMonth, setFocusMonth] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [DateSelected, setDateSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsEditPeriodPressed(false);
      getData(userUniqueName);
      setModalVisible(true);
      // setIsLoading(false);

      AsyncStorage.getItem("customerId").then((value) => {
        setCustomerId(JSON.parse(value));
      });
    }, [navigation])
  );

  useEffect(() => {
    setIsLoading(false);
    setModalVisible(false);
  }, [navigation]);

  setTimeout(() => {
    setIsLoading(false);
    setModalVisible(false);
  }, 2000);

  let markedDates = {};
  cycles.forEach((cycle) => {
    let ovulationStart = moment(cycle.ovulation_start_date);
    let ovulationEnd = moment(cycle.ovulation_end_date);
    let bleedingStart = moment(cycle.bleed_start_date);
    let bleedingEnd = moment(cycle.bleed_end_date);
    let OvolutionDate = moment(cycle.ovulation_date);

    while (ovulationStart <= ovulationEnd) {
      markedDates[ovulationStart.format("YYYY-MM-DD")] = {
        color:
          ovulationStart.format("YYYY-MM-DD") ===
          OvolutionDate.format("YYYY-MM-DD")
            ? "#d7a8d2"
            : "#f6a7c7",
        selected: true,
        textColor: "#9b2890",
        startingDay: ovulationStart ? true : false,
        endingDay: ovulationEnd ? true : false,
      };
      ovulationStart.add(1, "days");
    }
    while (bleedingStart <= bleedingEnd) {
      markedDates[bleedingStart.format("YYYY-MM-DD")] = {
        color: "#f7a79c",
        selected: true,
        textColor: "#9b2890",
        startingDay: bleedingStart ? true : false,
        endingDay: bleedingEnd ? true : false,
      };
      bleedingStart.add(1, "days");
    }

    cycle?.symptons?.forEach((symptom) => {
      let color = "";

      const ovulationStart = moment(cycle.ovulation_start_date).format(
        "YYYY-MM-DD"
      );
      const ovulationEnd = moment(cycle.ovulation_end_date).format(
        "YYYY-MM-DD"
      );
      const bleedingStart = moment(cycle.bleed_start_date).format("YYYY-MM-DD");
      const bleedingEnd = moment(cycle.bleed_end_date).format("YYYY-MM-DD");
      const ovulationDate = moment(cycle.ovulation_date).format("YYYY-MM-DD");
      const symptomDate = moment(symptom).format("YYYY-MM-DD");

      if (symptomDate === ovulationDate) {
        color = "#d7a8d2";
      } else if (
        moment(symptomDate).isSameOrAfter(bleedingStart) &&
        moment(symptomDate).isSameOrBefore(bleedingEnd)
      ) {
        color = "#f7a79c";
      } else if (
        moment(symptomDate).isSameOrAfter(ovulationStart) &&
        moment(symptomDate).isSameOrBefore(ovulationEnd)
      ) {
        color = "#f6a7c7";
      } else {
        color = "";
      }

      markedDates[symptom] = {
        marked: true,
        dotColor: Colors.SecondaryOne,
        color: color,
        startingDay: true,
        endingDay: true,
      };
    });
  });

  const onToggle = () => {
    onDayPress(moment().format("YYYY-MM-DD"));
  };

  const onDayPress = (day) => {
    const body = {
      customerId: customerId,
      date: day,
    };
    UserServices.PeriodDateChecker(body)
      .then((res) => {
        if (res) {
          setSelectedPeriodDate(moment(day).format("Do MMMM") + "-" + res);
          setDateSelected(moment(day).format("YYYY-MM-DD"));
        } else {
          setSelectedPeriodDate(moment(day).format("Do MMMM"));
          setDateSelected(moment(day).format("YYYY-MM-DD"));
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
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
    setIsEditPeriodPressed(true);
  };

  const renderItem = ({ item, index }) => {
    return (
      <>
        <View
          activeOpacity={0.6}
          style={{
            alignItems: "center",
            flexDirection: "column",
            marginLeft: wp(2),
          }}
        >
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: wp(10),
              height: wp(10),
              resizeMode: "contain",
              marginVertical: 5,
            }}
          />
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: "Causten-Regular",
              color: "#9b2890",
              fontSize: 14,
            }}
          >
            {item.subCategoryName}
          </Text>
        </View>
      </>
    );
  };

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "transparent",
        }}
      >
        {isLoading ? (
          <>
            <LoaderComponent isModalVisible={isLoading} />
          </>
        ) : (
          <>
            <View style={{ flex: 1 }}>
              <View style={styles.dotNameContainer}>
                <CircleAndNameComponent dotColor={"#f7a79c"} text={"Period"} />
                <CircleAndNameComponent
                  dotColor={"#f6a7c7"}
                  text={"Fertile Window"}
                />
                <CircleAndNameComponent
                  dotColor={"#d8a9d3"}
                  text={"Ovulation"}
                />
              </View>
              <View style={{ flex: 1, backgroundColor: "transparent" }}>
                <CalendarList
                  theme={theme}
                  renderHeader={(date) => (
                    <CustomHeader month={date.toString("MMMM")} />
                  )}
                  current={focusMonth}
                  key={focusMonth}
                  markedDates={markedDates}
                  markingType={"period"}
                  calendarHeaderStyle={{ fontSize: 30 }}
                  onDayPress={(day1) => {
                    onDayPress(day1.dateString);
                  }}
                />
              </View>
            </View>
            {isEditPeriodPressed ? (
              <View
                style={
                  DateSelected > moment().format("YYYY-MM-DD")
                    ? styles.BottomContainerOpenCheck
                    : styles.BottomContainerOpen
                }
              >
                <BlurView
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderColor: "#fff",
                    borderTopWidth: 1,
                    borderRightWidth: 1,
                    borderLeftWidth: 1,
                    overflow: "hidden",
                  }}
                  blurType="light"
                  intensity={Platform.OS === "ios" ? 0 : 90}
                />
                <View style={{ alignItems: "center" }}>
                  <View style={styles.BottomInnerContainerOpen}>
                    <Text
                      allowFontScaling={false}
                      style={styles.BottomTextOpen}
                    >
                      Mark Symptoms
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: wp("100%"),
                  }}
                >
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: Colors.lightGrey,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginLeft: wp("10%"),
                      marginRight: wp("10%"),
                      paddingTop: wp("4%"),
                      paddingBottom: wp("4%"),
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontFamily: "Causten-SemiBold",
                        fontSize: 16,
                        color: "#9b2890",
                      }}
                    >
                      {selectedPeriodDate}
                    </Text>

                    <TouchableOpacity
                      onPress={() => setIsEditPeriodPressed(false)}
                    >
                      <AntDesign
                        name="closecircleo"
                        size={20}
                        color="#9b2890"
                      />
                    </TouchableOpacity>
                  </View>

                  {DateSelected > moment().format("YYYY-MM-DD") ? null : (
                    <>
                      {markedSymptoms?.length > 0 ? (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginLeft: wp("10%"),
                            marginRight: wp("10%"),
                            alignItems: "center",
                          }}
                        >
                          <View style={{ width: wp("65%") }}>
                            <FlatList
                              showsHorizontalScrollIndicator={false}
                              horizontal
                              data={markedSymptoms}
                              renderItem={renderItem}
                              focusable={true}
                              keyExtractor={(item) => item.id}
                            />
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("Symptoms", {
                                title: selectedPeriodDate,
                                date: DateSelected,
                              })
                            }
                          >
                            <AntDesign
                              name="pluscircleo"
                              size={20}
                              color="#9b2890"
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginLeft: wp("10%"),
                            marginRight: wp("10%"),
                            paddingTop: wp("4%"),
                            paddingBottom: wp("4%"),
                            marginTop: wp("5%"),
                          }}
                        >
                          <View style={{ width: wp("70%") }}>
                            <Text
                              allowFontScaling={false}
                              style={{
                                fontFamily: "Causten-SemiBold",
                                fontSize: 16,
                                color: "#9b2890",
                              }}
                            >
                              Add symptoms, moods
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("Symptoms", {
                                title: selectedPeriodDate,
                                date: DateSelected,
                              })
                            }
                          >
                            <AntDesign
                              name="pluscircleo"
                              size={20}
                              color="#9b2890"
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </>
                  )}
                </View>
              </View>
            ) : (
              <View style={styles.BottomContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.BottomInnerContainer}
                  onPress={onToggle}
                >
                  <Text allowFontScaling={false} style={styles.BottomText}>
                    Mark Symptoms
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MyCalendar;

const theme = {
  "stylesheet.calendar.header": {
    dayHeader: {
      color: "#9b2890",
      fontSize: 16,
      fontFamily: "Causten-Regular",
    },
  },
  "stylesheet.day.basic": {
    // today: {
    //   backgroundColor: "#9b2890",
    // },
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
};

const styles = StyleSheet.create({
  dotNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    width: wp(80),
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 10,
    height: wp(8),
  },
  BottomContainer: {
    alignItems: "center",
  },
  BottomInnerContainer: {
    backgroundColor: "#9b2890",
    alignItems: "center",
    justifyContent: "center",
    width: wp("40%"),
    height: hp("4%"),
    borderRadius: 10,
    marginBottom: wp(2),
  },
  BottomText: {
    fontFamily: "Causten-Medium",
    fontSize: 14,
    color: Colors.White,
  },
  BottomContainerOpen: {
    backgroundColor: "transparent",
    width: wp("100%"),
    height: hp("20%"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  BottomContainerOpenCheck: {
    backgroundColor: "transparent",
    width: wp("100%"),
    height: hp("10%"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  BottomInnerContainerOpen: {
    backgroundColor: "#9b2890",
    alignItems: "center",
    justifyContent: "center",
    width: wp("40%"),
    height: hp("4%"),
    borderRadius: 10,
    marginTop: wp(-3),
  },
  BottomTextOpen: {
    fontFamily: "Causten-Medium",
    fontSize: 14,
    color: Colors.White,
  },
});
