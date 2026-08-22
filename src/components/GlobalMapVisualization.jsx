import React, { useRef, useEffect } from 'react';

const GlobalMapVisualization = ({ nodes, onHoverNode, onClickNode }) => {
  const canvasRef = useRef(null);
  const transformRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, scale: 1 });
  const mouseRef = useRef({ x: 0, y: 0, isDragging: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Center transform on initial load or resize if needed
      transformRef.current.x = canvas.width / 2;
      transformRef.current.y = canvas.height / 2;
    };
    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      // Dark trail effect for cinematic motion blur
      ctx.fillStyle = 'rgba(5, 5, 5, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(transformRef.current.x, transformRef.current.y);
      ctx.scale(transformRef.current.scale, transformRef.current.scale);

      // Draw Connections (optimizing: only draw for high sync or cluster centers)
      ctx.lineWidth = 0.5;
      nodes.forEach(node => {
        if (node.connections && node.connections.length > 0) {
          node.connections.forEach(targetIdx => {
            const target = nodes.find(n => n.idx === targetIdx);
            if (target) {
              const dist = Math.hypot(node.x - target.x, node.y - target.y);
              if (dist < 500) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(target.x, target.y);
                ctx.strokeStyle = `rgba(139, 0, 0, ${(500 - dist) / 2000})`;
                ctx.stroke();
              }
            }
          });
        }
      });

      // Draw Nodes
      nodes.forEach(node => {
        // Subtle organic drift based on a seeded hash
        if (!node.isCenter) {
           node.x += Math.sin(Date.now() * 0.001 + node.idHash) * 0.1;
           node.y += Math.cos(Date.now() * 0.001 + node.idHash) * 0.1;
        }

        ctx.beginPath();
        // Constant screen size for nodes despite zoom, or slightly scaled
        const renderedSize = node.size / Math.sqrt(transformRef.current.scale);
        ctx.arc(node.x, node.y, renderedSize, 0, Math.PI * 2);
        
        if (node.isCenter) {
          ctx.fillStyle = '#E8E5E1';
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#E8E5E1';
        } else {
          const isHighSync = node.sync > 80;
          ctx.fillStyle = isHighSync ? '#8B0000' : '#E8E5E1';
          ctx.shadowBlur = isHighSync ? 10 : 2;
          ctx.shadowColor = isHighSync ? '#8B0000' : '#E8E5E1';
          ctx.globalAlpha = node.opacity || 1;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodes]);

  // Interaction Handlers
  const getPointerPos = (e) => {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handlePointerDown = (e) => {
    const pos = getPointerPos(e);
    mouseRef.current.isDragging = true;
    mouseRef.current.lastX = pos.x;
    mouseRef.current.lastY = pos.y;
  };

  const handlePointerMove = (e) => {
    const pos = getPointerPos(e);
    const { x, y } = pos;

    if (mouseRef.current.isDragging) {
      const dx = x - mouseRef.current.lastX;
      const dy = y - mouseRef.current.lastY;
      transformRef.current.x += dx;
      transformRef.current.y += dy;
      mouseRef.current.lastX = x;
      mouseRef.current.lastY = y;
    } else {
      // Hover detection
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = x - rect.left;
      const clickY = y - rect.top;

      const worldX = (clickX - transformRef.current.x) / transformRef.current.scale;
      const worldY = (clickY - transformRef.current.y) / transformRef.current.scale;

      let hovered = null;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i];
        if (node.isCenter) continue;
        const dist = Math.hypot(worldX - node.x, worldY - node.y);
        // Adjusted hit radius based on zoom
        if (dist < (20 / transformRef.current.scale)) {
          hovered = node;
          break;
        }
      }
      
      onHoverNode(hovered, { x, y });
    }
  };

  const handlePointerUp = () => {
    mouseRef.current.isDragging = false;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomSensitivity = 0.0015;
    const delta = -e.deltaY * zoomSensitivity;
    
    let newScale = transformRef.current.scale * Math.exp(delta);
    newScale = Math.max(0.05, Math.min(newScale, 10)); // Allow deep zoom

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const worldX = (mouseX - transformRef.current.x) / transformRef.current.scale;
    const worldY = (mouseY - transformRef.current.y) / transformRef.current.scale;

    transformRef.current.x = mouseX - worldX * newScale;
    transformRef.current.y = mouseY - worldY * newScale;
    transformRef.current.scale = newScale;
  };

  const handleClick = (e) => {
    // Only register click if we aren't dragging
    if (mouseRef.current.isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const worldX = (clickX - transformRef.current.x) / transformRef.current.scale;
    const worldY = (clickY - transformRef.current.y) / transformRef.current.scale;

    const clickedNode = nodes.find(node => {
      if (node.isCenter) return false;
      const dist = Math.hypot(worldX - node.x, worldY - node.y);
      return dist < (20 / transformRef.current.scale);
    });

    if (clickedNode) {
      onClickNode(clickedNode);
    }
  };

  return (
    <canvas 
      ref={canvasRef}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      onClick={handleClick}
      onWheel={handleWheel}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: mouseRef.current.isDragging ? 'grabbing' : 'crosshair',
        zIndex: 1,
        touchAction: 'none'
      }}
    />
  );
};

export default GlobalMapVisualization;
