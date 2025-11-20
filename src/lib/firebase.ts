import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get, update, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAGo1bkCM35LjT1DQSNSSANH4T1sVvYLSo",
  authDomain: "vpjs-2385b.firebaseapp.com",
  databaseURL: "https://vpjs-2385b-default-rtdb.firebaseio.com",
  projectId: "vpjs-2385b",
  storageBucket: "vpjs-2385b.firebasestorage.app",
  messagingSenderId: "754370441306",
  appId: "1:754370441306:web:c9daf5a44cd9fd964ae863",
  measurementId: "G-DCZMN9TRME"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
export { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  ref,
  set,
  get,
  update,
  onValue
};

export default app;