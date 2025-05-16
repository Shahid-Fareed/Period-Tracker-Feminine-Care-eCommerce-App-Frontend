import { View, Text, Platform } from "react-native";
import React, { useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import LottieView from "lottie-react-native";
import Colors from "../Contants/Colors";

const LoaderComponent = ({ isModalVisible }) => {
  return (
    <>
      {/* {isModalVisible && Platform.OS !== "ios" ? ( */}
      <View
        style={{
          flex: 1,
          right: 0,
          left: 0,
          bottom: 0,
          top: 0,
          position: "absolute",
          justifyContent: "center",
          zIndex: 100,
          alignItems: "center",
        }}
      >
        <LottieView
          source={require("../../assets/loader.json")}
          autoPlay
          loop
          style={{
            width: wp(20),
            height: wp(20),
            backgroundColor: Colors.white,
          }}
        />
      </View>
      {/* ) : null} */}
    </>
  );
};

export default LoaderComponent;
