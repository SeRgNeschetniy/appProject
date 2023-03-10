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
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import { Ionicons } from "@expo/vector-icons";
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { collection, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { uploadImageToServer } from "../services/uploadImageToServer";
import { createPostUser } from "../redux/dashboard/dashboardOperation";

const initialState = {
  title: "",
  location: "",
  locationCoords: "",
};

export default function CreatePostsScreen({ route, navigation }) {
  // const { item } = route.params;

  // useEffect(() => {
  //   if (item) {
  //     setState(item);
  //     setPhotoTmp(item.photo);
  //   }
  // }, [route.params]);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [photoTmp, setPhotoTmp] = useState(null);
  const [state, setState] = useState(initialState);

  const { userId, nickname } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    const photoCamera = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();

    setPhotoTmp(photoCamera.uri);

    setState((prevState) => ({
      ...prevState,
      locationCoords: location.coords,
    }));
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoTmp(result.assets[0].uri);
    }
  };

  const sendPost = async () => {
    const downloadURL = await uploadImageToServer("posts", photoTmp);

    const post = {
      ...state,
      userId,
      nickname,
      photo: downloadURL,
    };

    dispatch(createPostUser({ post }));

    navigation.navigate("DefaultScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={setCamera}>
          {photoTmp && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photoTmp }}
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

        <TouchableOpacity
          style={{ marginBottom: 32 }}
          onPress={handleChooseImage}
        >
          <Text style={{ color: "#BDBDBD" }}>?????????????????????? ????????</Text>
        </TouchableOpacity>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TextInput
            style={styles.input}
            placeholder="??????????..."
            value={state.title}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, title: value }))
            }
          />

          <TextInput
            style={{ ...styles.input, marginBottom: 32 }}
            inlineImageLeft="search_icon"
            inlineImagePadding={2}
            placeholder="????????????????????..."
            value={state.location}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, location: value }))
            }
          />
        </KeyboardAvoidingView>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={sendPost}
        >
          <Text style={{ color: "#fff" }}>????????????????????????</Text>
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
    marginBottom: 8,
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
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  iconImput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderRadius: 5,
    margin: 10,
    flex: 1,
  },
  icon: {
    padding: 10,
    margin: 5,
    resizeMode: "stretch",
    alignItems: "center",
  },
});
