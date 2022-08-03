// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHFR1YHXzhYkh_YYzcsKpjaGn0ukh1cPc",
  authDomain: "instagram-clone-project-28967.firebaseapp.com",
  projectId: "instagram-clone-project-28967",
  storageBucket: "instagram-clone-project-28967.appspot.com",
  messagingSenderId: "991201555783",
  appId: "1:991201555783:web:bde2c278a2ca9cc8820862",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
