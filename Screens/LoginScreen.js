import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import * as Font from "expo-font";
import { AppLoading } from "expo";

const initialState = {
  email: "",
  password: "",
};

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
};

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);

  const [isReady, setIsReady] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
  };

  const onLogin = () => {
    console.log(state);
  };

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadFonts}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/bg.jpg")}
        >
          <View style={styles.form}>
            <Text style={styles.title}>Войти</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View>
                <TextInput
                  style={styles.input}
                  value={state.email}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, email: value }))
                  }
                  placeholder="Адрес электронной почты"
                />
                <TextInput
                  style={{ ...styles.input, marginBottom: 43 }}
                  value={state.password}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, password: value }))
                  }
                  placeholder="Пароль"
                  secureTextEntry={true}
                />
              </View>
            </KeyboardAvoidingView>
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={onLogin}
              >
                <Text style={styles.textButton}>Войти</Text>
              </TouchableOpacity>
              <Text style={styles.singin}>
                Нет аккаунта? Зарегистрироваться
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    flex: 0.6,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    paddingTop: 92,
    marginBottom: 33,
  },
  input: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    fontSize: 16,
    color: "#BDBDBD",
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  textButton: {
    fontSize: 16,
    padding: 16,
    color: "#FFFFFF",
  },
  singin: {
    textAlign: "center",
  },
});
