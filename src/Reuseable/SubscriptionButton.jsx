import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../Contants/Colors";
import { BlurView } from "expo-blur";

const SubscriptionButton = ({
  packageName,
  month,
  selected,
  onPress,
  color,
}) => {
  return (
    <View style={styles.container}>
      <BlurView
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 1,
          overflow:"hidden"
        }}
        blurType="light"
        intensity={Platform.OS === "ios" ? 0 : 100}
      />
      <TouchableOpacity style={selected} onPress={onPress}>
        <Text allowFontScaling={false}  style={[styles.textStyleMedium, { color: color }]}>
          {packageName}
        </Text>
        <Text allowFontScaling={false}  style={[styles.textStyle, { color: color }]}>{month}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionButton;

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  subContainer: {
    flexDirection: "column",
    width: wp(28),
    backgroundColor: "transparent",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: Colors.lightGray,
    shadowOpacity: 0.8,
  },
  textStyleMedium: {
    fontSize: wp(3.8),
    fontFamily: "Causten-Medium",
    paddingVertical: 1.5,
  },
  textStyle: {
    fontSize: wp(2.9),
    fontFamily: "Causten-Light",
  },
});
