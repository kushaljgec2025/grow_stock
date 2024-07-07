import {
  Image,
  StyleSheet,
  Platform,
  Text,
  StatusBar,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import api from "../../api/function/api";
import { useDispatch, useSelector } from "react-redux";
import { GetTopGainersLosers, GetTopGainers } from "@/redux/store/apislice";
import { Link, router } from "expo-router";
import Data_notfound from "@/components/Data_notfound";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [topGainerLoser, setTopGainerLoser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataNotFound, setDataNotFound] = useState(false);
  const isDark = useColorScheme() === "dark";
  useEffect(() => {
    const fetchTopGainerLoser = async () => {
      try {
        const data = await api.top_gainer_loser();
        // console.log(data);
        if (data && (data.top_gainers?.length || data.top_losers?.length)) {
          dispatch(GetTopGainersLosers(data));
          setTopGainerLoser(data);
        } else {
          setDataNotFound(true);
        }
      } catch (error) {
        setDataNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTopGainerLoser();
  }, [dispatch]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={isDark ? "white" : "black"} />
        <ThemedText>Loading...</ThemedText>
      </SafeAreaView>
    );
  }

  if (dataNotFound) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Data_notfound />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar />
      {topGainerLoser && (
        <ScrollView>
          <ThemedView className="logo p-2 px-4 flex-row justify-start items-center space-x-4">
            <Image
              source={require("@/assets/images/icon.png")}
              className="w-12 h-12 rounded-full"
              alt="logo"
            />
            <View className="flex-col justify-center p-1">
              <ThemedText type="subtitle" className="text-green-500">
                GROW STOCK
              </ThemedText>
              <Text className="text-gray-400">Invest in your future</Text>
            </View>
          </ThemedView>
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            className="p-2 flex-1 space-y-4 w-full mb-20"
          >
            {topGainerLoser["top_gainers"]?.map((item, index) => (
              <ThemedView
                key={index}
                className="flex justify-between items-center p-2 space-y-4 w-[45%] rounded-lg shadow-md"
              >
                <Pressable
                  className="flex justify-between items-center p-2 space-y-4"
                  onPress={() => {
                    router.push({
                      name: "CompanyOverview",
                      pathname: `/company_overview/${item.ticker}`,
                      params: {
                        price: item.price,
                        change_percentage: item.change_percentage,
                      },
                    });
                  }}
                >
                  <ThemedText>{item.ticker}</ThemedText>
                  <ThemedText className="text-gray-400 font-bold">
                    $ {item.price}
                  </ThemedText>
                  <Text
                    className={`${
                      item.change_percentage?.startsWith("-")
                        ? "text-red-500 "
                        : "text-green-500 "
                    } font-semibold rounded-full px-2 py-1`}
                    style={{
                      borderRadius: 10,
                      opacity: 0.8,
                      backgroundColor: item.change_percentage?.startsWith("-")
                        ? "rgba(255, 0, 0, 0.2)"
                        : "rgba(0, 255, 0, 0.2)",
                    }}
                  >
                    {item.change_percentage}
                  </Text>
                </Pressable>
              </ThemedView>
            ))}
          </ScrollView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
