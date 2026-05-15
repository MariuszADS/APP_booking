import { useState } from "react"
import useForgotPassword from "./useForgotPassword.ts"

function FormResetPassword() {

    const [email, setEmail] = useState("")

    const { sendResetEmail, isLoading, error, success } = useForgotPassword()

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.currentTarget.value)
    }
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        await sendResetEmail(email)
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="reset-email">Email</label>
                <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send reset link"}
            </button>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </form>
        </>
    )
}

export default FormResetPassword    