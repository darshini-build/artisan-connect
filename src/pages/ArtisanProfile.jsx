import { useParams } from 'react-router-dom'

export default function ArtisanProfile({ artisans, products }) {
  const { artisanId } = useParams()
  const artisan = artisans.find((person) => person.id === artisanId) || artisans[0]
  const itemCount = products.filter((product) => product.artisanId === artisan.id)

  return (
    <div className="page-shell">
      <div className="profile-header">
        <img src={artisan.photo} alt={artisan.name} className="profile-photo" />
        <div>
          <p className="eyebrow">Artisan Profile</p>
          <h2>{artisan.name}</h2>
          <p>{artisan.craftCategory} • {artisan.location}</p>
          <div className="profile-metrics">
            <span>Experience: {artisan.experience} years</span>
            <span>Products: {itemCount.length}</span>
            <span>Rating: ⭐ {artisan.rating}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-layout">
        <section className="panel">
          <div className="panel-header">
            <h3>Skills</h3>
          </div>
          <div className="chip-list">
            {artisan.skills.map((skill) => (
              <span key={skill} className="chip">{skill}</span>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>Certifications</h3>
          </div>
          <ul className="simple-list">
            {artisan.certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
