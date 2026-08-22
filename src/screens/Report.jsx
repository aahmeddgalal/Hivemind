import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Report = () => {
  const [period, setPeriod] = useState('VIEW MONTH');

  return (
    <div className="animate-fade-in" style={{ padding: '6rem 4rem', maxWidth: '1200px', margin: '0 auto', paddingBottom: '8rem' }}>
      <BackButton to="/live" label="RETURN TO HIVEMIND" />
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '2rem', marginBottom: '4rem' }}>
        <div>
          <h1 className="font-display text-off-white" style={{ fontSize: '4rem', margin: 0, lineHeight: 1 }}>HIVEMIND REPORT</h1>
          <div className="font-mono text-blood-red" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>SUBJECT #882019</div>
          <div className="font-mono text-faded-gray" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>PERIOD: {period === 'VIEW MONTH' ? 'AUGUST 2026' : 'AUG 17 - AUG 23 2026'}</div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
           <div style={{ display: 'flex', gap: '1rem' }}>
             {['VIEW WEEK', 'VIEW MONTH'].map(p => (
               <button
                 key={p}
                 onClick={() => setPeriod(p)}
                 className="font-mono"
                 style={{
                   background: 'none',
                   border: 'none',
                   color: period === p ? 'var(--color-off-white)' : 'var(--color-faded-gray)',
                   borderBottom: period === p ? '2px solid var(--color-blood-red)' : 'none',
                   padding: '0.5rem 0',
                   cursor: 'pointer',
                   fontSize: '1rem',
                   letterSpacing: '1px'
                 }}
               >
                 {p}
               </button>
             ))}
           </div>
           <button className="btn-analog" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>[ EXPORT REPORT ]</button>
        </div>
      </div>

      {/* Dramatic Summary */}
      <div style={{ marginBottom: '5rem', maxWidth: '800px' }}>
        <div className="font-body text-off-white" style={{ fontSize: '2.5rem', lineHeight: 1.3 }}>
          “During this period, your consciousness synchronized with <span className="text-blood-red">{period === 'VIEW MONTH' ? '184' : '31'}</span> other consciousnesses.”
        </div>
      </div>

      {/* Top Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem', marginBottom: '6rem' }}>
         <div>
            <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>TOTAL SYNCHRONIZATIONS</div>
            <div className="font-display text-off-white" style={{ fontSize: '3rem' }}>{period === 'VIEW MONTH' ? '412' : '86'}</div>
         </div>
         <div>
            <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>UNIQUE CONNECTIONS</div>
            <div className="font-display text-off-white" style={{ fontSize: '3rem' }}>{period === 'VIEW MONTH' ? '184' : '31'}</div>
         </div>
         <div>
            <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>STRONGEST SYNCHRONIZATION</div>
            <div className="font-display text-blood-red" style={{ fontSize: '3rem' }}>99.2%</div>
         </div>
         <div>
            <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>MOST ACTIVE TIME</div>
            <div className="font-mono text-off-white" style={{ fontSize: '2rem' }}>23:00 — 00:00</div>
         </div>
         <div>
            <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>MOST COMMON ACTIVITY</div>
            <div className="font-body text-off-white" style={{ fontSize: '1.5rem' }}>Listening to music</div>
         </div>
         <div>
            <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>MOST COMMON EMOTION</div>
            <div className="font-body text-off-white" style={{ fontSize: '1.5rem' }}>Nostalgia</div>
         </div>
      </div>

      {/* Dossier Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          <div className="panel">
            <div className="font-mono text-blood-red" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>1. YOUR STRONGEST CONNECTION</div>
            <div className="font-display text-off-white" style={{ fontSize: '2.5rem' }}>SUBJECT #768095</div>
            <div className="font-mono text-faded-gray" style={{ marginTop: '0.5rem' }}>99.2% PEAK SYNCHRONIZATION</div>
            <div className="font-body text-off-white" style={{ marginTop: '1.5rem', fontSize: '1.2rem' }}>You synchronized with this subject {period === 'VIEW MONTH' ? '14' : '3'} times this period.</div>
          </div>

          <div className="panel">
            <div className="font-mono text-blood-red" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>2. MOST COMMON STATE</div>
            <div className="font-body text-off-white" style={{ fontSize: '2rem' }}>Listening to music</div>
            <div className="font-mono text-faded-gray" style={{ marginTop: '1rem', fontSize: '1.1rem' }}>32% OF YOUR RECORDED STATES</div>
            <div style={{ width: '100%', height: '4px', background: 'var(--color-charcoal)', marginTop: '1.5rem' }}>
               <div style={{ width: '32%', height: '100%', background: 'var(--color-blood-red)' }}></div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4rem' }}>
          <div>
            <div className="font-mono text-blood-red" style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>3. MOST COMMON EMOTION</div>
            <div className="font-body text-off-white" style={{ fontSize: '2rem' }}>Nostalgia</div>
          </div>
          <div>
            <div className="font-mono text-blood-red" style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>4. MOST SYNCHRONIZED TIME</div>
            <div className="font-mono text-off-white" style={{ fontSize: '2rem' }}>23:00 — 00:00</div>
          </div>
          <div>
            <div className="font-mono text-blood-red" style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>5. MOST SYNCHRONIZED DAY</div>
            <div className="font-mono text-off-white" style={{ fontSize: '2rem' }}>Thursday</div>
          </div>
        </div>

        <div className="panel panel-alert glitch" data-text="6. STRANGEST COINCIDENCE">
          <div className="font-mono text-blood-red" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>6. STRANGEST COINCIDENCE</div>
          <div className="font-body text-off-white" style={{ fontSize: '1.5rem', lineHeight: '1.4' }}>
            On August 14 at 03:12 AM, you and Subject #491022 both reported feeling "watched" while staring at a screen in the dark, within 4 seconds of each other.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
           <div>
              <div className="font-mono text-blood-red" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>7. RECURRING CONSCIOUSNESSES</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '0.5rem' }}>
                   <span className="font-mono text-off-white">SUBJECT #768095</span>
                   <span className="font-mono text-faded-gray">14 SYNCS</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '0.5rem' }}>
                   <span className="font-mono text-off-white">SUBJECT #102948</span>
                   <span className="font-mono text-faded-gray">11 SYNCS</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '0.5rem' }}>
                   <span className="font-mono text-off-white">SUBJECT #593021</span>
                   <span className="font-mono text-faded-gray">8 SYNCS</span>
                </li>
              </ul>
           </div>

           <div>
              <div className="font-mono text-blood-red" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>8. HIVEMIND ACTIVITY</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '150px', borderBottom: '1px solid var(--color-charcoal)' }}>
                 {/* CSS Bar Chart */}
                 {Array.from({ length: period === 'VIEW MONTH' ? 30 : 7 }).map((_, i) => (
                    <div key={i} style={{ flex: 1, background: Math.random() > 0.7 ? 'var(--color-blood-red)' : 'var(--color-charcoal)', height: `${Math.random() * 100}%` }}></div>
                 ))}
              </div>
           </div>
        </div>

        <div style={{ marginTop: '4rem', borderTop: '1px solid var(--color-charcoal)', paddingTop: '3rem' }}>
           <div className="font-mono text-blood-red" style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>9. FINAL OBSERVATION</div>
           <div className="font-body" style={{ fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--color-faded-gray)' }}>
             “Your strongest synchronization patterns occurred late at night, particularly during periods of solitude.”
           </div>
        </div>

      </div>

      {/* Bottom Interface Navigation */}
      <div style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '3rem', padding: '1rem 2rem', background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(4px)', border: '1px solid var(--color-charcoal)' }}>
        <Link to="/live" className="font-mono text-faded-gray" style={{ textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.3s' }}>HIVEMIND</Link>
        <Link to="/discover" className="font-mono text-faded-gray" style={{ textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.3s' }}>DISCOVER</Link>
        <Link to="/history" className="font-mono text-faded-gray" style={{ textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.3s' }}>HISTORY</Link>
        <Link to="/report" className="font-mono text-off-white" style={{ textDecoration: 'none', letterSpacing: '1px', borderBottom: '1px solid var(--color-blood-red)', paddingBottom: '0.25rem' }}>REPORT</Link>
      </div>

    </div>
  );
};

export default Report;
