import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  // Don't show footer on fullscreen immersive routes
  if (['/live', '/map', '/admin'].includes(location.pathname)) return null;

  return (
    <footer style={{ 
      padding: '2rem', 
      borderTop: '1px solid rgba(255,255,255,0.05)', 
      marginTop: '4rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      opacity: 0.5,
      transition: 'opacity 0.3s ease'
    }}
    onMouseOver={e => e.currentTarget.style.opacity = '1'}
    onMouseOut={e => e.currentTarget.style.opacity = '0.5'}
    >
      <div className="font-mono text-faded-gray" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>
        HIVEMIND SYSTEM ONLINE
      </div>
      <Link to="/about" className="font-mono" style={{ 
        fontSize: '0.65rem', 
        color: 'var(--color-blood-red)', 
        textDecoration: 'none',
        letterSpacing: '1px'
      }}>
        Developed by the Dragon Master Galileo
      </Link>
    </footer>
  );
};

export default Footer;
