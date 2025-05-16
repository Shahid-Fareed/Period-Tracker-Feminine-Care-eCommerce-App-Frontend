import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Pressable,
  Platform
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Rating from "../../Reuseable/Rating";
import moment from "moment";
import { Entypo, Ionicons } from "@expo/vector-icons";
import AddRating from "../../Reuseable/AddRating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserServices from "../../Services/UserService";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";

const AddReview = ({ setIsReviewOpen, itemSelected }) => {
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(null);
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("customerId").then((value) => {
      setCustomerId(JSON.parse(value));
      TrackUserActivity(value, "Add Review Screen", "ON-Screen");
    }, []);
    setProductId(itemSelected?._id);
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    const body = {
      comment: comment,
      stars: stars,
      customerId: customerId,
      productId: productId,
    };

    UserServices.submitReview(body)
      .then((res) => {
        setIsLoading(false);
        setIsReviewOpen(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
      });
  };

  // console.log(comment);

  return (
    <SafeAreaView style={styles.screen}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              // backgroundColor: "rgba(255, 255, 255, 0.5)",
              overflow:"hidden"
            }}
            blurType="light"
            intensity={Platform.OS === "ios" ? 0 : 100}
            borderWidth={0.4}
            borderTopLeftRadius={40}
            borderTopRightRadius={40}
            borderColor={"#fff"}
          />
          <>
            <View style={{ flex: 1, alignItems: "center" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: wp(5),
                }}
              >
                <TouchableOpacity
                  style={{
                    width: wp(10),
                    // marginRight: 30,
                    alignSelf: "flex-end",
                  }}
                  onPress={() => setIsReviewOpen(false)}
                >
                  <Entypo
                    name="cross"
                    size={22}
                    color="#9b2890"
                  />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    width: wp(80),
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Causten-SemiBold",
                      fontSize: 16,
                      color: "#9b2890",
                    }}
                  >
                    Rate it!
                  </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <AddRating initialRating={4} onRatingChange={setStars} />
                </View>
                <View style={{ marginTop: 10 }}>
                  <View style={{ marginTop: 10 }}>
                    <TextInput
                      style={{
                        width: wp("90%"),
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        borderRadius: 20,
                        height: 130,
                        paddingHorizontal: 10,
                        paddingTop: 20,
                        paddingLeft: 20,
                        fontSize: 16,
                        fontFamily: "Causten-Regular",
                      }}
                      placeholder="Write a review"
                      multiline={true}
                      numberOfLines={4}
                      placeholderTextColor="#9b2890"
                      textAlignVertical="top"
                      onChangeText={(text) => setComment(text)}
                    />
                  </View>
                </View>
              </View>
              <View style={{ position: "absolute", bottom: 25 }}>
                {isLoading ? (
                  <>
                    <View
                      style={{
                        marginRight: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ActivityIndicator size="large" color="#9E1A97" />
                    </View>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      marginRight: 10,
                      backgroundColor: "#9b2890",
                      alignItems: "center",
                      justifyContent: "center",
                      height: hp(4),
                      width: hp(20),
                      borderRadius: 15,
                      borderWidth: 0,
                      borderColor: "#9b2890",
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      Submit
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </>
        </>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
