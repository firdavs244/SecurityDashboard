import React from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const MetricCard = ({ title, value, unit, trend, trendData, status, icon, threshold }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'excellent':
        return 'var(--color-success)';
      case 'good':
        return 'var(--color-primary)';
      case 'warning':
        return 'var(--color-warning)';
      case 'critical':
        return 'var(--color-error)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case 'excellent':
        return 'bg-success/10';
      case 'good':
        return 'bg-primary/10';
      case 'warning':
        return 'bg-warning/10';
      case 'critical':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  const getTrendIcon = () => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (status === 'critical' || status === 'warning') {
      return trend > 0 ? 'var(--color-error)' : 'var(--color-success)';
    }
    return trend > 0 ? 'var(--color-success)' : 'var(--color-error)';
  };

  return (
    <div className={`rounded-xl p-4 md:p-6 border border-border shadow-teal transition-smooth hover:shadow-teal-md ${getStatusBg()}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-card flex items-center justify-center">
            <Icon name={icon} size={20} color={getStatusColor()} />
          </div>
          <div>
            <p className="text-xs md:text-sm text-muted-foreground caption">{title}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold" style={{ color: getStatusColor() }}>
                {value}
              </span>
              <span className="text-sm md:text-base text-muted-foreground">{unit}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Icon name={getTrendIcon()} size={16} color={getTrendColor()} />
          <span className="text-xs md:text-sm font-medium" style={{ color: getTrendColor() }}>
            {Math.abs(trend)}%
          </span>
        </div>
      </div>
      <div className="h-12 md:h-16 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={getStatusColor()}
              strokeWidth={2}
              dot={false}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {threshold && (
        <div className="flex items-center justify-between text-xs caption">
          <span className="text-muted-foreground">Threshold</span>
          <span className="font-medium" style={{ color: getStatusColor() }}>
            {threshold?.current} / {threshold?.max} {unit}
          </span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;