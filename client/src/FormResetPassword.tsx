import { useState, type ChangeEvent, type FormEvent } from "react"
import { Link } from "react-router"
import useForgotPassword from "./useForgotPassword"

function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function FormResetPassword() {
    const [email, setEmail] = useState("")
    const [validationError, setValidationError] = useState("")

    const { sendResetEmail, isLoading, error, success } = useForgotPassword()

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.currentTarget.value)
        if (validationError) {
            setValidationError("")
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const normalizedEmail = email.trim()

        if (!normalizedEmail) {
            setValidationError("Email jest wymagany.")
            return
        }

        if (!validateEmail(normalizedEmail)) {
            setValidationError("Podaj poprawny adres email.")
            return
        }

        setValidationError("")
        await sendResetEmail(normalizedEmail)

        if (!error) {
            setEmail("")
        }
    }

    return (
        <section className="auth-card">
            <h1>Forgot password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="reset-email">Email</label>
                <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />

                <button type="submit" disabled={isLoading || !email.trim()}>
                    {isLoading ? "Sending..." : "Send reset link"}
                </button>
            </form>

            {validationError && <p className="error">{validationError}</p>}
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <p className="muted">
                Remembered it? <Link to="/login">Back to login</Link>
            </p>
        </section>
    )
}

export default FormResetPassword
