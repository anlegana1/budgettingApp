import {
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import beachImage from "@/assets/meditation-images/beach.webp";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { createGetIdForRoute } from "expo-router/build/useScreens";
const App = () => {
  // Define la interfaz para la estructura de una transacción
  interface Transaction {
    created_at: string;
    description: string;
    trasaction: string;
    updated_at: string;
    type: string;
  }

  let json = {
    income: "2,000.45",
    expenses: "1,000.45",
    balance: "1,000.45",
    transactions: [
      {
        created_at: "2024-09-30 00:00:00",
        description: "me lo meketie",
        trasaction: "55",
        updated_at: "2024-09-30 00:00:00",
        type: "income",
      },
      {
        created_at: "2024-09-30 00:00:00",
        description: "me lo meketie",
        trasaction: "55",
        updated_at: "2024-09-30 00:00:00",
        type: "income",
      },
      {
        created_at: "2024-09-30 00:00:00",
        description: "me lo meketie",
        trasaction: "55",
        updated_at: "2024-09-30 00:00:00",
        type: "income",
      },
      {
        created_at: "2024-09-30 00:00:00",
        description: "me lo meketie",
        trasaction: "55",
        updated_at: "2024-09-30 00:00:00",
        type: "income",
      },
      {
        created_at: "2024-09-29 00:00:00",
        description: "salario",
        trasaction: "55",
        updated_at: "2024-09-29 00:00:00",
        type: "expenses",
      },
      {
        created_at: "2024-09-28 00:00:00",
        description: "negocios ilicitos",
        trasaction: "55",
        updated_at: "2024-09-28 00:00:00",
        type: "income",
      },
    ],
  };

  // Sort transactions by created_at date (newest first)
  const sorteedTransactions = json.transactions.sort((a, b) => {
    const dateA = new Date(a.updated_at).getTime();
    const dateB = new Date(b.updated_at).getTime();
    return dateB - dateA; // Sorting in descending order
  });

  // Función para agrupar y ordenar las transacciones
  const groupAndSortTransactions = (transactions: Transaction[]) => {
    const grouped = transactions.reduce<Record<string, Transaction[]>>(
      (acc, curr) => {
        const date = curr.created_at.split(" ")[0]; // Obtener solo la fecha (YYYY-MM-DD)
        if (!acc[date]) {
          acc[date] = []; // Inicializa si no existe
        }
        acc[date].push(curr); // Agrega la transacción al grupo
        return acc;
      },
      {}
    );

    // Convertir el objeto a un array y ordenar las fechas
    const groupedArray = Object.entries(grouped).map(([date, trans]) => ({
      date,
      transactions: trans.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ), // Ordenar transacciones por fecha dentro del grupo
    }));

    // Ordenar grupos por fecha
    return groupedArray.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ); // Ordenar grupos de fechas
  };
  // Usar la función para agrupar y ordenar transacciones
  const sortedGroupedTransactions = groupAndSortTransactions(json.transactions);
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };
  // Function to render each transaction
  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View>
      <View className="p-2">
        <Text className=" text-white first-letter font-bold text-1xl">
          <Text>{formatDate(item.created_at)}</Text>
        </Text>
      </View>
      <View className="bg-black bg-opacity-50 p-2 rounded-lg flex-row ">
        <Text className=" text-white first-letter font-bold text-1xl">
          {item.description}
        </Text>
        <Text className=" text-white first-letter font-bold text-1xl">
          {item.type}
        </Text>
        <Text
          className={`font-bold text-1xl ${
            item.type === "income" ? "text-green-500" : "text-red-500"
          }`}
        >
          ${item.trasaction}
        </Text>
      </View>
    </View>
  );

  // Función para renderizar cada grupo de transacciones
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
          /*   key={transaction.updated_at} */
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
              <View className="bg-black bg-opacity-50 p-2 rounded-lg">
                <Text className="text-center text-white first-letter font-bold text-1xl">
                  Income
                </Text>
                <View className="flex-row justify-between">
                  <Text className="text-center text-white first-letter font-bold text-1xl">
                    {json.income}
                  </Text>
                  <Image
                    source={{
                      uri: "https://img.icons8.com/?size=100&id=KGhSnVZPf0Vl&format=png&color=000000",
                    }} // Replace with your copied URL
                    style={{ width: 18, height: 18 }} // Set your desired size
                  />
                </View>
              </View>
              <View className="bg-black bg-opacity-50 p-2 rounded-lg">
                <Text className="text-center text-white first-letter font-bold text-1xl">
                  Expenses
                </Text>
                <View className="flex-row justify-between">
                  <Text className="text-center text-white first-letter font-bold text-1xl">
                    {json.expenses}
                  </Text>
                  <Image
                    source={{
                      uri: "https://img.icons8.com/?size=100&id=JMW5nWkMwm6N&format=png&color=000000",
                    }} // Replace with your copied URL
                    style={{ width: 18, height: 18 }} // Set your desired size
                  />
                </View>
              </View>
              <View className="bg-black bg-opacity-50 p-2 rounded-lg">
                <Text className="text-center text-white first-letter font-bold text-1xl">
                  Balance
                </Text>
                <View className="flex-row justify-between">
                  <Text className="text-center text-white first-letter font-bold text-1xl">
                    {json.balance}
                  </Text>
                  <Image
                    source={{
                      uri: "https://img.icons8.com/?size=100&id=vkfmsvBD0PPO&format=png&color=000000",
                    }} // Replace with your copied URL
                    style={{ width: 18, height: 18 }} // Set your desired size
                  />
                </View>
              </View>
            </View>
            <View className="flex-1 mt-6">
              <FlatList
                data={sortedGroupedTransactions}
                renderItem={renderGroup}
                keyExtractor={(item, index) => index.toString()} // Use index as key (not recommended for dynamic lists)
              />
            </View>

            <View className="flex-1 items-end justify-end p-4">
              <TouchableOpacity
                onPress={() => router.push("/secondpage")}
                className="bg-blue-500 rounded-full w-14 h-14 items-center justify-center shadow-lg"
              >
                <Text className="text-white font-bold text-3xl">+</Text>
              </TouchableOpacity>
            </View>
            {/*  <View>
              <CustomButton
                onPress={() => router.push("/test")}
                title="Get started"
              />
            </View> */}
            <StatusBar style="light" />
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default App;
