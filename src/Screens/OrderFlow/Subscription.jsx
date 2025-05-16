import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  Modal,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../../Contants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import UserServices from "../../Services/UserService";
import { AntDesign, Entypo } from "@expo/vector-icons";
import SubscriptionButton from "../../Reuseable/SubscriptionButton";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../Redux/actions/Actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Counter from "../../Reuseable/Counter";
import CounterSub from "../../Reuseable/CounterSub";
import { commaSperate } from "../../Contants/Helper";
import LoaderComponent from "../../Reuseable/LoaderComponent";

const Subscription = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [limitData, setLimitData] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedText, setselectedText] = useState("Monthly");
  const [address, setAddress] = useState(false);

  const dispatch = useDispatch();

  const getAllProducts = () => {
    setIsLoading(true);
    UserServices.getAllProducts({
      page: currentPage,
      limit: limitData,
      category: selectedCategory,
    })
      .then((res) => {
        setIsLoading(false);
        setAllProducts(res.productsData);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllProducts();
    getData();
  }, []);

  const handleProductOnPress = (item) => {
    setModalVisible(true);

    const data = selectedProduct?.find((p) => p._id === item._id);
    if (data) {
      setSelectedProduct([...selectedProduct]);
    } else {
      dispatch(addItemToCart(item));
      setSelectedProduct([...selectedProduct, item]);
    }
  };

  const deleteSubscriptionCartData = (item) => {
    const filteredItems = selectedProduct?.filter((el) => el._id !== item._id);
    setSelectedProduct(filteredItems);
  };

  const [buttonStats, setButtonStats] = useState({
    btn1: true,
    btn2: false,
    btn3: false,
  });
  const handlebtnOnpress = (btn, text) => {
    btn == "btn1"
      ? setButtonStats({
          btn1: true,
          btn2: false,
          btn3: false,
        })
      : btn == "btn2"
      ? setButtonStats({
          btn1: false,
          btn2: true,
          btn3: false,
        })
      : setButtonStats({
          btn1: false,
          btn2: false,
          btn3: true,
        });
    setselectedText(text);
  };
  const { btn1, btn2, btn3 } = buttonStats;

  const getData = () => {
    AsyncStorage.getItem("DefaultShippingAddress").then((value) => {
      setAddress(JSON.parse(value));
    });
  };

  const handlePressSubscribeProducts = () => {
    if (selectedProduct !== [] && selectedText !== "") {
      AsyncStorage.setItem("subscriptionName", JSON.stringify(selectedText));
      // navigation.navigate("DeliveryAddress");

      if (address === false) {
        navigation.navigate("Products", {
          screen: "DeliveryAddress",
        });
      } else if (address === true) {
        navigation.navigate("Products", {
          screen: "DeliveryAddressTwo",
        });
      }
    } else {
      console.log("Error");
    }
  };

  console.log("selectedProduct.length === 0", selectedProduct.length === 0);

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={isLoading}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LoaderComponent isModalVisible={isLoading} />
        </View>
      </Modal>

      <SafeAreaView style={styles.screen}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: "transparent",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            <Image
              source={require("../../../assets/resources/sunscriptionbanner.png")}
              style={{
                width: wp(90),
                height: wp(50),
                resizeMode: "contain",
                borderRadius: 20,
              }}
            />
          </View>
          <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.heading}>
              Subscribe
            </Text>
            <Text allowFontScaling={false} style={styles.description}>
              Create your customized auto-repeat plan for timely delivery of
              pads each month.
            </Text>
            <View style={styles.divider} />
            <Text allowFontScaling={false} style={styles.description2}>
              Choose a product category and size that suits you best.
            </Text>
          </View>
          <View>
            <BlurView
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                borderRadius: 20,
                // backgroundColor: "rgba(255, 255, 255, 0.4)",
                overflow: "hidden",
              }}
              blurType="light"
              intensity={Platform.OS === "ios" ? 0 : 100}
            />
            <View style={{ marginTop: 20, paddingLeft: 30 }}>
              <Text allowFontScaling={false} style={styles.heading2}>
                Select Product
              </Text>
              <Text allowFontScaling={false} style={styles.description}>
                You can select multiple products.
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              {allProducts &&
                allProducts.map((item, index) => (
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
                          // backgroundColor: "rgba(255, 255, 255, 0.4)",
                          overflow: "hidden",
                          borderColor: selectedProduct?.find(
                            (el) => el._id === item._id
                          )
                            ? "#9b2890"
                            : "#fff",
                          borderWidth: 0.4,
                        }}
                        blurType="light"
                        intensity={Platform.OS === "ios" ? 0 : 100}
                        borderWidth={0.4}
                      />

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingHorizontal: 10,
                        }}
                      >
                        <View>
                          <Image
                            source={{ uri: item.productImage[0] }}
                            style={{
                              width: 60,
                              height: 60,
                              resizeMode: "contain",
                              marginRight: wp(5),
                            }}
                          />
                        </View>
                        <View>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontFamily: "Causten-SemiBold",
                              fontSize: 14,
                              color: "#9b2890",
                              paddingBottom: 3,
                            }}
                          >
                            {/* {item.productName} */}
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
                              paddingBottom: 3,
                            }}
                          >
                            Rs{commaSperate(item.salePrice)}
                          </Text>
                        </View>
                        <View style={{ position: "absolute", right: 0 }}>
                          {selectedProduct?.find(
                            (el) => el._id === item._id
                          ) ? (
                            <CounterSub
                              item={item}
                              deleteSubscriptionCartData={
                                deleteSubscriptionCartData
                              }
                            />
                          ) : (
                            <TouchableOpacity
                              style={{ alignItems: "center", marginRight: 20 }}
                              onPress={() => handleProductOnPress(item)}
                            >
                              <AntDesign
                                name="pluscircleo"
                                color={"#9b2890"}
                                size={18}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </View>
                  </>
                ))}
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              paddingVertical: 10,
              paddingHorizontal: wp(5),
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                allowFontScaling={false}
                style={[
                  styles.textStyle,
                  { marginBottom: 10, color: "#9b2890" },
                ]}
              >
                Now, create your{" "}
              </Text>
              <Text
                allowFontScaling={false}
                style={[
                  styles.textStyleMedium,
                  { textDecorationLine: "underline" },
                ]}
              >
                AUTO-REPEAT PLAN
              </Text>
            </View>
            <Text
              allowFontScaling={false}
              style={[styles.textStyle, { marginBottom: 10, color: "#9b2890" }]}
            >
              Automated deliveries | Cancel anytime
            </Text>
          </View>
          <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.heading}>
              Delivery
            </Text>
          </View>
          <View style={styles.deliveryContainer}>
            <SubscriptionButton
              color={btn1 == false ? Colors.Black : Colors.White}
              packageName={"Monthly"}
              month={"Every Month"}
              selected={
                btn1 == false ? styles.nonSelectedButton : styles.selectedButton
              }
              onPress={() => handlebtnOnpress("btn1", "Monthly")}
            />

            <SubscriptionButton
              color={btn2 == false ? Colors.Black : Colors.White}
              packageName={"Bimonthly"}
              month={"Every 2 Months"}
              selected={
                btn2 == false ? styles.nonSelectedButton : styles.selectedButton
              }
              onPress={() => handlebtnOnpress("btn2", "Bimonthly")}
            />

            <SubscriptionButton
              color={btn3 == false ? Colors.Black : Colors.White}
              packageName={"Quarterly"}
              month={"Every 3 Months"}
              selected={
                btn3 == false ? styles.nonSelectedButton : styles.selectedButton
              }
              onPress={() => handlebtnOnpress("btn3", "Quarterly")}
            />
          </View>

          <View style={{ margin: wp(5) }}>
            <TouchableOpacity
              style={styles.btnstyle}
              onPress={() => handlePressSubscribeProducts()}
              disabled={selectedProduct.length === 0}
            >
              <Text allowFontScaling={false} style={styles.btnTextStyleMedium}>
                Add to My Bundle
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  heading: {
    fontFamily: "Causten-Bold",
    fontSize: 18,
    paddingBottom: 10,
    color: "#9b2890",
  },
  heading2: {
    fontFamily: "Causten-Bold",
    fontSize: 18,
    color: "#9b2890",
  },
  description: {
    fontFamily: "Causten-Regular",
    fontSize: 15,
    lineHeight: 20,
    color: "#9b2890",
  },
  description2: {
    fontFamily: "Causten-Regular",
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 10,
    color: "#9b2890",
  },
  divider: {
    width: wp(90),
    height: wp(0.1),
    backgroundColor: "#9b2890",
    marginTop: 15,
    marginBottom: 20,
  },
  productNameAndPriceContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  textStyleMedium: {
    fontSize: 14,
    color: "#9b2890",
    fontFamily: "Causten-Medium",
    paddingVertical: 1.5,
    textTransform: "capitalize",
  },
  priceTextStyle: {
    fontSize: 14,
    color: Colors.SecondaryOne,
    fontFamily: "Causten-Bold",
    paddingVertical: 1.5,
  },

  unSelected: {
    backgroundColor: Colors.White,
    marginBottom: 10,
  },
  Selected: {
    backgroundColor: Colors.SecondaryOne,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: hp(12),
  },
  unSelectedText: {
    color: Colors.Black,
    fontFamily: "Causten-Medium",
    fontSize: 14,
  },
  SelectedText: {
    color: Colors.White,
    fontFamily: "Causten-Medium",
    fontSize: 14,
  },
  deliveryContainer: {
    paddingHorizontal: wp(5),
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 3,
  },
  selectedButton: {
    flexDirection: "column",
    width: wp(28),
    backgroundColor: "#9b2890",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: Colors.gray,
    shadowOpacity: 0.8,
  },
  nonSelectedButton: {
    flexDirection: "column",
    width: wp(28),
    backgroundColor: "transparent",
    borderColor: Colors.SecondaryOne,
    alignItems: "center",
    padding: 10,
  },
  btnTextStyleMedium: {
    fontSize: 16,
    color: Colors.White,
    fontFamily: "Causten-Medium",
    paddingVertical: 1.5,
  },
  btnstyle: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#9b2890",
    borderRadius: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});
