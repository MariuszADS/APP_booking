function RegisterForm() {
  return (
    <div className="register-container">
      <h2>Register</h2>

      <form>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Enter email" />
        </div>

        <div>
          <label>Password</label>
          <input type="password" placeholder="Enter password" />
        </div>

        <div>
          <label>Name</label>
          <input type="text" placeholder="Enter name" />
        </div>

        <button type="submit">Register</button>
      </form>

      {/* miejsce na komunikaty */}
      <p className="error"></p>
      <p className="success"></p>
    </div>
  )
}

export default RegisterForm