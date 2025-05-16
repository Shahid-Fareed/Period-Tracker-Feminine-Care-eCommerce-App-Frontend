import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";

const { height, width } = Dimensions.get("window");

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from({ length: 2000 }, (_, i) => 1900 + i); // 2000–2049
const days = Array.from({ length: 31 }, (_, i) => i + 1); // 1–31

const CustomeDatePicker = ({ value, onConfirm, onCancel }) => {
  const [selectedDay, setSelectedDay] = useState(8);
  const [selectedMonth, setSelectedMonth] = useState("April");
  const [selectedYear, setSelectedYear] = useState(2025);

  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const renderItem = (item, selected, onPress) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={[styles.text, selected && styles.selectedText]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Selected Date Display */}
      <Text style={styles.selectedDate}>
        Selected: {selectedDay} {selectedMonth} {selectedYear}
      </Text>
      <TouchableOpacity onPress={onCancel} style={{ position: "absolute", top: 15, right: 30 }}>
        <Entypo name="circle-with-cross" size={22} color="#919191" />
      </TouchableOpacity>
      <View style={styles.pickerContainer}>
        {/* Days */}
        <FlatList
          data={days}
          ref={dayRef}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          initialScrollIndex={days.indexOf(selectedDay)}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.y / ITEM_HEIGHT
            );
            setSelectedDay(days[index]);
          }}
          renderItem={({ item }) =>
            renderItem(item, item === selectedDay, () => setSelectedDay(item))
          }
          style={styles.column}
        />

        {/* Months */}
        <FlatList
          data={months}
          ref={monthRef}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          initialScrollIndex={months.indexOf(selectedMonth)}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.y / ITEM_HEIGHT
            );
            setSelectedMonth(months[index]);
          }}
          renderItem={({ item }) =>
            renderItem(item, item === selectedMonth, () =>
              setSelectedMonth(item)
            )
          }
          style={styles.column}
        />

        {/* Years */}
        <FlatList
          data={years}
          ref={yearRef}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          initialScrollIndex={years.indexOf(selectedYear)}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.y / ITEM_HEIGHT
            );
            setSelectedYear(years[index]);
          }}
          renderItem={({ item }) =>
            renderItem(item, item === selectedYear, () => setSelectedYear(item))
          }
          style={styles.column}
        />
      </View>

      <TouchableOpacity
        style={styles.todayButton}
        onPress={() => {
          const selectedDate = new Date(
            `${selectedYear}-${
              months.indexOf(selectedMonth) + 1
            }-${selectedDay}`
          );
          onConfirm(selectedDate);
        }}
      >
        <Text style={styles.todayText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomeDatePicker;

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: "#fff",
    height: height * 0.35,
    position: "absolute",
    bottom: 0,
    // paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  column: {
    flex: 1,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#888",
  },
  selectedText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
  },

  todayButton: {
    marginTop: 15,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  todayText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
