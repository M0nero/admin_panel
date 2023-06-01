// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApxsuAoc2khPDrdX6pZ9Yveu7Jvv5y8EM",
  authDomain: "dr-halal.firebaseapp.com",
  databaseURL: "https://dr-halal-default-rtdb.firebaseio.com",
  projectId: "dr-halal",
  storageBucket: "dr-halal.appspot.com",
  messagingSenderId: "837696801636",
  appId: "1:837696801636:web:c7e3d54fbe2a956e810871",
  measurementId: "G-L2QMWW3V6Y",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
