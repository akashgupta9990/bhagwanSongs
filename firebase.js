// src/firebase.js
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
//TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//for firebase js SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7vE09QldGrVSGgBEQfImuQZt5WUIPiRI",
  authDomain: "bhaktipath-6a35c.firebaseapp.com",
  projectId: "bhaktipath-6a35c",
  storageBucket: "bhaktipath-6a35c.firebasestorage.app",
  messagingSenderId: "192464515662",
  appId: "1:192464515662:web:59f9742c3568369fc5491f",
  measurementId: "G-RL45SND7VG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
