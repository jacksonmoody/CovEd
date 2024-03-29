import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ErrorPage from "./pages/ErrorPage";
import { auth, db } from "./helpers/firebase";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import Layout from "./pages/Layout";
import LayoutMinimal from "./pages/LayoutMinimal";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./helpers/theme";
import UserProfile from "./components/UserProfile";
import UserGrid from "./components/UserGrid";
import Onboarding from "./components/Onboarding";
import AdminLogin from "./pages/AdminLogin";
import Resources from "./pages/Resources";
import AdminDashboard from "./pages/AdminDashboard";
import Hours from "./pages/Hours";
import VerifyHours from "./pages/VerifyHours";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setcurrentUser] = useState(null);
  const [initializingAuth, setInitializingAuth] = useState(true);
  const [initializingDB, setInitializingDB] = useState(true);
  const [userData, setUserData] = useState(null);
  const [onboarded, setOnboarded] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setLoggedIn(true);
        setcurrentUser(user);
        if (initializingAuth) setInitializingAuth(false);
      } else {
        setLoggedIn(false);
        setcurrentUser(null);
        if (initializingAuth) setInitializingAuth(false);
      }
    });

    if (!currentUser) return;

    const unsub1 = onSnapshot(
      query(collection(db, "mentors"), where("uid", "==", currentUser?.uid)),
      (snapshot) => {
        try {
          const data = snapshot.docs.map((doc) => doc.data());
          if (data.length !== 0) {
            setUserData(data[0]);
            setOnboarded(data[0].onboarded);
          }
          if (initializingDB) setInitializingDB(false);
        } catch (error) {
          /*Error fetching data*/
        }
      }
    );

    const unsub2 = onSnapshot(
      query(collection(db, "mentees"), where("uid", "==", currentUser?.uid)),
      (snapshot) => {
        try {
          const data = snapshot.docs.map((doc) => doc.data());
          if (data.length !== 0) {
            setUserData(data[0]);
            setOnboarded(data[0].onboarded);
          }
          if (initializingDB) setInitializingDB(false);
        } catch (error) {
          /*Error fetching data*/
        }
      }
    );

    const unsub3 = onSnapshot(
      query(collection(db, "admin"), where("uid", "==", currentUser?.uid)),
      (snapshot) => {
        try {
          const data = snapshot.docs.map((doc) => doc.data());
          if (data.length !== 0) {
            setUserData(data[0]);
            setOnboarded(data[0].onboarded);
            setAdmin(true);
          }
          if (initializingDB) setInitializingDB(false);
        } catch (error) {
          /*Error fetching data*/
        }
      }
    );

    return () => {
      unsub1();
      unsub2();
      unsub3();
    };
  }, [currentUser, initializingAuth, initializingDB]);

  if (initializingAuth) return null;
  if (loggedIn && initializingDB) return null;

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout loggedIn={loggedIn} currentUser={userData} />}>
            <Route
              path="/admin/dashboard"
              element={loggedIn && admin ? <AdminDashboard /> : <Navigate to="/register/login" />}
            />
            <Route
              index
              element={
                loggedIn && onboarded && !admin ? (
                  <UserGrid currentUser={userData} />
                ) : loggedIn && onboarded && admin ? (
                  <AdminDashboard />
                ) : loggedIn ? (
                  <Navigate to="/register/onboarding" />
                ) : (
                  <Navigate to="/register/login" />
                )
              }
            />
            <Route
              path="profile"
              element={
                loggedIn && onboarded ? (
                  <UserProfile currentUser={userData} />
                ) : loggedIn ? (
                  <Navigate to="register/onboarding" />
                ) : (
                  <Navigate to="/register/login" />
                )
              }
            />

            <Route
              path="match"
              element={
                loggedIn && onboarded && !admin ? (
                  <UserGrid currentUser={userData} />
                ) : loggedIn && onboarded && admin ? (
                  <AdminDashboard />
                ) : loggedIn ? (
                  <Navigate to="/register/onboarding" />
                ) : (
                  <Navigate to="/register/login" />
                )
              }
            />
            <Route
              path="hours"
              element={
                loggedIn && onboarded ? (
                  userData.type === "Mentor" ? (
                    <Hours currentUser={userData} />
                  ) : (
                    <VerifyHours currentUser={userData} />
                  )
                ) : loggedIn ? (
                  <Navigate to="/register/onboarding" />
                ) : (
                  <Navigate to="/register/login" />
                )
              }
            />
            <Route
              path="resources"
              element={
                loggedIn && onboarded ? (
                  <Resources />
                ) : loggedIn ? (
                  <Navigate to="/register/onboarding" />
                ) : (
                  <Navigate to="/register/login" />
                )
              }
            />
          </Route>
          <Route path="/register" element={<LayoutMinimal loggedIn={loggedIn} />}>
            <Route
              path="admin/login"
              element={!loggedIn ? <AdminLogin /> : <Navigate to="/admin/dashboard" />}
            />
            <Route index element={!loggedIn ? <Login /> : <Navigate to="/" />} />
            <Route path="login" element={!loggedIn ? <Login /> : <Navigate to="/" />} />
            <Route path="newaccount" element={!loggedIn ? <Register /> : <Navigate to="/" />} />
            <Route
              path="forgotpassword"
              element={!loggedIn ? <ForgotPassword /> : <Navigate to="/" />}
            />
            <Route
              path="onboarding"
              element={
                loggedIn && onboarded ? (
                  <Navigate to="/" />
                ) : loggedIn ? (
                  <Onboarding currentUser={userData} setOnboarded={setOnboarded} />
                ) : (
                  <Navigate to="/register/login" />
                )
              }
            />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
