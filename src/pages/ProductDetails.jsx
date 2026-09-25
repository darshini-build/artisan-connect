import { useParams } from 'react-router-dom'

export default function ProductDetails({ products }) {
  const { id } = useParams()
  const product = products.find((item) => item.id === id)

  if (!product) {
    return <div className="page-shell">Product not found.</div>
  }

  return (
    <div className="page-shell">
      <div className="product-detail-layout">
        <img src={product.image} alt={product.name} className="detail-image" />
        <div className="detail-copy">
          <p className="eyebrow">AI Prototype / Demo</p>
          <h2>{product.name}</h2>
          <div className="meta-line">
            <span>{product.artisan}</span>
            <span>{product.location}</span>
          </div>

          <div className="detail-specs">
            <p><strong>Craft type:</strong> {product.craftType}</p>
            <p><strong>Material:</strong> {product.material}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Quantity available:</strong> {product.quantity}</p>
          </div>

          <p>{product.description}</p>

          <div className="chip-list">
            {product.tags.map((tag) => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>

          <div className="detail-actions">
            <button type="button" className="primary-btn" onClick={() => alert(`Contact ${product.artisan} about ${product.name}`)}>Contact Artisan</button>
            <button type="button" className="secondary-btn" onClick={() => alert(`Inquiry sent for ${product.name}.`)}>Send Inquiry</button>
            <button type="button" className="secondary-btn" onClick={() => alert(`Bulk order request started for ${product.name}.`)}>Request Bulk Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}
