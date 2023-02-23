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
import { useSelector } from "react-redux";

export default function PostList({ posts, navigation }) {
  const { userId } = useSelector((state) => state.auth);

  const handleClickPhoto = ({ item }) => {
    // console.log("handleClickPhoto", item);
    // if (item.userId === userId) {
    //   navigation.navigate("CreatePosts", { item });
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      {posts && (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                source={{ uri: item.photo }}
                style={styles.image}
                //resizeMode="cover"
              />
              <Text
                style={styles.title}
                onPress={() => handleClickPhoto({ item })}
              >
                Редагувати
              </Text>
              <Text style={styles.title}>{item.title}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.wrappBtn}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={24}
                    color="#BDBDBD"
                    onPress={() => navigation.navigate("Comments", { item })}
                  />
                  <Text
                    style={{
                      color: "#BDBDBD",
                    }}
                  >
                    0
                  </Text>
                </View>
                <View style={styles.wrappBtn}>
                  <Ionicons
                    name="location-outline"
                    size={24}
                    color="#BDBDBD"
                    onPress={() =>
                      navigation.navigate("Map", {
                        location: item.locationCoords,
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
      )}
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
    width: 380,
  },
  title: { fontSize: 16, lineHeight: 19, color: "#212121", marginBottom: 11 },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  wrappBtn: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
});
