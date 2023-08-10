// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { json } from "stream/consumers";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlkwRZYWt2LR64DJo7Lmjapt1N3h58iGk",
  authDomain: "http://localhost:8080/login-signup",//"vybe2023.firebaseapp.com",
  projectId: "vybe2023",
  storageBucket: "vybe2023.appspot.com",
  messagingSenderId: "515655264926",
  appId: "1:515655264926:web:89ff30b12438529f97298f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app); // use to check info about the user that is authenticated

// logic for gmail authentication
const provider = new GoogleAuthProvider();

// function that represent sign in from google
export const signInWithGoogle = () => {
    console.log("In signInWithGoogle XXXXXXXXXX");
    signInWithPopup(auth, provider)
    .then((data) =>
     json(data)
    )
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    }); // make the pop up that ask you to sign in
}