type LoginData = {
    email: string,
    password: string
}
type LoginResponse = {
    token: string,
    user: {
        id: number,
        email: string,
        name: string,
        role: string
    }
}
type LegacyLoginResponse = {
    token: string,
    userId: number,
    role: string
}
export type{LoginData,LoginResponse}

async function loginUser(formData: LoginData): Promise<LoginResponse> {
    const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" 
        },
        body:JSON.stringify(formData),
    })
    const data = await res.json()
    if(!res.ok){
        throw new Error(data.message || "Login failed")
    }

    if (data.user) {
        return data
    }

    const legacyData = data as LegacyLoginResponse

    return {
        token: legacyData.token,
        user: {
            id: legacyData.userId,
            email: formData.email,
            name: formData.email,
            role: legacyData.role,
        },
    }
}
export default loginUser
