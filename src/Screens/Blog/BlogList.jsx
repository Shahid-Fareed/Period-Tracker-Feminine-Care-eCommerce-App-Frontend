import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Contants/Colors";
import UserServices from "../../Services/UserService";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";
import LoaderComponent from "../../Reuseable/LoaderComponent";

const BlogList = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limitData] = useState(10);
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoriesFlatListData, setCategoriesFlatListData] = useState([]);
  const [blogsPageData, setBlogsPageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const flatListRef = useRef(null);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1); // Reset to first page
    getAllPosts(true); // Fetch new data
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("customerId").then((value) => {
        TrackUserActivity(value, "Blog List Screen", "On Screen");
      });
    }, [navigation])
  );

  useEffect(() => {
    UserServices.getAllCategories()
      .then((res) => {
        let Categories = [
          {
            _id: 1,
            colourCode: Colors.PrimaryOne,
            imageUrl: null,
            name: "All",
            value: "",
          },
        ];

        res.items.forEach((element) => {
          Categories.push({
            _id: element._id,
            colourCode: element.colourCode,
            imageUrl: element.imageUrl,
            name: element.name,
            value: element.value,
          });
        });
        setCategoriesFlatListData(Categories);
      })
      .catch((error) => console.log(error.message));
  }, [navigation]);

  useEffect(() => {
    setCurrentPage(1); // Reset page when filters change
    getAllPosts(true);
  }, [input, selectedCategory]);

  const getAllPosts = (reset = false) => {
    if (isLoading || loadingMore) return; // Prevent duplicate API calls

    reset ? setIsLoading(true) : setLoadingMore(true);

    UserServices.getAllPosts({
      page: reset ? 1 : currentPage,
      limit: limitData,
      category: selectedCategory,
      title: input,
    })
      .then((res) => {
        if (reset) {
          setBlogsPageData(res.blogsData);
        } else {
          setBlogsPageData((prevData) => [...prevData, ...res.blogsData]);
        }
        setCurrentPage((prevPage) => prevPage + 1);
        setIsLoading(false);
        setLoadingMore(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
        setLoadingMore(false);
      });
  };

  const handleLoadMore = () => {
    if (!loadingMore) {
      getAllPosts();
    }
  };

  // POSTS RENDER
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          marginBottom: wp("5"),
          marginHorizontal: wp(4),
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("BlogsDetailsScreen", {
              blog: item,
            })
          }
        >
          <ImageBackground
            source={{ uri: item.image }}
            style={{
              width: wp("40"),
              height: wp("50"),
            }}
            resizeMode="cover"
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={styles.backgroundShade}>
              <Text style={{ ...styles.blogText, color: Colors.White }}>
                {item.title ? item.title : ""}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
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
            borderWidth: 1,
            borderColor: "#9b2890",
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
            intensity={0}
          />
          <Text
            style={{
              fontFamily: "Causten-SemiBold",
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
        <View
          style={{
            flexDirection: "row",
            opacity: 0.5,
            marginLeft: 10,
            alignItems: "center",
            backgroundColor: "transparent",
            borderWidth: 1,
            borderRadius: 15,
            marginRight: 20,
            paddingHorizontal: 10,
            paddingVertical: Platform.OS == "ios" ? 10 : 0,
            borderColor: "#9b2890",
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
            intensity={0}
          />
          <MaterialIcons name={"search"} size={20} color={"#000000"} />
          <TextInput
            style={styles.textinputsearch}
            placeholder="Search"
            onChangeText={(text) => {
              setInput(text);
            }}
            value={input}
          />
        </View>

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
          <FlatList
            ref={flatListRef}
            data={blogsPageData}
            renderItem={renderItem}
            keyExtractor={(item) => item?._id}
            numColumns={2}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loadingMore ? <ActivityIndicator size="small" /> : null
            }
            refreshing={refreshing} // Pull-to-refresh state
            onRefresh={handleRefresh}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default BlogList;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    marginTop: 10,
  },

  textinputsearch: {
    flex: 1,
    paddingVertical: 5,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Causten-Bold",
  },
  viewHeading: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: "space-around",
  },
  backgroundShade: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    opacity: 0.7,
    bottom: 0,
    position: "absolute",
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    padding: 5,
  },
  blogText: {
    alignSelf: "center",
    fontSize: 12,
    color: Colors.Black,
    textAlign: "center",
    fontFamily: "Causten-Medium",
    flex: 1,
  },
});
