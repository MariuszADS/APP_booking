import { useState, type ChangeEvent, type FormEvent } from "react"
import { Link, useNavigate } from "react-router"
import registerUser from "./Register"

type RegisterFormData = {
    name: string
    email: string
    password: string
}

function RegisterForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<RegisterFormData>({
        name: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError("")
        setIsSubmitting(true)

        try {
            await registerUser(formData)
            navigate("/login")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Register failed")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="auth-card">
            <h1>Create account</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                />

                <label htmlFor="register-email">Email</label>
                <input
                    id="register-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                />

                <label htmlFor="register-password">Password</label>
                <input
                    id="register-password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    minLength={6}
                    required
                />

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create account"}
                </button>
            </form>

            {error && <p className="error">{error}</p>}
            <p className="muted">
                Already registered? <Link to="/login">Log in</Link>
            </p>
        </section>
    )
}

export default RegisterForm
