// src/firebase.js

// Import Firebase modules for Vite
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  signInAnonymously 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  query, 
  onSnapshot, 
  getDocs, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALq-OmR8vcJsIHF99qz26cSGVYbhdfh_s",
  authDomain: "fun-quiz-website.firebaseapp.com",
  projectId: "fun-quiz-website",
  storageBucket: "fun-quiz-website.firebasestorage.app",
  messagingSenderId: "947442001317",
  appId: "1:947442001317:web:845794bf8ac85ca2fa744c",
  measurementId: "G-169LYZVJVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export the initialized app, auth, and database instances,
// along with the specific functions used in your application.
export { 
  app, 
  auth, 
  db, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  signInAnonymously, 
  collection, 
  query, 
  onSnapshot, 
  getDocs, 
  addDoc, 
  serverTimestamp 
};
