// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyALi59XKMJ3hGHBvedJ9bZajVQnl60R0Pw",
  authDomain: "kitchen-duty-d77aa.firebaseapp.com",
  databaseURL: "https://kitchen-duty-d77aa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kitchen-duty-d77aa",
  storageBucket: "kitchen-duty-d77aa.firebasestorage.app",
  messagingSenderId: "297609647995",
  appId: "1:297609647995:web:25760259ddb63763ad4fde",
  measurementId: "G-VWERCP24CL"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, onValue, remove };
