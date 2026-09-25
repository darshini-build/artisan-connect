import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const initialForm = {
  userType: 'Artisan',
  name: '',
  mobile: '',
  email: '',
  password: '',
  location: ''
}

export default function Register({ onRegister }) {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name || !form.mobile || !form.email || !form.password || !form.location) {
      setError('Please complete all required fields.')
      return
    }

    onRegister({ ...form, id: `user-${Date.now()}` })
    navigate(form.userType === 'Artisan' ? '/artisan' : '/buyer')
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h2>Create account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            User type
            <select name="userType" value={form.userType} onChange={handleChange}>
              <option value="Artisan">Artisan</option>
              <option value="Buyer">Buyer</option>
            </select>
          </label>

          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>

          <label>
            Mobile number
            <input name="mobile" value={form.mobile} onChange={handleChange} required />
          </label>

          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>

          <label>
            Location
            <input name="location" value={form.location} onChange={handleChange} required />
          </label>

          {error && <div className="error-box">{error}</div>}

          <button type="submit" className="primary-btn full">Register</button>
        </form>

        <p className="alt-link">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}
