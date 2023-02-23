import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { serverTimestamp } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCommets,
  sendComment,
} from "../../redux/dashboard/dashboardOperation";

export default function CommentsScreen({ route }) {
  const { nickname, userId } = useSelector((state) => state.auth);
  const { id: postId, photo } = route.params.item;

  const { comments } = useSelector((state) => state.dashboard);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCommets(postId));
  }, [dispatch]);

  const handleSubmit = () => {
    const data = {
      comment: comment,
      userId: userId,
      nickname: nickname,
      dateCreate: serverTimestamp(),
    };
    dispatch(sendComment({ postId, data }));
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: photo }} />

      <SafeAreaView style={styles.items}>
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <View style={{ ...styles.item }}>
              <Text style={styles.comment}>{item.nickname}</Text>
              <Text style={styles.comment}>{item.comment}</Text>
              <Text style={styles.commentDate}>{Date(item.dateCreate)}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.wrappInput}>
        <TextInput
          style={styles.input}
          value={comment}
          //onFocus={() => setIsShowKeyboard(true)}
          onChangeText={(value) => setComment(value)}
          placeholder="Коментувати..."
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleSubmit}
        >
          <AntDesign name="arrowup" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  image: {
    height: 240,
    width: "100%",
    marginBottom: 32,
    marginTop: 32,
    borderRadius: 8,
  },
  items: { flex: 1 },
  item: {
    backgroundColor: "#F6F6F6",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  comment: { fontSize: 13, lineHeight: 18, marginBottom: 8 },
  commentDate: { fontSize: 10, lineHeight: 12, color: "#BDBDBD" },
  wrappInput: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  button: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 50,
    right: 16,
  },
  input: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    padding: 16,
  },
});
