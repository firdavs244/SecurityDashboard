import React, { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const DemographicBreakdown = ({ data, title, icon }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 200;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx?.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = 70;
    const innerRadius = 40;

    let currentAngle = -Math.PI / 2;

    const colors = ['#2c7a7b', '#4c51bf', '#c9a961', '#38a169', '#d69e2e'];

    data?.forEach((item, index) => {
      const sliceAngle = (item?.percentage / 100) * 2 * Math.PI;

      // Draw outer arc
      ctx?.beginPath();
      ctx?.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx?.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx?.closePath();
      ctx.fillStyle = colors?.[index % colors?.length];
      ctx?.fill();

      currentAngle += sliceAngle;
    });

    // Draw center circle
    ctx?.beginPath();
    ctx?.arc(centerX, centerY, innerRadius - 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a1d23';
    ctx?.fill();
  }, [data]);

  const total = data?.reduce((sum, item) => sum + item?.value, 0);

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-teal-sm">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Icon name={icon} size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">{title}</h3>
      </div>
      <div className="flex flex-col items-center">
        <canvas ref={canvasRef} className="w-40 h-40 md:w-48 md:h-48 mb-4 md:mb-6" />

        <div className="w-full space-y-2 md:space-y-3">
          {data?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: ['#2c7a7b', '#4c51bf', '#c9a961', '#38a169', '#d69e2e']?.[index % 5],
                  }}
                />
                <span className="text-xs md:text-sm text-foreground truncate">{item?.label}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs md:text-sm font-medium text-foreground">
                  {item?.percentage}%
                </span>
                <span className="text-xs text-muted-foreground caption hidden sm:inline">
                  ({item?.value?.toLocaleString()})
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border w-full text-center">
          <p className="text-xs text-muted-foreground caption mb-1">Total Users</p>
          <p className="text-xl md:text-2xl font-heading font-semibold text-foreground">
            {total?.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemographicBreakdown;