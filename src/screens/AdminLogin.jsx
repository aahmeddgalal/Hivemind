import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('admin_token', token);
        onLogin();
      } else {
        throw new Error('Unauthorized');
      }
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setCode('');
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-obsidian)', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
       <div className="vignette"></div>
       <div className="grain"></div>
       
       <div style={{ position: 'relative', zIndex: 10, maxWidth: '500px', width: '100%', padding: '3rem' }}>
          <div className="font-mono text-blood-red" style={{ fontSize: '1.2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <div className="animate-pulse" style={{ width: '10px', height: '10px', background: 'var(--color-blood-red)' }}></div>
             [ RESTRICTED ACCESS ]
          </div>
          
          <h1 className="font-display text-off-white" style={{ fontSize: '3rem', margin: '0 0 1rem 0', lineHeight: 1 }}>SYSTEM AUTHENTICATION</h1>
          <div className="font-body text-faded-gray" style={{ marginBottom: '3rem', fontSize: '1.2rem' }}>
             Unauthorized access to the Hivemind Observatory is strictly prohibited and logged.
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             <div>
                <label className="font-mono text-faded-gray" style={{ display: 'block', marginBottom: '0.5rem' }}>AUTHORIZATION CODE</label>
                <input 
                  type="password" 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="font-mono"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid var(--color-charcoal)',
                    color: 'var(--color-off-white)',
                    padding: '1rem',
                    fontSize: '1.5rem',
                    outline: 'none',
                    letterSpacing: '5px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-blood-red)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-charcoal)'}
                  autoFocus
                />
                {error && <div className="font-mono text-blood-red glitch" style={{ marginTop: '1rem' }} data-text="AUTHORIZATION FAILED">AUTHORIZATION FAILED</div>}
             </div>

             <button type="submit" className="btn-analog" style={{ width: '100%', padding: '1rem', fontSize: '1.2rem' }}>INITIATE HANDSHAKE</button>
          </form>

          <div className="font-mono text-faded-gray" style={{ marginTop: '3rem', fontSize: '0.8rem', textAlign: 'center' }}>
             HINT: ENTER 'admin' TO PROCEED
          </div>
       </div>
    </div>
  );
};

export default AdminLogin;
