type LoginData = {
    email: string,
    password: string
}
type LoginResponse = {
    id: number,
    email: string,
    password: string
}

async function loginUser(formData: LoginData): Promise<LoginResponse> {
    const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" 
        },
        body:JSON.stringify(formData),
    })
    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message || "Login failed")
    }
    return data
}
export default loginUser