import { Link, NavLink } from 'react-router-dom'

export default function Navbar({ currentUser, onLogout }) {
  return (
    <header className="topbar">
      <div className="brand-wrap">
        <img src="/artisan-connect-logo.png" alt="Artisan Connect" className="brand-logo" />
        <div>
          <div className="brand-name">Artisan Connect</div>
          <div className="brand-tag">Empowering Artisans. Connecting Markets.</div>
        </div>
      </div>

      <nav className="nav-links">
        <NavLink to="/artisan">Home</NavLink>
        <NavLink to="/catalog">Catalog</NavLink>
        <NavLink to="/add-product">Add</NavLink>
        <NavLink to="/market-linkage">Market</NavLink>
        <NavLink to="/schemes">Schemes</NavLink>
      </nav>

      <div className="topbar-actions">
        {currentUser ? (
          <>
            <span className="user-pill">{currentUser.name}</span>
            <button className="secondary-btn small" type="button" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="button-link primary-btn">Login</Link>
        )}
      </div>
    </header>
  )
}
