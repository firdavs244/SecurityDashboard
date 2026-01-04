import React, { useEffect, useRef } from 'react';

const UserGrowthVisualization = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const rect = canvas?.getBoundingClientRect();
      canvas.width = rect?.width * dpr;
      canvas.height = rect?.height * dpr;
      ctx?.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const dataPoints = [
      { month: 'Jan', users: 45000 },
      { month: 'Feb', users: 52000 },
      { month: 'Mar', users: 58000 },
      { month: 'Apr', users: 67000 },
      { month: 'May', users: 75000 },
      { month: 'Jun', users: 89000 },
      { month: 'Jul', users: 98000 },
      { month: 'Aug', users: 112000 },
      { month: 'Sep', users: 125000 },
      { month: 'Oct', users: 138000 },
      { month: 'Nov', users: 152000 },
      { month: 'Dec', users: 167000 },
    ];

    let animationProgress = 0;
    const animationDuration = 2000;
    let startTime = null;

    const drawChart = (progress) => {
      const rect = canvas?.getBoundingClientRect();
      const width = rect?.width;
      const height = rect?.height;

      ctx?.clearRect(0, 0, width, height);

      const padding = { top: 40, right: 40, bottom: 60, left: 80 };
      const chartWidth = width - padding?.left - padding?.right;
      const chartHeight = height - padding?.top - padding?.bottom;

      const maxUsers = Math.max(...dataPoints?.map((d) => d?.users));
      const pointSpacing = chartWidth / (dataPoints?.length - 1);

      ctx.strokeStyle = 'rgba(44, 122, 123, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = padding?.top + (chartHeight / 5) * i;
        ctx?.beginPath();
        ctx?.moveTo(padding?.left, y);
        ctx?.lineTo(width - padding?.right, y);
        ctx?.stroke();

        ctx.fillStyle = '#a0aec0';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'right';
        const value = Math.round(maxUsers - (maxUsers / 5) * i);
        ctx?.fillText((value / 1000)?.toFixed(0) + 'K', padding?.left - 10, y + 4);
      }

      const visiblePoints = Math.floor(dataPoints?.length * progress);

      ctx?.beginPath();
      ctx.strokeStyle = '#2c7a7b';
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      dataPoints?.slice(0, visiblePoints + 1)?.forEach((point, index) => {
        const x = padding?.left + index * pointSpacing;
        const y = padding?.top + chartHeight - (point?.users / maxUsers) * chartHeight;

        if (index === 0) {
          ctx?.moveTo(x, y);
        } else {
          ctx?.lineTo(x, y);
        }
      });
      ctx?.stroke();

      const gradient = ctx?.createLinearGradient(0, padding?.top, 0, height - padding?.bottom);
      gradient?.addColorStop(0, 'rgba(44, 122, 123, 0.3)');
      gradient?.addColorStop(1, 'rgba(44, 122, 123, 0.05)');

      ctx?.beginPath();
      dataPoints?.slice(0, visiblePoints + 1)?.forEach((point, index) => {
        const x = padding?.left + index * pointSpacing;
        const y = padding?.top + chartHeight - (point?.users / maxUsers) * chartHeight;

        if (index === 0) {
          ctx?.moveTo(x, y);
        } else {
          ctx?.lineTo(x, y);
        }
      });
      ctx?.lineTo(padding?.left + visiblePoints * pointSpacing, height - padding?.bottom);
      ctx?.lineTo(padding?.left, height - padding?.bottom);
      ctx?.closePath();
      ctx.fillStyle = gradient;
      ctx?.fill();

      dataPoints?.slice(0, visiblePoints + 1)?.forEach((point, index) => {
        const x = padding?.left + index * pointSpacing;
        const y = padding?.top + chartHeight - (point?.users / maxUsers) * chartHeight;

        ctx?.beginPath();
        ctx?.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#2c7a7b';
        ctx?.fill();
        ctx.strokeStyle = '#1a1d23';
        ctx.lineWidth = 2;
        ctx?.stroke();

        ctx.fillStyle = '#e8eaed';
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx?.fillText(point?.month, x, height - padding?.bottom + 20);
      });
    };

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      animationProgress = Math.min(elapsed / animationDuration, 1);

      drawChart(animationProgress);

      if (animationProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, []);

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 lg:p-8 border border-border shadow-teal">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-base md:text-lg lg:text-xl font-heading font-semibold text-foreground">
          User Growth Trajectory
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs md:text-sm text-muted-foreground caption">Active Users</span>
        </div>
      </div>

      <div className="relative w-full" style={{ height: '400px' }}>
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground caption mb-1">YoY Growth</p>
          <p className="text-lg md:text-xl font-heading font-semibold text-success">+271%</p>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground caption mb-1">MoM Growth</p>
          <p className="text-lg md:text-xl font-heading font-semibold text-success">+10.9%</p>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground caption mb-1">Avg Daily New</p>
          <p className="text-lg md:text-xl font-heading font-semibold text-foreground">412</p>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground caption mb-1">Retention Rate</p>
          <p className="text-lg md:text-xl font-heading font-semibold text-success">94.2%</p>
        </div>
      </div>
    </div>
  );
};

export default UserGrowthVisualization;