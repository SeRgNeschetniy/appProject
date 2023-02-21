import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);

  const routing = useRoute(user);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;

      setUser(user);
    } else {
      console.error("error.code", error.code);
      console.error("error.message", error.message);
    }
  });

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
