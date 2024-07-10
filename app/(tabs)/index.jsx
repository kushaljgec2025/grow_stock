import {
  Image,
  StyleSheet,
  Platform,
  Text,
  StatusBar,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import api from "../../api/function/api";
import { useDispatch, useSelector } from "react-redux";
import { GetTopGainersLosers, GetTopGainers } from "@/redux/store/apislice";
import { Link, router } from "expo-router";
import Data_notfound from "@/components/Data_notfound";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [topGainerLoser, setTopGainerLoser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataNotFound, setDataNotFound] = useState(false);
  const isDark = useColorScheme() === "dark";

  useEffect(() => {
    const fetchTopGainerLoser = async () => {
      try {
        const data = await api.top_gainer_loser();
        // console.log(data);
        if (data && (data.top_gainers?.length || data.top_losers?.length)) {
          dispatch(GetTopGainersLosers(data));
          setTopGainerLoser(data);
        } else {
          setDataNotFound(true);
        }
      } catch (error) {
        setDataNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTopGainerLoser();
  }, [dispatch]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={isDark ? "white" : "black"} />
        <ThemedText>Loading...</ThemedText>
      </SafeAreaView>
    );
  }

  if (dataNotFound) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Data_notfound />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar />
      {topGainerLoser && (
        <ScrollView>
          <ThemedView style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.logo}
              alt="logo"
            />
            <View style={styles.logoTextContainer}>
              <ThemedText type="subtitle" style={styles.logoTitle}>
                GROW STOCK
              </ThemedText>
              <Text style={styles.logoSubtitle}>Invest in your future</Text>
            </View>
          </ThemedView>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            style={styles.scrollView}
          >
            {topGainerLoser["top_gainers"]?.map((item, index) => (
              <ThemedView key={index} style={styles.gainerLoserItem}>
                <Pressable
                  style={styles.gainerLoserPressable}
                  onPress={() => {
                    router.push({
                      name: "CompanyOverview",
                      pathname: `/company_overview/${item.ticker}`,
                      params: {
                        price: item.price,
                        change_percentage: item.change_percentage,
                      },
                    });
                  }}
                >
                  <ThemedText>{item.ticker}</ThemedText>
                  <ThemedText style={styles.gainerLoserPrice}>
                    $ {item.price}
                  </ThemedText>
                  <Text
                    style={[
                      styles.gainerLoserChange,
                      item.change_percentage?.startsWith("-")
                        ? styles.negativeChange
                        : styles.positiveChange,
                    ]}
                  >
                    {item.change_percentage}
                  </Text>
                </Pressable>
              </ThemedView>
            ))}
          </ScrollView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    padding: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    spaceBetween: 16,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  logoTextContainer: {
    justifyContent: "center",
    padding: 4,
    marginHorizontal: 8,
  },
  logoTitle: {
    color: "green",
  },
  logoSubtitle: {
    color: "gray",
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 16,
  },
  scrollView: {
    padding: 8,
    flex: 1,
    spaceBetween: 16,
    width: "100%",
    marginBottom: 80,
  },
  gainerLoserItem: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    spaceBetween: 16,
    width: "45%",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  gainerLoserPressable: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    spaceBetween: 16,
    gap: 10,
  },
  gainerLoserPrice: {
    color: "gray",
    fontWeight: "bold",
  },
  gainerLoserChange: {
    fontWeight: "bold",
    borderRadius: 10,
    opacity: 0.8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  negativeChange: {
    color: "red",
    backgroundColor: "rgba(255, 0, 0, 0.2)",
  },
  positiveChange: {
    color: "green",
    backgroundColor: "rgba(0, 255, 0, 0.2)",
  },
});
