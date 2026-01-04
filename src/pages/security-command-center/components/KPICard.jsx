import React from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const KPICard = ({ title, value, change, changeType, icon, sparklineData, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'var(--color-success)';
      case 'warning':
        return 'var(--color-warning)';
      case 'error':
        return 'var(--color-error)';
      default:
        return 'var(--color-primary)';
    }
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-teal-sm hover:shadow-teal transition-smooth">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1">
          <p className="text-xs md:text-sm text-muted-foreground caption mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">
            {value}
          </h3>
        </div>
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${getStatusColor()}20` }}
        >
          <Icon name={icon} size={20} color={getStatusColor()} />
        </div>
      </div>
      {sparklineData && sparklineData?.length > 0 && (
        <div className="h-12 md:h-16 mb-2 md:mb-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={getStatusColor()}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      {change && (
        <div className="flex items-center gap-2">
          <Icon
            name={changeType === 'positive' ? 'TrendingUp' : changeType === 'negative' ? 'TrendingDown' : 'Minus'}
            size={16}
            className={getChangeColor()}
          />
          <span className={`text-xs md:text-sm font-medium ${getChangeColor()}`}>{change}</span>
          <span className="text-xs text-muted-foreground">vs last period</span>
        </div>
      )}
    </div>
  );
};

export default KPICard;