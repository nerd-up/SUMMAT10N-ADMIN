// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAptGloBmI2LRCnzdkkbsVOmhOGDCqA1Jw",
  authDomain: "summat10n.firebaseapp.com",
  projectId: "summat10n",
  storageBucket: "summat10n.firebasestorage.app",
  messagingSenderId: "1067410049323",
  appId: "1:1067410049323:web:4699e5dab8182c4fef9d6e",
  measurementId: "G-WGN3V0Z9DX"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);