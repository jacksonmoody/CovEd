import { db } from './firebase';
import { setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

export async function addUser(uid, type, name, authProvider, email, onboarded = false) {
   await setDoc(doc(db, "users", uid), {
      uid: uid,
      type: type,
      name: name,
      authProvider: authProvider,
      onboarded: onboarded,
      email: email,
   });
}

export async function updateUser(user) {
   const entryRef = doc(db, "users", user.uid);
   await updateDoc(entryRef, {
      uid: user.uid,
      type: user.type,
      name: user.name,
      authProvider: user.authProvider,
      onboarded: user.onboarded,
      email: user.email
   });
}

export async function deleteUser(user) {
   await deleteDoc(doc(db, "users", user.uid));
}