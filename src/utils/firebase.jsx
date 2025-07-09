// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzYR7sGftHkwI91ixf7P6_9qUFzO-dYAA",
  authDomain: "netflixgpt-f14bd.firebaseapp.com",
  projectId: "netflixgpt-f14bd",
  storageBucket: "netflixgpt-f14bd.firebasestorage.app",
  messagingSenderId: "111986566317",
  appId: "1:111986566317:web:94a2c2c2af70b41ecfd224",
  measurementId: "G-RRZHED366H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app, analytics };

export const auth = getAuth();