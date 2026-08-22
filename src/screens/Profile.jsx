import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('PRIVACY');

  const Toggle = ({ label, defaultChecked }) => {
    const [checked, setChecked] = useState(defaultChecked);
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="font-mono text-off-white" style={{ fontSize: '1.1rem' }}>{label}</div>
        <button 
          onClick={() => setChecked(!checked)}
          style={{ 
            width: '50px', 
            height: '24px', 
            background: checked ? 'var(--color-blood-red)' : 'var(--color-charcoal)', 
            border: '1px solid var(--color-faded-gray)',
            position: 'relative',
            cursor: 'pointer'
          }}
        >
          <div style={{ 
            position: 'absolute', 
            top: '2px', 
            left: checked ? '26px' : '2px', 
            width: '18px', 
            height: '18px', 
            background: 'var(--color-off-white)',
            transition: 'left 0.2s'
          }}></div>
        </button>
      </div>
    );
  };

  return (
    <div className="animate-fade-in" style={{ padding: '6rem 4rem', maxWidth: '1200px', margin: '0 auto', paddingBottom: '8rem' }}>
      
      <BackButton to="/live" label="RETURN TO HIVEMIND" />
      <h1 className="font-display text-off-white" style={{ fontSize: '4rem', margin: 0, lineHeight: 1, marginBottom: '3rem' }}>IDENTITY</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '6rem' }}>
        
        {/* Left Column: Identity Profile */}
        <div>
           <div className="font-mono text-faded-gray" style={{ marginBottom: '1rem', fontSize: '1rem' }}>[ IDENTITY ]</div>
           <h1 className="font-display text-off-white" style={{ fontSize: '3.5rem', margin: 0, lineHeight: 1, marginBottom: '2rem' }}>SUBJECT #882019</h1>
           
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
              <div style={{ width: '10px', height: '10px', background: 'var(--color-crt-green)', borderRadius: '50%', boxShadow: '0 0 10px var(--color-crt-green)' }} className="animate-pulse"></div>
              <span className="font-mono text-crt-green" style={{ letterSpacing: '2px' }}>STATUS: ACTIVE</span>
           </div>

           <div className="panel" style={{ marginBottom: '3rem', borderLeft: '4px solid var(--color-blood-red)' }}>
             <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>SYNCHRONIZATION INDEX</div>
             <div className="font-display text-off-white" style={{ fontSize: '4rem', textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>87.4%</div>
           </div>

           <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
              <div>
                <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>TOTAL SYNCHRONIZATIONS</div>
                <div className="font-mono text-off-white" style={{ fontSize: '1.5rem' }}>4,192</div>
              </div>
              <div>
                <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>UNIQUE CONSCIOUSNESSES</div>
                <div className="font-mono text-off-white" style={{ fontSize: '1.5rem' }}>1,840</div>
              </div>
              <div>
                <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>STRONGEST CONNECTION</div>
                <div className="font-mono text-blood-red" style={{ fontSize: '1.5rem' }}>SUBJECT #768095</div>
              </div>
              <div>
                <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>LONGEST RECURRING CONNECTION</div>
                <div className="font-mono text-off-white" style={{ fontSize: '1.5rem' }}>SUBJECT #491022</div>
              </div>
           </div>

           <div className="font-mono text-faded-gray" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>[ YOUR HIVEMIND ]</div>
           <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
             {/* Visualization of strong recurring connections */}
             {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-charcoal)', border: '1px solid var(--color-blood-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <div style={{ width: `${Math.random() * 20 + 5}px`, height: `${Math.random() * 20 + 5}px`, borderRadius: '50%', background: 'var(--color-blood-red)' }}></div>
                </div>
             ))}
           </div>
        </div>

        {/* Right Column: Settings */}
        <div>
           <div className="font-mono text-faded-gray" style={{ marginBottom: '2rem', fontSize: '1rem' }}>[ SYSTEM CONFIGURATION ]</div>
           
           <div style={{ display: 'flex', gap: '3rem', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
              {['ACCOUNT', 'PRIVACY', 'NOTIFICATIONS', 'APPEARANCE', 'DATA'].map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className="font-mono"
                   style={{
                     background: 'none',
                     border: 'none',
                     color: activeTab === tab ? 'var(--color-off-white)' : 'var(--color-faded-gray)',
                     borderBottom: activeTab === tab ? '2px solid var(--color-blood-red)' : 'none',
                     padding: '0.5rem 0',
                     cursor: 'pointer',
                     fontSize: '1rem',
                     letterSpacing: '1px',
                     transition: 'all 0.3s'
                   }}
                 >
                   {tab}
                 </button>
              ))}
           </div>

           {/* Settings Panels */}
           {activeTab === 'PRIVACY' && (
             <div className="animate-fade-in">
               <div className="font-body text-faded-gray" style={{ fontSize: '1.2rem', marginBottom: '3rem', fontStyle: 'italic' }}>
                 "Control what aspects of your consciousness are detectable by the network."
               </div>
               
               <Toggle label="Location Participation (Broad Regions Only)" defaultChecked={true} />
               <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '3rem', marginTop: '-1rem' }}>Allows your state to be clustered by general geographic regions.</div>

               <Toggle label="Thought Sharing" defaultChecked={true} />
               <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '3rem', marginTop: '-1rem' }}>Broadcasts semantic context of your current thoughts.</div>

               <Toggle label="Emotion Sharing" defaultChecked={true} />
               <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '3rem', marginTop: '-1rem' }}>Broadcasts your emotional state to the network.</div>

               <Toggle label="Activity Sharing" defaultChecked={true} />
               <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '3rem', marginTop: '-1rem' }}>Broadcasts your physical activity to the network.</div>

               <Toggle label="Historical Synchronization Logging" defaultChecked={true} />
               <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '3rem', marginTop: '-1rem' }}>Allows the system to record and analyze past anomalies.</div>

               <Toggle label="Global Discoverability" defaultChecked={true} />
               <div className="font-mono text-faded-gray" style={{ fontSize: '0.9rem', marginBottom: '3rem', marginTop: '-1rem' }}>Allows your nodes to appear in the global topology map.</div>
             </div>
           )}

           {activeTab === 'DATA' && (
             <div className="animate-fade-in">
               <div className="font-body text-faded-gray" style={{ fontSize: '1.2rem', marginBottom: '3rem', fontStyle: 'italic' }}>
                 "Manage your recorded state history."
               </div>

               <button className="btn-analog" style={{ display: 'block', width: '100%', marginBottom: '2rem', fontSize: '1.2rem', padding: '1rem', textAlign: 'center' }}>
                 DOWNLOAD MY DATA
               </button>

               <button className="btn-analog" style={{ display: 'block', width: '100%', marginBottom: '2rem', fontSize: '1.2rem', padding: '1rem', background: 'transparent', color: 'var(--color-blood-red)', borderColor: 'var(--color-blood-red)', textAlign: 'center' }}>
                 DELETE SYNCHRONIZATION HISTORY
               </button>

               <div className="panel panel-alert glitch" data-text="DESTRUCTIVE ACTION">
                 <button className="btn-analog" style={{ display: 'block', width: '100%', fontSize: '1.2rem', padding: '1rem', background: 'var(--color-blood-red)', color: 'var(--color-off-white)', borderColor: 'var(--color-blood-red)', textAlign: 'center' }}>
                   DELETE ACCOUNT
                 </button>
               </div>
             </div>
           )}

           {(activeTab === 'ACCOUNT' || activeTab === 'NOTIFICATIONS' || activeTab === 'APPEARANCE') && (
             <div className="animate-fade-in font-mono text-faded-gray" style={{ marginTop: '2rem' }}>
               [ SECTION MODULE INACTIVE ]
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
