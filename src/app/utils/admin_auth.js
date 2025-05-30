import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfigAdmin = {
  apiKey: "AIzaSyAsaoDT0CtyRPQ9x2C9OA3FLoG9wj3rdgk",
  authDomain: "admin-auth-10a35.firebaseapp.com",
  projectId: "admin-auth-10a35",
  storageBucket: "admin-auth-10a35.appspot.com",
  messagingSenderId: "1049873550537",
  appId: "1:1049873550537:web:3fd07eac5e1fc44964d118",
  measurementId: "G-R212EVVCWG",
};

const appAdmin = initializeApp(firebaseConfigAdmin, "admin");
const auth = getAuth(appAdmin);
const googleProvider = new GoogleAuthProvider();
let analytics;

if (typeof window !== "undefined") {
  analytics = getAnalytics(appAdmin);
}

export { auth, googleProvider, signInWithPopup, signOut, analytics };