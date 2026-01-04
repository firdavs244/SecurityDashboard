import React from 'react';
import Icon from '../../../components/AppIcon';

const ResourceGauge = ({ title, value, max, unit, icon, status }) => {
  const percentage = (value / max) * 100;

  const getStatusColor = () => {
    if (percentage >= 90) return 'var(--color-error)';
    if (percentage >= 75) return 'var(--color-warning)';
    if (percentage >= 50) return 'var(--color-primary)';
    return 'var(--color-success)';
  };

  const getStatusBg = () => {
    if (percentage >= 90) return 'bg-error/10';
    if (percentage >= 75) return 'bg-warning/10';
    if (percentage >= 50) return 'bg-primary/10';
    return 'bg-success/10';
  };

  return (
    <div className={`rounded-lg p-4 border border-border ${getStatusBg()} transition-smooth`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon name={icon} size={18} color={getStatusColor()} />
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        <span className="text-xs caption text-muted-foreground">{status}</span>
      </div>
      <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-2">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: getStatusColor()
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg md:text-xl font-heading font-semibold" style={{ color: getStatusColor() }}>
          {value}{unit}
        </span>
        <span className="text-xs text-muted-foreground">
          {percentage?.toFixed(1)}% of {max}{unit}
        </span>
      </div>
    </div>
  );
};

export default ResourceGauge;