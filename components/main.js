import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { useDispatch, useSelector } from "react-redux";
import { authStateChageUser } from "../redux/auth/authOperation";

export default function Main() {
  const dispatch = useDispatch();
  const { stateChange } = useSelector((state) => state.auth);
  const routing = useRoute(stateChange);

  useEffect(() => {
    dispatch(authStateChageUser());
  }, [stateChange]);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
