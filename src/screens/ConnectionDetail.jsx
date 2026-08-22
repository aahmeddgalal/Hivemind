import React from 'react';
import { Link } from 'react-router-dom';

const SyncDimension = ({ label, percentage }) => {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span className="font-mono text-faded-gray">{label}</span>
        <span className="font-mono text-off-white">{percentage}%</span>
      </div>
      <div style={{ width: '100%', height: '8px', background: 'var(--color-black)', border: '1px solid var(--color-faded-gray)', position: 'relative' }}>
        <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--color-blood-red)', boxShadow: '0 0 8px var(--color-blood-red)' }}></div>
      </div>
    </div>
  );
};

const TimelineEvent = ({ date, text, isLast }) => (
  <div style={{ display: 'flex', gap: '1.5rem', position: 'relative', paddingBottom: isLast ? '0' : '2.5rem' }}>
    {/* Vertical Line */}
    {!isLast && <div style={{ position: 'absolute', top: '12px', left: '4px', width: '1px', height: '100%', background: 'var(--color-crimson)' }}></div>}
    
    {/* Glowing Dot */}
    <div style={{ width: '9px', height: '9px', background: 'var(--color-blood-red)', borderRadius: '1px', marginTop: '6px', zIndex: 1, boxShadow: '0 0 8px var(--color-blood-red)' }}></div>
    
    <div>
      <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>{date}</div>
      <div className="font-body text-off-white" style={{ fontSize: '1.1rem' }}>{text}</div>
    </div>
  </div>
);

const ConnectionDetail = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '6rem 4rem', maxWidth: '1100px', margin: '0 auto', paddingBottom: '8rem' }}>
      <BackButton to="/discover" label="BACK TO HIVEMIND" />
      
      {/* Header */}
      <div className="font-mono text-faded-gray" style={{ marginBottom: '1rem' }}>[ DOSSIER ]</div>
      <h1 className="font-display text-off-white" style={{ fontSize: '5rem', margin: 0, lineHeight: 1 }}>SUBJECT #482901</h1>
      
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginTop: '2.5rem' }}>
        <div className="font-mono text-blood-red" style={{ fontSize: '1.5rem' }}>SYNCHRONIZATION</div>
        <div className="font-display text-off-white animate-pulse" style={{ fontSize: '4rem', textShadow: '0 0 15px rgba(232, 229, 225, 0.3)' }}>94.7%</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', marginTop: '5rem' }}>
        
        {/* Left Column: Dimensions & Coincidence */}
        <div>
          <div className="panel">
            <div className="font-mono text-faded-gray" style={{ marginBottom: '2rem' }}>[ DIMENSIONAL BREAKDOWN ]</div>
            <SyncDimension label="ACTIVITY" percentage={96} />
            <SyncDimension label="EMOTION" percentage={91} />
            <SyncDimension label="CONTEXT" percentage={94} />
            <SyncDimension label="THOUGHT" percentage={82} />
            <SyncDimension label="TIME" percentage={100} />
          </div>

          <div className="panel panel-alert glitch" data-text="STRANGEST COINCIDENCE" style={{ marginTop: '3rem' }}>
            <div className="font-mono text-blood-red" style={{ marginBottom: '1rem' }}>STRANGEST COINCIDENCE</div>
            <div className="font-body text-off-white" style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
              You both reported feeling nostalgic within 11 seconds of each other.
            </div>
          </div>
        </div>

        {/* Right Column: Shared State & History */}
        <div>
          <div className="font-mono text-faded-gray" style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>CURRENTLY SHARED</div>
          <ul className="font-body text-off-white" style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.3rem', marginBottom: '5rem' }}>
            <li><span className="text-blood-red font-mono" style={{ marginRight: '1rem' }}>&gt;</span>Listening to music</li>
            <li><span className="text-blood-red font-mono" style={{ marginRight: '1rem' }}>&gt;</span>Feeling nostalgic</li>
            <li><span className="text-blood-red font-mono" style={{ marginRight: '1rem' }}>&gt;</span>Alone</li>
            <li><span className="text-blood-red font-mono" style={{ marginRight: '1rem' }}>&gt;</span>Late at night</li>
          </ul>

          <div className="font-mono text-faded-gray" style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>PREVIOUS SYNCHRONIZATIONS</div>
          <div className="font-body text-off-white" style={{ marginBottom: '3rem', fontSize: '1.2rem' }}>
            You and this consciousness have synchronized 17 times.
          </div>

          <div>
            <TimelineEvent date="AUG 21 — 23:41" text="Both listening to music" />
            <TimelineEvent date="AUG 18 — 01:13" text="Both feeling nostalgic" />
            <TimelineEvent date="AUG 11 — 22:04" text="Both watching a movie" />
            <TimelineEvent date="AUG 04 — 00:27" text="Both awake while most nearby users were inactive" isLast={true} />
          </div>
        </div>

      </div>

      <div style={{ marginTop: '6rem', borderTop: '1px solid var(--color-faded-gray)', paddingTop: '3rem' }}>
        <Link to="/live" className="btn-analog" style={{ display: 'inline-block', textDecoration: 'none', fontSize: '1.2rem', padding: '1rem 2rem' }}>
          RETURN TO HIVEMIND
        </Link>
      </div>

    </div>
  );
};

export default ConnectionDetail;
