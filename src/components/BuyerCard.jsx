export default function BuyerCard({ buyer }) {
  return (
    <div className="buyer-card">
      <div className="buyer-headline">
        <h4>{buyer.name}</h4>
        <span className="tag">{buyer.type}</span>
      </div>
      <p>{buyer.interest}</p>
      <div className="meta-line compact">
        <span>{buyer.location}</span>
        <span>{buyer.requiredQuantity} qty</span>
      </div>
      <small>{buyer.requirement}</small>
    </div>
  )
}
