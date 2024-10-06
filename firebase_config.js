// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsCqpKGlVnkxkfc4lUikohiIMaD9SKkOE",
  authDomain: "leshyapay.firebaseapp.com",
  projectId: "leshyapay",
  storageBucket: "leshyapay.appspot.com",
  messagingSenderId: "667799722447",
  appId: "1:667799722447:web:7e3b97ea863dcd7e6d1aba",
  measurementId: "G-TL6K01WFQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);