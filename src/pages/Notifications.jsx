import NotificationCard from '../components/NotificationCard'

export default function Notifications({ notifications }) {
  return (
    <div className="page-shell">
      <div className="header-row">
        <div>
          <p className="eyebrow">Notifications</p>
          <h2>Inquiries and updates</h2>
        </div>
      </div>

      <div className="notification-stack full">
        {notifications.map((item) => (
          <NotificationCard key={item.id} notification={item} />
        ))}
      </div>
    </div>
  )
}
