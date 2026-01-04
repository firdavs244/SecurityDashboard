import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, iconColor, trend }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-teal-sm hover:shadow-teal transition-smooth">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1">
          <p className="text-xs md:text-sm text-muted-foreground caption mb-1 md:mb-2">{title}</p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">
            {value}
          </h3>
        </div>
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${iconColor}20` }}
        >
          <Icon name={icon} size={20} color={iconColor} className="md:w-6 md:h-6" />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className={`flex items-center gap-1 ${getChangeColor()}`}>
          <Icon name={getChangeIcon()} size={14} className="md:w-4 md:h-4" />
          <span className="text-xs md:text-sm font-medium">{change}</span>
        </div>
        <span className="text-xs md:text-sm text-muted-foreground caption">{trend}</span>
      </div>
    </div>
  );
};

export default KPICard;