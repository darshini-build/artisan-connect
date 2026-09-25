import { Link } from 'react-router-dom'

export default function ProductCard({ product, onFavorite, isFavorite, currentUser }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-content">
        <div className="card-top-row">
          <div>
            <h3>{product.name}</h3>
            <p className="muted-text">{product.artisan}</p>
          </div>
          <button type="button" className="favorite-btn" onClick={() => onFavorite(product.id)}>
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>

        <div className="meta-line">
          <span>{product.location}</span>
          <span>₹{product.price}</span>
        </div>

        <div className="chip-list">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="chip">{tag}</span>
          ))}
        </div>

        <div className="card-actions">
          <Link to={`/product/${product.id}`} className="primary-btn small">View Details</Link>
          <button type="button" className="secondary-btn small" onClick={() => alert(`Contact ${product.artisan} about ${product.name}`)}>
            Contact Artisan
          </button>
        </div>
      </div>
    </div>
  )
}
