import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import AntDesign from "@expo/vector-icons/AntDesign";

const Line_bar = ({ low, high, current_price }) => {
  const percentage = ((current_price - low) / (high - low)) * 100;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#f87171", "#facc15", "#4ade80"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.line}
        className="mb-6"
      >
        <View
          className="absolute inset-0  flex justify-between items-center "
          style={{ left: `${percentage - 2.5}%`, top: 10 }}
        >
          <AntDesign
            name="caretup"
            size={16}
            color={useColorScheme() === "dark" ? "white" : "black"}
          />
          <View></View>
        </View>
      </LinearGradient>

      {current_price > 0 && (
        <View className="">
          <ThemedText className="text-xs text-center mb-2">Current</ThemedText>
          <ThemedText
            className="text-xs text-center text-orange-400 font-bold py-1 px-2  m-auto rounded-full"
            style={{ backgroundColor: "rgba(236, 134, 7, 0.2)" }}
          >
            ${current_price}
          </ThemedText>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  line: {
    width: Dimensions.get("window").width - 100,
    height: 10,
    display: "flex",
    flexDirection: "row",

    borderRadius: 10,
  },

  text: {
    textAlign: "center",

    fontWeight: "bold",
  },
});
export default Line_bar;
