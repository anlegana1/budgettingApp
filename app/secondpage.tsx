import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useNavigation, useRouter } from "expo-router";
const SecondPage = () => {
  const [selectedType, setSelectedType] = useState("Income");
  const navigation = useNavigation(); // Use navigation for back functionality

  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track the active icon index
  const [date, setDate] = useState(new Date());
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

  const router = useRouter();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
        <LinearGradient
          className="flex-1"
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]} // Gradient overlay
        >
          <SafeAreaView className="flex-1 mx-5 my-12 justify-between">
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => navigation.goBack()} // Go back to the previous screen
              className="absolute top-5 left-5"
            >
              <Text className="text-white font-bold text-xl">← Back</Text>
            </TouchableOpacity>

            {/* Title */}
            <Text className="text-center text-white font-bold text-2xl mb-6 mt-10">
              Add Transaction
            </Text>
            {/* Scrollable View */}
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ justifyContent: "space-between" }}
              onScrollBeginDrag={Keyboard.dismiss} // Dismiss keyboard on scroll
              scrollEventThrottle={16} // Smooth scrolling
            >
              {/* Type Picker */}
              <View className="mb-4 bg-black bg-opacity-50 p-4 rounded-lg">
                <Text className="text-white font-semibold text-lg mb-2">
                  Type
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setSelectedType(
                      selectedType === "Income" ? "Expenses" : "Income"
                    )
                  }
                  className="bg-gray-800 p-3 rounded-md"
                >
                  <Text className="text-white text-center">{selectedType}</Text>
                </TouchableOpacity>
              </View>
              {/* Description Input */}
              <View className="mb-4 bg-black bg-opacity-50 p-4 rounded-lg">
                <Text className="text-white font-semibold text-lg mb-2">
                  Description
                </Text>
                <TextInput
                  placeholder="Enter description"
                  placeholderTextColor="#aaa"
                  className="bg-gray-800 text-white rounded-md p-3"
                />
              </View>

              {/* Amount Input */}
              <View className="mb-4 bg-black bg-opacity-50 p-4 rounded-lg">
                <Text className="text-white font-semibold text-lg mb-2">
                  Amount
                </Text>
                <TextInput
                  placeholder="Enter amount"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  className="bg-gray-800 text-white rounded-md p-3"
                />
              </View>

              {/* Date Picker */}
              <View className="mb-4 bg-black bg-opacity-50 p-4 rounded-lg">
                <Text className="text-white font-semibold text-lg mb-2">
                  Date
                </Text>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="datetime"
                  display="default"
                  onChange={onChange}
                />
              </View>

              {/* Floating Action Button */}
              <View className="flex-1 items-end justify-end p-4">
                <TouchableOpacity
                  onPress={() => alert("Transaction Added!")}
                  className="bg-blue-500 rounded-full w-14 h-14 items-center justify-center shadow-lg"
                >
                  <Text className="text-white font-bold text-3xl">+</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SecondPage;
