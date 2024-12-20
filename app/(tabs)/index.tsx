import React from "react";
import { Text, View } from "@/components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Button, ScrollView, StyleSheet } from "react-native";

export default function TabOneScreen() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  };
  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [getUser, userInfo])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chào mừng đến với Đại học Vinh</Text>
      </View>

      <View style={styles.footer}>
        <Button
          title={`Đi tới trang ${
            userInfo?.username ? "trò chuyện" : "đăng nhập"
          }`}
          onPress={() => {
            userInfo?.username
              ? navigation.navigate("chat" as never)
              : navigation.navigate("login" as never);
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#f5f5f5",
  },
  headerImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  features: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
  },
  featureText: {
    fontSize: 18,
    marginLeft: 10,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#51a4",
    borderRadius: 5,
    padding: 25,
  },
});
