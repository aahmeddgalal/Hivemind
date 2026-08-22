import React from 'react';

const SystemState = ({ state = 'LOADING', message = '' }) => {
  if (state === 'EMPTY') {
    return (
      <div className="font-mono text-faded-gray animate-fade-in" style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px dashed var(--color-charcoal)' }}>
        <div style={{ fontSize: '1.2rem', marginBottom: '1rem', letterSpacing: '2px' }}>[ NO DATA FOUND ]</div>
        <div>{message || 'SYSTEM RECORDS ARE EMPTY.'}</div>
      </div>
    );
  }

  if (state === 'ERROR') {
    return (
      <div className="font-mono text-blood-red animate-pulse" style={{ textAlign: 'center', padding: '4rem 2rem', border: '1px solid var(--color-crimson)', background: 'rgba(139,0,0,0.1)' }}>
        <div style={{ fontSize: '1.2rem', marginBottom: '1rem', letterSpacing: '2px' }}>[ SIGNAL INTERRUPTED ]</div>
        <div>{message || 'UNABLE TO ESTABLISH CONNECTION.'}</div>
      </div>
    );
  }

  // DEFAULT LOADING
  return (
    <div className="font-mono animate-fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <div className="text-blood-red animate-pulse" style={{ fontSize: '1.2rem', marginBottom: '1rem', letterSpacing: '2px' }}>
        [ SYNCHRONIZING ]
      </div>
      <div className="text-faded-gray">
        {message || 'ESTABLISHING SECURE PROTOCOL...'}
      </div>
    </div>
  );
};

export default SystemState;
