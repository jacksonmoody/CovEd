import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";
import { addUser } from "./database";
import { getFirestore, query, collection, where, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBT22aMNrMQTT7sOGb3NdRNppP80BQzqgs",
  authDomain: "api.coved.org",
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
        if (type != "Admin") {
          await addUser(user.uid, type, name, "google", email, image);
        }
      }
    }
    return "Success";
  } catch (err) {
    return "Error with Google authentication. Please try again.";
  }
}

async function loginWithEmailAndPassword(email, password) {
  try {
    const res = await signInWithEmailAndPassword(auth, email.trim(), password);
    const user = res.user;
    if (!user.emailVerified) {
      return "Unverified email. Please verify your email and try again.";
    }
    return "Success";
  } catch (err) {
    return "Invalid email/password. Please try again";
  }
}

async function registerWithEmailAndPassword(name, email, password, type) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email.trim(), password);
    const user = res.user;
    if (user.emailVerified) {
      await addUser(user.uid, type, name, "local", email.trim());
      await updateProfile(auth.currentUser, { displayName: name });
    } else {
      await sendEmailVerification(auth.currentUser);
      await updateProfile(auth.currentUser, { displayName: name });
      await addUser(user.uid, type, name, "local", email.trim());
    }
    return "Success";
  } catch (err) {
    if (err.toString().includes("email-already-in-use")) {
      return "Email already in use. Please login instead.";
    } else {
      return "Error with registration. Please try again with a different email/password.";
    }
  }
}

async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return "Success! Check your email for next steps.";
  } catch (err) {
    if (err.toString().includes("user-not-found")) {
      return "Email not found. Please try registering a new account with that email.";
    } else {
      return "Error resetting password. Please try again.";
    }
  }
}

async function sendEmail(to, subject, body) {
  try {
    await addDoc(collection(db, "mail"), {
      to: to,
      replyTo: "support@coved.org",
      message: {
        subject: subject,
        html: body
      }
    });
  } catch (e) {
    console.error(e);
  }
}

export {
  auth,
  db,
  registerWithGoogle,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  resetPassword,
  sendEmail
};
