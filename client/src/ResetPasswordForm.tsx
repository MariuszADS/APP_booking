import { useState, type ChangeEvent, type FormEvent } from "react"
import { Link, useNavigate, useSearchParams } from "react-router"

function ResetPasswordForm() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get("token") || ""
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value)
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError("")
        setSuccess("")

        if (!token) {
            setError("Reset token is missing.")
            return
        }

        setIsSubmitting(true)

        try {
            const res = await fetch("http://127.0.0.1:8000/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ token, password }),
            })
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Password reset failed")
            }

            setSuccess(data.message || "Password changed successfully")
            setTimeout(() => navigate("/login"), 900)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="auth-card">
            <h1>Set new password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="new-password">New password</label>
                <input
                    id="new-password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    minLength={6}
                    required
                />

                <button type="submit" disabled={isSubmitting || !password.trim()}>
                    {isSubmitting ? "Saving..." : "Save password"}
                </button>
            </form>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <p className="muted">
                <Link to="/login">Back to login</Link>
            </p>
        </section>
    )
}

export default ResetPasswordForm
