import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NetworkVisualization from '../components/NetworkVisualization';
import { useStore } from '../store';

const LiveHivemind = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const { userIdentity, currentState, socketConnected, realMatches } = useStore();

  return (
    <div className="animate-fade-in" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: 0 }}>
      
      {/* Background Network */}
      <NetworkVisualization onNodeSelect={setSelectedNode} matches={realMatches} />

      {/* Top Left: Current Status Panel */}
      <div className="panel" style={{ position: 'absolute', top: '5rem', left: '2rem', zIndex: 10, background: 'rgba(18,18,18,0.85)', backdropFilter: 'blur(4px)', minWidth: '300px' }}>
        {socketConnected ? (
          <div className="font-mono text-blood-red animate-pulse" style={{ marginBottom: '1rem', letterSpacing: '1px' }}>[ HIVEMIND ACTIVE ]</div>
        ) : (
          <div className="font-mono text-faded-gray" style={{ marginBottom: '1rem', letterSpacing: '1px' }}>[ SIGNAL INTERRUPTED ]</div>
        )}
        <div className="font-display text-off-white" style={{ fontSize: '2.5rem', lineHeight: '1' }}>{socketConnected ? 2481 + realMatches.length : '---'}<br/>CONSCIOUSNESSES</div>
        
        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-faded-gray)', paddingTop: '1rem' }}>
          <div className="font-mono text-faded-gray" style={{ fontSize: '0.85rem' }}>YOUR SYNCHRONIZATION:</div>
          <div className="font-mono text-crt-green" style={{ fontSize: '1.2rem', marginTop: '0.2rem' }}>87.4%</div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <div className="font-mono text-faded-gray" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>CURRENT STATE:</div>
          <div className="font-body text-off-white" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div>{currentState?.activity || 'LISTENING TO MUSIC'}</div>
            <div>{currentState?.emotion || 'NOSTALGIC'}</div>
            <div>{currentState?.environment || 'ALONE'}</div>
            <div>{currentState?.thought || 'THINKING ABOUT THE FUTURE'}</div>
          </div>
        </div>
      </div>

      {/* Center Label (YOU) */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 20px)', zIndex: 5, textAlign: 'center', pointerEvents: 'none' }}>
        <div className="font-display text-off-white" style={{ fontSize: '1.5rem', letterSpacing: '4px' }}>YOU</div>
        <div className="font-mono text-faded-gray" style={{ fontSize: '0.8rem' }}>{userIdentity}</div>
      </div>

      {/* Discovery Panel (Right Side) */}
      {selectedNode && (
        <div className="panel animate-fade-in" style={{ position: 'absolute', top: '5rem', right: '2rem', zIndex: 10, background: 'rgba(18,18,18,0.9)', backdropFilter: 'blur(4px)', width: '320px', border: '1px solid var(--color-blood-red)' }}>
          <div className="font-mono text-faded-gray" style={{ marginBottom: '0.5rem', fontSize: '0.8rem' }}>[ CONNECTION OBSERVED ]</div>
          <h2 className="font-display text-blood-red" style={{ fontSize: '3rem', margin: 0, lineHeight: 1 }}>{selectedNode.id}</h2>
          
          <div style={{ marginTop: '2rem' }}>
            <div className="font-mono text-faded-gray" style={{ fontSize: '0.85rem' }}>SYNCHRONIZATION</div>
            <div className="font-mono text-off-white" style={{ fontSize: '1.5rem' }}>{selectedNode.sync.toFixed(1)}%</div>
          </div>

          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-faded-gray)', paddingTop: '1rem' }}>
            <div className="font-mono text-faded-gray" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>SHARED STATE</div>
            <ul className="font-body text-off-white" style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li>Listening to music</li>
              <li>Feeling nostalgic</li>
              <li>Currently alone</li>
            </ul>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <div className="font-mono text-faded-gray" style={{ fontSize: '0.85rem' }}>HISTORY</div>
            <div className="font-body text-off-white">{selectedNode.history} previous synchronizations</div>
          </div>

          <button className="btn-signal" style={{ width: '100%', marginTop: '3rem' }}>VIEW CONNECTION</button>
        </div>
      )}

      {/* Bottom Interface Navigation */}
      <div className="desktop-only" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '3rem', padding: '1rem 2rem', background: 'transparent' }}>
        <Link to="/live" className="font-mono text-off-white" style={{ textDecoration: 'none', letterSpacing: '1px', borderBottom: '1px solid var(--color-blood-red)', paddingBottom: '0.25rem' }}>[ HIVEMIND ]</Link>
        <Link to="/discover" className="font-mono text-faded-gray" style={{ textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-off-white)'} onMouseOut={e => e.target.style.color='var(--color-faded-gray)'}>[ DISCOVER ]</Link>
        <Link to="/history" className="font-mono text-faded-gray" style={{ textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-off-white)'} onMouseOut={e => e.target.style.color='var(--color-faded-gray)'}>[ HISTORY ]</Link>
        <Link to="/report" className="font-mono text-faded-gray" style={{ textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-off-white)'} onMouseOut={e => e.target.style.color='var(--color-faded-gray)'}>[ REPORTS ]</Link>
      </div>

    </div>
  );
};

export default LiveHivemind;
