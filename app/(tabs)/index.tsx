import { Text, View } from "@/components/Themed";
import { useNavigation } from "@react-navigation/native";
import { Button, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function TabOneScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Our App</Text>
      </View>
      <View style={styles.features}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureItem}>
          <Icon name="rocket" size={50} color="#517fa4" />
          <Text style={styles.featureText}>Fast and Reliable</Text>
        </View>
        <View style={styles.featureItem}>
          <Icon name="mobile" size={50} color="#517fa4" />
          <Text style={styles.featureText}>Mobile Friendly</Text>
        </View>
        <View style={styles.featureItem}>
          <Icon name="lock" size={50} color="#517fa4" />
          <Text style={styles.featureText}>Secure</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          title="Go to chat page"
          onPress={() => {
            navigation.navigate("chat" as never);
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
