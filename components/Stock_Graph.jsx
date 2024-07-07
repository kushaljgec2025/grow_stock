import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { LineGraph } from "react-native-graph";
import Random_colors from "./Random_colors";

import api from "@/api/function/api";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const Stock_Graph = ({ ticker }) => {
  const [stockData, setStockData] = useState({});
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [graphDataPoints, setGraphDataPoints] = useState([]);
  const [graphColor, setColor] = useState(Random_colors());
  const [loading, setLoading] = useState(true); // New loading state
  const screenWidth = Dimensions.get("window").width;
  const isDark = useColorScheme() === "dark";

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const data = await api.Stock_prices(ticker);
        setStockData(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchStock();
  }, [ticker]);

  useEffect(() => {
    const timeSeries = stockData["Time Series (Daily)"];
    if (timeSeries) {
      const points = Object.keys(timeSeries).map((date) => ({
        date: new Date(date),
        value: parseFloat(timeSeries[date]["4. close"]),
      }));
      const reversedPoints = points.reverse();
      setGraphDataPoints(reversedPoints);
    }
  }, [stockData]);

  const updatePriceTitle = (point) => {
    setSelectedPoint(point);
  };

  const styles = {
    tab_tag: {
      borderRadius: 50,
      padding: 8,
      backgroundColor: isDark ? "#030712" : "#e2e8f0",
      width: 40,
      height: 40,
      textAlign: "center",
      color: isDark ? "#e2e8f0" : "#030712",
      fontSize: 12,
      fontWeight: "bold",
    },
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={isDark ? "white" : "black"} />
        <ThemedText className="text-center">Loading Price Graph ...</ThemedText>
      </ThemedView>
    );
  }

  if (
    ticker === undefined ||
    ticker === null ||
    ticker === "" ||
    stockData === undefined ||
    stockData === null ||
    stockData === ""
  ) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText className="text-center">
          No data available for this stock
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="my-4">
        <ThemedView className="rounded-xl py-10">
          <View className="absolute top-4 left-4">
            <ThemedText className="text-left font-bold text-green-500">
              {selectedPoint
                ? `$${selectedPoint.value}`
                : `$ ${graphDataPoints[graphDataPoints.length - 1]?.["value"]}`}
            </ThemedText>
            <ThemedText className="text-left font-light text-xs">
              {selectedPoint
                ? new Date(selectedPoint.date).toDateString()
                : new Date(
                    graphDataPoints[graphDataPoints.length - 1]?.["date"]
                  ).toDateString()}
            </ThemedText>
          </View>

          <LineGraph
            points={graphDataPoints}
            animated={true}
            color={graphColor}
            width={screenWidth - 20}
            height={220}
            style={{ flex: 1, alignSelf: "center", bottom: 6, marginTop: 20 }}
            gradientFillColors={[graphColor, isDark ? "#151718" : "#fff"]}
            enablePanGesture={true}
            onPointSelected={(point) => updatePriceTitle(point)}
            onGestureEnd={() => setSelectedPoint(null)}
            enableIndicator
            indicatorPulsating
            enableFadeInMask
          />
        </ThemedView>
        <ThemedText className="text-xs text-left opacity-50">
          *Press and hold the graph, then drag it back and forth to check
          prices.
        </ThemedText>
        <ThemedView className="flex-row justify-between my-4 mx-auto space-x-6 px-4 py-2 rounded-full">
          <ThemedText style={styles.tab_tag}>1D</ThemedText>
          <ThemedText style={styles.tab_tag}>1W</ThemedText>
          <ThemedText style={styles.tab_tag}>1M</ThemedText>
          <ThemedText style={styles.tab_tag}>3M</ThemedText>
          <ThemedText style={styles.tab_tag}>1Y</ThemedText>
        </ThemedView>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
};

export default Stock_Graph;
