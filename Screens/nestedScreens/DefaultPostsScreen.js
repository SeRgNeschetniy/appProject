import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function DefaultPostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    setPosts([]);
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      setPosts((prevState) => [...prevState, { ...doc.data(), id: doc.id }]);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.photo }}
              style={{
                width: 380,
                height: 240,
                borderRadius: 8,
                marginBottom: 8,
              }}
            />
            <Text style={{ marginBottom: 11 }}>{item.title}</Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="chatbubble-outline"
                  size={24}
                  color="#BDBDBD"
                  onPress={() => navigation.navigate("Comments")}
                />
                <Text
                  style={{
                    color: "#BDBDBD",
                  }}
                >
                  0
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="location-outline"
                  size={24}
                  color="#BDBDBD"
                  onPress={() =>
                    navigation.navigate("Map", {
                      location: item.location,
                      title: item.title,
                    })
                  }
                />
                <Text
                  style={{
                    color: "#000",
                    textDecorationLine: "underline",
                  }}
                >
                  {item.location}
                </Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  itemContainer: {
    marginBottom: 34,
  },
});
