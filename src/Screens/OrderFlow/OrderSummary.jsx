import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../../Contants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import Counter from "../../Reuseable/Counter";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { commaSperate } from "../../Contants/Helper";

const OrderSummary = ({ navigation }) => {
  const cartItems = useSelector((state) => state);

  const totalCartPrice = cartItems.reduce(
    (a, c) => a + c.salePrice * c.quantity,
    0
  );

  const nextPress = () => {
    navigation.navigate("Payment");
  };
  const renderItem = ({ item }) => {
    // console.log(item.productName.split(" - ")[2]);

    return (
      <>
        <View
          style={{
            width: wp(90),
            height: wp(20),
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: 20,
              // backgroundColor: "rgba(255, 255, 255, 0.5)",
              overflow: "hidden",
            }}
            blurType="light"
            intensity={Platform.OS === "ios" ? 0 : 100}
            borderWidth={1}
            borderRadius={20}
            borderColor={"#d2c9d0"}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // justifyContent: "space-around",
            }}
          >
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <Image
                source={{ uri: item.productImage[0] }}
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: "contain",
                  justifyContent: "space-between",
                }}
              />
            </View>
            <View style={{ paddingRight: 20 }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-SemiBold",
                  fontSize: 14,
                  color: "#9b2890",
                }}
                numberOfLines={3}
              >
                {item.productName.split(" - ")[0]}
                {"\n"}
                {item.productName.split(" - ")[1]}
                {item.productName.split(" - ")[2] ? (
                  <>
                    {"\n"}
                    {item.productName.split(" - ")[2]}
                  </>
                ) : null}
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-Bold",
                  fontSize: 16,
                  color: "#9b2890",
                }}
              >
                Rs{commaSperate(item.salePrice)}
              </Text>
            </View>
            <View style={{ position: "absolute", right: 10 }}>
              <Counter item={item} />
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.screen}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                borderRadius: wp(10),
                borderWidth: 1,
                borderColor: "#9b2890",
                backgroundColor: "transparent",
                width: wp(13),
                height: wp(13),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 20,
                  fontFamily: "Causten-Medium",
                  color: "#9b2890",
                }}
              >
                1
              </Text>
            </View>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 15,
                fontFamily: "Causten-Medium",
                color: "#9b2890",
              }}
            >
              Shipping
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                borderRadius: wp(10),
                borderWidth: 1,
                borderColor: "#9b2890",
                backgroundColor: "#9b2890",
                width: wp(13),
                height: wp(13),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 20,
                  fontFamily: "Causten-Medium",
                  color: Colors.White,
                }}
              >
                2
              </Text>
            </View>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 15,
                fontFamily: "Causten-Medium",
                color: "#9b2890",
              }}
            >
              Summary
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                borderRadius: wp(10),
                borderWidth: 1,
                borderColor: "#9b2890",
                backgroundColor: "transparent",
                width: wp(13),
                height: wp(13),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 20,
                  fontFamily: "Causten-Medium",
                  color: "#9b2890",
                }}
              >
                3
              </Text>
            </View>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 15,
                fontFamily: "Causten-Medium",
                color: "#9b2890",
              }}
            >
              Payment
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: wp(5),
            marginTop: wp(11),
            marginBottom: 20,
          }}
        >
          <View style={{}}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "Causten-Bold",
                fontSize: 16,
                marginBottom: 20,
                color: "#9b2890",
              }}
            >
              Order Summary
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              initialNumToRender={4}
              windowSize={8}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>

        <View style={{}}>
          <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: 20,
              // backgroundColor: "rgba(255, 255, 255, 0.5)",
              overflow: "hidden",
            }}
            blurType="light"
            intensity={Platform.OS === "ios" ? 0 : 200}
            borderWidth={1}
            borderRadius={20}
            borderColor={"#d2c9d0"}
          />
          <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.textStyle}>
              Order Summary
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text allowFontScaling={false} style={styles.textStyleMedium}>
              Total Amount
            </Text>
            <Text allowFontScaling={false} style={styles.textStyleMedium}>
              Rs{commaSperate(totalCartPrice)}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text allowFontScaling={false} style={styles.textStyleMedium}>
              Shipping Charges
            </Text>
            <Text allowFontScaling={false} style={styles.textStyleMedium}>
              Rs0
            </Text>
          </View>
          <View
            style={[
              styles.rowContainer,
              { borderBottomWidth: 0, paddingBottom: 0 },
            ]}
          >
            <Text allowFontScaling={false} style={styles.textStyleMedium}>
              Total Payable
            </Text>
            <Text allowFontScaling={false} style={styles.textStyleMedium}>
              Rs{commaSperate(totalCartPrice)}
            </Text>
          </View>
          <TouchableOpacity onPress={nextPress}>
            <View
              style={{
                marginVertical: wp(6),
                alignItems: "center",
                backgroundColor: "#fff",
                height: hp(4.5),
                justifyContent: "center",
                borderRadius: 15,
                width: wp(50),
                alignSelf: "center",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: "#9b2890",
                  fontSize: 16,
                  fontFamily: "Causten-SemiBold",
                }}
              >
                Confirm Order
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: 20,
  },
  detailContainer: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  container: {
    flexDirection: "row",
    backgroundColor: "transparent",
    marginVertical: 20,
    justifyContent: "center",
  },
  textStyle: {
    color: "#9b2890",
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "flex-start",
    fontFamily: "Causten-Bold",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingBottom: 10,
    marginHorizontal: 30,
    borderBottomColor: "#9b2890",
    borderBottomWidth: 1,
  },
  textStyleMedium: {
    fontSize: 16,
    color: "#9b2890",
    fontFamily: "Causten-SemiBold",
  },
});
