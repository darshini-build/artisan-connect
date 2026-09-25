export default function SchemeCard({ scheme }) {
  return (
    <div className="scheme-card">
      <div className="scheme-header">
        <h3>{scheme.name}</h3>
        <span className="tag">Support</span>
      </div>
      <p><strong>Target:</strong> {scheme.target}</p>
      <p><strong>Benefits:</strong> {scheme.benefits.join(', ')}</p>
      <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
      <button type="button" className="secondary-btn full" onClick={() => alert(`${scheme.name}: ${scheme.detail}`)}>
        Learn More
      </button>
    </div>
  )
}
