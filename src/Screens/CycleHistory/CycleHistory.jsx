import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Contants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CircleAndNameComponent from "../../Reuseable/CircleAndNameComponent";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import MyCycleTopTabs from "../../Reuseable/MyCycleTopTabs";
import UserServices from "../../Services/UserService";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";
import LoaderComponent from "../../Reuseable/LoaderComponent";

const CycleHistory = ({ navigation }) => {
  const [uniqueKey, setUniqueKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [screen, setScreen] = useState("all");
  const setListTitle = (titleToSet) => {
    setScreen(titleToSet);
  };
  const [myCycleAllData, setMyCycleAllData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(true);
  const [cycleColors, setCycleColors] = useState([
    { id: 1, backgroundColor: "#f7a79c" },
    { id: 2, backgroundColor: "#f7a79c" },
    { id: 3, backgroundColor: "#f7a79c" },
    { id: 4, backgroundColor: "#f7a79c" },
    { id: 5, backgroundColor: "#f7a79c" },
    { id: 6, backgroundColor: Colors.lightGray },
    { id: 7, backgroundColor: Colors.lightGray },
    { id: 8, backgroundColor: Colors.lightGray },
    { id: 9, backgroundColor: Colors.lightGray },
    { id: 10, backgroundColor: "#f6a7c7" },
    { id: 11, backgroundColor: "#f6a7c7" },
    { id: 12, backgroundColor: "#d8a9d3" },
    { id: 13, backgroundColor: "#f6a7c7" },
    { id: 14, backgroundColor: "#f6a7c7" },
    { id: 15, backgroundColor: Colors.lightGray },
    { id: 16, backgroundColor: Colors.lightGray },
    { id: 17, backgroundColor: Colors.lightGray },
    { id: 18, backgroundColor: Colors.lightGray },
    { id: 19, backgroundColor: Colors.lightGray },
    { id: 20, backgroundColor: Colors.lightGray },
    { id: 21, backgroundColor: Colors.lightGray },
    { id: 22, backgroundColor: Colors.lightGray },
    { id: 23, backgroundColor: Colors.lightGray },
    { id: 24, backgroundColor: Colors.lightGray },
    { id: 25, backgroundColor: Colors.lightGray },
    { id: 26, backgroundColor: Colors.lightGray },
    { id: 27, backgroundColor: Colors.lightGray },
    { id: 28, backgroundColor: Colors.lightGray },
  ]);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("customerId").then((value) => {
        setUniqueKey(JSON.parse(value));
        MyCycleData(JSON.parse(value));
        TrackUserActivity(value, "Cycle History Screen", "On Screen");
      });
    }, [navigation])
  );

  const MyCycleData = (uniqueKey) => {
    setModalVisible(true);
    setIsLoading(true);
    UserServices.GetCycleHistory(uniqueKey)
      .then((res) => {
        const result = res;
        setMyCycleAllData([]);
        var dataArr = [];
        result.forEach((element) => {
          dataArr.push(element);
        });
        setMyCycleAllData(dataArr);
        setModalVisible(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setModalVisible(false);
        setIsLoading(false);
      });
  };
  const MyCycleLastThreeData = (uniqueKey) => {
    setModalVisible(true);
    UserServices.GetCycleHistoryLastThree(uniqueKey)
      .then((res) => {
        setMyCycleAllData([]);
        const result = res;

        var dataArr = [];
        result.forEach((element) => {
          dataArr.push(element);
        });
        var lastThreeArr = dataArr.slice(0, 3);

        setMyCycleAllData(lastThreeArr);
        setModalVisible(false);
      })
      .catch((error) => {
        setModalVisible(false);
      });
  };
  const handleOnPress = (item) => {
    return navigation.navigate("CycleDetail", {
      itemData: item,
      cycleColors: cycleColors,
    });
  };

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.screen}>
        {isLoading ? (
          <LoaderComponent isModalVisible={isLoading} />
        ) : (
          <>
            <MyCycleTopTabs
              activeData={() => {
                setListTitle("all");
              }}
              archivedData={() => {
                setListTitle("last3Cycle");
              }}
              MyCycleLastThreeData={() => MyCycleLastThreeData(uniqueKey)}
              MYCycleAllData={() => MyCycleData(uniqueKey)}
            />

            <ScrollView>
              <View style={styles.rectangularContainer}>
                <BlurView
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderRadius: 20,
                    overflow: "hidden",
                  }}
                  blurType="light"
                  borderWidth={1}
                  borderRadius={20}
                  borderColor={"#fff"}
                />
                <View style={styles.dotNameContainer}>
                  <CircleAndNameComponent
                    dotColor={"#f7a79c"}
                    text={"Period"}
                  />
                  <CircleAndNameComponent
                    dotColor={"#f6a7c7"}
                    text={"Fertile Window"}
                  />
                  <CircleAndNameComponent
                    dotColor={"#d8a9d3"}
                    text={"Ovulation"}
                  />
                </View>

                <Text allowFontScaling={false} style={styles.textStyle}>
                  {moment(new Date()).format("YYYY")}
                </Text>

                <View style={styles.borderStyle} />

                {myCycleAllData.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.7}
                    style={{ margin: 20, marginBottom: 0 }}
                    onPress={() => handleOnPress(item)}
                  >
                    <BlurView
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        borderRadius: 20,
                        overflow: "hidden",
                        borderWidth: 0.5,
                        borderColor: "#fff",
                      }}
                      blurType="light"
                      intensity={Platform.OS === "ios" ? 0 : 100}
                      borderWidth={0.5}
                      borderRadius={20}
                      borderColor={"#fff"}
                    />
                    <View
                      style={{
                        flexDirection: "column",
                        padding: 10,
                        paddingHorizontal: 15,
                      }}
                    >
                      {item.is_current === 1 ? (
                        <View style={styles.container}>
                          <Text
                            allowFontScaling={false}
                            style={styles.textStyle1}
                          >
                            Current Cycle: {item.cycleDay} days
                          </Text>
                          <Feather
                            name="chevron-right"
                            color={"#9b2890"}
                            size={26}
                          />
                        </View>
                      ) : (
                        <View style={styles.container}>
                          <Text
                            allowFontScaling={false}
                            style={styles.textStyle1}
                          >
                            {item.cycleDay} days
                          </Text>
                          <Feather
                            name="chevron-right"
                            color={"#9b2890"}
                            size={26}
                          />
                        </View>
                      )}
                      {item.is_current === 1 ? (
                        <Text
                          allowFontScaling={false}
                          style={styles.textStyleMedium}
                        >
                          Started {""}
                          {moment(item.last_Mens_Start).format("MMM DD")}
                        </Text>
                      ) : (
                        <Text
                          allowFontScaling={false}
                          style={styles.textStyleMedium}
                        >
                          {moment(item.last_Mens_Start).format("MMM DD")}
                          {" - "}
                          {moment(item.last_Mens_End).format("MMM DD")}
                        </Text>
                      )}

                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                          flexDirection: "row",
                          marginVertical: wp(2),
                        }}
                      >
                        {cycleColors.map((item, i) => (
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
                    <View style={styles.borderStyle} />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CycleHistory;

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
  },
  rectangularContainer1: {
    flexDirection: "column",
    margin: wp(5),
    paddingVertical: wp(3),
    padding: 12,
    backgroundColor: Colors.White,
    borderRadius: 8,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  rectangularContainer2: {
    flexDirection: "column",
    margin: wp(5),
    paddingBottom: wp(3),
    backgroundColor: Colors.White,
    borderRadius: 8,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
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
    color: "#9b2890",
    fontFamily: "Causten-Medium",
  },
  textStyle1: {
    fontSize: 16,
    color: "#9b2890",
    fontFamily: "Causten-Bold",
  },
  borderStyle: {
    height: 0.5,
    backgroundColor: "#fff",
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
