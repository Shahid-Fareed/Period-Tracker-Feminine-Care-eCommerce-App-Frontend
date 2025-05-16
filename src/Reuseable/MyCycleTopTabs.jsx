import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "../Contants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MyCycleTopTabs = ({
  activeData,
  archivedData,
  MyCycleLastThreeData,
  MYCycleAllData,
}) => {
  const [isPress1, setPress1] = useState(true);
  const [isPress2, setPress2] = useState(false);
  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewSubContainer}>
        <TouchableOpacity
          style={isPress1 ? styles.pressedTab : styles.nonPressedTab}
          onPress={() => {
            setPress1(true);
            setPress2(false);
            MYCycleAllData();
            activeData();
          }}
        >
          <Text allowFontScaling={false}
            style={
              isPress1 ? styles.selectedTextStyle : styles.nonSelectedTextStyle
            }
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={isPress2 ? styles.pressedTab : styles.nonPressedTab}
          onPress={() => {
            setPress2(true);
            setPress1(false);
            MyCycleLastThreeData();
            archivedData();
          }}
        >
          <Text allowFontScaling={false}
            style={
              isPress2 ? styles.selectedTextStyle : styles.nonSelectedTextStyle
            }
          >
            Last 3 Cycles
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyCycleTopTabs;

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "transparent",
    paddingVertical: 10,
  },
  viewSubContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pressedTab: {
    marginLeft: wp(5),
    flexDirection: "row",
    borderRadius: 16,
    backgroundColor: "#9b2890",
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    height: hp(4),
    width: hp(15),
  },
  nonPressedTab: {
    marginLeft: wp(5),
    flexDirection: "row",
    borderRadius: 15,
    backgroundColor: "transparent",
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    height: hp(4),
    width: hp(15),
    borderColor: "#9b2890",
    borderWidth: 1
  },
  selectedTextStyle: {
    fontFamily: "Causten-SemiBold",
    fontWeight: "bold",
    color: "#fff"
  },
  nonSelectedTextStyle: {
    fontFamily: "Causten-SemiBold",
    fontWeight: "bold",
    color: "#9b2890",
  },
});
