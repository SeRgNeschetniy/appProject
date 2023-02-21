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

export default function PostsScreen({ route }) {
  const [posts, setPosts] = useState([]);

  const post = route.params;

  useEffect(() => {
    if (post) {
      setPosts((prevState) => [...prevState, post]);
    }
  }, [post]);

  console.log(posts);

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
                <Ionicons name="chatbubble-outline" size={24} color="#BDBDBD" />
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
                <Ionicons name="location-outline" size={24} color="#BDBDBD" />
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
        keyExtractor={(item, index) => index}
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
