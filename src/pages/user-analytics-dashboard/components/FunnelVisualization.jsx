import React, { useEffect, useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';

const FunnelVisualization = ({ data, onStageClick }) => {
  const canvasRef = useRef(null);
  const [hoveredStage, setHoveredStage] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas?.getBoundingClientRect();

    canvas.width = rect?.width * dpr;
    canvas.height = rect?.height * dpr;
    ctx?.scale(dpr, dpr);

    const drawFunnel = () => {
      ctx?.clearRect(0, 0, rect?.width, rect?.height);

      const padding = 40;
      const stageHeight = (rect?.height - padding * 2) / data?.length;
      const maxWidth = rect?.width - padding * 2;

      data?.forEach((stage, index) => {
        const y = padding + index * stageHeight;
        const widthRatio = stage?.users / data?.[0]?.users;
        const stageWidth = maxWidth * widthRatio;
        const x = (rect?.width - stageWidth) / 2;

        const isHovered = hoveredStage === index;
        const isSelected = selectedStage === index;

        // Draw funnel stage
        ctx.fillStyle = isHovered || isSelected ? '#2c7a7b' : '#252932';
        ctx.strokeStyle = isHovered || isSelected ? '#2c7a7b' : '#4a5568';
        ctx.lineWidth = 2;

        if (index < data?.length - 1) {
          const nextWidthRatio = data?.[index + 1]?.users / data?.[0]?.users;
          const nextStageWidth = maxWidth * nextWidthRatio;
          const nextX = (rect?.width - nextStageWidth) / 2;

          ctx?.beginPath();
          ctx?.moveTo(x, y);
          ctx?.lineTo(x + stageWidth, y);
          ctx?.lineTo(nextX + nextStageWidth, y + stageHeight);
          ctx?.lineTo(nextX, y + stageHeight);
          ctx?.closePath();
          ctx?.fill();
          ctx?.stroke();
        } else {
          ctx?.fillRect(x, y, stageWidth, stageHeight);
          ctx?.strokeRect(x, y, stageWidth, stageHeight);
        }

        // Draw text
        ctx.fillStyle = '#f8f9fa';
        ctx.font = '14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx?.fillText(stage?.stage, rect?.width / 2, y + stageHeight / 2 - 10);

        ctx.font = 'bold 18px Inter, sans-serif';
        ctx?.fillText(stage?.users?.toLocaleString(), rect?.width / 2, y + stageHeight / 2 + 10);

        ctx.font = '12px Inter, sans-serif';
        ctx.fillStyle = stage?.conversionRate >= 70 ? '#38a169' : stage?.conversionRate >= 50 ? '#d69e2e' : '#e53e3e';
        ctx?.fillText(`${stage?.conversionRate}%`, rect?.width / 2, y + stageHeight / 2 + 28);
      });
    };

    drawFunnel();

    const handleMouseMove = (e) => {
      const rect = canvas?.getBoundingClientRect();
      const x = e?.clientX - rect?.left;
      const y = e?.clientY - rect?.top;

      const stageHeight = (rect?.height - 80) / data?.length;
      const stageIndex = Math.floor((y - 40) / stageHeight);

      if (stageIndex >= 0 && stageIndex < data?.length) {
        setHoveredStage(stageIndex);
        canvas.style.cursor = 'pointer';
      } else {
        setHoveredStage(null);
        canvas.style.cursor = 'default';
      }
    };

    const handleClick = (e) => {
      if (hoveredStage !== null) {
        setSelectedStage(hoveredStage);
        onStageClick?.(data?.[hoveredStage]);
      }
    };

    canvas?.addEventListener('mousemove', handleMouseMove);
    canvas?.addEventListener('click', handleClick);

    return () => {
      canvas?.removeEventListener('mousemove', handleMouseMove);
      canvas?.removeEventListener('click', handleClick);
    };
  }, [data, hoveredStage, selectedStage, onStageClick]);

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-teal-sm">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">
            User Journey Funnel
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground caption">
            Registration to first successful login
          </p>
        </div>
        <Icon name="Filter" size={20} color="var(--color-muted-foreground)" className="md:w-6 md:h-6" />
      </div>
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: '400px' }}
      />
      {selectedStage !== null && (
        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm md:text-base font-medium text-foreground">
              {data?.[selectedStage]?.stage}
            </h4>
            <button
              onClick={() => setSelectedStage(null)}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="X" size={16} className="md:w-5 md:h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div>
              <p className="text-xs text-muted-foreground caption mb-1">Users</p>
              <p className="text-base md:text-lg font-semibold text-foreground">
                {data?.[selectedStage]?.users?.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground caption mb-1">Conversion</p>
              <p className="text-base md:text-lg font-semibold text-foreground">
                {data?.[selectedStage]?.conversionRate}%
              </p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-xs text-muted-foreground caption mb-1">Drop-off</p>
              <p className="text-base md:text-lg font-semibold text-error">
                {selectedStage < data?.length - 1
                  ? (data?.[selectedStage]?.users - data?.[selectedStage + 1]?.users)?.toLocaleString()
                  : '0'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FunnelVisualization;