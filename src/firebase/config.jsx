
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgQwHnwsDywktHwm_XeESsbQlrQfadRas",
  authDomain: "coffee-alarrab.firebaseapp.com",
  projectId: "coffee-alarrab",
  storageBucket: "coffee-alarrab.firebasestorage.app",
  messagingSenderId: "300698805423",
  appId: "1:300698805423:web:34a81e33d9236c172fe05a",
  measurementId: "G-PZZJBG1BMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
