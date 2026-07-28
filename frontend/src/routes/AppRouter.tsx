import { Routes, Route, Navigate, } from "react-router-dom";

import Login from "../pages/Authentication/signIn";
import Register from "../pages/Authentication/singUp";
import Dashboard from "../pages/dashboard/dashboard";
import ProtectedRoute from "./ProtectedRouter";

export default function AppRouter() {
    return (
        <Routes>

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}