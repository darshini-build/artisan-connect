import { useMemo, useState } from 'react'
import { generateMarketMatches } from '../utils/mockAI'

export default function MarketLinkage({ products, buyers }) {
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '')
  const selectedProduct = products.find((item) => item.id === selectedProductId) || products[0]

  const matches = useMemo(() => {
    if (!selectedProduct) return []
    return generateMarketMatches(selectedProduct, buyers)
  }, [buyers, selectedProduct])

  return (
    <div className="page-shell">
      <div className="header-row">
        <div>
          <p className="eyebrow">AI-Driven Market Linkage</p>
          <h2>Market Linkage</h2>
        </div>
      </div>

      <div className="filter-panel">
        <select value={selectedProductId} onChange={(event) => setSelectedProductId(event.target.value)}>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>

      {selectedProduct && (
        <div className="match-summary">
          <h3>{selectedProduct.name}</h3>
          <p>{selectedProduct.category} • ₹{selectedProduct.price} • {selectedProduct.location}</p>
        </div>
      )}

      <div className="match-list">
        {matches.map((match, idx) => (
          <div key={match.id} className="match-card">
            <div className="match-header">
              <div>
                <h3>{idx + 1}. {match.name}</h3>
                <p>{match.requirement}</p>
              </div>
              <span className="score-pill">{match.matchScore}%</span>
            </div>
            <div className="meta-line compact">
              <span>Req qty: {match.requiredQuantity}</span>
              <span>{match.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
