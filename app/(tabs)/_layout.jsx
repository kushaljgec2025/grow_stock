import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text } from "react-native";
import { Provider } from "react-redux";
import store from "@/redux/store/store";
import TabBar from "@/components/TabBar";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Top Gainers",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <AntDesign name="caretup" size={32} color="#22c55e" />
              ) : (
                <AntDesign name="caretup" size={24} color="#22c55e" />
              ),
          }}
        />
        <Tabs.Screen
          name="top_losers"
          options={{
            title: "Top Losers",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <AntDesign name="caretdown" size={32} color="#ef4444" />
              ) : (
                <AntDesign name="caretdown" size={24} color="#ef4444" />
              ),
          }}
        />
      </Tabs>
    </Provider>
  );
}
