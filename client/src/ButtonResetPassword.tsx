import useForgotPassword from "./useForgotPassword.ts"

type ButtonResetPasswordProps = {
    email: string
}

function ButtonResetPassword({ email }: ButtonResetPasswordProps) {
    const { sendResetEmail, isLoading, error, success } = useForgotPassword()

    function handleClick() {
        sendResetEmail(email)
    }

    return (
        <>
            <button type="button" onClick={handleClick} disabled={isLoading}>
                {isLoading ? "Sending..." : "Forgot password?"}
            </button>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </>
    )
}

export default ButtonResetPassword