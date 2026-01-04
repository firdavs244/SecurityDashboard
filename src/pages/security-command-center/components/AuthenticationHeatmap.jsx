import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AuthenticationHeatmap = ({ data }) => {
  const [hoveredCell, setHoveredCell] = useState(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getIntensityColor = (value) => {
    if (value >= 90) return 'bg-error';
    if (value >= 70) return 'bg-warning';
    if (value >= 50) return 'bg-accent';
    if (value >= 30) return 'bg-primary';
    return 'bg-muted';
  };

  const getIntensityOpacity = (value) => {
    return Math.min(value / 100, 1);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-teal-sm p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-2">
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">
            Authentication Heatmap
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground caption">
            Login attempts by hour and day of week
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Intensity:</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-muted rounded"></div>
            <span className="text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-primary rounded"></div>
            <span className="text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-error rounded"></div>
            <span className="text-muted-foreground">High</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="flex gap-1 mb-2">
            <div className="w-12"></div>
            {hours?.map((hour) => (
              <div
                key={hour}
                className="flex-1 text-center text-xs text-muted-foreground caption"
              >
                {hour}
              </div>
            ))}
          </div>

          {days?.map((day, dayIndex) => (
            <div key={day} className="flex gap-1 mb-1">
              <div className="w-12 flex items-center text-xs text-muted-foreground caption">
                {day}
              </div>
              {hours?.map((hour) => {
                const cellData = data?.find((d) => d?.day === dayIndex && d?.hour === hour);
                const value = cellData ? cellData?.value : 0;
                const intensity = getIntensityColor(value);

                return (
                  <div
                    key={`${day}-${hour}`}
                    className={`flex-1 aspect-square rounded ${intensity} cursor-pointer hover:ring-2 hover:ring-primary transition-smooth relative`}
                    style={{ opacity: getIntensityOpacity(value) }}
                    onMouseEnter={() => setHoveredCell({ day, hour, value, attempts: cellData?.attempts || 0 })}
                    onMouseLeave={() => setHoveredCell(null)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {hoveredCell && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} color="var(--color-primary)" />
              <span className="text-foreground font-medium">{hoveredCell?.day}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} color="var(--color-primary)" />
              <span className="text-foreground font-medium">{hoveredCell?.hour}:00</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Activity" size={16} color="var(--color-primary)" />
              <span className="text-foreground font-medium">{hoveredCell?.attempts} attempts</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
              <span className="text-foreground font-medium">{hoveredCell?.value}% intensity</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticationHeatmap;