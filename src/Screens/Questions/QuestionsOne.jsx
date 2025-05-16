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

const QuestionsOne = ({ navigation }) => {
  const [seletedOuestion, setSeletedOuestion] = useState(null);

  const onSkipPress = () => {
    navigation.navigate("QuestionsTwo");
  };
  const onNextPress = () => {
    navigation.navigate("QuestionsTwo");
  };

  const seletedHandler = (value) => {
    setSeletedOuestion(value);
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
            How long does your period last?
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={
              seletedOuestion === "Under 2 days"
                ? styles.optionsSeleted
                : styles.options
            }
            onPress={() => seletedHandler("Under 2 days")}
          >
            <Text
              allowFontScaling={false}
              style={
                seletedOuestion === "Under 2 days"
                  ? styles.optionsTextSelected
                  : styles.optionsText
              }
            >
              Under 2 days
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              seletedOuestion === "Typically, between 2-7 days"
                ? styles.optionsSeleted
                : styles.options
            }
            onPress={() => seletedHandler("Typically, between 2-7 days")}
          >
            <Text
              allowFontScaling={false}
              style={
                seletedOuestion === "Typically, between 2-7 days"
                  ? styles.optionsTextSelected
                  : styles.optionsText
              }
            >
              Typically, between 2-7 days
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              seletedOuestion === "Usually more than a week"
                ? styles.optionsSeleted
                : styles.options
            }
            onPress={() => seletedHandler("Usually more than a week")}
          >
            <Text
              allowFontScaling={false}
              style={
                seletedOuestion === "Usually more than a week"
                  ? styles.optionsTextSelected
                  : styles.optionsText
              }
            >
              Usually more than a week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              seletedOuestion === "No bleeding"
                ? styles.optionsSeleted
                : styles.options
            }
            onPress={() => seletedHandler("No bleeding")}
          >
            <Text
              allowFontScaling={false}
              style={
                seletedOuestion === "No bleeding"
                  ? styles.optionsTextSelected
                  : styles.optionsText
              }
            >
              No bleeding
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              seletedOuestion === "I can’t keep track"
                ? styles.optionsSeleted
                : styles.options
            }
            onPress={() => seletedHandler("I can’t keep track")}
          >
            <Text
              allowFontScaling={false}
              style={
                seletedOuestion === "I can’t keep track"
                  ? styles.optionsTextSelected
                  : styles.optionsText
              }
            >
              I can’t keep track
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
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => onNextPress()}
            >
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

export default QuestionsOne;

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
  optionsSeleted: {
    borderRadius: 15,
    backgroundColor: Colors.SecondaryOne,
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
  optionsTextSelected: {
    fontFamily: "Causten-Medium",
    fontSize: 16,
    color: Colors.White,
  },
});
