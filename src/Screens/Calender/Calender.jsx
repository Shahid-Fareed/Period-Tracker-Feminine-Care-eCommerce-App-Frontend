import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import UserServices from "../../Services/UserService";
import MyCalendar from "./MyCalendar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";

const Calender = () => {
  const navigation = useNavigation();

  const [userUniqueName, setUserUniqueName] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [myCycles, setMyCycles] = useState([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("customerId").then((value) => {
        setUserUniqueName(JSON.parse(value));
        getData(JSON.parse(value));
        TrackUserActivity(value, "Calender Screen", "On Screen");
      });
    }, [navigation])
  );

  const getData = (name) => {
    UserServices.nextCycle(name)
      .then((res) => {
        setMyCycles(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <MyCalendar
        cycles={myCycles}
        navigation={navigation}
        userUniqueName={userUniqueName}
        getData={getData}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default Calender;
