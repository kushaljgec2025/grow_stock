import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  useColorScheme,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { LineGraph } from "react-native-graph";
import Random_colors from "./Random_colors";
import api from "@/api/function/api";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const StockGraph = ({ ticker }) => {
  const [stockData, setStockData] = useState({});
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [graphDataPoints, setGraphDataPoints] = useState([]);
  const [graphColor, setColor] = useState(Random_colors());
  const [loading, setLoading] = useState(true);
  const screenWidth = Dimensions.get("window").width;
  const isDark = useColorScheme() === "dark";

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const data = await api.Stock_prices(ticker);
        setStockData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setLoading(false);
      }
    };

    fetchStock();
  }, [ticker]);

  useEffect(() => {
    const timeSeries = stockData["Time Series (Daily)"];
    if (timeSeries) {
      const points = Object.keys(timeSeries).map((date, id) => ({
        id: id,
        date: new Date(date),
        value: parseFloat(timeSeries[date]["4. close"]),
      }));
      setGraphDataPoints(points.reverse());
    }
  }, [stockData]);

  const updatePriceTitle = (point) => {
    setSelectedPoint(point);
  };

  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      textAlign: "center",
    },
    graphContainer: {
      marginVertical: 16,
    },
    graphCard: {
      borderRadius: 16,
      paddingVertical: 10,
      paddingTop: 64,
      paddingHorizontal: 24,
    },
    priceInfo: {
      position: "absolute",
      top: 16,
      left: 16,
    },
    currentPriceText: {
      fontWeight: "bold",
      color: "#4CAF50",
    },
    dateText: {
      fontSize: 12,
      color: "#757575",
    },
    lineGraph: {
      alignSelf: "center",
    },
    graphHint: {
      fontSize: 12,
      textAlign: "left",
      color: "#757575",
      opacity: 0.5,
    },
    tabContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 8,
      padding: 8,
      borderRadius: 36,
    },
    tabTag: {
      width: 44,
      height: 44,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      backgroundColor: isDark ? "black" : "#cbd5e1",

      color: isDark ? "white" : "gray",
    },
    tabTagText: {
      fontSize: 12,
      fontWeight: "bold",
    },
  });

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={isDark ? "white" : "black"} />
        <ThemedText style={styles.loadingText}>
          Loading Price Graph ...
        </ThemedText>
      </ThemedView>
    );
  }

  if (!ticker || !stockData || !graphDataPoints?.length) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText style={styles.loadingText}>
          No data available for this stock
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={styles.graphCard}>
        <View style={styles.priceInfo}>
          <ThemedText style={styles.currentPriceText}>
            {selectedPoint
              ? `$${selectedPoint.value}`
              : `$${graphDataPoints[graphDataPoints?.length - 1]?.value}`}
          </ThemedText>
          <ThemedText style={styles.dateText}>
            {selectedPoint
              ? new Date(selectedPoint.date).toDateString()
              : new Date(
                  graphDataPoints[graphDataPoints?.length - 1]?.date
                ).toDateString()}
          </ThemedText>
        </View>

        <LineGraph
          points={graphDataPoints}
          animated={true}
          color={graphColor}
          width={screenWidth - 20}
          height={220}
          style={styles.lineGraph}
          gradientFillColors={[graphColor, isDark ? "#151718" : "#fff"]}
          enablePanGesture={true}
          onPointSelected={updatePriceTitle}
          onGestureEnd={() => setSelectedPoint(null)}
          enableIndicator
          indicatorPulsating
          enableFadeInMask
        />
      </ThemedView>
      <ThemedText style={styles.graphHint}>
        *Press and hold the graph, then drag it back and forth to check prices.
      </ThemedText>
      <ThemedView style={styles.tabContainer}>
        {["1D", "1W", "1M", "3M", "1Y"].map((label, id) => (
          <View style={styles.tabTag}>
            <ThemedText key={id} style={styles.tabTagText}>
              {label}
            </ThemedText>
          </View>
        ))}
      </ThemedView>
    </GestureHandlerRootView>
  );
};

export default StockGraph;
