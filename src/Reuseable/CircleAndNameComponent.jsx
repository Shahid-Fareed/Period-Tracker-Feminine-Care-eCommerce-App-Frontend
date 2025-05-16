import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../Contants/Colors";

const CircleAndNameComponent = ({ dotColor, text }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.dotContainer, { backgroundColor: dotColor }]} />
      <Text allowFontScaling={false}  style={styles.textStyle}>{text}</Text>
    </View>
  );
};

export default CircleAndNameComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  dotContainer: {
    height: wp(4),
    width: wp(4),
    borderRadius: 100,
    backgroundColor: "transparent",
    marginRight: 5,
  },
  textStyle: {
    fontSize: 14,
    color: "#9b2890",
    fontFamily: "Causten-Regular",
  },
});
