import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: post.latitude,
          longitude: post.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{ latitude: post.latitude, longitude: post.longitude }}
          title={post.title}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
