import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, unit, trend, trendValue, icon, iconColor, description }) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 lg:p-8 border border-border shadow-teal transition-smooth hover:shadow-teal-md">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1">
          <p className="text-xs md:text-sm text-muted-foreground caption mb-1 md:mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">
              {value}
            </h2>
            {unit && <span className="text-sm md:text-base text-muted-foreground">{unit}</span>}
          </div>
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name={icon} size={24} color={iconColor || 'var(--color-primary)'} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1 ${getTrendColor()}`}>
          <Icon name={getTrendIcon()} size={16} />
          <span className="text-xs md:text-sm font-medium">{trendValue}</span>
        </div>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
    </div>
  );
};

export default KPICard;