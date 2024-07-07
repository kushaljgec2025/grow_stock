import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { GetCompanyOverview } from "@/redux/store/apislice";
import { useColorScheme } from "@/hooks/useColorScheme";
import api from "@/api/function/api";
import { Colors } from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Line_bar from "../../components/Line_bar";
import Stock_Graph from "../../components/Stock_Graph";
import AntDesign from "@expo/vector-icons/AntDesign";
import Search_comp from "../../components/Search_comp";
import Data_notfound from "../../components/Data_notfound";

export default function CompanyOverview() {
  const [companyOverview, setCompanyOverview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const { id, price, change_percentage } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const [newid, setNewid] = useState(id);

  useEffect(() => {
    const fetchCompanyOverview = async () => {
      try {
        const data = await api.company_overview(newid);
        setCompanyOverview(data);
        setError(data["Information"]);
        setLoading(false);
      } catch {
        setLoading(false);
      }
      // Set loading to false after data is fetched
    };

    fetchCompanyOverview();
  }, [newid]);
  console.log(error);

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `${(marketCap / 1e12).toFixed(2)} T`;
    } else if (marketCap >= 1e9) {
      return `${(marketCap / 1e9).toFixed(2)} B`;
    } else if (marketCap >= 1e6) {
      return `${(marketCap / 1e6).toFixed(2)} M`;
    }
    return marketCap?.toString();
  };

  const getId = (id) => {
    setNewid(id);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <ThemedText>Loading...</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <View className="p-2 px-4">
          <ScrollView>
            <Search_comp findid={getId} />
            {(companyOverview == null ||
              companyOverview.Symbol == undefined) && (
              <Data_notfound
                title={"Unavalable Stock Data"}
                description={error}
              />
            )}
            {companyOverview && companyOverview.Symbol != undefined && (
              <View>
                <ThemedText type="subtitle">{companyOverview.Name}</ThemedText>
                <View className="flex-row my-2 justify-between items-center">
                  <View>
                    <Text
                      className="p-1 px-4 rounded-full m-auto"
                      style={{
                        color: "#06b6d4",
                        fontSize: 16,
                        fontWeight: "bold",
                        backgroundColor: "rgba(6, 182, 212, 0.2)",
                      }}
                    >
                      {companyOverview.Symbol}
                    </Text>
                    <ThemedText className="text-[10px]">
                      {companyOverview.AssetType}
                    </ThemedText>
                  </View>
                  {price !== null && price !== undefined && newid == id && (
                    <View>
                      <ThemedText
                        className="p-1 px-4 rounded-full"
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        Price : $ {price}
                      </ThemedText>
                      {change_percentage !== null &&
                        change_percentage !== undefined && (
                          <Text
                            className={`${
                              change_percentage?.startsWith("-")
                                ? "text-red-500 "
                                : "text-green-500 "
                            } font-semibold rounded-full px-2 py-1 text-center`}
                            style={{
                              borderRadius: 10,
                              opacity: 0.8,
                              backgroundColor: change_percentage?.startsWith(
                                "-"
                              )
                                ? "rgba(255, 0, 0, 0.2)"
                                : "rgba(0, 255, 0, 0.2)",
                            }}
                          >
                            {change_percentage}
                            {change_percentage?.startsWith("-") ? "↓" : "↑"}
                          </Text>
                        )}
                    </View>
                  )}
                </View>
                <View>
                  <Stock_Graph ticker={companyOverview.Symbol} />
                </View>
                <ThemedView className="my-2 rounded-xl p-2">
                  <ThemedText className="text-md font-bold p-2">
                    {companyOverview.Name}
                  </ThemedText>
                  <ThemedText className="text-xs text-justify p-2">
                    {companyOverview.Description}
                  </ThemedText>
                  <View className="m-2 my-4 space-y-4">
                    <Text
                      className="text-orange-400 text-xs py-2 px-2 rounded-full"
                      style={styles.tag}
                    >
                      <Text className="font-bold"> Industry: </Text>
                      {companyOverview.Industry}
                    </Text>
                    <Text
                      className="text-orange-400 text-xs py-2 px-2 rounded-full"
                      style={styles.tag}
                    >
                      <Text className="font-bold"> Sector: </Text>
                      {companyOverview.Sector}
                    </Text>
                  </View>
                </ThemedView>
                <View className="flex items-center w-full">
                  <View className="flex-row justify-between w-full">
                    <View className="flex justify-center items-center">
                      <ThemedText className="text-xs p-2">
                        52 Week Low
                      </ThemedText>
                      <Text
                        className="text-xs text-red-500 px-2 py-1 rounded-full font-bold"
                        style={{ backgroundColor: "rgba(255,0,0,0.2)" }}
                      >
                        {companyOverview["52WeekLow"]}
                      </Text>
                    </View>
                    <View className="flex justify-center items-center">
                      <ThemedText className="text-xs p-2">
                        52 Week High
                      </ThemedText>
                      <Text
                        className="text-xs text-green-500 px-2 py-1 rounded-full font-bold"
                        style={{ backgroundColor: "rgba(0,255,0,0.2)" }}
                      >
                        {companyOverview["52WeekHigh"]}
                      </Text>
                    </View>
                  </View>
                  <Line_bar
                    low={companyOverview["52WeekLow"]}
                    high={companyOverview["52WeekHigh"]}
                    current_price={newid == id ? price : 0}
                  />
                </View>
                <ScrollView
                  contentContainerStyle={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="p-2 gap-2 w-full m-auto"
                >
                  <ThemedView className="w-[45%] rounded-xl">
                    <ThemedText style={styles.headtext}>Market Cap</ThemedText>
                    <ThemedText style={styles.subtext}>
                      $ {formatMarketCap(companyOverview.MarketCapitalization)}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView className="w-[45%] rounded-xl">
                    <ThemedText style={styles.headtext}>P/E Ratio</ThemedText>
                    <ThemedText style={styles.subtext}>
                      {formatMarketCap(companyOverview.PERatio)}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView className="w-[45%] rounded-xl">
                    <ThemedText style={styles.headtext}>Beta</ThemedText>
                    <ThemedText style={styles.subtext}>
                      {companyOverview.Beta}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView className="w-[45%] rounded-xl">
                    <ThemedText style={styles.headtext}>
                      Dividend Yield
                    </ThemedText>
                    <ThemedText style={styles.subtext}>
                      {companyOverview.DividendYield}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView className="w-[45%] rounded-xl">
                    <ThemedText style={styles.headtext}>
                      Profit Margin
                    </ThemedText>
                    <ThemedText style={styles.subtext}>
                      {companyOverview.ProfitMargin}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView className="w-[45%] rounded-xl">
                    <ThemedText style={styles.headtext}>EPS</ThemedText>
                    <ThemedText style={styles.subtext}>
                      {companyOverview.EPS}
                    </ThemedText>
                  </ThemedView>
                </ScrollView>
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  headtext: {
    fontSize: 12,
    fontWeight: "semibold",
    textAlign: "center",
  },
  subtext: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFA500", // orange color
  },
  tag: {
    backgroundColor: "rgba(236, 134, 7, 0.2)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
