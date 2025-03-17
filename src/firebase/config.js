import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDGUsWLK4SDIQtV62DourKzP_D-udf-ZZo",
  authDomain: "wads-todoforums.firebaseapp.com",
  projectId: "wads-todoforums",
  storageBucket: "wads-todoforums.firebasestorage.app",
  messagingSenderId: "1041234907322",
  appId: "1:1041234907322:web:587a86772813a1336fb283",
  measurementId: "G-TML5WQK142"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);