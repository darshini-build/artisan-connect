import SchemeCard from '../components/SchemeCard'

export default function Schemes({ schemes }) {
  return (
    <div className="page-shell">
      <div className="header-row">
        <div>
          <p className="eyebrow">Government Schemes</p>
          <h2>Schemes & Support</h2>
        </div>
      </div>

      <div className="card-grid schemes-grid">
        {schemes.map((scheme) => (
          <SchemeCard key={scheme.id} scheme={scheme} />
        ))}
      </div>
    </div>
  )
}
