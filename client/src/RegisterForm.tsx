import { type ChangeEvent, type FormEvent, useState } from "react"
import registerUser from "./Register"

type RegisterFormData = {
  email: string
  password: string
  name: string
}

function RegisterForm() {

  //user typing
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    name: "",
  })

  //useState
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  //event handler
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    //blocking page reloading
    event.preventDefault()
    setError("")
    setSuccess("")
    //UI is wating for response
    setIsSubmitting(true)

    try {
      const user = await registerUser(formData)

      setSuccess(`User ${user.name} registered successfully`)
      setFormData({
        email: "",
        password: "",
        name: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Register failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="register-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            //update state
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
            //update state
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            //update state
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  )
}

export default RegisterForm
