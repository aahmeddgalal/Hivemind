import React, { useRef, useEffect } from 'react';

const generateMockNodes = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `SUBJECT_${Math.floor(Math.random() * 1000000)}`,
    x: (Math.random() - 0.5) * 2000,
    y: (Math.random() - 0.5) * 2000,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    sync: Math.random() * 40,
    size: Math.random() * 2 + 1,
    history: Math.floor(Math.random() * 20),
    isReal: false
  }));
};

const NetworkVisualization = ({ onNodeSelect, matches = [] }) => {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const cameraRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    nodesRef.current = generateMockNodes(150);
  }, []);

  useEffect(() => {
    matches.forEach(match => {
      const exists = nodesRef.current.find(n => n.id === `SUBJECT_${match.subjectId}`);
      if (!exists) {
        const dist = Math.max(100, 800 - (match.syncScore * 6)); 
        const angle = Math.random() * Math.PI * 2;
        nodesRef.current.push({
          id: `SUBJECT_${match.subjectId}`,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          sync: match.syncScore,
          size: 4,
          history: 0,
          isReal: true,
          state: match.state
        });
      } else {
        exists.sync = match.syncScore;
        exists.state = match.state;
      }
    });
  }, [matches]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Reduce counts for performance
    const particleCount = (isMobile || reducedMotion) ? 10 : 50;
    const renderTrailing = !reducedMotion;

    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (reducedMotion ? 0.1 : 0.5),
      vy: (Math.random() - 0.5) * (reducedMotion ? 0.1 : 0.5),
      size: Math.random() * 1.5,
      opacity: Math.random() * 0.5
    }));

    const render = () => {
      if (renderTrailing) {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.3)';
      } else {
        ctx.fillStyle = 'rgba(5, 5, 5, 1)'; // Solid clear for reduced motion
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      if (mouseRef.current.active) {
        const targetCamX = (mouseRef.current.x - centerX) * -0.05;
        const targetCamY = (mouseRef.current.y - centerY) * -0.05;
        cameraRef.current.x += (targetCamX - cameraRef.current.x) * 0.05;
        cameraRef.current.y += (targetCamY - cameraRef.current.y) * 0.05;
      } else {
        cameraRef.current.x += (0 - cameraRef.current.x) * 0.02;
        cameraRef.current.y += (0 - cameraRef.current.y) * 0.02;
      }

      const camX = cameraRef.current.x;
      const camY = cameraRef.current.y;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 0, 0, ${p.opacity})`;
        ctx.fill();
      });

      nodesRef.current.forEach(node => {
        if (node.isReal) {
          // Real nodes drift slowly towards the center if they have high sync
          const targetDist = Math.max(100, 800 - (node.sync * 6));
          const currentDist = Math.hypot(node.x, node.y);
          if (currentDist > targetDist) {
             node.x *= 0.999;
             node.y *= 0.999;
          }
        }
        
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -1500) node.vx *= -1;
        if (node.x > 1500) node.vx *= -1;
        if (node.y < -1500) node.vy *= -1;
        if (node.y > 1500) node.vy *= -1;

        const screenX = centerX + node.x + camX;
        const screenY = centerY + node.y + camY;

        const distToCenter = Math.hypot(screenX - centerX, screenY - centerY);
        if (distToCenter < 400 || node.isReal) {
          ctx.beginPath();
          ctx.moveTo(screenX, screenY);
          ctx.lineTo(centerX, centerY);
          ctx.strokeStyle = node.isReal 
             ? `rgba(139, 0, 0, ${(600 - distToCenter) / 400})` 
             : `rgba(139, 0, 0, ${(400 - distToCenter) / 800})`;
          ctx.lineWidth = node.isReal ? 1.5 : 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(screenX, screenY, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.sync > 50 || node.isReal ? '#8B0000' : '#E8E5E1';
        ctx.shadowBlur = node.sync > 50 || node.isReal ? 10 : 2;
        ctx.shadowColor = node.sync > 50 || node.isReal ? '#8B0000' : '#E8E5E1';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#E8E5E1';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#E8E5E1';
      ctx.fill();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e) => {
    mouseRef.current = { x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY, active: true };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const clickX = clientX - rect.left;
    const clickY = clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const camX = cameraRef.current.x;
    const camY = cameraRef.current.y;

    const clickedNode = nodesRef.current.find(node => {
      const screenX = centerX + node.x + camX;
      const screenY = centerY + node.y + camY;
      const dist = Math.hypot(clickX - screenX, clickY - screenY);
      return dist < 10;
    });

    if (clickedNode) {
      onNodeSelect(clickedNode);
    } else {
      onNodeSelect(null);
    }
  };

  return (
    <canvas 
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'crosshair',
        zIndex: 1,
        touchAction: 'none'
      }}
    />
  );
};

export default NetworkVisualization;
