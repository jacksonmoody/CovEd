import { db } from "./firebase";
import { setDoc, doc, deleteDoc } from "firebase/firestore";

export async function addUser(uid, type, name, authProvider, email, image = "", onboarded = false) {
  if (type === "Mentee") {
    await setDoc(doc(db, "mentees", uid), {
      uid: uid,
      type: type,
      name: name,
      authProvider: authProvider,
      onboarded: onboarded,
      email: email,
      image: image
    });
  } else if (type === "Mentor") {
    await setDoc(doc(db, "mentors", uid), {
      uid: uid,
      type: type,
      name: name,
      authProvider: authProvider,
      onboarded: onboarded,
      email: email,
      image: image
    });
  } else if (type === "Admin") {
    await setDoc(doc(db, "admin", uid), {
      uid: uid,
      type: type,
      name: name,
      authProvider: authProvider,
      onboarded: onboarded,
      email: email,
      image: image
    });
  }
}

export async function deleteUser(user) {
  await deleteDoc(doc(db, "users", user.uid));
}
