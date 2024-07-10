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
        <View style={styles.container}>
          <ScrollView>
            <Search_comp findid={getId} />
            {(companyOverview == null ||
              companyOverview.Symbol == undefined) && (
              <Data_notfound
                title={"Unavailable Stock Data"}
                description={error}
              />
            )}
            {companyOverview && companyOverview.Symbol !== undefined && (
              <View>
                <ThemedText type="subtitle">{companyOverview.Name}</ThemedText>
                <View style={styles.companyInfo}>
                  <View>
                    <Text style={styles.symbolText}>
                      {companyOverview.Symbol}
                    </Text>
                    <ThemedText style={styles.assetTypeText}>
                      {companyOverview.AssetType}
                    </ThemedText>
                  </View>
                  {price !== null && price !== undefined && newid == id && (
                    <View>
                      <ThemedText style={styles.priceText}>
                        Price : $ {price}
                      </ThemedText>
                      {change_percentage !== null &&
                        change_percentage !== undefined && (
                          <Text
                            style={[
                              styles.changePercentage,
                              change_percentage?.startsWith("-")
                                ? styles.negativeChange
                                : styles.positiveChange,
                            ]}
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
                <ThemedView style={styles.companyOverview}>
                  <ThemedText style={styles.companyName}>
                    {companyOverview.Name}
                  </ThemedText>
                  <ThemedText style={styles.description}>
                    {companyOverview.Description}
                  </ThemedText>
                  <View style={styles.industrySectorContainer}>
                    <ThemedText style={styles.tag}>
                      <ThemedText style={styles.boldText}>
                        {" "}
                        Industry:{" "}
                      </ThemedText>
                      {companyOverview.Industry}
                    </ThemedText>
                    <ThemedText style={styles.tag}>
                      <ThemedText style={styles.boldText}> Sector: </ThemedText>
                      {companyOverview.Sector}
                    </ThemedText>
                  </View>
                </ThemedView>
                <View style={styles.priceContainer}>
                  <View style={styles.priceBox}>
                    <ThemedText style={styles.priceTitle}>
                      52 Week Low
                    </ThemedText>
                    <Text style={styles.lowPrice}>
                      {companyOverview["52WeekLow"]}
                    </Text>
                  </View>
                  <View style={styles.priceBox}>
                    <ThemedText style={styles.priceTitle}>
                      52 Week High
                    </ThemedText>
                    <Text style={styles.highPrice}>
                      {companyOverview["52WeekHigh"]}
                    </Text>
                  </View>
                </View>
                <Line_bar
                  low={companyOverview["52WeekLow"]}
                  high={companyOverview["52WeekHigh"]}
                  current_price={newid == id ? price : 0}
                />
                <ScrollView
                  contentContainerStyle={styles.metricContainer}
                  className="p-2 gap-2 w-full m-auto"
                >
                  <ThemedView style={styles.metricBox}>
                    <ThemedText style={styles.headtext}>Market Cap</ThemedText>
                    <ThemedText style={styles.subtext}>
                      $ {formatMarketCap(companyOverview.MarketCapitalization)}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.metricBox}>
                    <ThemedText style={styles.headtext}>P/E Ratio</ThemedText>
                    <ThemedText style={styles.subtext}>
                      {formatMarketCap(companyOverview.PERatio)}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.metricBox}>
                    <ThemedText style={styles.headtext}>Beta</ThemedText>
                    <ThemedText style={styles.subtext}>
                      {companyOverview.Beta}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.metricBox}>
                    <ThemedText style={styles.headtext}>
                      Dividend Yield
                    </ThemedText>
                    <ThemedText style={styles.subtext}>
                      {companyOverview.DividendYield}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.metricBox}>
                    <ThemedText style={styles.headtext}>
                      Profit Margin
                    </ThemedText>
                    <ThemedText style={styles.subtext}>
                      {companyOverview.ProfitMargin}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.metricBox}>
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
    marginHorizontal: 16,
    borderRadius: 10,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  companyInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  symbolText: {
    color: "#06b6d4",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "rgba(6, 182, 212, 0.2)",
    padding: 8,
    borderRadius: 16,
    textAlign: "center",
  },
  assetTypeText: {
    fontSize: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  changePercentage: {
    fontWeight: "bold",
    borderRadius: 10,
    opacity: 0.8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    textAlign: "center",
  },
  negativeChange: {
    color: "red",
    backgroundColor: "rgba(255, 0, 0, 0.2)",
  },
  positiveChange: {
    color: "green",
    backgroundColor: "rgba(0, 255, 0, 0.2)",
  },
  companyOverview: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 8,
  },
  description: {
    fontSize: 12,
    textAlign: "justify",
    paddingBottom: 8,
  },
  industrySectorContainer: {
    marginVertical: 16,
    gap: 8,
  },
  tag: {
    backgroundColor: "rgba(236, 134, 7, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    fontSize: 12,
  },
  boldText: {
    fontWeight: "bold",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  priceBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  priceTitle: {
    fontSize: 12,
    paddingBottom: 8,
  },
  lowPrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: "red",
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  highPrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: "green",
    backgroundColor: "rgba(0, 255, 0, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  metricContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  metricBox: {
    width: "45%",
    borderRadius: 16,
    padding: 8,
    marginVertical: 8,
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
});
