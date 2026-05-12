import { useState } from "react";

function useForgotPassword(email: string) {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    async function sendResetEmail() {
        setIsLoading(true)
        setError("")
        setSuccess("")

        try {
            const res = await fetch("http://localhost:8000/auth/forgot-password", {

                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },

                body: JSON.stringify({ email })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Reset lint sent")
            }
            setSuccess(data.message || "Reset lint sent")
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        }
        finally {
            setIsLoading(false)
        }
    }
    return {
        sendResetEmail,
        isLoading,
        error,
        success
    }
}
export default useForgotPassword        
