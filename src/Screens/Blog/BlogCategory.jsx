import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import React from "react";
import Colors from "../../Contants/Colors";
import UserServices from "../../Services/UserService";
import { LinearGradient } from "expo-linear-gradient";
import LoaderComponent from "../../Reuseable/LoaderComponent";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackUserActivity from "../../Ayalatics/ActivityTracker";

const BlogCategory = ({ route, navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [blogsSearchedData, setBlogsSearchedData] = useState([]);
  const [response, setResponse] = useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:
        route.params.input.name == "Guides"
          ? route.params.input.name
          : route.params.input.name + " Blogs",
      headerBackTitle: "",
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("customerId").then((value) => {
        TrackUserActivity(value, "Blog Category Screen", "On Screen");
      });
    }, [navigation])
  );

  useEffect(() => {
    GetAllBlogByCategoriesId();
  }, []);

  const GetAllBlogByCategoriesId = () => {
    if (Platform.OD !== "ios") setModalVisible(true);
    UserServices.PostOfCategory(route.params.input.name)
      .then((res) => {
        var blogArr = [];
        res.items.forEach((element) => {
          blogArr.push(element);
        });
        if (res.totalCount > 0) {
          setBlogsSearchedData(blogArr);
          setModalVisible(false);
        } else {
          setModalVisible(false);
          setResponse("Data Not Found");
        }
      })
      .catch((err) => console.log(err.message));
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: wp(95 / 2),
            height: 250,
            marginTop: 5,
          }}
          onPress={() =>
            navigation.navigate("BlogsDetailsScreen", { blog: item })
          }
        >
          <ImageBackground
            source={{ uri: item.imageUrl }}
            imageStyle={{ borderRadius: 10 }}
            style={{
              flex: 1,
              justifyContent: "center",
              marginHorizontal: 5,
            }}
          >
            <View style={styles.backgroundShade}>
              <Text
                allowFontScaling={false}
                style={{ ...styles.blogText, color: Colors.White }}
              >
                {item.title ? item.title : ""}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flexGrow: 1, backgroundColor: "transparent" }}>
        {blogsSearchedData.length > 0 ? (
          <FlatList
            data={blogsSearchedData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            style={{
              flex: 1,
              padding: wp(3),
              paddingTop: 0,
              backgroundColor: "transparent",
            }}
            numColumns={2}
            scrollEnabled
          />
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 14,
                fontFamily: "Causten-Medium",
                textTransform: "capitalize",
                color: Colors.Background,
              }}
            >
              {response}
            </Text>
          </View>
        )}
        <LoaderComponent isModalVisible={isModalVisible} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default BlogCategory;

const styles = StyleSheet.create({});
