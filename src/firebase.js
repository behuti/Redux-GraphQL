import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHK0eUS8FcDk-qkiQ9pvHfjakMckRLZdE",
  authDomain: "redux-graphql-e8fa3.firebaseapp.com",
  projectId: "redux-graphql-e8fa3",
  storageBucket: "redux-graphql-e8fa3.appspot.com",
  messagingSenderId: "94215086541",
  appId: "1:94215086541:web:dd9b941407aa594597a484",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export function loginWithGoogle() {
  return signInWithPopup(auth, provider)
    .then((res) => res.user)
    .catch((e) => {
      console.log(e);
    });
}

export const signoutGoogle = () => {
  signOut(auth);
};
