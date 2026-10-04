export default function TodaysMission({ task, onStart, onDone }) {
  if (!task) return <section className="card mission ok"><small>TODAY'S MISSION</small><h3>🎉 Mission Complete!</h3><p>All learning days are done. Add a new one!</p></section>
  return (
    <section className="card mission">
      <small>TODAY'S MISSION</small>
      <h3>🎯 {task.title}</h3>
      <p>{task.topic}</p>
      {task.status === 'Pending'
        ? <button className="btn light" onClick={() => onStart(task.id)}>Start Learning</button>
        : <button className="btn light" onClick={() => onDone(task.id)}>✅ Mark Complete</button>}
    </section>
  )
}
