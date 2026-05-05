import { useState, type ChangeEvent, type FormEvent } from "react"
import loginUser from "./Login"

type LoginFromData = {
    email: string,
    password: string
}

function LoginForm() {

    const [formData, setFormData] = useState<LoginFromData>({
        email: "",
        password: "",
    })

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubbmiting(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError("")
        setSuccess("")
        setIsSubmitting(true)

        try {
            const user = await loginUser(formData)

            setSuccess(`User ${user} logged successfully`)
            setFormData({
                email: "",
                password: ""
            })
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed")
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubbmiting}>
                <div>
                    <label htmlFor="email"> Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
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
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging..." : "Logged"}
                </button>
            </form>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    )
}

export default LoginForm

