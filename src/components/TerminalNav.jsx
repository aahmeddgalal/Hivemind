import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Terminal } from 'lucide-react'
import { useStore } from '../store'

export function TerminalNav() {
  const { userIdentity } = useStore();
  const location = useLocation();

  if (['/live', '/discover', '/history', '/report', '/profile'].includes(location.pathname) || location.pathname.startsWith('/admin')) return null;

  return (
    <nav className="mobile-nav-bottom" style={{ position: 'fixed', top: 0, left: 0, width: '100%', padding: '1.5rem', zIndex: 100, display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' }}>
      <div className="font-mono text-faded-gray desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', pointerEvents: 'auto' }}>
        <Terminal size={14} className="text-faded-gray" />
        <Link to="/live" style={{ color: 'inherit', textDecoration: 'none' }}>SYS.OBSERVE v2.4.1</Link>
      </div>
      <div className="font-mono" style={{ display: 'flex', gap: '2rem', pointerEvents: 'auto', width: '100%', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/live" className="text-faded-gray" style={{ textDecoration: 'none', letterSpacing: '1px' }}>[ HIVEMIND ]</Link>
          <Link to="/discover" className="text-faded-gray" style={{ textDecoration: 'none', letterSpacing: '1px' }}>[ DISCOVER ]</Link>
          <Link to="/history" className="text-faded-gray desktop-only" style={{ textDecoration: 'none', letterSpacing: '1px' }}>[ HISTORY ]</Link>
          <Link to="/report" className="text-faded-gray desktop-only" style={{ textDecoration: 'none', letterSpacing: '1px' }}>[ REPORTS ]</Link>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
           <Link to="/profile" className="text-off-white" style={{ textDecoration: 'none', letterSpacing: '1px' }}>{userIdentity}</Link>
           <Link to="/settings" className="text-faded-gray" style={{ textDecoration: 'none', letterSpacing: '1px' }}>[CFG]</Link>
        </div>
      </div>
    </nav>
  )
}
