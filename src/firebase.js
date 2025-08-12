// src/firebase.js

// Import the Firebase modules you'll need.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithCustomToken, onAuthStateChanged, signOut, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection, query, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Global variables provided by the Canvas environment.
// We check for their existence to prevent errors in development.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Initialize Firebase with the provided configuration.
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// A helper function to sign in the user.
export const initializeFirebase = async () => {
    try {
        if (initialAuthToken) {
            await signInWithCustomToken(auth, initialAuthToken);
        } else {
            await signInAnonymously(auth);
        }
        console.log("Firebase authentication successful!");
    } catch (error) {
        console.error("Firebase authentication failed:", error);
    }
};

// Export the Firebase services so other components can use them.
export { auth, db, signOut, onAuthStateChanged, signInWithCustomToken, doc, getDoc, setDoc, onSnapshot, collection, query, addDoc, serverTimestamp };
