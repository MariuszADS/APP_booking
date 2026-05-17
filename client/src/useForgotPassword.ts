import { useState } from "react"

function useForgotPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    async function sendResetEmail(email: string) {
        setIsLoading(true)
        setError("")
        setSuccess("")

        try {
            const res = await fetch("http://127.0.0.1:8000/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Reset link failed")
            }

            setSuccess(data.message || "Reset link sent")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return {
        sendResetEmail,
        isLoading,
        error,
        success,
    }
}

export default useForgotPassword
