import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AntDesign } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

import { Ionicons } from "@expo/vector-icons";
import { authSignOutUser } from "../redux/auth/authOperation";
import PostList from "../components/PostsList";

export default function ProfileScreen({ navigation }) {
  const { avatar, userId, nickname } = useSelector((state) => state.auth);

  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    setPosts([]);

    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPosts((prevState) => [...prevState, { ...doc.data(), id: doc.id }]);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleChooseAvatars = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setstate((prevState) => ({
        ...prevState,
        avatar: result.assets[0].uri,
      }));
    }
  };

  const handleDeleteAvatars = () => {
    setstate((prevState) => ({ ...prevState, avatar: null }));
  };

  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/bg.jpg")}
      >
        <View style={styles.form}>
          <TouchableOpacity style={styles.btnOut} onPress={signOut}>
            <Ionicons
              style={{ marginRight: 16 }}
              name="exit-outline"
              size={24}
              color="#BDBDBD"
            />
          </TouchableOpacity>
          <View style={styles.avatar}>
            {avatar && (
              <Image
                source={{ uri: avatar }}
                style={{ width: 120, height: 120 }}
              />
            )}
            {avatar ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.avatarBtn}
                onPress={handleDeleteAvatars}
              >
                <AntDesign name="closecircleo" size={24} color="#E8E8E8" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.avatarBtn}
                onPress={handleChooseAvatars}
              >
                <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.nickname}>{nickname}</Text>
          <PostList posts={posts} navigation={navigation} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnOut: {
    position: "absolute",
    top: 24,
    right: 19,
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -60,
    borderRadius: 16,
  },
  avatarBtn: {
    position: "absolute",
    bottom: 14,
    right: -12,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    flex: 0.8,
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
  },
  nickname: {
    marginBottom: 33,
    fontSize: 33,
    lineHeight: 35,
  },
});
