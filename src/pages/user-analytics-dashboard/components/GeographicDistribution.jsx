import React from 'react';
import Icon from '../../../components/AppIcon';

const GeographicDistribution = ({ data }) => {
  const maxUsers = Math.max(...data?.map((item) => item?.users));

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-teal-sm">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Icon name="Globe" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
          Geographic Distribution
        </h3>
      </div>
      <div className="space-y-3 md:space-y-4">
        {data?.map((location, index) => {
          const percentage = (location?.users / maxUsers) * 100;
          const growthColor = location?.growth >= 0 ? 'text-success' : 'text-error';
          const growthIcon = location?.growth >= 0 ? 'TrendingUp' : 'TrendingDown';

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xl md:text-2xl">{location?.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm md:text-base font-medium text-foreground truncate">
                      {location?.country}
                    </p>
                    <p className="text-xs text-muted-foreground caption">
                      {location?.users?.toLocaleString()} users
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className={`flex items-center gap-1 ${growthColor}`}>
                    <Icon name={growthIcon} size={14} className="md:w-4 md:h-4" />
                    <span className="text-xs md:text-sm font-medium">
                      {Math.abs(location?.growth)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-smooth"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground caption">Total Countries</span>
          <span className="font-semibold text-foreground">{data?.length}</span>
        </div>
      </div>
    </div>
  );
};

export default GeographicDistribution;