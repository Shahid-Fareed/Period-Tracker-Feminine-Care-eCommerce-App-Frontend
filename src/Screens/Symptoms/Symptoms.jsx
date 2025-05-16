import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../../Contants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import UserServices from "../../Services/UserService";
import Stories from "../../Packages/react-native-stories-media";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Entypo } from "@expo/vector-icons";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";
import { Modal } from "react-native";
import LoaderComponent from "../../Reuseable/LoaderComponent";

const Symptoms = ({ route, navigation }) => {
  const { title, date } = route.params;
  const [SymptomsList, setSymptomsList] = useState([]);
  const [customerID, setCustomerId] = useState(null);
  const [token, setToken] = useState("");
  const [expToken, setExpoToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({ title });
    AsyncStorage.getItem("expoPushToken").then((value) => {
      setExpoToken(JSON.parse(value));
    });
  }, [navigation]);

  const getData = useCallback(() => {
    setIsLoading(true);
    UserServices.getSymptoms()
      .then((res) => {
        const result = res;
        var categoryNames = [];
        result.forEach((element) => {
          categoryNames.push(element.categoryName);
        });
        uniqueMoods = [];
        let uniqueMoods = [...new Set(categoryNames)];

        var innerSysmtomsArrayToPrint = [];

        uniqueMoods.forEach((element) => {
          var innerSysmtomsArray = result.filter(
            (x) => x.categoryName == element
          );

          if (innerSysmtomsArray.length > 0) {
            innerSysmtomsArray.forEach((element1) => {
              var imgDataArr = [];
              element1.bulkImage.forEach((imgData) => {
                imgDataArr.push({
                  subCategoryId: imgData.subCategoryId,
                  id: imgData.subCategoryId,
                  url: imgData.imageUrl,
                  type: "image",
                  duration: 2,
                  isReadMore: true,
                  url_readmore: imgData.imageUrl,
                  created: "2021-01-07T03:24:00",
                });
              });
              innerSysmtomsArrayToPrint.push({
                username: element1.categoryName,
                title: element1.name,
                profile: element1.imageUrl,

                stories: imgDataArr,
              });
            });
          }
        });
        var storyData = [];
        uniqueMoods.forEach((element) => {
          var innerSysmtomsArray = innerSysmtomsArrayToPrint.filter(
            (x) => x.username == element
          );
          storyData.push({
            symptomCategory: element,
            dataArr: innerSysmtomsArray,
          });
        });
        setSymptomsList(storyData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const getCustomerID = async () => {
      const value = await AsyncStorage.getItem("customerId");
      TrackUserActivity(value, "Symptom Screen", "ON-Screen");
      if (value !== null) {
        setCustomerId(JSON.parse(value));
      }
    };
    getCustomerID();
  }, [navigation]);

  console.log("expToken", expToken);

  const handleOnPressSymtoms = (item) => {
    // console.log("hiw");

    const data = {
      current_date: moment(date).format("YYYY-MM-DD"),
      sympton: item.title,
      token: expToken,
    };
    UserServices.MarkSymptoms(customerID, data)
      .then((res) => {
        // showToast("success", "Symptom marked");
        console.log("hello");
      })
      .catch((err) => {
        console.log(err.message);
        // console.log("bye");
        // showToast("error", "Symptom not marked");
      });
  };

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={{ ...styles.rectangularContainer1 }}>
        <BlurView
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            borderRadius: 20,
            // backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderColor: "#fff",
            overflow: "hidden",
          }}
          blurType="light"
          intensity={Platform.OS === "ios" ? 0 : 60}
          borderWidth={0.4}
          borderRadius={20}
          borderColor={"#d2c9d0"}
        />
        <Text
          allowFontScaling={false}
          style={{
            ...styles.textStyleMedium,
            paddingHorizontal: 20,
            paddingTop: 10,
            // paddingBottom: 5,
          }}
        >
          {item.symptomCategory}
        </Text>

        <Stories
          data={item.dataArr}
          handleOnPressSymtoms={(data) => handleOnPressSymtoms(data)}
        />

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Entypo name="dots-three-horizontal" size={24} color="#9b2890" />
        </View>
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
        <Modal
          animationType="fade"
          transparent={true}
          visible={isLoading}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <LoaderComponent isModalVisible={isLoading} />
          </View>
        </Modal>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={SymptomsList}
          renderItem={renderItem}
          focusable={true}
          keyExtractor={(item) => item.symptomCategory}
          style={{ flexGrow: 0 }}
        />
        {/* <Toast /> */}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Symptoms;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  rectangularContainer1: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: wp(5),
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  textStyleMedium: {
    fontSize: 18,
    color: "#9b2890",
    fontFamily: "Causten-Bold",
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});
