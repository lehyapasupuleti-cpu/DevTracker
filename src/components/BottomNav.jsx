const TABS = [['home', '🏠', 'Home'], ['learn', '📚', 'Learn'], ['progress', '📊', 'Progress'], ['awards', '🏆', 'Awards']]
export default function BottomNav({ tab, setTab }) {
  return (
    <nav className="nav">
      {TABS.map(([id, ic, label]) => (
        <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}><span>{ic}</span>{label}</button>
      ))}
    </nav>
  )
}
