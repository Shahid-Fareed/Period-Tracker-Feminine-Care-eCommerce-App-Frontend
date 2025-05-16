import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity } from "../Redux/actions/Actions";
import Colors from "../Contants/Colors";

const CounterSub = ({ item, deleteSubscriptionCartData }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    dispatch(updateCartItemQuantity(item._id, newQuantity));
  };

  useEffect(() => {
    if (quantity == 0) {
      deleteSubscriptionCartData(item);
    }
  }, [quantity]);

  return (
    <View style={styles.subContainer}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleQuantityChange(quantity - 1)}
      >
        <AntDesign name="minuscircleo" color={"#9b2890"} size={18} />
      </TouchableOpacity>
      <Text allowFontScaling={false}  style={styles.textItemStyle}>{quantity.toString()}</Text>

      <TouchableOpacity
        style={styles.iconContainer2}
        onPress={() => handleQuantityChange(quantity + 1)}
      >
        <AntDesign name="pluscircleo" color={"#9b2890"} size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default CounterSub;

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: widthPercentageToDP(22),
    height: heightPercentageToDP(5),
  },
  iconContainer: { alignItems: "center" },
  iconContainer2: { alignItems: "center" },

  textItemStyle: {
    fontSize: 14,
    minWidth: 30,
    color: "#9b2890",
    fontFamily: "Causten-SemiBold",
    textAlign: "center",
  },
});
