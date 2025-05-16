import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  SafeAreaView,
} from "react-native";
import UserServices from "../Services/UserService";
import { Entypo } from "@expo/vector-icons";

const PromotionModeliOS = ({ onClose, imageUrl }) => {
  return (
    <Modal>
      <SafeAreaView style={styles.container}>
        <View style={styles.closeButton}>
          <TouchableOpacity onPress={onClose}>
            <Entypo name="cross" size={26} color="white" />
          </TouchableOpacity>
        </View>

        <Image
          source={{
            uri: ``,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  closeButton: {
    // Add styles for the close button

    alignSelf: "flex-end",
    marginRight: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    // Add additional styles for the image if needed
  },
});

export default PromotionModeliOS;
