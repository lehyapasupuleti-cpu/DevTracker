import ProgressCard from './ProgressCard.jsx'
import Stats from './Stats.jsx'
import TodaysMission from './TodaysMission.jsx'
import Streak from './Streak.jsx'
export default function Dashboard({ s, mission, onStart, onDone }) {
  return (
    <>
      <ProgressCard pct={s.pct} done={s.done} total={s.total} />
      <TodaysMission task={mission} onStart={onStart} onDone={onDone} />
      <Stats s={s} />
      <Streak n={s.streak} />
      <p className="quote">“Small progress every day becomes a big skill.”</p>
    </>
  )
}
