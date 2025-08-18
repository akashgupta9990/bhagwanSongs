// Import the functions you need from the SDKs you need
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx-EGa_sU6QmjFshB_dJxyIN1v-MKs5b0",
  authDomain: "bhaktipath-b9c17.firebaseapp.com",
  projectId: "bhaktipath-b9c17",
  storageBucket: "bhaktipath-b9c17.firebasestorage.app",
  messagingSenderId: "845839095173",
  appId: "1:845839095173:web:7b44f5cf9d9821a11220ec",
  measurementId: "G-ZZZQJVY4LS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
