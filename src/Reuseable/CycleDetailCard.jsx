import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../Contants/Colors";
import { BlurView } from "expo-blur";

const CycleDetailCard = ({ topHeading, days, report, status, not }) => {
  return (
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
          overflow:"hidden"
        }}
        blurType="light"
        intensity={Platform.OS === "ios" ? 0 : 100}
        borderWidth={0.5}
        borderRadius={20}
        borderColor={"#fff"}
      />
      <View style={{ padding: 15 }}>
        <Text allowFontScaling={false}  style={{
          fontSize: 16,
          fontFamily: "Causten-Bold",
          color: "#9b2890",
        }}>{topHeading}</Text>

        <View style={styles.container}>
          <Text allowFontScaling={false}  style={styles.textStyle1}>{days}</Text>
          <Text allowFontScaling={false}  style={styles.textStyleMedium}>{report?.charAt(0)?.toUpperCase() + report?.slice(1)}</Text>
        </View>
      </View>
      <View style={styles.borderStyle} />
      <View style={{ padding: 15 }}>
        <Text allowFontScaling={false}  style={styles.textStyleMedium}>
          Your cycle was {not}
          <Text allowFontScaling={false}  style={{ fontFamily: "Causten-Bold" }}>
            within the normal
          </Text>{" "}
          medical range (21-35) days
        </Text>
      </View>
    </View>
  );
};

export default CycleDetailCard;

const styles = StyleSheet.create({
  rectangularContainer2: {
    flexDirection: "column",
    marginHorizontal: wp(5),
    marginVertical: wp(4),
    paddingBottom: wp(3),
    backgroundColor: "transparent",
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
  borderStyle: { height: 0.5, backgroundColor: Colors.lightGrey },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: wp(2),
  },
});
