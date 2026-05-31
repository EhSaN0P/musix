import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute.jsx";
import ByYourVibe from "../../components/Pages/ByYourVibe/ByYourVibe.jsx";
import Downloads from "../../components/Pages/Download/Download.jsx";
import Profile from "../../components/Pages/Profile/Profile.jsx";
import Home from "../../components/Pages/Home/Home.jsx";
import SearchPage from "../../components/Pages/SearchPage/SearchPage.jsx";
import Favorite from "../../components/Pages/Favorite/Favorite.jsx";

export const AuthRoutes = () => (
    <>
        <Route
            path="/favorite"
            element={
                <ProtectedRoute>
                    <Favorite />
                </ProtectedRoute>
            }
        />

        <Route
            path="/history"
            element={
                <ProtectedRoute>
                    <History />
                </ProtectedRoute>
            }
        />

        <Route
            path="/by-your-vibe"
            element={
                <ProtectedRoute>
                    <ByYourVibe />
                </ProtectedRoute>
            }
        />

        <Route
            path="/download"
            element={
                <ProtectedRoute>
                    <Downloads />
                </ProtectedRoute>
            }
        />

        <Route
            path="/profile"
            element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            }
        />

        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
    </>
);