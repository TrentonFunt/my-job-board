// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrnKrN2cXEj_xKn2CpLFahUmTpKKsn0y4",
  authDomain: "my-job-board-fbbc6.firebaseapp.com",
  projectId: "my-job-board-fbbc6",
  storageBucket: "my-job-board-fbbc6.firebasestorage.app",
  messagingSenderId: "283373237897",
  appId: "1:283373237897:web:2c4e46ca93207cdff33858",
  measurementId: "G-DXZD4NL467"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };