import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyArjyyFkXN49E7z8LaWsi8sMNqZctzBGDs",
    authDomain: "my-u-library-7000e.firebaseapp.com",
    projectId: "my-u-library-7000e",
    storageBucket: "my-u-library-7000e.appspot.com",
    messagingSenderId: "662459598762",
    appId: "1:662459598762:web:4f57bda7e05cd9780bcdd3"
};

const app = initializeApp(firebaseConfig);

//Handler for email and password
const auth = getAuth(app);

// Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account "
});
const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export { auth };
export { signInWithGooglePopup };
export { createUserWithEmailAndPassword };