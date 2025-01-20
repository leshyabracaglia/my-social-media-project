// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider } from "firebase/auth";  // Update this linesit says Unable to resolve "firebase/auth/react-native" from "firebase_config.js"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxbXqxn841eo_uFscI5pIQ66mi-Ht0bE4",
  authDomain: "my-social-media-project-ec4d4.firebaseapp.com",
  projectId: "my-social-media-project-ec4d4",
  storageBucket: "my-social-media-project-ec4d4.firebasestorage.app",
  messagingSenderId: "1029933935802",
  appId: "1:1029933935802:web:5fa650e78fb61dc782e683",
  measurementId: "G-1BQ086W0HB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

// export const loginWithPhoneNumber = async (phoneNumber) => {
//   try {
//     const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
//     return confirmation;
//   } catch (error) {
//     console.error("Error logging in with phone number", error);
//     throw error;
//   }
// };

// export const loginWithPhoneNumber = async (phoneNumber) => {
//   try {
//     const phoneProvider = new PhoneAuthProvider(auth);
//     console.log("Phone provider", phoneProvider);
//     const verificationId = await phoneProvider.verifyPhoneNumber(
//       phoneNumber,
//       // You can optionally pass a RecaptchaVerifier instance here if needed
//       null
//     );
//     console.log("Verification ID", verificationId);
//     return verificationId;
//   } catch (error) {
//     console.error("Error logging in with phone number", error);
//     throw error;
//   }
// };