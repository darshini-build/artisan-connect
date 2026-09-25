export default function NotificationCard({ notification }) {
  return (
    <div className={`notification-card ${notification.type}`}>
      <div className="dot" />
      <p>{notification.text}</p>
    </div>
  )
}
