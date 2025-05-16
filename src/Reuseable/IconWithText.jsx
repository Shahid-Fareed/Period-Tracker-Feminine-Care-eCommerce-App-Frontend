import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";
import Colors from "../Contants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const IconWithText = ({ imageUrl, text }) => {
  return (
    <View style={styles.container}>
      <Image
        source={imageUrl}
        style={{
          resizeMode: "contain",
          height: 30,
          width: 30,
          marginRight: 10,
        }}
      />
      <Text allowFontScaling={false}  style={[styles.textStyleMedium, { flex: 1 }]}>{text}</Text>
    </View>
  );
};

export default IconWithText;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: wp(2),
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.SecondaryOne,
    marginRight: 10,
  },
  textStyleMedium: {
    fontSize: 14,
    color: "#9b2890",
    fontFamily: "Montserrat-Medium",
  },
});
