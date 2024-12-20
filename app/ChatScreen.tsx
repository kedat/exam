/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import ChatFaceData from "@/constants/ChatFaceData";
import { HOST } from "@/constants/host";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import Toast from "react-native-toast-message";
interface IMessage {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [botId, setBotId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [chatFace, setChatFace] = useState(
    "https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png"
  );
  const navigation = useNavigation();

  useEffect(() => {
    checkFaceId();
  }, [botId]);

  const checkFaceId = async () => {
    const id = Number(await AsyncStorage.getItem("chatFaceId"));
    const token: string | null = await AsyncStorage.getItem("token");
    setAccessToken(token?.replace(/"/g, "") || "");
    id
      ? setChatFace(ChatFaceData[id]?.image)
      : setChatFace(ChatFaceData[0].image);
    setBotId(ChatFaceData[id]?.bot_id);
    setMessages([
      {
        _id: 1,
        text: `Xin chào, tôi thuộc ${ChatFaceData[id]?.name}, tôi có thể giúp gì cho bạn?`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: chatFace,
        },
      },
    ]);
  };

  const onSend = useCallback(
    (messages: any) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      if (messages[0]?.text) {
        getResponse(messages[0]?.text);
      }
    },
    [botId]
  );

  const getResponse = useCallback(
    async (msg: string) => {
      const payload = {
        bot_id: botId,
        question: msg,
      };
      setLoading(true);
      try {
        setLoading(true);

        const response = await fetch(
          `${HOST}/${
            botId === "tc" ? "chat_with_custom_model" : "chat_with_documents"
          }`,
          {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
              Authorization: `Bearer ${String(accessToken)}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const res = await response.json();
        if (!res.error) {
          const chatAIResp: IMessage = {
            _id: Math.random() * (9999999 - 1),
            text: botId === "tc" ? res.answer.answer : res.answer.output_text,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: chatFace,
            },
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, chatAIResp as any)
          );
          setLoading(false);
        } else {
          await AsyncStorage.setItem("user", "");
          navigation.reset({
            index: 0,
            routes: [{ name: "login" as never }],
          });
          Toast.show({
            type: "error",
            text1: "Error",
            text2: res.error,
          });
        }
      } catch (error) {
        setLoading(false);
      }
    },
    [botId]
  );

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#671ddf",
          },
          left: {},
        }}
        textStyle={{
          right: {
            // fontSize:20,
            padding: 2,
          },
          left: {
            color: "#671ddf",
            // fontSize:20,
            padding: 2,
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    //Add the extra styles via containerStyle
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          padding: 3,

          backgroundColor: "#671ddf",
          color: "#fff",
        }}
        textInputStyle={{ color: "#fff" }}
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <FontAwesome
            name="send"
            size={24}
            color="white"
            resizeMode={"center"}
          />
        </View>
      </Send>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <GiftedChat
        messages={messages}
        isTyping={loading}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
      />
    </View>
  );
}
