import { Text, View } from "@/components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

// Header Component
const Header = ({ title }: { title: string }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

// UserInfo Component
const UserInfo = ({
  userInfo,
}: {
  userInfo: { username: string; email: string; phone: string };
}) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Thông tin người dùng</Text>
    <Text style={styles.cardText}>
      Tên: {userInfo.username || "Chưa đăng nhập"}
    </Text>
    <Text style={styles.cardText}>Email: {userInfo.email || "N/A"}</Text>
    <Text style={styles.cardText}>
      Số điện thoại: {userInfo.phone || "N/A"}
    </Text>
  </View>
);

// FeatureList Component
const FeatureList = () => (
  <View style={styles.features}>
    <Text style={styles.sectionTitle}>Các tính năng nổi bật</Text>
    <View style={styles.featureItem}>
      <Text style={styles.featureText}>🎓 Lịch học</Text>
    </View>
    <View style={styles.featureItem}>
      <Text style={styles.featureText}>📚 Thư viện</Text>
    </View>
    <View style={styles.featureItem}>
      <Text style={styles.featureText}>💬 Chat với giảng viên</Text>
    </View>
  </View>
);

// Footer Component
const Footer = ({ onNavigate }: { onNavigate: () => void }) => (
  <View style={styles.footer}>
    <Button
      title="Đăng nhập / Trò chuyện"
      onPress={onNavigate}
      color="#6200EE"
    />
  </View>
);

export default function TabOneScreen() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const getUser = async () => {
    setLoading(true);
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setUserInfo(JSON.parse(user));
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Chào mừng đến với Đại học Vinh" />
      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" style={styles.loader} />
      ) : (
        <UserInfo userInfo={userInfo} />
      )}
      <FeatureList />
      <Footer
        onNavigate={() => {
          userInfo?.username
            ? navigation.navigate("chat" as never)
            : navigation.navigate("login" as never);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  loader: {
    marginVertical: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#6200EE",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  cardText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  features: {
    width: "90%",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    width: "90%",
    marginTop: 20,
    alignItems: "center",
    padding: 10,
  },
});
