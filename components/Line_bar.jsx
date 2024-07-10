import React from "react";
import { View, StyleSheet, Dimensions, useColorScheme } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "./ThemedText";
import AntDesign from "@expo/vector-icons/AntDesign";

const LineBar = ({ low, high, current_price }) => {
  const colorScheme = useColorScheme();
  const percentage = ((current_price - low) / (high - low)) * 100;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#f87171", "#facc15", "#4ade80"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.line}
      >
        <View
          style={[
            styles.indicatorContainer,
            { left: `${percentage - 2.5}%`, top: 10 },
          ]}
        >
          <AntDesign
            name="caretup"
            size={16}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </View>
      </LinearGradient>
      {current_price > 0 && (
        <View style={styles.currentPriceContainer}>
          <ThemedText style={styles.currentPriceLabel}>Current</ThemedText>
          <ThemedText style={styles.currentPrice}>${current_price}</ThemedText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center", // Aligns the elements in the center
  },
  line: {
    width: Dimensions.get("window").width - 100,
    height: 10,
    borderRadius: 10,
  },
  indicatorContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  currentPriceContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  currentPriceLabel: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 2,
  },
  currentPrice: {
    fontSize: 12,
    textAlign: "center",
    color: "#FFA500", // orange color
    fontWeight: "bold",
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "rgba(236, 134, 7, 0.2)",
  },
});

export default LineBar;
