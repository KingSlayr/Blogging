// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApzlMyeNkCG3_C-O7F25l_8D0-ncZxE8Y",
  authDomain: "blogging-c001f.firebaseapp.com",
  projectId: "blogging-c001f",
  storageBucket: "blogging-c001f.appspot.com",
  messagingSenderId: "796475616858",
  appId: "1:796475616858:web:25fceb137eed0f4beab263",
  measurementId: "G-P5Y944GMDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

export {app,db,analytics};