import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalMapVisualization from '../components/GlobalMapVisualization';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('DASHBOARD');

  const navItems = ['DASHBOARD', 'USERS', 'REPORTS', 'ANALYTICS', 'SYSTEM', 'LOGS'];

  return (
    <div style={{ height: '100vh', width: '100vw', background: 'var(--color-obsidian)', position: 'fixed', top: 0, left: 0, zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
       <div className="vignette"></div>
       <div className="grain"></div>
       
       {/* Top Navigation Bar */}
       <div style={{ height: '60px', borderBottom: '1px solid var(--color-charcoal)', display: 'flex', alignItems: 'center', padding: '0 2rem', justifyContent: 'space-between', zIndex: 10, background: 'rgba(5,5,5,0.9)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
             <div className="font-mono text-off-white" style={{ fontSize: '1.2rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="animate-pulse" style={{ width: '8px', height: '8px', background: 'var(--color-crt-green)' }}></div>
                OBSERVATORY SYS.ADMIN
             </div>
             
             <div style={{ display: 'flex', gap: '1.5rem', marginLeft: '2rem' }}>
                {navItems.map(item => (
                   <button
                     key={item}
                     onClick={() => setActiveTab(item)}
                     className="font-mono"
                     style={{
                       background: 'none',
                       border: 'none',
                       color: activeTab === item ? 'var(--color-off-white)' : 'var(--color-faded-gray)',
                       cursor: 'pointer',
                       fontSize: '0.9rem',
                       transition: 'color 0.2s',
                       borderBottom: activeTab === item ? '2px solid var(--color-blood-red)' : 'none',
                       padding: '1.25rem 0'
                     }}
                   >
                     {item}
                   </button>
                ))}
             </div>
          </div>
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
             <Link to="/live" className="font-mono text-faded-gray" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>EXIT TO SYSTEM</Link>
             <button onClick={onLogout} className="font-mono text-blood-red" style={{ background: 'none', border: '1px solid var(--color-blood-red)', padding: '0.25rem 0.5rem', cursor: 'pointer', fontSize: '0.8rem' }}>LOGOUT</button>
          </div>
       </div>

       {/* Main Content Area */}
       <div style={{ flex: 1, position: 'relative', overflowY: 'auto', zIndex: 5, padding: '2rem' }}>
          
          {activeTab === 'DASHBOARD' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
               
               {/* Metrics Ribbon */}
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
                 <div className="panel" style={{ padding: '1.5rem' }}>
                    <div className="font-mono text-faded-gray" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>ACTIVE USERS</div>
                    <div className="font-display text-off-white" style={{ fontSize: '2.5rem' }}>8,492</div>
                    <div className="font-mono text-crt-green" style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>+12% vs last hour</div>
                 </div>
                 <div className="panel" style={{ padding: '1.5rem' }}>
                    <div className="font-mono text-faded-gray" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>TOTAL USERS</div>
                    <div className="font-display text-off-white" style={{ fontSize: '2.5rem' }}>142.1K</div>
                 </div>
                 <div className="panel" style={{ padding: '1.5rem' }}>
                    <div className="font-mono text-faded-gray" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>ACTIVE SYNCHRONIZATIONS</div>
                    <div className="font-display text-off-white" style={{ fontSize: '2.5rem' }}>3,104</div>
                 </div>
                 <div className="panel" style={{ padding: '1.5rem' }}>
                    <div className="font-mono text-faded-gray" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>NEW USERS TODAY</div>
                    <div className="font-display text-off-white" style={{ fontSize: '2.5rem' }}>941</div>
                 </div>
                 <div className="panel" style={{ padding: '1.5rem', borderLeft: '2px solid var(--color-crt-green)' }}>
                    <div className="font-mono text-faded-gray" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>SYSTEM STATUS</div>
                    <div className="font-display text-crt-green" style={{ fontSize: '2.5rem' }}>NOMINAL</div>
                 </div>
               </div>

               {/* Live Observatory Map */}
               <div className="panel" style={{ flex: 1, minHeight: '600px', position: 'relative', overflow: 'hidden', padding: 0, border: '1px solid var(--color-charcoal)' }}>
                 <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10, background: 'rgba(5,5,5,0.8)', padding: '0.5rem 1rem', border: '1px solid var(--color-charcoal)' }}>
                    <div className="font-mono text-blood-red animate-pulse">[ LIVE GLOBAL AGGREGATION ]</div>
                 </div>
                 {/* Reusing GlobalMapVisualization to act as the aggregated view */}
                 <div style={{ width: '100%', height: '100%', opacity: 0.7 }}>
                    <GlobalMapVisualization timeFilter="ALL TIME" isInteractive={false} />
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'USERS' && (
            <div className="animate-fade-in panel" style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div className="font-mono text-blood-red" style={{ fontSize: '1.2rem' }}>USER MANAGEMENT</div>
                <input type="text" placeholder="SEARCH SUBJECT ID..." className="font-mono" style={{ background: 'transparent', border: '1px solid var(--color-charcoal)', color: 'var(--color-off-white)', padding: '0.5rem 1rem', width: '300px', outline: 'none' }} />
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                 <thead>
                    <tr className="font-mono text-faded-gray" style={{ borderBottom: '1px solid var(--color-charcoal)' }}>
                       <th style={{ padding: '1rem 0' }}>SUBJECT ID</th>
                       <th>STATUS</th>
                       <th>TOTAL SYNCS</th>
                       <th>LAST ACTIVE</th>
                       <th style={{ textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                 </thead>
                 <tbody className="font-mono text-off-white" style={{ fontSize: '0.9rem' }}>
                    {[
                      { id: '891022', status: 'ACTIVE', syncs: 412, active: '2 MIN AGO' },
                      { id: '441092', status: 'SUSPENDED', syncs: 18, active: '14 HRS AGO' },
                      { id: '110293', status: 'ACTIVE', syncs: 1102, active: 'JUST NOW' },
                      { id: '902184', status: 'ACTIVE', syncs: 84, active: '5 MIN AGO' },
                      { id: '331021', status: 'ACTIVE', syncs: 2, active: '1 DAY AGO' }
                    ].map(u => (
                      <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                         <td style={{ padding: '1rem 0' }}>SUBJECT #{u.id}</td>
                         <td style={{ color: u.status === 'ACTIVE' ? 'var(--color-crt-green)' : 'var(--color-blood-red)' }}>{u.status}</td>
                         <td>{u.syncs}</td>
                         <td>{u.active}</td>
                         <td style={{ textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', paddingTop: '0.75rem' }}>
                            <button className="font-mono" style={{ background: 'transparent', border: '1px solid var(--color-faded-gray)', color: 'var(--color-faded-gray)', padding: '0.25rem 0.5rem', cursor: 'pointer', fontSize: '0.7rem' }}>SUSPEND</button>
                            <button className="font-mono text-blood-red" style={{ background: 'transparent', border: '1px solid var(--color-blood-red)', padding: '0.25rem 0.5rem', cursor: 'pointer', fontSize: '0.7rem' }}>BAN</button>
                            <button className="font-mono text-blood-red" style={{ background: 'transparent', border: 'none', padding: '0.25rem 0.5rem', cursor: 'pointer', fontSize: '0.7rem' }}>DELETE</button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
            </div>
          )}

          {activeTab === 'SYSTEM' && (
            <div className="animate-fade-in panel" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
               <div>
                 <div className="font-mono text-blood-red" style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>INFRASTRUCTURE STATUS</div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '0.75rem' }}>
                       <span className="font-mono text-faded-gray">DATABASE CLUSTER</span>
                       <span className="font-mono text-crt-green">NOMINAL (3ms ping)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '0.75rem' }}>
                       <span className="font-mono text-faded-gray">MATCHING ENGINE</span>
                       <span className="font-mono text-crt-green">ACTIVE (420/sec)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '0.75rem' }}>
                       <span className="font-mono text-faded-gray">API GATEWAY</span>
                       <span className="font-mono text-crt-green">NOMINAL</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '0.75rem' }}>
                       <span className="font-mono text-faded-gray">BACKGROUND JOBS</span>
                       <span className="font-mono text-off-white">12 QUEUED</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '0.75rem' }}>
                       <span className="font-mono text-faded-gray">SYSTEM UPTIME</span>
                       <span className="font-mono text-off-white">99.98%</span>
                    </div>
                 </div>
               </div>
               <div>
                 <div className="font-mono text-blood-red" style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>ERROR RATES (24H)</div>
                 <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '200px' }}>
                    {Array.from({ length: 24 }).map((_, i) => (
                       <div key={i} style={{ flex: 1, background: Math.random() > 0.9 ? 'var(--color-blood-red)' : 'var(--color-charcoal)', height: `${Math.random() * 30 + 5}%` }}></div>
                    ))}
                 </div>
                 <div className="font-mono text-faded-gray" style={{ textAlign: 'right', marginTop: '1rem', fontSize: '0.9rem' }}>0.012% AVG ERROR RATE</div>
               </div>
            </div>
          )}

          {activeTab === 'ANALYTICS' && (
            <div className="animate-fade-in panel" style={{ maxWidth: '1200px', margin: '0 auto' }}>
               <div className="font-mono text-blood-red" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>AGGREGATED ANALYTICS</div>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
                  <div style={{ borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '1rem' }}>
                    <div className="font-mono text-faded-gray" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>DAILY ACTIVE USERS</div>
                    <div className="font-display text-off-white" style={{ fontSize: '2rem' }}>28,491</div>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '1rem' }}>
                    <div className="font-mono text-faded-gray" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>WEEKLY ACTIVE USERS</div>
                    <div className="font-display text-off-white" style={{ fontSize: '2rem' }}>84,102</div>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '1rem' }}>
                    <div className="font-mono text-faded-gray" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>MONTHLY ACTIVE USERS</div>
                    <div className="font-display text-off-white" style={{ fontSize: '2rem' }}>142,109</div>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '1rem' }}>
                    <div className="font-mono text-faded-gray" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>AVERAGE SESSION DURATION</div>
                    <div className="font-display text-off-white" style={{ fontSize: '2rem' }}>14M 32S</div>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '1rem' }}>
                    <div className="font-mono text-faded-gray" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>AVERAGE SYNCS PER USER</div>
                    <div className="font-display text-off-white" style={{ fontSize: '2rem' }}>4.2</div>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '1rem' }}>
                    <div className="font-mono text-faded-gray" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>RETENTION (D7)</div>
                    <div className="font-display text-off-white" style={{ fontSize: '2rem' }}>48.2%</div>
                  </div>
               </div>
               
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                 <div>
                    <div className="font-mono text-blood-red" style={{ marginBottom: '1rem' }}>MOST COMMON ACTIVITIES</div>
                    <div className="font-body text-off-white" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>1. Listening to music (24%)</div>
                    <div className="font-body text-off-white" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>2. Staring at a screen (18%)</div>
                    <div className="font-body text-off-white" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>3. Working late (12%)</div>
                 </div>
                 <div>
                    <div className="font-mono text-blood-red" style={{ marginBottom: '1rem' }}>MOST COMMON EMOTIONS</div>
                    <div className="font-body text-off-white" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>1. Nostalgia (31%)</div>
                    <div className="font-body text-off-white" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>2. Anxiety (22%)</div>
                    <div className="font-body text-off-white" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>3. Calm (19%)</div>
                 </div>
               </div>
            </div>
          )}

          {(activeTab === 'REPORTS' || activeTab === 'LOGS') && (
            <div className="animate-fade-in panel" style={{ maxWidth: '1200px', margin: '0 auto' }}>
               <div className="font-mono text-blood-red" style={{ fontSize: '1.2rem' }}>{activeTab} MODULE</div>
               <div className="font-body text-faded-gray" style={{ marginTop: '1rem' }}>This section is operational but awaiting populated dataset from backend relay.</div>
            </div>
          )}

       </div>
    </div>
  );
};

export default AdminDashboard;
