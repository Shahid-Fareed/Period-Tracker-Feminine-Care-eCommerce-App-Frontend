import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../Contants/Colors";
import Carousel from "../../Packages/react-native-snap-carousel/src/carousel/Carousel";
import { addItemToCart } from "../../Redux/actions/Actions";
import { LinearGradient } from "expo-linear-gradient";
import { commaSperate } from "../../Contants/Helper";

const ProductsDetail = ({ route, navigation }) => {
  const { product } = route.params;

  const carouselRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      carouselRef?.current?.snapToNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [product.productImage.length]);

  const _renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: wp("65%"),
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: item }}
          style={{
            width: 260,
            height: 190,
            alignSelf: "center",
            resizeMode: "contain",
          }}
        />
      </View>
    );
  };

  const onAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  console.log("w", product.productName.split(" - "));

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.screen}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            paddingTop: 20,
          }}
        >
          <View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
              }}
            >
              {product.productImage.length > 0 ? (
                <>
                  <Carousel
                    ref={carouselRef}
                    useScrollView={true}
                    data={product.productImage}
                    renderItem={_renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    sliderWidth={400}
                    itemWidth={400}
                    loop
                    layoutCardOffset={9}
                    layout={"default"}
                    activeDotIndex={1}
                    dotsLength={2}
                    dotColor="black"
                    autoplay={true}
                    autoplayDelay={1000}
                  />
                </>
              ) : (
                <View
                  style={{
                    width: wp("65%"),
                    height: hp("25%"),
                    paddingVertical: 10,
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      ...styles.textStyleMedium,
                      fontSize: 12,
                      alignSelf: "center",
                    }}
                  >
                    Image Not Found
                  </Text>
                </View>
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingTop: wp(10),
                justifyContent: "space-between",
                marginHorizontal: 20,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-Bold",
                  fontSize: 18,
                  color: "#9b2890",
                }}
              >
                {product.productName}
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-Bold",
                  fontSize: 18,
                  color: "#9b2890",
                }}
              >
                Rs{commaSperate(product?.salePrice)}
              </Text>
            </View>
            <View style={{ paddingTop: wp(3), marginHorizontal: wp(5.5) }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-SemiBold",
                  color: "#9b2890",
                  fontSize: 14,
                }}
              >
                Pads in a pack: {product.pieces}
              </Text>
            </View>
            <View style={{ paddingTop: wp(5), marginHorizontal: wp(5.5) }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-Regular",
                  color: Colors.Black,
                  fontSize: 16,
                  lineHeight: 20,
                  color: "#9b2890",
                }}
              >
                {product.description}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            marginVertical: wp(3),
            marginHorizontal: wp(5.5),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => onAddToCart(product)}>
            <View
              style={{
                backgroundColor: "#9b2890",
                width: wp(50),
                height: wp(10),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 25,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-Bold",
                  color: Colors.White,
                  fontSize: 16,
                }}
              >
                Add to Cart
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProductsDetail;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    // paddingTop: 20,
  },
});
