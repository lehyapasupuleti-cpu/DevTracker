const ICON = { Done: '🟢', 'In Progress': '🟡', Pending: '⚪' }
export default function LearningCard({ e, onStatus, onEdit, onDelete }) {
  return (
    <article className="card entry">
      <small className="day">DAY {String(e.day).padStart(2, '0')}</small>
      <h3>{e.title}</h3>
      <p>{e.topic}</p>
      <div className="meta"><span>{e.minutes} min</span><span>{e.date}</span></div>
      <select className="field status" value={e.status} onChange={ev => onStatus(e.id, ev.target.value)} aria-label="Status">
        <option>Pending</option><option>In Progress</option><option>Done</option>
      </select>
      <p className="st">Status: {ICON[e.status]} {e.status}</p>
      <div className="acts">
        {e.status !== 'Done' && <button className="btn sm" onClick={() => onStatus(e.id, 'Done')}>✅ Complete</button>}
        <button className="btn sm ghost" onClick={() => onEdit(e)}>✏️ Edit</button>
        <button className="btn sm danger" onClick={() => onDelete(e.id)}>🗑️ Delete</button>
      </div>
    </article>
  )
}
