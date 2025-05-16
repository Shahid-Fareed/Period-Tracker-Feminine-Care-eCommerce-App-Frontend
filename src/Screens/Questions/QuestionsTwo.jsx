import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Contants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";

const QuestionsTwo = ({ navigation }) => {
  const [seletedOuestion, setSeletedOuestion] = useState(null);

  const seletedHandler = (value) => {
    setSeletedOuestion(value);
  };

  const onSkipPress = () => {
    navigation.navigate("QuestionsThree");
  };

  const onNextPress = () => {
    navigation.navigate("QuestionsThree");
  };

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.screen}>
        <View style={styles.headerContainer}>
          <Text allowFontScaling={false} style={styles.headerTextStyle}>
            Is your menstrual cycle regular?
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            onPress={() => seletedHandler("Yes!")}
            style={
              seletedOuestion === "Yes!"
                ? styles.optionsSeleted
                : styles.options
            }
          >
            <Text
              allowFontScaling={false}
              style={
                seletedOuestion === "Yes!"
                  ? styles.optionsTextSelected
                  : styles.optionsText
              }
            >
              Yes!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              seletedHandler("Sometimes a week later or a week early")
            }
            style={
              seletedOuestion === "Sometimes a week later or a week early"
                ? styles.optionsSeleted
                : styles.options
            }
          >
            <Text
              allowFontScaling={false}
              style={
                seletedOuestion === "Sometimes a week later or a week early"
                  ? styles.optionsTextSelected
                  : styles.optionsText
              }
            >
              Sometimes a week later or a week early
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => seletedHandler("It’s irregular")}
            style={
              seletedOuestion === "It’s irregular"
                ? styles.optionsSeleted
                : styles.options
            }
          >
            <Text
              allowFontScaling={false}
              style={
                seletedOuestion === "It’s irregular"
                  ? styles.optionsTextSelected
                  : styles.optionsText
              }
            >
              It’s irregular
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexGrow: 0.8 }}>
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.buttonStyle} onPress={onSkipPress}>
              <Text allowFontScaling={false} style={styles.buttonText}>
                Skip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={onNextPress}>
              <Text allowFontScaling={false} style={styles.buttonText}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default QuestionsTwo;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  headerContainer: {
    justifyContent: "center",
    paddingTop: 60,
    alignItems: "center",
  },
  headerTextStyle: {
    fontFamily: "Causten-Medium",
    fontSize: 20,
    color: "#9b2890",
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
    paddingBottom: 10,
  },
  buttonStyle: {
    width: "25%",
    alignItems: "center",
    padding: 1,
  },
  buttonText: {
    fontSize: 22,
    color: Colors.Black,
    fontFamily: "Causten-Regular",
  },
  optionsContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  options: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.SecondaryOne,
    width: wp("80%"),
    height: hp("6%"),
    justifyContent: "center",
    marginBottom: wp("5%"),
    paddingLeft: wp("5%"),
  },
  optionsText: {
    fontFamily: "Causten-Medium",
    fontSize: 16,
    color: "#9b2890",
  },
  optionsSeleted: {
    borderRadius: 15,
    backgroundColor: Colors.SecondaryOne,
    width: wp("80%"),
    height: hp("6%"),
    justifyContent: "center",
    marginBottom: wp("5%"),
    paddingLeft: wp("5%"),
  },
  optionsTextSelected: {
    fontFamily: "Causten-Medium",
    fontSize: 16,
    color: Colors.White,
  },
});
