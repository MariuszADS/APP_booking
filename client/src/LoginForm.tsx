import { useState, type ChangeEvent, type FormEvent } from "react"
import { Link } from "react-router"
import loginUser, { type LoginResponse } from "./Login"

type LoginFormData = {
    email: string
    password: string
}

type LoginFormProps = {
    onLoginSuccess: (data: LoginResponse) => void
}

function LoginForm({ onLoginSuccess }: LoginFormProps) {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    })
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError("")
        setIsSubmitting(true)

        try {
            const data = await loginUser(formData)
            onLoginSuccess(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="auth-card">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Log in"}
                </button>
            </form>

            {error && <p className="error">{error}</p>}

            <div className="auth-links">
                <Link to="/forgot-password">Forgot password?</Link>
                <Link to="/register">Create account</Link>
            </div>
        </section>
    )
}

export default LoginForm
