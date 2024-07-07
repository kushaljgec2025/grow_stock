import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";

const TabBar = ({ state, descriptors, navigation }) => {
  const isDark = useColorScheme() === "dark";
  return (
    <ThemedView
      style={styles.tab}
      className={`rounded-full border ${
        isDark ? "border-slate-600" : "border-gray-300"
      }`}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const bgColor =
          label != "Top Gainers"
            ? "rgba(255, 0, 0, 0.2)"
            : "rgba(0, 255, 0, 0.2)";
        const textcolor = label != "Top Gainers" ? "#ef4444" : "#22c55e";
        const tabColor = "#f3f4f6";
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}
            key={index}
          >
            <View
              style={{
                backgroundColor: isFocused ? bgColor : tabColor,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 20,

                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: 4,
              }}
            >
              <Text
                style={{
                  color: isFocused ? textcolor : isDark ? "#64748b" : "#64748b",

                  fontWeight: "bold",
                }}
              >
                {" "}
                {label}
              </Text>
              {label === "Top Gainers" ? (
                <AntDesign name="caretup" size={20} color="#22c55e" />
              ) : (
                <AntDesign name="caretdown" size={20} color="#ef4444" />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  tab: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 16,
    paddingVertical: 8,
    width: "90%",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default TabBar;
