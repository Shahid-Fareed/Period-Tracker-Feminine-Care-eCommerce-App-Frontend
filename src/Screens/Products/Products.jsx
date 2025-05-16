import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../../Contants/Colors";
import UserServices from "../../Services/UserService";
import LoaderComponent from "../../Reuseable/LoaderComponent";
import { LinearGradient } from "expo-linear-gradient";
import { commaSperate } from "../../Contants/Helper";
import { BlurView } from "expo-blur";
import Rating from "../../Reuseable/Rating";
import AddReview from "../Reviews/AddReview";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";

const Products = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limitData, setLimitData] = useState(20);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customerId, setCustomerId] = useState(null);
  const [categoriesFlatListData, setCategoriesFlatListData] = useState([]);
  const [blogsPageData, setAllProductsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("customerId").then((value) => {
        setCustomerId(JSON.parse(value));
        TrackUserActivity(value, "Product Screen", "On Screen");
      });
    }, [navigation])
  );

  useEffect(() => {
    UserServices.getAllProductsCategories()
      .then((res) => {
        let Categories = [
          {
            _id: 1,
            imageUrl: null,
            name: "All",
            value: "",
          },
        ];

        for (let i = 0; i < res.items.length; i++) {
          const element = res.items[i];
          let obj = {
            _id: element._id,
            imageUrl: element.imageUrl,
            name: element.name,
            value: element.value,
          };
          Categories.push(obj);
        }
        setCategoriesFlatListData(Categories);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [navigation]);

  useEffect(() => {
    getAllProducts();
  }, [selectedCategory]);

  const getAllProducts = () => {
    setIsLoading(true);
    UserServices.getAllProducts({
      page: currentPage,
      limit: limitData,
      category: selectedCategory,
    })
      .then((res) => {
        setIsLoading(false);
        setAllProductsData(res.productsData);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  };

  const handleReviewOpen = (item) => {
    setItemSelected(item);
    setIsReviewOpen(true);
  };
  // console.log("blogsPageData", blogsPageData[0]);
  // Product RENDER
  const renderItem = ({ item }) => {
    return (
      <>
        <ScrollView>
          <View
            style={{
              marginBottom: wp("5"),
              marginHorizontal: wp(4),
              width: wp(1 / 2),
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate("ProductsDetail", {
                  product: item,
                });
                TrackUserActivity(
                  customerId,
                  "Product Screen",
                  `Product ${item?.productName} is Pressed`
                );
              }}
            >
              <View
                style={{
                  width: wp("40%"),
                  height: wp("34%"),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BlurView
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderRadius: 8,
                    // backgroundColor: "rgba(255, 255, 255, 0.4)",
                    overflow: "hidden",
                  }}
                  blurType="light"
                  intensity={Platform.OS === "ios" ? 0 : 100}
                  borderWidth={0.4}
                  borderRadius={8}
                  borderColor={"#fff"}
                />

                <Image
                  source={{ uri: item.productImage[0] }}
                  style={{
                    resizeMode: "contain",
                    width: wp("29%"),
                    height: wp("23%"),
                  }}
                />
              </View>

              <View>
                <Text
                  allowFontScaling={false}
                  style={{
                    marginTop: 5,
                    fontFamily: "Causten-SemiBold",
                    fontSize: Platform.OS === "ios" ? 16 : 14,
                    color: "#9b2890",
                  }}
                >
                  {item.productName}
                </Text>

                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: "Causten-SemiBold",
                    fontSize: Platform.OS === "ios" ? 15 : 14,
                    color: "#9b2890",
                  }}
                >
                  Rs{commaSperate(item.salePrice)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProductReviews", {
                      productId: item?._id,
                    })
                  }
                >
                  <Rating
                    initialRating={item.averageRating}
                    numberOfReviews={item.reviews}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleReviewOpen(item)}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#9b2890",
                      textDecorationLine: "underline",
                      fontFamily: "Causten-Regular",
                    }}
                  >
                    Add Review
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  };

  // CATEGORY RENDER
  const renderItemCategoriesFlatList = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => setSelectedCategory(item?.value)}
          style={{
            marginRight: 10,
            backgroundColor:
              selectedCategory === item?.value ? "#9b2890" : "transparent",
            alignItems: "center",
            justifyContent: "center",
            height: hp(4),
            width: hp(15),
            borderRadius: 15,
            borderWidth: selectedCategory === item?.value ? 0 : 1,
            borderColor: selectedCategory === item?.value ? null : "#9b2890",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontWeight: "bold",
              color:
                selectedCategory === item?.value ? Colors.White : "#9b2890",
            }}
          >
            {item?.name}
          </Text>
        </TouchableOpacity>
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
        <View style={{ ...styles.viewHeading }}>
          <FlatList
            data={categoriesFlatListData}
            renderItem={renderItemCategoriesFlatList}
            keyExtractor={(item) => item?._id}
            style={{ flex: 1, backgroundColor: "transparent" }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {isLoading ? (
          <LoaderComponent isModalVisible={isLoading} />
        ) : (
          <>
            <FlatList
              data={blogsPageData}
              renderItem={renderItem}
              initialNumToRender={blogsPageData?.length}
              keyExtractor={(item) => item?._id}
              extraData={blogsPageData}
              style={{ flex: 1, backgroundColor: "transparent" }}
              numColumns={2}
            />
            {isReviewOpen ? (
              <>
                <View style={{ height: hp(40) }}>
                  <AddReview
                    setIsReviewOpen={setIsReviewOpen}
                    itemSelected={itemSelected}
                  />
                </View>
              </>
            ) : null}
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Products;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  viewHeading: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: "space-around",
  },
});
