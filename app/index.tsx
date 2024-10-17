import {
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import beachImage from "@/assets/meditation-images/beach.webp";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

const App = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const handleEditItem = (index: number) => {
    setSelectedItemIndex(index);
    setEditMode(true);
  };

  const handleExitEditMode = () => {
    setEditMode(false);
    setSelectedItemIndex(null);
  };

  interface Transaction {
    id: string;
    created_at: string;
    description: string;
    trasaction: string; // Typo: should be 'transaction'
    updated_at: string;
    type: string;
  }

  let json = {
    income: "2,000.45",
    expenses: "1,000.45",
    balance: "1,000.45",
    transactions: [
      {
        id: "1",
        created_at: "2024-09-30 00:00:00",
        description: "me lo meketie",
        trasaction: "55",
        updated_at: "2024-09-30 00:00:00",
        type: "income",
      },
      {
        id: "2",
        created_at: "2024-09-30 00:00:00",
        description: "me lo meketie",
        trasaction: "55",
        updated_at: "2024-09-30 00:00:00",
        type: "income",
      },
      {
        id: "3",
        created_at: "2024-09-30 00:00:00",
        description: "me lo meketie",
        trasaction: "55",
        updated_at: "2024-09-30 00:00:00",
        type: "income",
      },
      {
        id: "4",
        created_at: "2024-09-30 00:00:00",
        description: "me lo meketie",
        trasaction: "55",
        updated_at: "2024-09-30 00:00:00",
        type: "income",
      },
      {
        id: "5",
        created_at: "2024-09-29 00:00:00",
        description: "salario",
        trasaction: "55",
        updated_at: "2024-09-29 00:00:00",
        type: "expenses",
      },
      {
        id: "6",
        created_at: "2024-09-28 00:00:00",
        description: "negocios ilicitos",
        trasaction: "55",
        updated_at: "2024-09-28 00:00:00",
        type: "income",
      },
      {
        id: "7",
        created_at: "2024-09-28 00:00:00",
        description: "negocios ilicitos",
        trasaction: "55",
        updated_at: "2024-09-28 00:00:00",
        type: "income",
      },
      {
        id: "8",
        created_at: "2024-09-28 00:00:00",
        description: "negocios ilicitos",
        trasaction: "55",
        updated_at: "2024-09-28 00:00:00",
        type: "income",
      },
      {
        id: "9",
        created_at: "2024-09-28 00:00:00",
        description: "negocios ilicitos",
        trasaction: "55",
        updated_at: "2024-09-28 00:00:00",
        type: "income",
      },
      {
        id: "10",
        created_at: "2024-09-28 00:00:00",
        description: "negocios ilicitos",
        trasaction: "55",
        updated_at: "2024-09-28 00:00:00",
        type: "income",
      },
      {
        id: "11",
        created_at: "2024-09-28 00:00:00",
        description: "negocios ilicitos",
        trasaction: "55",
        updated_at: "2024-09-28 00:00:00",
        type: "income",
      },
      {
        id: "12",
        created_at: "2024-09-28 00:00:00",
        description: "negocios ilicitos",
        trasaction: "55",
        updated_at: "2024-09-28 00:00:00",
        type: "income",
      },
    ],
  };

  const groupAndSortTransactions = (transactions: Transaction[]) => {
    const grouped = transactions.reduce<Record<string, Transaction[]>>(
      (acc, curr) => {
        const date = curr.created_at.split(" ")[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
      },
      {}
    );

    return Object.entries(grouped)
      .map(([date, trans]) => ({
        date,
        transactions: trans.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const sortedGroupedTransactions = groupAndSortTransactions(json.transactions);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const renderGroup = ({
    item,
  }: {
    item: { date: string; transactions: Transaction[] };
  }) => (
    <View style={{ marginBottom: 20 }}>
      <Text className="text-white font-bold text-2xl">
        {formatDate(item.date)}
      </Text>
      {item.transactions.map((transaction) => (
        <View
          key={transaction.id}
          className="bg-black bg-opacity-50 p-2 rounded-lg mb-2 flex-row"
        >
          <Text className="text-white font-bold">
            {transaction.description}
          </Text>
          <Text
            className={`font-bold ml-2 ${
              transaction.type === "income" ? "text-green-500" : "text-red-500"
            }`}
          >
            ${transaction.trasaction}
          </Text>
        </View>
      ))}
    </View>
  );

  const router = useRouter();

  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <LinearGradient
          className="flex-1"
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
        >
          <SafeAreaView className="flex-1 mx-5 my-12 justify-between">
            <View className="flex-row justify-between">
              {/* Income, Expenses, Balance Views */}
              {/* Omitted for brevity */}
            </View>
            <View className="flex-1 mt-6">
              <FlatList
                data={sortedGroupedTransactions}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => handleEditItem(index)}>
                    {renderGroup({ item })}
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => item.date + index.toString()} // Unique keys based on date
              />
            </View>

            <View className="items-end justify-end p-4">
              {editMode ? (
                <View className="flex-row">
                  <TouchableOpacity
                    onPress={() => {
                      // Your save logic here
                    }}
                    className="bg-green-500 rounded-full w-14 h-14 items-center justify-center shadow-lg mr-4"
                  >
                    <Text className="text-white font-bold text-3xl">✔</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleExitEditMode}
                    className="bg-red-500 rounded-full w-14 h-14 items-center justify-center shadow-lg"
                  >
                    <Text className="text-white font-bold text-3xl">✖</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => router.push("/secondpage")} // Replace with your add action
                  className="bg-blue-500 rounded-full w-14 h-14 items-center justify-center shadow-lg"
                >
                  <Text className="text-white font-bold text-3xl">+</Text>
                </TouchableOpacity>
              )}
            </View>
            <StatusBar style="light" />
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default App;
