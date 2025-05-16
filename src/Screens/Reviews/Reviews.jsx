import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Rating from "../../Reuseable/Rating";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import UserServices from "../../Services/UserService";

const Reviews = () => {
  const [allReviews, setAllReviews] = useState([]);

  const route = useRoute();

  const { productId } = route.params;

  console.log("productId", productId);

  const calculateOverallRating = () => {
    if (allReviews.length === 0) {
      return 0; // No reviews available, overall rating is 0
    }

    const totalStars = allReviews.reduce(
      (sum, review) => sum + review.stars,
      0
    );
    const averageRating = totalStars / allReviews.length;
    return averageRating;
  };

  const overallRating = calculateOverallRating();

  const getData = () => {
    UserServices.getAllReviesofProduct(productId)
      .then((res) => {
        setAllReviews(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.screen}>
        <>
          <View
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <View style={{ marginTop: wp(5), paddingHorizontal: wp(5) }}>
              <Text
                style={{
                  fontFamily: "Causten-SemiBold",
                  fontSize: 20,
                  color: "#9b2890",
                }}
              >
                Rating & Reviews
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ marginTop: wp(5) }}>
                  <Text
                    style={{
                      fontFamily: "Causten-SemiBold",
                      fontSize: 22,
                      color: "#9b2890",
                    }}
                  >
                    {overallRating}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Causten-Light",
                      fontSize: 15,
                      color: "#9b2890",
                    }}
                  >
                    {allReviews.length} ratings
                  </Text>
                </View>
              </View>
            </View>
            <BlurView
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              }}
              blurType="light"
              intensity={Platform.OS === "ios" ? 0 : 100}
              borderWidth={1}
              borderColor={"#fff"}
            />
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: wp(3),
                marginTop: wp(5),
              }}
            >
              {allReviews &&
                allReviews.map((review, index) => (
                  <View key={index} style={{ marginTop: wp(2) }}>
                    <BlurView
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        borderRadius: 20,
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                      }}
                      blurType="light"
                      intensity={Platform.OS === "ios" ? 0 : 100}
                      borderWidth={0.5}
                      borderRadius={20}
                      borderColor={"#fff"}
                    />
                    <View
                      style={{
                        justifyContent: "space-around",
                        // alignItems: "center",
                        marginVertical: wp(10),
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingHorizontal: wp(5),
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              fontFamily: "Causten-SemiBold",
                              fontSize: 18,
                            }}
                          >
                            {review?.userName}
                          </Text>
                          <View style={{ marginTop: wp(2) }}>
                            <Rating
                              initialRating={review.stars}
                              numberOfReviews={review.stars}
                            />
                          </View>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontFamily: "Causten-Light",
                              fontSize: 14,
                            }}
                          >
                            {
                              //   moment(review?.createdAt).format("MMMM DD,YYYY")
                              review?.createdAt
                            }
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          marginTop: wp(3),
                          width: "100%",
                          paddingHorizontal: wp(5),
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Causten-Light",
                            fontSize: 16,
                            textAlign: "justify",
                            lineHeight: 18,
                          }}
                        >
                          {review?.comment}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>
        </>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
