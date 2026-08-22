import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ to, label, fallbackToHistory = true }) => {
  const navigate = useNavigate();

  const handleReturn = (e) => {
    e.preventDefault();
    if (fallbackToHistory && window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(to || '/live');
    }
  };

  return (
    <button 
      onClick={handleReturn}
      className="font-mono text-faded-gray" 
      style={{ 
        background: 'transparent', 
        border: 'none', 
        cursor: 'pointer', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        marginBottom: '2rem',
        fontSize: '0.9rem',
        transition: 'color 0.3s'
      }}
      onMouseOver={e => e.currentTarget.style.color = 'var(--color-off-white)'}
      onMouseOut={e => e.currentTarget.style.color = 'var(--color-faded-gray)'}
    >
      <span>←</span>
      <span style={{ letterSpacing: '1px' }}>{label || 'RETURN'}</span>
    </button>
  );
};

export default BackButton;
