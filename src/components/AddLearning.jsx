import { useState } from 'react'
export default function AddLearning({ initial, onSave, onClose }) {
  const [f, setF] = useState(initial)
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = e => {
    e.preventDefault()
    if (!f.title.trim()) return
    onSave({ ...f, day: Number(f.day), minutes: Number(f.minutes) || 0, title: f.title.trim(), topic: f.topic.trim() })
  }
  return (
    <div className="modal" onClick={onClose}>
      <form className="sheet" onClick={e => e.stopPropagation()} onSubmit={submit}>
        <h2>{f.id ? 'Edit Learning Day' : 'Add Learning Day'}</h2>
        <label>Day Number<input className="field" type="number" min="1" value={f.day} onChange={set('day')} required /></label>
        <label>Learning Title<input className="field" value={f.title} onChange={set('title')} placeholder="React Hooks" required /></label>
        <label>Topic / Concept<input className="field" value={f.topic} onChange={set('topic')} placeholder="useState and useEffect" /></label>
        <label>Date<input className="field" type="date" value={f.date} onChange={set('date')} /></label>
        <label>Learning Minutes<input className="field" type="number" min="0" value={f.minutes} onChange={set('minutes')} /></label>
        <label>Status<select className="field" value={f.status} onChange={set('status')}><option>Pending</option><option>In Progress</option><option>Done</option></select></label>
        <div className="acts"><button type="button" className="btn ghost" onClick={onClose}>Cancel</button><button className="btn">Save</button></div>
      </form>
    </div>
  )
}
