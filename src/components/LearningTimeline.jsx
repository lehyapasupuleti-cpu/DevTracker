import LearningCard from './LearningCard.jsx'
export default function LearningTimeline({ items, onStatus, onEdit, onDelete }) {
  if (!items.length) return <div className="empty"><span>📭</span><p>No learning found. Tap ＋ to add one!</p></div>
  return <section>{items.map(e => <LearningCard key={e.id} e={e} onStatus={onStatus} onEdit={onEdit} onDelete={onDelete} />)}</section>
}
