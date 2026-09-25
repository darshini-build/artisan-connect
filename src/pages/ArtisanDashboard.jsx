import { Link } from 'react-router-dom'
import NotificationCard from '../components/NotificationCard'

export default function ArtisanDashboard({ currentUser, products, notifications }) {
  const totalProducts = products.length
  const productsViewed = products.reduce((sum, product) => sum + (product.views || 0), 0)
  const buyerInquiries = 18
  const estimatedSales = products.reduce((sum, product) => sum + product.price * 0.28, 0)
  const profileCompletion = 90

  return (
    <div className="page-shell">
      <div className="header-row">
        <div>
          <p className="eyebrow">Artisan Dashboard</p>
          <h2>Welcome {currentUser?.name || 'Artisan'}</h2>
        </div>
        <div className="stats-pill">Profile {profileCompletion}%</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total products</span>
          <strong>{totalProducts}</strong>
        </div>
        <div className="stat-card">
          <span>Products viewed</span>
          <strong>{productsViewed}</strong>
        </div>
        <div className="stat-card">
          <span>Buyer inquiries</span>
          <strong>{buyerInquiries}</strong>
        </div>
        <div className="stat-card highlight">
          <span>Estimated sales</span>
          <strong>₹{Math.round(estimatedSales).toLocaleString('en-IN')}</strong>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/add-product" className="primary-btn">Add Product</Link>
        <Link to="/catalog" className="secondary-btn">My Catalog</Link>
        <Link to="/market-linkage" className="secondary-btn">Market Linkage</Link>
        <Link to="/notifications" className="secondary-btn">Buyer Requests</Link>
        <Link to="/schemes" className="secondary-btn">Government Schemes</Link>
        <Link to="/artisan-profile" className="secondary-btn">Profile</Link>
      </div>

      <div className="dashboard-layout">
        <section className="panel">
          <div className="panel-header">
            <h3>Recent products</h3>
            <Link to="/catalog">View all</Link>
          </div>
          <div className="mini-list">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="mini-item">
                <img src={product.image} alt={product.name} />
                <div>
                  <strong>{product.name}</strong>
                  <p>{product.location}</p>
                </div>
                <span>₹{product.price}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>Notifications</h3>
            <Link to="/notifications">Open</Link>
          </div>
          <div className="notification-stack">
            {notifications.slice(0, 3).map((item) => (
              <NotificationCard key={item.id} notification={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
