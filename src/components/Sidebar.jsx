import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/artisan', label: 'Home', icon: '🏠' },
  { to: '/catalog', label: 'Catalog', icon: '🛍️' },
  { to: '/add-product', label: 'Add Product', icon: '➕' },
  { to: '/market-linkage', label: 'Market', icon: '📈' },
  { to: '/notifications', label: 'Messages', icon: '💬' },
  { to: '/schemes', label: 'Schemes', icon: '📜' },
  { to: '/artisan-profile', label: 'Profile', icon: '👤' },
  { to: '/buyer', label: 'Buyers', icon: '🧑‍🤝‍🧑' }
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">Dashboard</div>
      <ul className="sidebar-menu">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}
