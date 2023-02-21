import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const routing = useRoute(isLogin);

  const login = (prop) => {
    setIsLogin(prop);
  };

  return <NavigationContainer>{routing}</NavigationContainer>;
}
