import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    connectAuthEmulator,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBya9eQ4Xu_ll-Uyf8D2GYYXeSLdylt1Pw",
    authDomain: "chat-app-4e1f8.firebaseapp.com",
    projectId: "chat-app-4e1f8",
    storageBucket: "chat-app-4e1f8.appspot.com",
    messagingSenderId: "123409640746",
    appId: "1:123409640746:web:2801f88ff3161493770253",
    measurementId: "G-J6JNGQX9XE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

const auth = getAuth();
const ggProvider = new GoogleAuthProvider();

const db = getFirestore();

// if (window.location.hostname === "localhost") {
//     connectFirestoreEmulator(db, "localhost", 8080);
// }
// connectAuthEmulator(auth, "http://localhost:9099");

export {
    analytics,
    auth,
    ggProvider,
    signInWithPopup as signIn,
    database,
    ref,
    onValue,
    push,
    set,
};
