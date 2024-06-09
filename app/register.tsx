import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import { HOST } from "@/constants/host";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [dataForm, setDataForm] = useState({
    username: { value: "", error: "" },
    password: { value: "", error: "" },
    confirmPassword: { value: "", error: "" },
    email: { value: "", error: "" },
    phone: { value: "", error: "" },
  });
  const EmailValidation = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSignUp = async () => {
    const cloneData: any = { ...dataForm };
    for (const key in cloneData) {
      if (!cloneData[key].value) {
        cloneData[key].error = "This field can not be empty!";
      }
    }
    setDataForm(cloneData);

    if (
      dataForm.username &&
      dataForm.email &&
      EmailValidation(dataForm.email.value) &&
      dataForm.password &&
      dataForm.phone
    ) {
      const payload = {
        email: dataForm.email.value,
        username: dataForm.username.value,
        phone: dataForm.phone.value,
        password: dataForm.password.value,
      };
      try {
        const response = await fetch(`${HOST}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const res = await response.json();
        8
        if (res.token) {
          await AsyncStorage.setItem("user", JSON.stringify(res.result));
          navigation.reset({ index: 0, routes: [{ name: "(tabs)" as never }] });
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: res.error,
          });
        }
      } catch (error) {}
    }
  };

  const onChangeText = useCallback(
    (name: string, value: string) => {
      const cloneData = { ...dataForm };
      setDataForm({ ...cloneData, [name]: { value, error: "" } });
      if (name === "email" && !EmailValidation(value)) {
        setDataForm({
          ...cloneData,
          email: { value, error: "Invalid email!" },
        });
      }
      if (name === "confirmPassword" && value !== cloneData.password.value) {
        setDataForm({
          ...cloneData,
          confirmPassword: { value, error: "Password do not match" },
        });
      }
    },
    [dataForm]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#555"
          onChangeText={(val) => onChangeText("email", val)}
          autoCapitalize="none"
        />
      </View>
      {dataForm.email.error && (
        <Text style={styles.error}>{dataForm.email.error}</Text>
      )}

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#555"
          onChangeText={(val) => onChangeText("username", val)}
          autoCapitalize="none"
        />
      </View>
      {dataForm.username.error && (
        <Text style={styles.error}>{dataForm.username.error}</Text>
      )}

      <View style={styles.inputContainer}>
        <Icon name="key" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#555"
          onChangeText={(val) => onChangeText("password", val)}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      {dataForm.password.error && (
        <Text style={styles.error}>{dataForm.password.error}</Text>
      )}

      <View style={styles.inputContainer}>
        <Icon name="key" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#555"
          onChangeText={(val) => onChangeText("confirmPassword", val)}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      {dataForm.confirmPassword.error && (
        <Text style={styles.error}>{dataForm.confirmPassword.error}</Text>
      )}

      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          placeholderTextColor="#555"
          onChangeText={(val) => onChangeText("phone", val)}
          autoCapitalize="none"
        />
      </View>
      {dataForm.phone.error && (
        <Text style={styles.error}>{dataForm.phone.error}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => {
          navigation.navigate("login" as never);
        }}
      >
        <Text style={styles.registerText}>Back to login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPassword: {
    marginTop: 15,
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#333",
    fontSize: 14,
  },
  registerButton: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    color: "#333",
    fontSize: 14,
  },
  error: {
    fontSize: 12,
    color: "red",
    marginBottom: 8,
  },
});
