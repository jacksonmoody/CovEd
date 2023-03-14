import {initializeApp} from "firebase/app"
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithRedirect, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { addUser } from "./database";

const firebaseConfig = {
   apiKey: "AIzaSyBT22aMNrMQTT7sOGb3NdRNppP80BQzqgs",
   authDomain: "cov-education.firebaseapp.com",
   projectId: "cov-education",
   storageBucket: "cov-education.appspot.com",
   messagingSenderId: "181471038447",
   appId: "1:181471038447:web:3d88b13427d0336184441a",
   measurementId: "G-1KFYWG4GXR"
 };
 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

async function signInWithGoogle(){
   try {
      await signInWithRedirect(auth, provider);
   } catch (err) {
      console.error(err);
   }
}

async function loginWithEmailAndPassword(email, password){
   try {
      await signInWithEmailAndPassword(auth, email, password);
   } catch (err) {
      console.error(err);
   }
}

async function registerWithEmailAndPassword(name, email, password){
   try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addUser(user.uid, name, "local", email);
      await updateProfile(auth.currentUser, { displayName: name })
      
   } catch (err) {
      console.error(err);
   }
}

export {
  auth,
  db,
  signInWithGoogle,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword
};