import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import BuyerCard from '../components/BuyerCard'

export default function BuyerDashboard({ products, buyers, favorites, onToggleFavorite }) {
  const [query, setQuery] = useState('')

  const filteredProducts = useMemo(() => {
    const text = query.toLowerCase()
    return products.filter((product) =>
      product.name.toLowerCase().includes(text) || product.category.toLowerCase().includes(text),
    )
  }, [products, query])

  return (
    <div className="page-shell">
      <div className="header-row">
        <div>
          <p className="eyebrow">Buyer Dashboard</p>
          <h2>Discover handmade goods</h2>
        </div>
      </div>

      <div className="search-panel">
        <input
          type="search"
          placeholder="Search products or categories"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="dashboard-layout">
        <section className="panel wide">
          <div className="panel-header">
            <h3>Recommended products</h3>
          </div>
          <div className="card-grid">
            {filteredProducts.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>Nearby artisan matches</h3>
          </div>
          <div className="stack-list">
            {buyers.map((buyer) => (
              <BuyerCard key={buyer.id} buyer={buyer} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
