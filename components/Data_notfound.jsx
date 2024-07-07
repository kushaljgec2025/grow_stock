import { View, Text } from "react-native";

import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

import React from "react";
import { ThemeProvider } from "styled-components";

const Data_notfound = ({
  title = "OOPS !",
  description = "page not found",
  textcolor = "red",
}) => {
  return (
    <View className="w-full h-screen flex justify-center items-center">
      <ThemedView className="p-10 flex justify-center items-center rounded-lg">
        <ThemedText type="title" className="text-justify">
          {title}
        </ThemedText>
        <ThemedText
          type="subtitle"
          className="text-justify"
          style={{ color: textcolor }}
        >
          {description}
        </ThemedText>
      </ThemedView>
    </View>
  );
};

export default Data_notfound;
