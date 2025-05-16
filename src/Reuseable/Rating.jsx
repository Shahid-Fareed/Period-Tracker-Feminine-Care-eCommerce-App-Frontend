import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Rating = ({ initialRating, numberOfReviews }) => {
  const [rating, setRating] = useState(initialRating);
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starIconName =
        rating >= i
          ? "star"
          : rating >= i - 0.5
          ? "star-outlined"
          : "star-outlined";
      stars.push(
        <View key={i}>
          <Entypo name={starIconName} size={12} color="#9b2890" />
        </View>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {renderStars()}
      <Text
        style={{
          fontFamily: "Causten-Regular",
          fontSize: 13,
          marginLeft: 3,
          color: "#9b2890",
        }}
      >
        ({numberOfReviews})
      </Text>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
});
