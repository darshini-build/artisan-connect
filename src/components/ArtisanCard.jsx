export default function ArtisanCard({ artisan }) {
  return (
    <div className="artisan-card">
      <img src={artisan.photo} alt={artisan.name} className="artisan-photo" />
      <div>
        <h4>{artisan.name}</h4>
        <p>{artisan.craftCategory}</p>
        <small>{artisan.location}</small>
      </div>
      <div className="rating-row">⭐ {artisan.rating} ({artisan.reviews})</div>
    </div>
  )
}
