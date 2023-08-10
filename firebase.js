import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";  // from docs

// Follow this pattern to import other Firebase services

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
      apiKey: "AIzaSyAlkwRZYWt2LR64DJo7Lmjapt1N3h58iGk",
      authDomain: "vybe2023.firebaseapp.com",
      projectId: "vybe2023",
      storageBucket: "vybe2023.appspot.com",
      messagingSenderId: "515655264926",
      appId: "1:515655264926:web:89ff30b12438529f97298f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const provider = new GoogleAuthProvider(); // from docs

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// To apply the default browser preference instead of explicitly setting it.
const auth = getAuth();
auth.languageCode = 'it';

export const signInWithGoogle = async () => {

return signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log('Google signInWithPopup ->', user);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  })
}


