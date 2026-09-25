import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div className="welcome-screen">
      <div className="welcome-card">
        <img src="/artisan-connect-logo.png" alt="Artisan Connect" className="welcome-logo" />
        <h1>Artisan Connect</h1>
        <p className="lead">Empowering Artisans. Connecting Markets.</p>
        <div className="welcome-actions">
          <Link to="/register" className="primary-btn">Get Started</Link>
          <Link to="/login" className="secondary-btn">Login</Link>
        </div>
      </div>
    </div>
  )
}
