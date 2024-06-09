import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ChatFaceData from "@/constants/ChatFaceData";
export default function HomeScreen() {
  const [chatFaceData, setChatFaceData] = useState(ChatFaceData);
  const [selectedChatFace, setSelectedChatFace] = useState({
    id: 1,
    name: "Viện KT&CN",
    image:
      "https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png",
    primary: "#FFC107",
    secondary: "",
    bot_id: "ktcn",
  });
  const navgitaion = useNavigation();
  useEffect(() => {
    checkFaceId();
  }, []);

  const checkFaceId = async () => {
    const id = await AsyncStorage.getItem("chatFaceId");
    id
      ? setSelectedChatFace(ChatFaceData[Number(id)])
      : setSelectedChatFace(ChatFaceData[0]);
  };

  const onChatFacePress = async (id: number) => {
    setSelectedChatFace(ChatFaceData[id - 1]);
    await AsyncStorage.setItem("chatFaceId", (id - 1).toString());
  };
  return (
    <View style={{ alignItems: "center", paddingTop: 90 }}>
      <Text style={[{ color: selectedChatFace?.primary }, { fontSize: 30 }]}>
        Chào mừng đến với
      </Text>
      <Text
        style={[
          { color: selectedChatFace?.primary },
          { fontSize: 30, fontWeight: "bold" },
        ]}
      >
        {selectedChatFace.name}
      </Text>
      <Image
        source={{ uri: selectedChatFace.image }}
        style={{ height: 150, width: 150, marginTop: 20 }}
      />
      {/* <Text style={{ marginTop: 30, fontSize: 25 }}>How Can I help you?</Text> */}

      <View
        style={{
          marginTop: 20,
          backgroundColor: "#F5F5F5",
          alignItems: "center",
          height: 110,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <FlatList
          data={chatFaceData}
          horizontal={true}
          renderItem={({ item }) =>
            item.id != selectedChatFace.id ? (
              <TouchableOpacity
                style={{ margin: 15 }}
                onPress={() => onChatFacePress(item.id)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
            ) : null
          }
        />
        <Text style={{ marginTop: 5, fontSize: 17, color: "#B0B0B0" }}>
          Chọn chat bot để bắt đầu
        </Text>
      </View>
      <TouchableOpacity
        style={[
          { backgroundColor: selectedChatFace?.primary },
          {
            marginTop: 40,
            padding: 17,
            width: Dimensions.get("screen").width * 0.6,
            borderRadius: 100,
            alignItems: "center",
          },
        ]}
        onPress={() => navgitaion.navigate("ChatScreen" as never)}
      >
        <Text style={{ fontSize: 16, color: "#fff" }}>Bắt đầu</Text>
      </TouchableOpacity>
    </View>
  );
}
