import { Navigate, Route, Routes, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import Dashboard from "./Dashboard"
import FormResetPassword from "./FormResetPassword"
import HomePage from "./HomePage"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import ResetPasswordForm from "./ResetPasswordForm"
import AdminPanel from "./AdminPanel"
import type { LoginResponse } from "./Login"
import "./App.css"

type AuthUser = LoginResponse["user"]

function App() {
    const navigate = useNavigate()
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("booking-token"))
    const [user, setUser] = useState<AuthUser | null>(() => {
        const savedUser = localStorage.getItem("booking-user")
        return savedUser ? JSON.parse(savedUser) : null
    })

    useEffect(() => {
        if (token) {
            localStorage.setItem("booking-token", token)
        } else {
            localStorage.removeItem("booking-token")
        }
    }, [token])

    useEffect(() => {
        if (user) {
            localStorage.setItem("booking-user", JSON.stringify(user))
        } else {
            localStorage.removeItem("booking-user")
        }
    }, [user])

    function handleLoginSuccess(data: LoginResponse) {
        setToken(data.token)
        setUser(data.user)
        navigate("/dashboard")
    }

    function handleLogout() {
        setToken(null)
        setUser(null)
        navigate("/login")
    }

    return (
        <main className="app-shell">
            <Routes>
                <Route path="/" element={<HomePage isLoggedIn={Boolean(token)} isAdmin={user?.role === "admin"} />} />
                <Route
                    path="/login"
                    element={token ? <Navigate to="/dashboard" replace /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/forgot-password" element={<FormResetPassword />} />
                <Route path="/reset-password" element={<ResetPasswordForm />} />
                <Route
                    path="/dashboard"
                    element={
                        token && user ? (
                            <Dashboard token={token} userName={user.name} userRole={user.role} onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/admin"
                    element={
                        token && user?.role === "admin" ? (
                            <AdminPanel token={token} onLogout={handleLogout} />
                        ) : (
                            <Navigate to={token ? "/dashboard" : "/login"} replace />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </main>
    )
}

export default App
