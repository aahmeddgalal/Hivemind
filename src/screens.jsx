import { Link, useNavigate } from 'react-router-dom'

export const Landing = () => {
  const navigate = useNavigate()
  return (
    <div className="animate-fade-in" style={{ padding: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', height: '100%' }}>
      <div className="font-mono text-crt-green glitch" style={{ fontSize: '1.2rem' }} data-text="SIGNAL DETECTED">SIGNAL DETECTED</div>
      <div className="font-mono text-faded-gray animate-pulse">ESTABLISHING CONNECTION...</div>
      <button onClick={() => navigate('/current-state')} className="btn-signal" style={{ width: 'fit-content', marginTop: '3rem', letterSpacing: '2px' }}>
        CONNECT
      </button>
    </div>
  )
}

export const CurrentState = () => (
  <div className="animate-fade-in" style={{ padding: '6rem 4rem' }}>
    <h1 className="font-display text-off-white" style={{ fontSize: '4rem', lineHeight: '1' }}>WHAT IS HAPPENING<br/>RIGHT NOW?</h1>
    <div className="font-mono text-faded-gray" style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span>&gt;</span>
      <input type="text" className="input-terminal" placeholder="Enter your current activity..." autoFocus />
    </div>
    <Link to="/live" className="btn-analog" style={{ display: 'inline-block', marginTop: '4rem', textDecoration: 'none' }}>SUBMIT STATE</Link>
  </div>
)

export { default as LiveHivemind } from './screens/LiveHivemind'

export { default as ConnectionDetail } from './screens/ConnectionDetail'

export { default as Discover } from './screens/Discover'
export { default as History } from './screens/History'
export { default as Report } from './screens/Report'
export { default as Profile } from './screens/Profile'
export { default as AdminRoute } from './screens/AdminRoute'
import BackButton from './components/BackButton'
export { default as About } from './screens/About'

export const Settings = () => (
  <div className="animate-fade-in" style={{ padding: '6rem 4rem' }}>
    <BackButton to="/profile" label="RETURN TO PROFILE" />
    <h1 className="font-display text-off-white" style={{ fontSize: '3rem' }}>SYSTEM CONFIGURATION</h1>
    <div className="font-mono text-faded-gray" style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>&gt; LOC_TRACKING = FALSE</div>
      <div>&gt; CRT_FLICKER = TRUE</div>
    </div>
    <button className="btn-signal" style={{ marginTop: '4rem' }}>[ PURGE ALL DATA ]</button>
  </div>
)
