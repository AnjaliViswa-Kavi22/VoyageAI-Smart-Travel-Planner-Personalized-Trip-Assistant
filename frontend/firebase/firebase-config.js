import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "voyageai-94a59.firebaseapp.com",
    projectId: "voyageai-94a59",
    storageBucket: "voyageai-94a59.firebasestorage.app",
    messagingSenderId: "670572205949",
    appId: "1:670572205949:web:9862a09e9500f607059e14",
    measurementId: "G-XX67P1JN5X"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };