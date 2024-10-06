import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Image,
  FlatList,
  Button,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
const SecondPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track the active icon index
  const [date, setDate] = useState<Date>(new Date(1598051730000));
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState<boolean>(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShow(false);
  };

  const showMode = (currentMode: "date" | "time") => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const data = [
    {
      name: "Food",
      uri: "https://img.icons8.com/?size=100&id=vkfmsvBD0PPO&format=png&color=000000",
    },
    {
      name: "Party",
      uri: "https://img.icons8.com/?size=100&id=vkfmsvBD0PPO&format=png&color=000000",
    },
    {
      name: "Rent",
      uri: "https://img.icons8.com/?size=100&id=vkfmsvBD0PPO&format=png&color=000000",
    },
    {
      name: "Travel",
      uri: "https://img.icons8.com/?size=100&id=vkfmsvBD0PPO&format=png&color=000000",
    },
    {
      name: "Eating out",
      uri: "https://img.icons8.com/?size=100&id=vkfmsvBD0PPO&format=png&color=000000",
    },
  ];

  const renderCircleItem = ({
    item,
    index,
  }: {
    item: { name: string; uri: string };
    index: number;
  }) => (
    <TouchableOpacity
      onPress={() => setActiveIndex(index)} // Set the active index on press
      className="items-center w-1/4 mb-4"
      activeOpacity={0.7} // Adjust opacity when pressed
    >
      {/* Circle with image */}
      <View
        className={`w-16 h-16 rounded-full bg-black justify-center items-center mb-2 ${
          activeIndex === index ? "opacity-100" : "opacity-70"
        }`} // Change opacity based on active index
      >
        <Image
          source={{ uri: item.uri }}
          className={`w-10 h-10 ${activeIndex === index ? "scale-110" : ""}`} // Scale image when active
          resizeMode="contain" // Ensure the image fits inside the circle without stretching
        />
      </View>
      {/* Name below the circle */}
      <Text className="text-center text-white text-xs font-bold">
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <LinearGradient
        className="flex-1"
        colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
      >
        <SafeAreaView className="flex-1 mx-5 my-12 ">
          <Text className="text-center text-white first-letter font-bold text-1xl">
            Track expenses
          </Text>
          {/* Flex-row for tabs */}
          <View className="flex-row justify-between mt-4">
            {/* Income Tab */}
            <TouchableOpacity
              style={{ flex: 1, marginRight: 10 }} // Add margin for spacing
              className="bg-black bg-opacity-50 p-2 rounded-lg"
            >
              <Text className="text-center text-white font-bold text-1xl">
                Income
              </Text>
            </TouchableOpacity>

            {/* Expenses Tab */}
            <TouchableOpacity
              style={{ flex: 1, marginLeft: 10 }} // Add margin for spacing
              className="bg-black bg-opacity-50 p-2 rounded-lg"
            >
              <Text className="text-center text-white font-bold text-1xl">
                Expenses
              </Text>
            </TouchableOpacity>
          </View>
          {/* Rendering icons in 4-column grid */}
          <View className="flex-row flex-wrap justify-between mt-6">
            {data.map((item, index) => renderCircleItem({ item, index }))}
          </View>

          <Button onPress={showDatepicker} title="Show date picker!" />
          <Button onPress={showTimepicker} title="Show time picker!" />
          <Text>Selected: {date.toLocaleString()}</Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default SecondPage;
