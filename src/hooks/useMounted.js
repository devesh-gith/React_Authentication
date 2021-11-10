import React, { useRef } from "react";
import { useAuth } from "../context/AuthContext";
export default function useMounted() {
  const mounted = useRef(false);
  const { currentUser } = useAuth();

  if (currentUser) {
    mounted.current = true;
  } else {
    mounted.current = false;
  }
  return mounted;
}
