import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS3mSi4swJgLp3CVkHpWw9JhxR-m_wxG8",
  authDomain: "daily-loop-auth.firebaseapp.com",
  projectId: "daily-loop-auth",
  storageBucket: "daily-loop-auth.firebasestorage.app",
  messagingSenderId: "1000176471122",
  appId: "1:1000176471122:web:f81ae6f3525505d3cd638b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
