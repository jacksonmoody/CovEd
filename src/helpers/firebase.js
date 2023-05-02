import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { addUser } from "./database";
import { query, collection, where, getDocs } from "firebase/firestore";

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
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

async function registerWithGoogle(type) {
   try {
      const result = await signInWithPopup(auth, provider);
      if (!result) return;
      const user = result.user;
      const email = user.email;
      const name = user.providerData[0].displayName;
      const image = user.photoURL;
      const q = query(collection(db, "mentors"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
         const q2 = query(collection(db, "mentees"), where("uid", "==", user.uid));
         const docs2 = await getDocs(q2);
         if (docs2.docs.length === 0) {
            await addUser(user.uid, type, name, "google", email, image);
         }
      }

   } catch (err) {
      alert("Error with Google authentication. Please try again.");
      console.error(err);
   }
}

async function loginWithEmailAndPassword(email, password) {
   try {
      await signInWithEmailAndPassword(auth, email, password);
   } catch (err) {
      alert("Error with login. Please try again.");
      console.error(err);
   }
}

async function registerWithEmailAndPassword(name, email, password, type) {
   try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addUser(user.uid, type, name, "local", email);
      await updateProfile(auth.currentUser, { displayName: name })

   } catch (err) {
      err = err.toString();
      if (err.includes("email-already-in-use")) {
         alert("Email already in use. Please try again with a different email.");
      } else {
         alert("Error with registration. Please try again.");
      }
      console.error(err.toString());
   }
}

export {
   auth,
   db,
   registerWithGoogle,
   loginWithEmailAndPassword,
   registerWithEmailAndPassword
};