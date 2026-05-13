import { useState } from "react"
import useForgotPassword from "./useForgotPassword.ts"

function FormResetPassword() {

    const [email, setEmail] = useState("")

    const { sendResetEmail, isLoading, error, success } = useForgotPassword()

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.currentTarget.value)
    }
    function handleSubmit(event: React.)



    return (
        <>
            <form target="_blank">
                <input value={email} onChange={handleChange} placeholder="Email" />
                <button type="button" onClick={}>Submit</button>
            </form>

            <button type="button" onClick={ } disabled={isLoading}>
                {isLoading ? "Sending..." : "Forgot password?"}
            </button>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </>
    )
}

export default FormResetPassword