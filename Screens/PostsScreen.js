import React from "react";
import { moduleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "./nestedScreens/DefaultPostsScreen";
import MapScreen from "./nestedScreens/MapScreen";
import CommentsScreen from "./nestedScreens/CommentsScreen";

const NestedScreen = createStackNavigator();

export default function PostsScreen({ route, navigation }) {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        options={{
          tabBarShowLabel: false,
        }}
        component={DefaultPostsScreen}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
}
