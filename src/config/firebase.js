// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUhiSfB68I2HKw1r8hmVWYOKpspgx7dSA",
  authDomain: "vite-contact-51d83.firebaseapp.com",
  projectId: "vite-contact-51d83",
  storageBucket: "vite-contact-51d83.appspot.com",
  messagingSenderId: "1018475272167",
  appId: "1:1018475272167:web:54196b8ce24bc395a14f42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);