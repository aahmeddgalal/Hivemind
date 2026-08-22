import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import SystemState from '../components/SystemState';

const generateHistory = () => {
  const activities = ["Listening to music", "Working late", "Staring at the ceiling", "Walking aimlessly", "Reading"];
  const emotions = ["Feeling nostalgic", "Feeling anxious", "Feeling calm", "Feeling lost", "Feeling hyperfocused"];
  const contexts = ["Both alone", "Both in a crowded room", "Both outside in the dark", "Both staring at a screen"];

  return Array.from({ length: 45 }).map((_, i) => {
    const daysAgo = Math.floor(Math.random() * 40);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      subjectId: `SUBJECT #${Math.floor(Math.random() * 900000) + 100000}`,
      sync: (Math.random() * 20 + 75).toFixed(1),
      activity: activities[Math.floor(Math.random() * activities.length)],
      emotion: emotions[Math.floor(Math.random() * emotions.length)],
      context: contexts[Math.floor(Math.random() * contexts.length)],
      previousConnections: Math.floor(Math.random() * 20),
      daysAgo: daysAgo,
      time: `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
      dateStr: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()
    };
  }).sort((a, b) => a.daysAgo - b.daysAgo);
};

const mockHistory = generateHistory();

const History = () => {
  const [filter, setFilter] = useState('ALL TIME');
  const navigate = useNavigate();

  const filteredHistory = mockHistory.filter(event => {
    if (filter === 'TODAY') return event.daysAgo === 0;
    if (filter === 'THIS WEEK') return event.daysAgo <= 7;
    if (filter === 'THIS MONTH') return event.daysAgo <= 30;
    return true; // ALL TIME
  });

  const handleEventClick = () => {
    navigate('/connection');
  };

  return (
    <div className="animate-fade-in" style={{ padding: '6rem 4rem', maxWidth: '1200px', margin: '0 auto', paddingBottom: '8rem' }}>
      <BackButton to="/live" label="RETURN TO HIVEMIND" />
      
      {/* Header */}
      <div style={{ marginBottom: '4rem' }}>
        <h1 className="font-display text-off-white" style={{ fontSize: '4rem', margin: 0, lineHeight: 1 }}>HIVEMIND ARCHIVE</h1>
        <div className="font-body text-faded-gray" style={{ fontSize: '1.2rem', marginTop: '1rem', fontStyle: 'italic' }}>"Everything you synchronized with."</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '5rem' }}>
        
        {/* Left Column: Summary Stats & Privacy */}
        <div>
          <div className="font-mono text-faded-gray" style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>[ GLOBAL SUMMARY ]</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>TOTAL SYNCHRONIZATIONS</div>
              <div className="font-display text-off-white" style={{ fontSize: '2.5rem' }}>3,402</div>
            </div>
            
            <div>
              <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>UNIQUE CONSCIOUSNESSES</div>
              <div className="font-display text-off-white" style={{ fontSize: '2.5rem' }}>1,184</div>
            </div>

            <div>
              <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>STRONGEST SYNCHRONIZATION</div>
              <div className="font-display text-blood-red" style={{ fontSize: '2.5rem' }}>99.2%</div>
            </div>

            <div>
              <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>MOST COMMON EMOTION</div>
              <div className="font-body text-off-white" style={{ fontSize: '1.3rem' }}>Feeling nostalgic</div>
            </div>

            <div>
              <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>MOST COMMON ACTIVITY</div>
              <div className="font-body text-off-white" style={{ fontSize: '1.3rem' }}>Listening to music</div>
            </div>
          </div>

          <div style={{ marginTop: '5rem', borderTop: '1px solid var(--color-charcoal)', paddingTop: '2.5rem' }}>
            <div className="font-mono text-faded-gray" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>[ PRIVACY CONTROLS ]</div>
            <button className="btn-analog" style={{ 
              width: '100%', 
              background: 'transparent', 
              color: 'var(--color-blood-red)', 
              border: '1px solid var(--color-blood-red)',
              fontSize: '1rem',
              textAlign: 'center'
            }}>
              PURGE OBSERVATION LOG
            </button>
          </div>
        </div>

        {/* Right Column: Timeline Archive */}
        <div>
          {/* Time Navigation */}
          <div style={{ display: 'flex', gap: '3rem', marginBottom: '4rem', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '1rem' }}>
            {['TODAY', 'THIS WEEK', 'THIS MONTH', 'ALL TIME'].map(tFilter => (
              <button
                key={tFilter}
                onClick={() => setFilter(tFilter)}
                className="font-mono"
                style={{
                  background: 'none',
                  border: 'none',
                  color: filter === tFilter ? 'var(--color-off-white)' : 'var(--color-faded-gray)',
                  borderBottom: filter === tFilter ? '2px solid var(--color-blood-red)' : 'none',
                  padding: '0.5rem 0',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  letterSpacing: '1px',
                  transition: 'all 0.3s'
                }}
              >
                {tFilter}
              </button>
            ))}
          </div>

          {/* Timeline Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {filteredHistory.map((event, index) => (
              <div key={event.id} style={{ display: 'flex', position: 'relative' }}>
                
                {/* Timeline axis */}
                <div style={{ width: '80px', flexShrink: 0, textAlign: 'right', paddingRight: '1.5rem', paddingTop: '0.5rem' }}>
                   <div className="font-mono text-faded-gray" style={{ fontSize: '1rem' }}>{event.time}</div>
                   {event.daysAgo > 0 && <div className="font-mono text-charcoal" style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>{event.dateStr}</div>}
                </div>

                {/* Timeline visual */}
                <div style={{ position: 'relative', width: '20px', flexShrink: 0 }}>
                   {/* Vertical Line */}
                   {index !== filteredHistory.length - 1 && (
                     <div style={{ position: 'absolute', top: '20px', left: '8px', width: '2px', height: '100%', background: 'var(--color-charcoal)' }}></div>
                   )}
                   {/* Node Dot */}
                   <div style={{ position: 'absolute', top: '10px', left: '5px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-blood-red)', boxShadow: '0 0 5px var(--color-blood-red)' }}></div>
                </div>

                {/* Event Card */}
                <div 
                  className="panel"
                  onClick={handleEventClick}
                  style={{ 
                    flexGrow: 1, 
                    marginBottom: '3rem', 
                    cursor: 'pointer',
                    transition: 'border-color 0.3s',
                    borderColor: 'var(--color-charcoal)',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderTop: 'none',
                    borderBottom: '1px solid var(--color-charcoal)'
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-blood-red)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--color-charcoal)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div className="font-display text-off-white" style={{ fontSize: '2rem', lineHeight: 1 }}>{event.subjectId}</div>
                    <div className="font-mono text-blood-red" style={{ fontSize: '1.2rem' }}>{event.sync}% SYNCHRONIZATION</div>
                  </div>

                  <div className="font-body text-off-white" style={{ fontSize: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                    <div><span className="text-blood-red" style={{ marginRight: '0.5rem' }}>&gt;</span>{event.activity}</div>
                    <div><span className="text-blood-red" style={{ marginRight: '0.5rem' }}>&gt;</span>{event.emotion}</div>
                    <div><span className="text-blood-red" style={{ marginRight: '0.5rem' }}>&gt;</span>{event.context}</div>
                  </div>

                  <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', borderTop: '1px solid var(--color-charcoal)', paddingTop: '1rem', borderBottom: 'none' }}>
                    {event.previousConnections} PREVIOUS SYNCHRONIZATIONS
                  </div>
                </div>
              </div>
            ))}

            {filteredHistory.length === 0 && (
              <div className="font-mono text-faded-gray" style={{ textAlign: 'center', marginTop: '2rem', paddingLeft: '100px' }}>NO OBSERVATIONS FOUND FOR THIS TIMEFRAME.</div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Interface Navigation */}
      <div style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '3rem', padding: '1rem 2rem', background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(4px)', border: '1px solid var(--color-charcoal)' }}>
        <Link to="/live" className="font-mono text-faded-gray" style={{ textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-off-white)'} onMouseOut={e => e.target.style.color='var(--color-faded-gray)'}>HIVEMIND</Link>
        <Link to="/discover" className="font-mono text-faded-gray" style={{ textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-off-white)'} onMouseOut={e => e.target.style.color='var(--color-faded-gray)'}>DISCOVER</Link>
        <Link to="/history" className="font-mono text-off-white" style={{ textDecoration: 'none', letterSpacing: '1px', borderBottom: '1px solid var(--color-blood-red)', paddingBottom: '0.25rem' }}>HISTORY</Link>
        <Link to="/report" className="font-mono text-faded-gray" style={{ textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-off-white)'} onMouseOut={e => e.target.style.color='var(--color-faded-gray)'}>REPORT</Link>
      </div>
    </div>
  );
};

export default History;
