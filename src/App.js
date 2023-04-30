import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import { auth, db } from "./helpers/firebase";
import { query, getDocs, collection, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { useState, useEffect } from "react";
import Layout from "./pages/Layout";
import { addUser } from "./helpers/database";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./helpers/theme";
import UserProfile from "./components/UserProfile";
import UserGrid from "./components/UserGrid";

export default function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setcurrentUser] = useState(null);
    const [initializingAuth, setInitializingAuth] = useState(true);
    const [initializingDB, setInitializingDB] = useState(true);
    const [data, setData] = useState(null)

    useEffect(() => {

        async function handleRedirectResult() {
            try {
                const result = await getRedirectResult(auth);
                if (!result) return;
                const user = result.user;
                const q = query(collection(db, "users"), where("uid", "==", user.uid));
                const docs = await getDocs(q);
                if (docs.docs.length === 0) {
                    await addUser(user.uid, user.displayName, "google", user.email)
                }
            } catch (e) {
                console.error(e);
            }
        }

        handleRedirectResult();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true);
                setcurrentUser(user);
                if (initializingAuth) setInitializingAuth(false);
            } else {
                setLoggedIn(false);
                setcurrentUser(null);
                if (initializingAuth) setInitializingAuth(false);
            }
        })

        onSnapshot(query(collection(db, "users")), (snapshot) => {
            const data = snapshot.docs.map((doc) => (doc.data()));
            setData(data);
            if (currentUser === null) return;
            const body = data.filter((user) => (user.uid === currentUser.uid));
            if (initializingDB) setInitializingDB(false);
        });

    });

    if (initializingAuth) return null;
    if (loggedIn && initializingDB) return null;

    return (
        <ThemeProvider theme = {theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={loggedIn ? <Home /> : <Navigate to="/login" />} />
                        <Route path="login" element={!loggedIn ? <Login /> : <Navigate to="/" />} />
                        <Route path="register" element={!loggedIn ? <Register /> : <Navigate to="/" />} />
                        <Route path="myprofile" element={loggedIn ? <UserProfile /> : <Navigate to="/login" />} />
                        <Route path="findamentor" element={loggedIn ? <UserGrid/> : <Navigate to="/login" />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}