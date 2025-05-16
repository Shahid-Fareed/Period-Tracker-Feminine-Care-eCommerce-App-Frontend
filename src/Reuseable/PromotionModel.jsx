import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
} from "react-native";
import UserServices from "../Services/UserService";
import { Entypo } from "@expo/vector-icons";

const PromotionModel = ({ onClose, imageUrl }) => {
  return (
    <Modal>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          {/* Close button icon or text */}
          <Entypo name="cross" size={26} color="white" />
        </TouchableOpacity>
        <Image
          source={{
            uri: ``,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    // Add styles for the close button
  },
  image: {
    width: "100%",
    height: "100%",
    // Add additional styles for the image if needed
  },
});

export default PromotionModel;
