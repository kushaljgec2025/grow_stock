import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import api from "@/api/function/api";
import { useNavigation } from "@react-navigation/native";

const SearchComp = ({ findid }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isFocus, setfocus] = useState(false);
  const [tickerSuggestion, setTickerSuggestion] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [debouncedCompanyName, setDebouncedCompanyName] = useState(companyName);
  const [loading, setLoading] = useState(false); // New loading state
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation(); // Initialize the navigation hook

  useEffect(() => {
    if (isFocus == true) {
      const handler = setTimeout(() => {
        setDebouncedCompanyName(companyName);
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [companyName]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedCompanyName?.length === 0) {
        setTickerSuggestion([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const tickerSug = await api.Ticker_suggestion(debouncedCompanyName);
        const symbolsAndNames = tickerSug["bestMatches"]?.map((item) => ({
          symbol: item["1. symbol"],
          name: item["2. name"],
        }));
        setTickerSuggestion(symbolsAndNames);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedCompanyName]);

  const handleChange = (text) => {
    setfocus(true);
    setCompanyName(text);
  };

  const handleSuggestionClick = (symbol) => {
    setfocus(false);

    setTickerSuggestion([]);
    setCompanyName(symbol);
  };

  const handleSearchCompany = () => {
    Keyboard.dismiss();
    setTickerSuggestion([]);
    findid(companyName);
  };

  return (
    <View>
      <ThemedView style={styles.searchContainer}>
        <AntDesign
          name="search1"
          size={24}
          color={isDark ? "white" : "black"}
        />
        <TextInput
          placeholder="Search Company Stocks"
          placeholderTextColor={isDark ? "white" : "black"}
          keyboardType="search"
          returnKeyType="search"
          onChangeText={handleChange}
          onSubmitEditing={handleSearchCompany}
          value={companyName}
          style={[styles.textInput, { color: isDark ? "white" : "black" }]}
        />
        {loading && (
          <ActivityIndicator
            size="small"
            color={isDark ? "white" : "black"}
            style={styles.activityIndicator}
          />
        )}
        {companyName?.length > 0 && (
          <AntDesign
            name="closecircleo"
            size={24}
            color={isDark ? "white" : "black"}
            onPress={() => {
              setCompanyName("");
              setTickerSuggestion([]);
            }}
          />
        )}
      </ThemedView>
      {tickerSuggestion?.length > 0 && (
        <ThemedView style={styles.suggestionContainer}>
          {tickerSuggestion?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSuggestionClick(item.symbol)}
            >
              <ThemedText style={styles.suggestionItem}>
                {item.symbol}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  activityIndicator: {
    marginLeft: 10,
  },
  suggestionContainer: {
    position: "absolute",
    width: "100%",
    top: 60,
    zIndex: 10,
    borderRadius: 10,
    padding: 16,
  },

  suggestionItem: {
    fontSize: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});

export default SearchComp;
