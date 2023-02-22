import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/dashboard/dashboardOperation";
import PostList from "../../components/PostsList";
import { View } from "react-native";

export default function DefaultPostsScreen({ navigation }) {
  const { posts } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return <PostList posts={posts} navigation={navigation} />;
}
