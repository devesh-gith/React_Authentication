import React from "react";
import AppRouter from "./components/AppRouter";
import AuthProvider from "./context/AuthContext";

export default function App(props) {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
