import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { Ionicons } from "@expo/vector-icons";

const initialState = {
  photo: null,
  title: "",
  location: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [state, setstate] = useState(initialState);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setstate((prevState) => ({ ...prevState, photo: photo.uri }));
  };

  const sendPost = () => {
    console.log("photo", state);
    navigation.navigate("Posts", state);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={setCamera}>
          {state.photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: state.photo }}
                style={{ height: 240, width: 380 }}
              />
            </View>
          )}
          {/* <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
            <Ionicons name="camera" size={24} color="#fff" />
          </TouchableOpacity>
        </Camera>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TextInput
            style={styles.input}
            placeholder="Назва..."
            value={state.title}
            onChangeText={(value) =>
              setstate((prevState) => ({ ...prevState, title: value }))
            }
          />
          <TextInput
            style={{ ...styles.input, marginBottom: 32 }}
            placeholder="Місцевість..."
            value={state.location}
            onChangeText={(value) =>
              setstate((prevState) => ({ ...prevState, location: value }))
            }
          />
        </KeyboardAvoidingView>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={sendPost}
        >
          <Text style={styles.textButton}>Опублікувати</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
  },
  snapContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    borderColor: "#fff",
    borderWidth: 1,
  },
  input: {
    marginBottom: 16,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#fff",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
    color: "#BDBDBD",
  },
  button: {
    padding: 16,
    color: "#BDBDBD",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
});
