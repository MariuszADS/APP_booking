type RegisterData = {
  email: string
  password: string
  name: string
}

type RegisterResponse = {
  id: number
  email: string
  name: string
}

async function registerUser(formData: RegisterData): Promise<RegisterResponse> {
  const res = await fetch("http://127.0.0.1:8000/auth/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Register failed")
  }

  return data
}

export default registerUser
