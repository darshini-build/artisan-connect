import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'

export default function Catalog({ products, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [location, setLocation] = useState('All')
  const [maxPrice, setMaxPrice] = useState(3000)
  const [sortBy, setSortBy] = useState('relevance')

  const categories = ['All', ...new Set(products.map((product) => product.category))]
  const locations = ['All', ...new Set(products.map((product) => product.location))]

  const filteredProducts = useMemo(() => {
    const lowerSearch = search.toLowerCase()
    const result = products.filter((product) => {
      const categoryMatch = category === 'All' || product.category === category
      const locationMatch = location === 'All' || product.location === location
      const priceMatch = product.price <= maxPrice
      const searchMatch = !lowerSearch || `${product.name} ${product.category}`.toLowerCase().includes(lowerSearch)
      return categoryMatch && locationMatch && priceMatch && searchMatch
    })

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    }

    if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    }

    if (sortBy === 'relevance') {
      result.sort((a, b) => (b.views || 0) - (a.views || 0))
    }

    return result
  }, [category, location, maxPrice, products, search, sortBy])

  return (
    <div className="page-shell">
      <div className="header-row">
        <div>
          <p className="eyebrow">Smart Catalog</p>
          <h2>Catalog</h2>
        </div>
      </div>

      <div className="filter-panel">
        <input type="search" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          {locations.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <input type="range" min="200" max="3000" step="50" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="relevance">Sort by relevance</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <div className="card-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}
