import React from 'react';
import BackButton from '../components/BackButton';

const About = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      
      <BackButton to="/live" label="RETURN TO HIVEMIND" />

      <div style={{ borderBottom: '1px solid var(--color-charcoal)', paddingBottom: '2rem' }}>
        <h1 className="font-display text-off-white animate-pulse" style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>HIVEMIND</h1>
        <div className="font-mono text-faded-gray" style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>
          EXPERIMENTAL HUMAN SYNCHRONIZATION NETWORK
        </div>
      </div>

      <div className="panel" style={{ borderLeft: '2px solid var(--color-blood-red)', padding: '2rem' }}>
        <div className="font-mono text-faded-gray" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>CREATOR IDENTIFICATION</div>
        <div className="font-display text-off-white" style={{ fontSize: '2rem', marginBottom: '1.5rem', letterSpacing: '1px' }}>
          DRAGON MASTER GALILEO
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
           <div>
             <div className="font-mono text-faded-gray" style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>STATUS</div>
             <div className="font-mono text-crt-green">SYSTEM ARCHITECT</div>
           </div>
           <div>
             <div className="font-mono text-faded-gray" style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>CLEARANCE</div>
             <div className="font-mono text-blood-red">OMEGA-LEVEL</div>
           </div>
           <div>
             <div className="font-mono text-faded-gray" style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>DIRECTIVE</div>
             <div className="font-mono text-off-white">OBSERVE COINCIDENCE</div>
           </div>
           <div>
             <div className="font-mono text-faded-gray" style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>ORIGIN</div>
             <div className="font-mono text-off-white">CLASSIFIED</div>
           </div>
        </div>
      </div>

      <div className="font-body text-faded-gray" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
        The Hivemind is not a social network. It is an instrument designed to measure the invisible threads of human coincidence. 
        <br/><br/>
        At any given moment, across the world, strangers are experiencing the exact same activities, emotions, and thoughts simultaneously. 
        The architect built this system to prove that isolation is an illusion.
      </div>
    </div>
  );
};

export default About;
