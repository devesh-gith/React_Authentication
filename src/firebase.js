import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOG0vK7jb4zK2ro6DqqgiE-3R1c4HOvrA",
  authDomain: "auth-development-cbac6.firebaseapp.com",
  projectId: "auth-development-cbac6",
  storageBucket: "auth-development-cbac6.appspot.com",
  messagingSenderId: "1092148831526",
  appId: "1:1092148831526:web:21e38508c2f21856e48de7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
