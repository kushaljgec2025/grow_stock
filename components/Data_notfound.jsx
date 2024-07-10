import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const DataNotfound = ({
  title = "OOPS !",
  description = "Page not found",
  textcolor = "red",
}) => {
  return (
    <View style={styles.container}>
      <ThemedView style={styles.themedView}>
        <ThemedText type="title" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText
          type="subtitle"
          style={[styles.subtitle, { color: textcolor }]}
        >
          {description}
        </ThemedText>
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  themedView: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
  },
});

export default DataNotfound;
