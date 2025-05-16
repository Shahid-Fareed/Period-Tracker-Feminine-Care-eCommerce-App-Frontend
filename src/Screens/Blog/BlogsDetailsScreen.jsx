import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import UserServices from "../../Services/UserService";
import Colors from "../../Contants/Colors";
import moment from "moment";
import RenderHTML from "react-native-render-html";
import { LinearGradient } from "expo-linear-gradient";
import LoaderComponent from "../../Reuseable/LoaderComponent";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const BlogsDetailsScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    GetAllBlogsWithBlogCategory();
    // setSource({ html: route.params.blog.description });
  }, [route.params]);
  const { width } = useWindowDimensions();

  const GetAllBlogsWithBlogCategory = () => {
    UserServices.PostById(route.params.blog._id)
      .then((res) => {
        setTitle(res.title);
        setSource(res.description);
        setImage(res.image);
        setCategory(res.category || res.categoryId);
        setCreatedAt(res.createdAt);
        setisloading(false);
        AsyncStorage.getItem("customerId").then((value) => {
          TrackUserActivity(
            value,
            "Blog Detail Screen",
            `Reading ${res.title}`
          );
        });
      })
      .catch((err) => {
        setisloading(false);
      });
  };

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {isloading ? <LoaderComponent isModalVisible={isloading} /> : null}
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: hp(30) }}>
            <Image
              source={{ uri: image }}
              style={{
                height: "100%",
                borderRadius: 10,
                margin: 5,
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              margin: 5,
              marginTop: 15,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                fontFamily: "Causten-Medium",
                color: "#9b2890",
                margin: 5,
                color: "#9b2890",
              }}
            >
              {category}
              {"\t"}
              {moment(createdAt).format("DD MMM, YYYY") ==
              "Invalid date" ? null : (
                <>
                  |{"\t"}
                  {moment(createdAt).format("DD MMM, YYYY")}
                </>
              )}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 20,
                fontWeight: "600",
                fontFamily: "Causten-Medium",
                color: "#9b2890",
                margin: 5,
              }}
            >
              {title}
            </Text>
          </View>

          <View style={{ paddingHorizontal: wp(2) }}>
            <RenderHTML
              contentWidth={width}
              source={{ html: source }}
              tagsStyles={{
                div: {
                  fontSize: 12,
                  marginLeft: 20,
                  marginRight: 5,
                  color: "#9b2890",
                },
                p: { color: "#9b2890", marginLeft: 10 },
                h1: { color: "#9b2890" },
                h2: { color: "#9b2890" },
                h3: { color: "#9b2890" },
                h4: { color: "#9b2890" },
                h5: { color: "#9b2890" },
                li: { color: "#9b2890" },
                ul: {
                  color: "#9b2890", // This will change the bullet color
                },
                li: {
                  color: "#9b2890", // This will change the text color of the list items
                },
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default BlogsDetailsScreen;
