import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import CommentsScreen from "./Screens/nestedScreens/CommentsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import PostsScreen from "./Screens/PostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import { authSignOutUser } from "./redux/auth/authOperation";
import { useDispatch } from "react-redux";

export const useRoute = (isAuth, navigation) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={RegistrationScreen}
        />
        <MainStack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
      </MainStack.Navigator>
    );
  }
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <MainTab.Navigator options={{ headerBackVisible: true }}>
      <MainTab.Screen
        name="Posts"
        options={{
          title: "Публікації",
          headerTitleAlign: "center",
          tabBarShowLabel: false,
          tabBarItemStyle: { alignItems: "flex-end" },
          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <Ionicons
                style={{ marginRight: 16 }}
                name="exit-outline"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-grid-outline" size={24} color={color} />
          ),
        }}
        component={PostsScreen}
      />

      <MainTab.Screen
        name="CreatePosts"
        options={{
          title: "Створити публікацію",
          headerTitleAlign: "center",
          headerBackVisible: true,
          // headerLeft: () => (
          //   // <DrawerButton arrowleft onPress={() => navigation.toggleDrawer()} />
          //   <Ionicons
          //     name="arrow-back"
          //     size={24}
          //     color="#000"
          //     onPress={() => navigation.toggleDrawer()}
          //   />
          // ),
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <AntDesign
              style={{
                width: 70,
                height: 40,
                backgroundColor: "#FF6C00",
                borderRadius: 20,
                textAlign: "center",
              }}
              name="plus"
              size={24}
              color="#fff"
            />
          ),
        }}
        component={CreatePostsScreen}
      />

      <MainTab.Screen
        name="ProfileScreen"
        options={{
          title: "Профіль",
          headerTitleAlign: "center",
          tabBarShowLabel: false,
          tabBarItemStyle: { alignItems: "flex-start" },
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
