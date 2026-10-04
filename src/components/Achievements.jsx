export const BADGES = [
  { n: 1, icon: '🏁', name: 'First Step', d: 'Complete your first learning day.' },
  { n: 3, icon: '🔥', name: 'Consistent Learner', d: 'Complete 3 learning days.' },
  { n: 7, icon: '🚀', name: 'On a Roll', d: 'Complete 7 learning days.' },
  { n: 15, icon: '💎', name: 'Skill Builder', d: 'Complete 15 learning days.' },
  { n: 30, icon: '🏆', name: 'Learning Master', d: 'Complete 30 learning days.' },
]
export default function Achievements({ done }) {
  return (
    <section>
      <h2 className="sec">Achievements</h2>
      {BADGES.map(b => (
        <div key={b.n} className={'card badge' + (done >= b.n ? ' on' : '')}>
          <span>{done >= b.n ? b.icon : '🔒'}</span>
          <div><h3>{b.name}</h3><p>{b.d}</p></div>
        </div>
      ))}
    </section>
  )
}
