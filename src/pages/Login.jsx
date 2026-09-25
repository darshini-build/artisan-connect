import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login({ users, onLogin }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ userType: 'Artisan', email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const foundUser = users.find(
      (user) =>
        user.userType === form.userType &&
        user.email.toLowerCase() === form.email.toLowerCase() &&
        user.password === form.password,
    )

    if (!foundUser) {
      setError('Please check your credentials or create a new account.')
      return
    }

    onLogin(foundUser)
    navigate(foundUser.userType === 'Artisan' ? '/artisan' : '/buyer')
  }

  return (
    <div className="auth-shell login-shell">
      <div className="login-card">
        <section className="login-art-panel">
          <img
            src="/artisan-connect-login.png"
            alt="Artisan Connect"
            className="login-artisan-image"
          />
        </section>

        <section className="login-form-panel">
          <div className="auth-card-heading">
            <span className="eyebrow">Your marketplace starts here</span>
            <h2>Welcome back</h2>
            <p>Sign in to continue connecting your craft with the right buyers.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              User type
              <select name="userType" value={form.userType} onChange={handleChange}>
                <option value="Artisan">Artisan</option>
                <option value="Buyer">Buyer</option>
              </select>
            </label>

            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>

            <label>
              Password
              <input type="password" name="password" value={form.password} onChange={handleChange} required />
            </label>

            {error && <div className="error-box">{error}</div>}

            <button type="submit" className="primary-btn full">Login to Artisan Connect</button>
          </form>

          <p className="alt-link">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </section>
      </div>
    </div>
  )
}
