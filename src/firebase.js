// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNqa9t0h1ZkWYt2DelkMWqoO_opAQ8VPE",
  authDomain: "sluggie-93a0d.firebaseapp.com",
  projectId: "sluggie-93a0d",
  storageBucket: "sluggie-93a0d.appspot.com",
  messagingSenderId: "927201956717",
  appId: "1:927201956717:web:e7a400992f978809a68064",
  measurementId: "G-K7HP2LWH1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();