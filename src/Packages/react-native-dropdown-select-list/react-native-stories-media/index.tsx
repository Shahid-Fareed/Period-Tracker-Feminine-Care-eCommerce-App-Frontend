import React, { useRef, useState, useEffect } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { StoryType } from "./src";
import Toast from 'react-native-toast-message'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation'

import StoryContainer from "./src/StoryContainer";

import { ActivityIndicator } from "react-native";
import moment from "moment";

type Props = {
  data: StoryType[];
  containerAvatarStyle?: StyleSheet.Styles;
  avatarStyle?: StyleSheet.Styles;
  titleStyle?: StyleSheet.Styles;
  textReadMore?: string;
};

const Stories = (props: Props) => {
  const [isModelOpen, setModel] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);


  const [symptomInStorage,setSymptomInStorage] = useState([])
  
  

  useEffect(() => {
    AsyncStorage.getItem("SelectedSymptomsOfDay").then((value) => {
      setSymptomInStorage(JSON.parse(value));
    });
    
  }, [])
  
  
  
  const modalScroll = useRef(null);

  const onStorySelect = (item, index) => {

    AsyncStorage.setItem("SelectedSymptomsOfDay", JSON.stringify({
      data: item.title,
      date: moment().format("DD/MM/YYYY"),
    }))
    

    setSelectedItemIndex(index); // Set the index of the selected item

  // Perform other actions or logic here

  setTimeout(() => {
    setSelectedItemIndex(-1); // Reset the selected item index after a delay (replace this with your actual logic)
  }, 2000); // Replace 2000 with the desired delay in milliseconds



    props.handleOnPressSymtoms(item);
    setCurrentUserIndex(index);
    // setModel(true)

    console.log("Hi")

   

    if (item.stories.length > 0) {
      // Toast.show({
      //   type: 'success',
      //   text1: 'The symptom has been marked successfully.'
      // });
    }
    else {
      // Toast.show({
      //   type: 'success',
      //   text1: 'The symptom has been marked successfully.'
      // });
    }
  };
  const onStoryClose = () => {
    setModel(false);
  };

  const onStoryNext = (isScroll: boolean) => {
    setModel(false);
    // const newIndex = currentUserIndex + 1;
    // if (props.data.length - 1 > currentUserIndex) {
    //   setCurrentUserIndex(newIndex);
    //   if (!isScroll) {
    //     //erro aqui
    //     try {
    //       modalScroll.current.scrollTo(newIndex, true);
    //     } catch (e) {
    //       console.warn("error=>", e);
    //     }
    //   }
    // } else {
    //   setModel(false);
    // }
  };

  const onStoryPrevious = (isScroll: boolean) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };

  const onScrollChange = (scrollValue) => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious(false);
      setCurrentScrollValue(scrollValue);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <FlatList
          data={props.data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          renderItem={({ item, index }) => (

            <View style={styles.boxStory}>
              

              {selectedItemIndex === index ? (
                <View style={{ alignItems: "center", marginTop:30 }}>
                  <ActivityIndicator size="large" color="#9E1A97" style={{ alignItems: "center" }} />
                </View>
                ) : (
              <TouchableOpacity onPress={() => onStorySelect(item, index)} style={{ alignItems: "center" }}>
                <View style={[styles.superCircle, props.containerAvatarStyle,]}>
                  <Image
                    style={[styles.circle, props.avatarStyle]}
                    resizeMode="contain"
                    source={{ uri: item?.profile }}
                  />
                </View>


                {/* { } */}
                

                <Text allowFontScaling={false} style={[styles.title, props.titleStyle]}>
                  {item?.title?.split(" ")[0]}
                  {item?.title?.split(" ")[1] ? (
                    <>
                      {"\n"}
                      {item.title?.split(" ")[1]}
                    </>
                  ) : null}
                  {item?.title?.split(" ")[2] ? (
                    <>
                      {"\n"}
                      {item.title?.split(" ")[2]}
                    </>
                  ) : null}
                </Text>
              </TouchableOpacity>
              )}
              
            </View>
          )}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll.current.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}
      >
        <CubeNavigationHorizontal
          callBackAfterSwipe={(g) => onScrollChange(g)}
          ref={modalScroll}
          style={styles.container}
        >
          {props.data.map((item, index) => (
            <StoryContainer
              key={item.title}
              onClose={onStoryClose}
              onStoryNext={onStoryNext}
              onStoryPrevious={onStoryPrevious}
              dataStories={item}
              isNewStory={index !== currentUserIndex}
              textReadMore={props.textReadMore}
            />
          ))}
        </CubeNavigationHorizontal>
      </Modal>
    </View>
  );
};

const styles = new StyleSheet.create({
  boxStory: {
    marginHorizontal: 10,
    // width: widthPercentageToDP("18.5%")
  },
  ItemSeparator: { height: 1, backgroundColor: "#ccc" },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingBottom: 5,
  },
  circle: {
    width: 60, height: 100,

    // backgroundColor:""
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "#9b2890",
  },
  superCircle: {
    // borderWidth: 3,
    // borderColor: "blue",
    // borderRadius: 60,
  },
  modal: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    marginTop: -5,
    textAlign: "center",
    fontFamily: "Causten-Medium",
    color: "#9b2890",
  },
});

export default Stories;
