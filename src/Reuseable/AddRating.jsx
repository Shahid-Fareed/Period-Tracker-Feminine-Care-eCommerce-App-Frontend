import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

const AddRating = ({ initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const onStarPress = (selectedRating) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

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
        <TouchableOpacity key={i} onPress={() => onStarPress(i)}>
          <Entypo
            name={starIconName}
            size={28}
            color="#9b2890"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

export default AddRating;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
});
