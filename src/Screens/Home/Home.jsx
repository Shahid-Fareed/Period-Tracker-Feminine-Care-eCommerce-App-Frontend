import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../Contants/Colors";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserServices from "../../Services/UserService";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import PromotionModel from "../../Reuseable/PromotionModel";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";
import PromotionModeliOS from "../../Reuseable/PromotionModeliOS";

const Home = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [cycleDay, setCycleDay] = useState("");
  const [date_day, setDate_day] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [customerId, setCustomerId] = useState(null);

  const [promotionImage, setPromotionImage] = useState("");

  const [SubscrtiptionStatus, setSubscrtiptionStatus] = useState(true);

  useEffect(() => {
    getActivePromotions();
  }, []);

  const [showPromotion, setShowPromotion] = useState(true);

  const checkSub = (id) => {
    UserServices.checkSubscrtiption(id)
      .then((res) => {
        if (res == []) {
          setSubscrtiptionStatus(false);
        } else {
          setSubscrtiptionStatus(true);
        }
      })
      .catch((err) => console.log(err));
  };

  useFocusEffect(
    React.useCallback(() => {
      var daysInMonth = getDaysArray(
        moment(new Date()).format("YYYY"),
        moment(new Date()).format("MM")
      );
      setDate_day(daysInMonth);

      setCurrentDate(moment().format("YYYY-MM-DD"));

      AsyncStorage.getItem("customerId").then((value) => {
        getDefaultAddress(JSON.parse(value));
        GetAllMenstruationDetailsbyUniqueKey(JSON.parse(value));
        getData(JSON.parse(value));
        checkSub(JSON.parse(value));
        setCustomerId(JSON.parse(value));

        TrackUserActivity(value, "Home Screen", "ON-Screen");
      });
    }, [navigation])
  );

  const getData = (customerId) => {
    UserServices.getDefaultAddress(customerId)
      .then((res) => {
        // console.log(res);
        if (res) {
          AsyncStorage.setItem("DefaultShippingAddress", JSON.stringify(true));
        } else {
          AsyncStorage.setItem("DefaultShippingAddress", JSON.stringify(false));
        }
      })
      .catch((err) => console.log(err));
  };

  const getDefaultAddress = (customerId) => {
    UserServices.getDefaultAddress(customerId)
      .then((res) => {
        if (res) {
          const data = {
            _id: res._id,
            customerId: res.customerId,
            name: res.name,
            address: res.address,
            city: res.city,
            state: res.state,
            zipCode: res.zipCode,
            country: res.country,
            email: res.email,
            isDefault: res.isDefault,
            createdAt: res.createdAt,
            updatedAt: res.updatedAt,
          };
          AsyncStorage.setItem("ShippingAddress", JSON.stringify(data));
        }
      })
      .catch((err) => console.log(err));
  };

  const getDaysArray = (year, month) => {
    var monthIndex = month - 1; // 0..11 instead of 1..12
    var names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var date = new Date(year, monthIndex, 1);

    var result = [];
    var daysRes = [];
    while (date.getMonth() == monthIndex) {
      var day = ("0" + date.getDate()).slice(-2); // add leading zero to single-digit dates
      if (
        moment(new Date()).format("DD-MM-YYYY") ==
        moment(date).format("DD-MM-YYYY")
      ) {
        daysRes.push({
          date: day,
          day: names[date.getDay()],
          isToday: true,
        });
      } else {
        daysRes.push({
          date: day,
          day: names[date.getDay()],
          isToday: false,
        });
      }
      result.push(daysRes);
      date.setDate(date.getDate() + 1);
      daysRes = [];
    }
    return result;
  };

  function getActivePromotions() {
    UserServices.getActivePromotions()
      .then((res) => {
        // console.log("dsadasdasdas", res);
        setPromotionImage(res.image);
      })
      .catch((err) => console.log(err));
  }

  const renderItem = ({ item, index }) => {
    return (
      <>
        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingTop: 8,
            paddingBottom: 8,
            borderTopColor: "#fbbcd4",
            borderBottomColor: "#fbbcd4",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.dateCardContainer}
            onPress={() =>
              setCurrentDate(moment(item[0].date, "DD").format("YYYY-MM-DD"))
            }
          >
            <Text
              allowFontScaling={false}
              style={[
                item[0].isToday
                  ? {
                      alignItems: "center",
                      fontSize: 18,
                      color: "#e82174",
                      fontFamily: "Causten-Black",
                      textTransform: "capitalize",
                    }
                  : {
                      alignItems: "center",
                      fontSize: 18,
                      color: "#9b2890",
                      fontFamily: "Causten-Black",
                      textTransform: "capitalize",
                    },
              ]}
            >
              {item[0].date}
            </Text>

            <Text
              allowFontScaling={false}
              style={[
                item[0].isToday
                  ? {
                      alignItems: "center",
                      fontSize: 12,
                      color: "#e82174",
                      fontFamily: "Causten-Medium",
                      textTransform: "capitalize",
                    }
                  : {
                      alignItems: "center",
                      fontSize: 12,
                      color: "#9b2890",
                      fontFamily: "Causten-Medium",
                      textTransform: "capitalize",
                    },
              ]}
            >
              {item[0].day}
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const getItemLayout = (data, index) => ({
    length: 50,
    offset: 20 * index,
    index,
  });

  const GetAllMenstruationDetailsbyUniqueKey = (name) => {
    setIsLoading(true);
    UserServices.GetAllMenstruationDetailsbyUniqueKey(currentDate, name)
      .then((res) => {
        setCycleDay(res);
        setIsLoading(false);
        // console.log(res);
      })
      .catch((error) => console.log(error.message));
  };

  const handlePromotionVisibility = () => {
    setShowPromotion(false);
  };

  useEffect(() => {
    const checkPromotionShown = async () => {
      try {
        const value = await AsyncStorage.getItem("promotionShown");
        if (value === "true") {
          setShowPromotion(false);
        }
      } catch (error) {
        console.log(
          "Error retrieving promotionShown value from AsyncStorage:",
          error
        );
      }
    };

    checkPromotionShown();
  }, []);

  useEffect(() => {
    const storePromotionShown = async () => {
      try {
        await AsyncStorage.setItem("promotionShown", "true");
      } catch (error) {
        console.log(
          "Error storing promotionShown value in AsyncStorage:",
          error
        );
      }
    };

    if (!showPromotion) {
      storePromotionShown();
    }
  }, [showPromotion]);

  // console.log("showPromotion", showPromotion);

  return (
    <>
      {showPromotion ? (
        Platform.OS == "ios" ? (
          <PromotionModeliOS
            onClose={handlePromotionVisibility}
            imageUrl={promotionImage}
          />
        ) : (
          <PromotionModel
            onClose={handlePromotionVisibility}
            imageUrl={promotionImage}
          />
        )
      ) : null}

      <LinearGradient
        colors={["#f6d9a9", "#f9d8b7", "#facdc8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.6, y: 0.6 }}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: Platform.OS === "ios" ? 20 : 0,
            margin: 10,
          }}
        >
          <SafeAreaView style={styles.screen}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                // marginTop: Platform.OS == "ios" ? -53 : -25,
                marginTop: Platform.OS == "ios" ? -53 : -25,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "Causten-Black",
                  fontSize: 20,
                  color: "#9b2890",
                }}
              >
                {moment().format("MMMM").toUpperCase()}
              </Text>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={date_day}
              renderItem={renderItem}
              focusable={true}
              keyExtractor={(item) => item[0].date}
              getItemLayout={getItemLayout}
              style={{ flexGrow: 1 }}
            />
            <View style={styles.mainContainer}>
              <ImageBackground
                style={[
                  styles.heartBg,
                  {
                    marginBottom: wp(-8),
                  },
                ]}
                source={require("../../../assets/resources/homeHeart.png")}
              >
                <View
                  style={{
                    paddingTop: 75,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text allowFontScaling={false} style={styles.CycleDateText}>
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#9b2890" />
                    ) : (
                      cycleDay
                    )}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Symptoms", {
                        title: cycleDay,
                        date: moment().format("YYYY-MM-DD"),
                      })
                    }
                  >
                    <Text
                      allowFontScaling={false}
                      style={styles.CycleDateText2}
                    >
                      Mark Symptoms
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("PeriodEdit")}
                  >
                    <Text allowFontScaling={false} style={styles.buttonText}>
                      Edit Period Date
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
              <View
                style={{
                  backgroundColor: "transparent",
                  borderRadius: 8,
                  width: wp(85),
                  height: hp(7),
                  justifyContent: "center",
                  paddingHorizontal: 15,
                  marginBottom: Platform.OS === "ios" ? wp(4) : wp(10),
                  marginTop: Platform.OS === "ios" ? wp(2) : wp(3),
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
                    overflow: "hidden",
                  }}
                  blurType="light"
                  intensity={Platform.OS === "ios" ? 0 : 90}
                  borderWidth={0.6}
                  borderRadius={8}
                  borderColor={"#fff"}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Causten-Bold",
                    color: "#9b2890",
                    marginBottom: 1,
                  }}
                >
                  Free Shipping
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "Causten-Medium",
                    color: "#9b2890",
                    width: wp(50),
                    marginBottom: 2,
                  }}
                >
                  Load up your cart with your favourite products and enjoy FREE
                  shipping now!
                </Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity
                  activeOpacity={6}
                  onPress={() => {
                    SubscrtiptionStatus === true
                      ? navigation.navigate("Subscription")
                      : navigation.navigate("Subscription");
                    TrackUserActivity(
                      customerId,
                      "Home Screen",
                      "Subscribe Product is Pressed"
                    );
                  }}
                >
                  <LinearGradient
                    colors={["#f9ddc7", "#f9d1c1"]}
                    start={{ x: 0, y: 0.3 }}
                    end={{ x: 0.6, y: 0.6 }}
                    style={{
                      width: wp("25%"),
                      height: wp("35%"),
                      borderRadius: 15,
                      marginHorizontal: wp(2),
                      marginVertical: wp(2),
                      padding: wp(3),
                      borderWidth: 0.4,
                      borderRadius: 8,
                      borderColor: "#FFF",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../../../assets/resources/tab-bell.png")}
                      resizeMode="stretch"
                      style={styles.blogcardImg}
                    />
                    <Text allowFontScaling={false} style={styles.blogText}>
                      Subscribe{"\n"}Product
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation.navigate("Products");
                    TrackUserActivity(
                      customerId,
                      "Home Screen",
                      "Shop Now is Pressed"
                    );
                  }}
                >
                  <LinearGradient
                    colors={["#f9ddc7", "#f9d1c1"]}
                    start={{ x: 0, y: 0.3 }}
                    end={{ x: 0.6, y: 0.6 }}
                    style={{
                      width: wp("25%"),
                      height: wp("35%"),
                      borderRadius: 15,
                      marginHorizontal: wp(2),
                      marginVertical: wp(2),
                      padding: wp(3),
                      borderWidth: 0.4,
                      borderRadius: 8,
                      borderColor: "#FFF",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../../../assets/resources/tab-cart.png")}
                      resizeMode="stretch"
                      style={styles.blogcardImg}
                    />
                    <Text allowFontScaling={false} style={styles.blogText}>
                      Shop{"\n"}Now
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation.navigate("BlogList");
                    TrackUserActivity(
                      customerId,
                      "Home Screen",
                      "News & Updates is Pressed"
                    );
                  }}
                >
                  <LinearGradient
                    colors={["#f6d9a9", "#f9d1c1"]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0.6, y: 0.6 }}
                    style={{
                      width: wp("25%"),
                      height: wp("35%"),
                      borderRadius: 15,
                      marginHorizontal: wp(2),
                      marginVertical: wp(2),
                      padding: wp(3),
                      borderWidth: 0.4,
                      borderRadius: 8,
                      borderColor: "#FFF",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../../../assets/resources/tab-blogs.png")}
                      resizeMode="stretch"
                      style={styles.blogcardImg}
                    />
                    <Text allowFontScaling={false} style={styles.blogText}>
                      News &{"\n"}Updates
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </SafeAreaView>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  dateCardContainer: {
    width: wp(8),
    height: wp(13),
    borderRadius: 100,
    marginHorizontal: wp(3),
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    alignItems: "center",
    fontSize: 17,
    color: Colors.Black,
    fontFamily: "Causten-Black",
    textTransform: "capitalize",
  },
  cardText2: {
    alignItems: "center",
    fontSize: 16,
    color: Colors.Black,
    fontFamily: "Causten-Bold",
    textTransform: "capitalize",
  },
  mainContainer: {
    flex: 7,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  heartBg: {
    resizeMode: "contain",
    width: wp("100%"),
    height: hp("41%"),
    alignItems: "center",
  },
  CycleDateText: {
    color: Colors.SecondaryOne,
    fontFamily: "Causten-Black",
    fontSize: 21,
    paddingBottom: 20,
  },
  CycleDateText2: {
    color: "#9b2890",
    fontFamily: "Causten-Medium",
    fontSize: 16,
  },
  button: {
    marginTop: 13,
    backgroundColor: "#9b2890",
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "Causten-Medium",
    fontSize: 15,
    color: "#fff",
  },
  TickerImage: {
    width: wp("83%"),
    resizeMode: "contain",
    marginBottom: wp(-10),
    marginTop: wp(-24),
  },
  catlogRow: {
    flexDirection: "row",
  },
  blogCardContainer: {
    width: wp("25%"),
    height: wp("35%"),
    backgroundColor: "transparent",
    borderRadius: 15,
    marginHorizontal: wp(2),
    padding: wp(3),
  },
  blogText: {
    alignItems: "center",
    color: "#9b2890",
    textAlign: "center",
    fontFamily: "Causten-Regular",
    fontSize: 15,
    lineHeight: 18,
  },
  blogcardImg: {
    width: wp(14),
    height: wp(14),
    resizeMode: "contain",
    alignSelf: "center",
    margin: 5,
    bottom: wp(2.5),
  },
});
