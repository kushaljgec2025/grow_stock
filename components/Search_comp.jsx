import {
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState, useEffect } from "react";
import api from "@/api/function/api";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const SearchComp = ({ findid }) => {
  const [is_open, setIs_open] = useState(false);
  const [is_text, setIs_text] = useState(false);
  const [tickerSuggestion, setTickerSuggestion] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [debouncedCompanyName, setDebouncedCompanyName] = useState(companyName);
  const [loading, setLoading] = useState(false); // New loading state
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation(); // Initialize the navigation hook

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCompanyName(companyName);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [companyName]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      console.log(debouncedCompanyName, "name");
      if (debouncedCompanyName?.length === 0) {
        setTickerSuggestion([]);
        setLoading(false);
        return;
      }

      setLoading(true); // Set loading to true before fetching
      // const tickerSug = await api.Ticker_suggestion(debouncedCompanyName);
      // const symbolsAndNames = tickerSug["bestMatches"].map((item) => ({
      //   symbol: item["1. symbol"],
      //   name: item["2. name"],
      // }));
      const tickerSug = await api.Demo(debouncedCompanyName);

      setTickerSuggestion(tickerSug["suggestions"]);
      setLoading(false); // Set loading to false after fetching
    };

    fetchSuggestions();
  }, [debouncedCompanyName]);

  const handleChange = (text) => {
    setCompanyName(text);
  };

  const handleSuggestionClick = (symbol) => {
    setCompanyName(symbol);
    setTickerSuggestion([]);
  };
  const handelSearchCompany = () => {
    // router.push({
    //   pathname: `/company_overview/${companyName}`,
    // });
    findid(companyName);
  };
  return (
    <View>
      <ThemedView className="rounded-full flex-row items-center px-6 my-2">
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
          onSubmitEditing={() => handelSearchCompany(companyName)}
          value={companyName}
          style={{
            backgroundColor: "transparent",
            padding: 10,
            borderRadius: 10,
            color: isDark ? "white" : "black",
            flex: 1,
          }}
        />
        {loading && (
          <ActivityIndicator
            size="small"
            color={isDark ? "white" : "black"}
            style={{ marginLeft: 10 }}
          />
        )}
        <AntDesign
          name="closecircleo"
          size={24}
          color={isDark ? "white" : "black"}
          style={{ display: companyName?.length > 0 ? "block" : "none" }}
          onPress={() => {
            setCompanyName("");
            setTickerSuggestion([]);
          }}
        />
      </ThemedView>
      {tickerSuggestion?.length > 0 && (
        <ThemedView className="absolute w-full top-16 z-10 rounded-xl p-4">
          <View className="flex space-y-1">
            {tickerSuggestion.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSuggestionClick(item.value)}
              >
                <ThemedText className="text-sm border-b border-gray-600 py-1">
                  {item.value}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </ThemedView>
      )}
    </View>
  );
};

export default SearchComp;
