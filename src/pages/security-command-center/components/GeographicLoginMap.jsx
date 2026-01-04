import React, { useEffect, useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';

const GeographicLoginMap = ({ loginData, onRegionClick }) => {
  const canvasRef = useRef(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const resizeCanvas = () => {
      const rect = canvas?.getBoundingClientRect();
      canvas.width = rect?.width * window.devicePixelRatio;
      canvas.height = rect?.height * window.devicePixelRatio;
      ctx?.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles for real-time authentication events
    const initParticles = () => {
      particlesRef.current = loginData?.map((point) => ({
        x: (point?.longitude + 180) * (canvas?.width / window.devicePixelRatio / 360),
        y: (90 - point?.latitude) * (canvas?.height / window.devicePixelRatio / 180),
        radius: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.5,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: point?.threatLevel === 'high' ? '#e53e3e' : point?.threatLevel === 'medium' ? '#d69e2e' : '#2c7a7b',
      }));
    };

    initParticles();

    // Animation loop
    const animate = () => {
      const rect = canvas?.getBoundingClientRect();
      ctx?.clearRect(0, 0, rect?.width, rect?.height);

      // Draw world map outline (simplified)
      ctx.strokeStyle = 'rgba(44, 122, 123, 0.2)';
      ctx.lineWidth = 1;
      ctx?.strokeRect(0, 0, rect?.width, rect?.height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(44, 122, 123, 0.1)';
      for (let i = 0; i <= 360; i += 30) {
        const x = (i / 360) * rect?.width;
        ctx?.beginPath();
        ctx?.moveTo(x, 0);
        ctx?.lineTo(x, rect?.height);
        ctx?.stroke();
      }
      for (let i = 0; i <= 180; i += 30) {
        const y = (i / 180) * rect?.height;
        ctx?.beginPath();
        ctx?.moveTo(0, y);
        ctx?.lineTo(rect?.width, y);
        ctx?.stroke();
      }

      // Draw and animate particles
      particlesRef?.current?.forEach((particle) => {
        particle.opacity += particle?.pulseSpeed;
        if (particle?.opacity > 1 || particle?.opacity < 0.3) {
          particle.pulseSpeed *= -1;
        }

        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle?.color?.replace(')', `, ${particle?.opacity})`)?.replace('rgb', 'rgba');
        ctx?.fill();

        // Draw pulse ring
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.radius + 5, 0, Math.PI * 2);
        ctx.strokeStyle = particle?.color?.replace(')', `, ${particle?.opacity * 0.3})`)?.replace('rgb', 'rgba');
        ctx.lineWidth = 2;
        ctx?.stroke();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef?.current) {
        cancelAnimationFrame(animationFrameRef?.current);
      }
    };
  }, [loginData]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef?.current;
    const rect = canvas?.getBoundingClientRect();
    const x = e?.clientX - rect?.left;
    const y = e?.clientY - rect?.top;

    // Find clicked region
    particlesRef?.current?.forEach((particle, index) => {
      const distance = Math.sqrt(Math.pow(x - particle?.x, 2) + Math.pow(y - particle?.y, 2));
      if (distance < particle?.radius + 10) {
        const region = loginData?.[index];
        setSelectedRegion(region);
        if (onRegionClick) {
          onRegionClick(region);
        }
      }
    });
  };

  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef?.current;
    const rect = canvas?.getBoundingClientRect();
    const x = e?.clientX - rect?.left;
    const y = e?.clientY - rect?.top;

    let found = false;
    particlesRef?.current?.forEach((particle, index) => {
      const distance = Math.sqrt(Math.pow(x - particle?.x, 2) + Math.pow(y - particle?.y, 2));
      if (distance < particle?.radius + 10) {
        setHoveredPoint(loginData?.[index]);
        found = true;
      }
    });

    if (!found) {
      setHoveredPoint(null);
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-teal-sm overflow-hidden h-full flex flex-col">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Geographic Login Patterns
          </h3>
          <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-muted-foreground">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <span className="text-muted-foreground">High Risk</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          className="w-full h-full cursor-pointer"
          style={{ minHeight: '400px' }}
        />

        {hoveredPoint && (
          <div
            className="absolute bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-teal-md pointer-events-none"
            style={{
              left: '50%',
              top: '20px',
              transform: 'translateX(-50%)',
              zIndex: 10,
            }}
          >
            <div className="text-sm space-y-1">
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={14} color="var(--color-primary)" />
                <span className="font-medium text-foreground">{hoveredPoint?.city}, {hoveredPoint?.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Activity" size={14} color="var(--color-muted-foreground)" />
                <span className="text-muted-foreground">{hoveredPoint?.loginCount} logins</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={14} color="var(--color-muted-foreground)" />
                <span className="text-muted-foreground">Threat: {hoveredPoint?.threatLevel}</span>
              </div>
            </div>
          </div>
        )}

        {selectedRegion && (
          <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-teal-md">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-base md:text-lg font-heading font-semibold text-foreground mb-2">
                  {selectedRegion?.city}, {selectedRegion?.country}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Logins:</span>
                    <span className="ml-2 font-medium text-foreground">{selectedRegion?.loginCount}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Success Rate:</span>
                    <span className="ml-2 font-medium text-success">{selectedRegion?.successRate}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Threat Level:</span>
                    <span className="ml-2 font-medium text-warning capitalize">{selectedRegion?.threatLevel}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Active Sessions:</span>
                    <span className="ml-2 font-medium text-foreground">{selectedRegion?.activeSessions}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedRegion(null)}
                className="p-2 rounded-lg hover:bg-muted transition-smooth"
              >
                <Icon name="X" size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeographicLoginMap;