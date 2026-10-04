export default function Header({ dark, toggle }) {
  return (
    <header className="header">
      <div><h1>DevTracker</h1><p>Your Learning OS</p></div>
      <button className="icon" onClick={toggle} aria-label="Toggle dark mode">{dark ? '☀️' : '🌙'}</button>
    </header>
  )
}
