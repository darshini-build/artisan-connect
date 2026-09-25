export default function AdminDashboard({ artisans, buyers, products, inquiries }) {
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1
    return acc
  }, {})

  return (
    <div className="page-shell">
      <div className="header-row">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h2>Platform overview</h2>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total artisans</span>
          <strong>{artisans.length}</strong>
        </div>
        <div className="stat-card">
          <span>Total buyers</span>
          <strong>{buyers.length}</strong>
        </div>
        <div className="stat-card">
          <span>Total products</span>
          <strong>{products.length}</strong>
        </div>
        <div className="stat-card highlight">
          <span>Total inquiries</span>
          <strong>{inquiries.length}</strong>
        </div>
      </div>

      <div className="dashboard-layout">
        <section className="panel">
          <div className="panel-header">
            <h3>Most popular craft categories</h3>
          </div>
          <div className="chart-list">
            {Object.entries(categoryCounts).map(([key, value]) => (
              <div key={key} className="chart-row">
                <span>{key}</span>
                <div className="chart-bar-wrap">
                  <div className="chart-bar" style={{ width: `${Math.min(value * 18, 100)}%` }} />
                </div>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>Market linkage requests</h3>
          </div>
          <div className="stack-list">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="mini-inquiry">
                <strong>{inquiry.productName}</strong>
                <p>{inquiry.buyerName}</p>
                <span>{inquiry.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
