import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlobalMapVisualization from '../components/GlobalMapVisualization';

const generateAnomaly = () => {
  const types = [
    { title: 'ANOMALY DETECTED', color: 'var(--color-blood-red)' },
    { title: 'PATTERN FOUND', color: 'var(--color-off-white)' },
    { title: 'UNUSUAL SYNCHRONIZATION', color: 'var(--color-crt-green)' },
    { title: 'SIGNAL CLUSTER', color: 'var(--color-dusty-red)' },
    { title: 'STRANGE COINCIDENCE', color: 'var(--color-faded-gray)' }
  ];
  const categories = ['ACTIVITY', 'EMOTION', 'THOUGHT', 'TIME', 'LOCATION REGION'];
  
  const descriptions = [
    "127 consciousnesses are currently listening to music alone.",
    "43 consciousnesses are currently feeling nostalgic.",
    "18 consciousnesses reported the same activity within 60 seconds.",
    "A large number of consciousnesses became active simultaneously at 23:41.",
    "6 consciousnesses described similar thoughts within the same minute.",
    "Unusual synchronization spike detected across NORTH AMERICA.",
    "212 consciousnesses experienced a shift in emotion simultaneously.",
    "High frequency pattern found: feeling anxious about the future."
  ];

  const type = types[Math.floor(Math.random() * types.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const count = Math.floor(Math.random() * 500) + 5;
  const strength = (Math.random() * 20 + 80).toFixed(1);
  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: type.title,
    color: type.color,
    category,
    count,
    strength,
    time: timeString,
    description: descriptions[Math.floor(Math.random() * descriptions.length)]
  };
};

// Generate 1000 nodes for the global map
const generateData = () => {
  const nodes = [];
  nodes.push({ id: 'YOU', isCenter: true, x: 0, y: 0, size: 6 });

  for (let i = 1; i <= 1000; i++) {
    const angle = Math.random() * Math.PI * 2;
    const syncVal = Math.random() * 100;
    const baseRadius = (100 - syncVal) * 30 + Math.random() * 500; 
    
    nodes.push({
      idx: i,
      id: `SUBJECT_${Math.floor(Math.random() * 900000) + 100000}`,
      x: Math.cos(angle) * baseRadius,
      y: Math.sin(angle) * baseRadius,
      size: Math.random() * 2 + 1,
      sync: syncVal,
      connectionsCount: Math.floor(Math.random() * 25),
      timeBucket: Math.random() > 0.9 ? 'NOW' : Math.random() > 0.7 ? 'TODAY' : Math.random() > 0.4 ? 'THIS WEEK' : Math.random() > 0.15 ? 'THIS MONTH' : 'ALL TIME',
      idHash: Math.random() * 1000,
      connections: []
    });
  }

  for (let i = 1; i < nodes.length; i++) {
    if (Math.random() > 0.95) {
       const targetIdx = Math.floor(Math.random() * (nodes.length - 1)) + 1;
       nodes[i].connections.push(targetIdx);
    }
  }

  return nodes;
};

const initialAnomalies = Array.from({ length: 5 }).map(() => generateAnomaly());

const Discover = () => {
  const [viewMode, setViewMode] = useState('ANOMALIES'); // 'ANOMALIES' or 'MAP'
  
  // Anomalies State
  const [anomalies, setAnomalies] = useState(initialAnomalies);
  const [filter, setFilter] = useState('ALL');

  // Map State
  const [timeMode, setTimeMode] = useState('ALL TIME');
  const [hoveredNode, setHoveredNode] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    if (viewMode !== 'ANOMALIES') return;
    const interval = setInterval(() => {
      setAnomalies(prev => [generateAnomaly(), ...prev].slice(0, 50));
    }, Math.random() * 8000 + 7000);

    return () => clearInterval(interval);
  }, [viewMode]);

  const filteredAnomalies = filter === 'ALL' ? anomalies : anomalies.filter(a => a.category === filter);
  
  const allNodes = useMemo(() => generateData(), []);
  const activeNodes = useMemo(() => {
    const ranks = { 'NOW': 1, 'TODAY': 2, 'THIS WEEK': 3, 'THIS MONTH': 4, 'ALL TIME': 5 };
    const currentRank = ranks[timeMode];
    
    return allNodes.filter(node => {
      if (node.isCenter) return true;
      return ranks[node.timeBucket] <= currentRank;
    }).map(n => ({ ...n, opacity: ranks[n.timeBucket] === currentRank ? 1 : 0.25 }));
  }, [allNodes, timeMode]);

  const handleHover = (node, pos) => {
    setHoveredNode(node);
    if (node) {
      setTooltipPos({ x: pos.x, y: pos.y });
    }
  };

  const handleClick = (node) => {
    navigate('/connection'); 
  };

  return (
    <div className="animate-fade-in" style={{ padding: viewMode === 'ANOMALIES' ? '2rem 4rem 8rem 4rem' : 0, maxWidth: viewMode === 'ANOMALIES' ? '1000px' : 'none', margin: '0 auto', height: viewMode === 'MAP' ? 'calc(100vh - 3rem)' : 'auto', position: 'relative' }}>
      
      {/* View Toggle */}
      <div style={{ position: viewMode === 'MAP' ? 'absolute' : 'relative', top: viewMode === 'MAP' ? '2rem' : 0, left: viewMode === 'MAP' ? '50%' : 0, transform: viewMode === 'MAP' ? 'translateX(-50%)' : 'none', zIndex: 30, display: 'flex', gap: '2rem', marginBottom: '4rem', background: viewMode === 'MAP' ? 'rgba(5,5,5,0.85)' : 'transparent', padding: viewMode === 'MAP' ? '1rem 2rem' : 0, border: viewMode === 'MAP' ? '1px solid var(--color-charcoal)' : 'none' }}>
         <button onClick={() => setViewMode('ANOMALIES')} className="font-mono" style={{ background: 'none', border: 'none', color: viewMode === 'ANOMALIES' ? 'var(--color-off-white)' : 'var(--color-faded-gray)', borderBottom: viewMode === 'ANOMALIES' ? '1px solid var(--color-blood-red)' : 'none', cursor: 'pointer', fontSize: '1.2rem' }}>[ ANOMALIES ]</button>
         <button onClick={() => setViewMode('MAP')} className="font-mono" style={{ background: 'none', border: 'none', color: viewMode === 'MAP' ? 'var(--color-off-white)' : 'var(--color-faded-gray)', borderBottom: viewMode === 'MAP' ? '1px solid var(--color-blood-red)' : 'none', cursor: 'pointer', fontSize: '1.2rem' }}>[ GLOBAL MAP ]</button>
      </div>

      {viewMode === 'ANOMALIES' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 className="font-display text-off-white" style={{ fontSize: '4rem', margin: 0, lineHeight: 1 }}>DISCOVER</h1>
              <div className="font-body text-faded-gray" style={{ fontSize: '1.2rem', marginTop: '1rem', fontStyle: 'italic' }}>"Patterns are everywhere."</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(139,0,0,0.1)', padding: '0.5rem 1rem', border: '1px solid var(--color-crimson)' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--color-blood-red)', borderRadius: '50%', boxShadow: '0 0 10px var(--color-blood-red)' }} className="animate-pulse"></div>
              <span className="font-mono text-blood-red" style={{ letterSpacing: '2px' }}>LIVE MONITORING</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '3rem', marginTop: '4rem', borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '1rem', flexWrap: 'wrap' }}>
            {['ALL', 'ACTIVITY', 'EMOTION', 'THOUGHT', 'TIME', 'LOCATION REGION'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="font-mono"
                style={{
                  background: 'none', border: 'none',
                  color: filter === cat ? 'var(--color-off-white)' : 'var(--color-faded-gray)',
                  borderBottom: filter === cat ? '2px solid var(--color-blood-red)' : 'none',
                  padding: '0.5rem 0', cursor: 'pointer', fontSize: '1rem', letterSpacing: '1px', transition: 'all 0.3s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {filteredAnomalies.map(anomaly => (
              <div key={anomaly.id} className="panel animate-fade-in" style={{ borderLeft: `4px solid ${anomaly.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <span className="font-mono text-faded-gray">{anomaly.time}</span>
                    <span className="font-mono text-off-white" style={{ background: 'var(--color-charcoal)', padding: '0.25rem 0.75rem', border: '1px solid var(--color-faded-gray)' }}>{anomaly.category}</span>
                  </div>
                  <div className="font-mono" style={{ color: anomaly.color, letterSpacing: '1px', fontSize: '1.1rem' }}>[{anomaly.type}]</div>
                </div>
                
                <div className="font-body text-off-white" style={{ fontSize: '1.5rem', lineHeight: '1.4', marginBottom: '2rem' }}>
                  {anomaly.description}
                </div>
                
                <div style={{ display: 'flex', gap: '4rem', borderTop: '1px solid var(--color-charcoal)', paddingTop: '1.5rem' }}>
                  <div>
                    <div className="font-mono text-faded-gray" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>CONSCIOUSNESSES</div>
                    <div className="font-mono text-off-white" style={{ fontSize: '1.4rem' }}>{anomaly.count}</div>
                  </div>
                  <div>
                    <div className="font-mono text-faded-gray" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>SYNC STRENGTH</div>
                    <div className="font-mono text-blood-red" style={{ fontSize: '1.4rem' }}>{anomaly.strength}%</div>
                  </div>
                </div>
              </div>
            ))}
            {filteredAnomalies.length === 0 && (
              <div className="font-mono text-faded-gray" style={{ textAlign: 'center', marginTop: '4rem' }}>NO ANOMALIES DETECTED IN THIS CATEGORY.</div>
            )}
          </div>
        </>
      )}

      {viewMode === 'MAP' && (
        <div className="animate-fade-in" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}>
          <GlobalMapVisualization nodes={activeNodes} onHoverNode={handleHover} onClickNode={handleClick} />
          
          <div style={{ position: 'absolute', top: '3rem', left: '3rem', zIndex: 10, pointerEvents: 'none' }}>
            <h1 className="font-display text-off-white" style={{ fontSize: '4rem', margin: 0, lineHeight: 1 }}>GLOBAL TOPOLOGY</h1>
            <div className="font-mono text-blood-red animate-pulse" style={{ marginTop: '0.5rem', letterSpacing: '2px', fontSize: '1.2rem' }}>
              {activeNodes.length - 1} CONSCIOUSNESSES
            </div>
            <div style={{ marginTop: '2.5rem' }}>
              <div className="font-mono text-faded-gray" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>[ LEGEND ]</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8B0000', boxShadow: '0 0 8px #8B0000' }}></div>
                <span className="font-mono text-off-white" style={{ fontSize: '0.9rem' }}>HIGH SYNCHRONIZATION</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E8E5E1', boxShadow: '0 0 2px #E8E5E1' }}></div>
                <span className="font-mono text-faded-gray" style={{ fontSize: '0.9rem' }}>LOW SYNCHRONIZATION</span>
              </div>
            </div>
          </div>

          <div className="panel" style={{ position: 'absolute', top: '3rem', right: '3rem', zIndex: 10, background: 'rgba(18,18,18,0.85)', backdropFilter: 'blur(4px)', padding: '1.5rem', border: '1px solid var(--color-faded-gray)' }}>
            <div className="font-mono text-faded-gray" style={{ marginBottom: '1.5rem', fontSize: '0.8rem' }}>[ TIME HORIZON ]</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['NOW', 'TODAY', 'THIS WEEK', 'THIS MONTH', 'ALL TIME'].map(mode => (
                <button key={mode} onClick={() => setTimeMode(mode)} className="font-mono" style={{ background: 'transparent', border: 'none', color: timeMode === mode ? 'var(--color-blood-red)' : 'var(--color-faded-gray)', textAlign: 'right', cursor: 'pointer', fontSize: '1.1rem', letterSpacing: '1px', transition: 'color 0.3s' }}>
                  {timeMode === mode && <span style={{ marginRight: '0.5rem', animation: 'pulse 1.5s infinite' }}>&gt;</span>}
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {hoveredNode && (
            <div className="panel animate-fade-in" style={{ position: 'absolute', left: tooltipPos.x + 20, top: tooltipPos.y + 20, zIndex: 20, background: 'rgba(12,12,12,0.95)', border: '1px solid var(--color-blood-red)', padding: '1.5rem', pointerEvents: 'none' }}>
              <div className="font-mono text-faded-gray" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>[ OBSERVED ]</div>
              <div className="font-display text-off-white" style={{ fontSize: '2rem', lineHeight: 1 }}>{hoveredNode.id}</div>
              <div className="font-mono text-blood-red" style={{ marginTop: '1rem', fontSize: '1rem' }}>SYNCHRONIZATION: {hoveredNode.sync.toFixed(1)}%</div>
              <div className="font-mono text-faded-gray" style={{ marginTop: '0.25rem', fontSize: '0.9rem' }}>{hoveredNode.connectionsCount} PREVIOUS CONNECTIONS</div>
              <div className="font-mono text-off-white animate-pulse" style={{ marginTop: '1.5rem', fontSize: '0.8rem', borderTop: '1px solid var(--color-crimson)', paddingTop: '1rem' }}>CLICK TO OPEN CONNECTION</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Discover;
