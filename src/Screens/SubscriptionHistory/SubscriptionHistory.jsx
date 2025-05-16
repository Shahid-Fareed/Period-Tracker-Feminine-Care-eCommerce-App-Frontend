import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../../Contants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SubscriptionButton from "../../Reuseable/SubscriptionButton";
import UserServices from "../../Services/UserService";
import CounterSub from "../../Reuseable/CounterSub";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { commaSperate } from "../../Contants/Helper";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";
import LoaderComponent from "../../Reuseable/LoaderComponent";

const SubscriptionHistory = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [limitData, setLimitData] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedText, setselectedText] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [lastOrderDate, setLastOrderDate] = useState("");

  useEffect(() => {
    getAllProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("customerId").then((value) => {
        setCustomerId(JSON.parse(value));
        getSubscription(JSON.parse(value));
        TrackUserActivity(value, "Subscription History Screen", "ON-Screen");
      });
    }, [navigation])
  );

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

  const getSubscription = (id) => {
    UserServices.getSubscrtiption(id)
      .then((res) => {
        setSubscriptionId(res._id);
        setselectedText(res.subscriptionType);
        setLastOrderDate(res.lastOrderDate);
        setSelectedProduct(res.products);
      })
      .catch((error) => console.log(error.message));
  };

  const handleProductOnPress = (item) => {
    const data = selectedProduct?.find((p) => p.id === item._id);
    if (data) {
      setSelectedProduct([...selectedProduct]);
    } else if (!data) {
      const newItem = {
        count: 1,
        id: item._id,
        userId: customerId,
      };

      setSelectedProduct([...selectedProduct, newItem]);
    }
  };

  const deleteSubscriptionCartData = (item) => {
    const filteredItems = selectedProduct?.filter((el) => el.id !== item._id);
    setSelectedProduct(filteredItems);
  };

  const handleCountChange = (productId, operation) => {
    const updatedSelectedProduct = selectedProduct?.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          count:
            operation === "increment" ? product.count + 1 : product.count - 1,
        };
      }
      return product;
    });

    setSelectedProduct(updatedSelectedProduct);
  };

  const handleSubmit = () => {
    const body = {
      userId: customerId,
      subscriptionType: selectedText,
      products: selectedProduct,
      lastOrderDate: lastOrderDate,
    };

    UserServices.editSubscription(subscriptionId, body)
      .then((res) => {
        navigation.navigate("HomeStack", {
          screen: "Home",
        });
      })
      .catch((error) => console.log(error.message));
  };

  const onCancelSunscription = (id) => {
    console.log("Hellow", id);

    UserServices.changeSubscriptionStatus(id)
      .then((res) => {
        console.log("res", res);
        navigation.navigate("HomeStack", {
          screen: "Home",
        });
      })
      .catch((err) => console.log(err));
  };

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
              Update Subscription
            </Text>
            <Text allowFontScaling={false} style={styles.description}>
              Update your customized auto-repeat plan for timely delivery of
              pads each month.
            </Text>
            <View style={styles.divider} />
            <Text allowFontScaling={false} style={styles.description2}>
              Choose a product category and size that suits you best.
            </Text>
          </View>
          <View style={{ padding: 20, marginBottom: 10 }}>
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
              intensity={Platform.OS === "ios" ? 0 : 200}
            />
            <Text allowFontScaling={false} style={styles.heading2}>
              Add or remove products
            </Text>
            <Text
              allowFontScaling={false}
              style={[styles.description, { marginBottom: 10 }]}
            >
              You can select multiple products.
            </Text>
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
                        borderColor: selectedProduct?.find(
                          (el) => el.id === item._id
                        )
                          ? "#9b2890"
                          : "#fff",
                        borderWidth: 1,
                      }}
                      blurType="light"
                      intensity={Platform.OS === "ios" ? 0 : 100}
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
                        {/* <Text allowFontScaling={false} 
                          style={{
                            fontFamily: "Causten-SemiBold",
                            fontSize: 16,
                            color: "#9b2890",
                            paddingBottom: 3,
                          }}
                        >
                          {item.productCategory}
                        </Text> */}
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontFamily: "Causten-SemiBold",
                            fontSize: 14,
                            color: "#9b2890",
                            paddingBottom: 3,
                          }}
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
                            paddingBottom: 3,
                          }}
                        >
                          Rs{commaSperate(item?.salePrice)}
                        </Text>
                      </View>
                      <View style={{ position: "absolute", right: 0 }}>
                        {selectedProduct?.find((el) => el.id === item._id) ? (
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

          <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.heading}>
              Delivery
            </Text>
          </View>
          <View style={styles.deliveryContainer}>
            <View style={styles.containerSub}>
              <BlurView
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  borderRadius: 10,
                  borderColor: "#fff",
                  borderWidth: 1,
                }}
                blurType="light"
                intensity={Platform.OS === "ios" ? 0 : 100}
              />
              <TouchableOpacity
                onPress={() => setselectedText("Monthly")}
                style={
                  selectedText === "Monthly"
                    ? styles.selectedButton
                    : styles.nonSelectedButton
                }
              >
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.textStyleMediumSub,
                    {
                      color:
                        selectedText === "Monthly"
                          ? Colors.White
                          : Colors.Black,
                    },
                  ]}
                >
                  Monthly
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.textStyleSub,
                    {
                      color:
                        selectedText === "Monthly"
                          ? Colors.White
                          : Colors.Black,
                    },
                  ]}
                >
                  Every Month
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerSub}>
              <BlurView
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  borderRadius: 10,
                  borderColor: "#fff",
                  borderWidth: 1,
                }}
                blurType="light"
                intensity={Platform.OS === "ios" ? 0 : 100}
              />
              <TouchableOpacity
                onPress={() => setselectedText("Bimonthly")}
                style={
                  selectedText === "Bimonthly"
                    ? styles.selectedButton
                    : styles.nonSelectedButton
                }
              >
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.textStyleMediumSub,
                    {
                      color:
                        selectedText === "Bimonthly"
                          ? Colors.White
                          : Colors.Black,
                    },
                  ]}
                >
                  Bimonthly
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.textStyleSub,
                    {
                      color:
                        selectedText === "Bimonthly"
                          ? Colors.White
                          : Colors.Black,
                    },
                  ]}
                >
                  Every 2 Months
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerSub}>
              <BlurView
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  borderRadius: 10,
                  borderColor: "#fff",
                  borderWidth: 1,
                }}
                blurType="light"
                intensity={Platform.OS === "ios" ? 0 : 100}
              />
              <TouchableOpacity
                onPress={() => setselectedText("Quarterly")}
                style={
                  selectedText === "Quarterly"
                    ? styles.selectedButton
                    : styles.nonSelectedButton
                }
              >
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.textStyleMediumSub,
                    {
                      color:
                        selectedText === "Quarterly"
                          ? Colors.White
                          : Colors.Black,
                    },
                  ]}
                >
                  Quarterly
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.textStyleSub,
                    {
                      color:
                        selectedText === "Quarterly"
                          ? Colors.White
                          : Colors.Black,
                    },
                  ]}
                >
                  Every 3 Months
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ margin: wp(5) }}>
            <TouchableOpacity
              style={styles.btnstyle}
              onPress={() => handleSubmit()}
              disabled={selectedProduct.length === 0}
            >
              <Text allowFontScaling={false} style={styles.btnTextStyleMedium}>
                Update My Subscription
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ alignItems: "center" }}
          >
            <Text allowFontScaling={false} style={styles.btnTextStyleMedium2}>
              Cancle My Subscription
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
              start={{ x: 0, y: 0.3 }}
              end={{ x: 0.3, y: 1 }}
              style={{ borderRadius: 15 }}
            >
              <BlurView
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  borderColor: "#fff",
                  borderWidth: 1,
                  borderRadius: 15,
                }}
                blurType="light"
                intensity={Platform.OS === "ios" ? 0 : 10}
              />
              <View style={styles.modal}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: "Causten-SemiBold",
                      fontSize: 16,
                      color: Colors.Black,
                      lineHeight: 20,
                    }}
                  >
                    Are you sure you want to Cancel
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: "Causten-SemiBold",
                      fontSize: 16,
                      color: Colors.Black,
                      lineHeight: 20,
                    }}
                  >
                    Subscription?
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.SecondaryOne,
                      width: wp(30),
                      height: wp(10),
                      marginRight: wp(5),
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 60,
                    }}
                    onPress={() => onCancelSunscription(subscriptionId)}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontFamily: "Causten-SemiBold",
                        fontSize: 15,
                        color: Colors.White,
                      }}
                    >
                      Yes
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: Colors.SecondaryOne,
                      width: wp(30),
                      height: wp(10),
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 60,
                    }}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontFamily: "Causten-SemiBold",
                        fontSize: 15,
                        color: Colors.Black,
                      }}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SubscriptionHistory;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    paddingLeft: 20,
  },
  heading: {
    fontFamily: "Causten-Bold",
    fontSize: 20,
    paddingBottom: 10,
    color: "#9b2890",
  },
  heading2: {
    fontFamily: "Causten-Bold",
    fontSize: 20,
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
  deliveryContainer: {
    paddingHorizontal: wp(5),
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 3,
  },
  nonSelectedButton: {
    flexDirection: "column",
    width: wp(28),
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#9b2890",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
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
  btnTextStyleMedium: {
    fontSize: 16,
    color: Colors.White,
    fontFamily: "Causten-Medium",
    paddingVertical: 1.5,
  },
  btnTextStyleMedium2: {
    fontSize: 14,
    color: Colors.Black,
    fontFamily: "Causten-Medium",
    paddingVertical: 1.5,
    textDecorationLine: "underline",
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
  modal: {
    // backgroundColor: Colors.Grey,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  unSelected: {
    backgroundColor: "transparent",
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
  containerSub: { alignItems: "center" },
  textStyleMediumSub: {
    fontSize: wp(3.8),
    fontFamily: "Causten-Medium",
    paddingVertical: 1.5,
  },
  textStyleSub: {
    fontSize: wp(2.9),
    fontFamily: "Causten-Light",
  },
  subContainerCouner: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(22),
    height: hp(5),
  },
  iconContainerCounter: {
    alignItems: "center",
  },
  iconContainerCounter2: {
    alignItems: "center",
  },
  textItemStyleCounter: {
    fontSize: 14,
    minWidth: 30,
    color: "#9b2890",
    fontFamily: "Causten-SemiBold",
    textAlign: "center",
  },
});
