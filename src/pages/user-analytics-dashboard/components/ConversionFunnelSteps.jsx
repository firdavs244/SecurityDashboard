import React from 'react';
import Icon from '../../../components/AppIcon';

const ConversionFunnelSteps = ({ steps }) => {
  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-teal-sm">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Icon name="GitBranch" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
          Registration Funnel Steps
        </h3>
      </div>
      <div className="space-y-3 md:space-y-4">
        {steps?.map((step, index) => {
          const isAbandonment = step?.abandonmentRate > 20;
          const conversionColor =
            step?.conversionRate >= 80
              ? 'text-success'
              : step?.conversionRate >= 60
              ? 'text-warning' :'text-error';

          return (
            <div
              key={index}
              className={`p-3 md:p-4 rounded-lg border transition-smooth ${
                isAbandonment
                  ? 'bg-warning/10 border-warning/30' :'bg-muted/30 border-border'
              }`}
            >
              <div className="flex items-start justify-between mb-2 md:mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm md:text-base font-semibold text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-base font-medium text-foreground truncate">
                      {step?.step}
                    </h4>
                    <p className="text-xs text-muted-foreground caption mt-0.5">
                      {step?.users?.toLocaleString()} users
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                  <div className="text-right">
                    <p className={`text-base md:text-lg font-semibold ${conversionColor}`}>
                      {step?.conversionRate}%
                    </p>
                    <p className="text-xs text-muted-foreground caption">conversion</p>
                  </div>
                  {isAbandonment && (
                    <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="md:w-6 md:h-6" />
                  )}
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-smooth"
                  style={{
                    width: `${step?.conversionRate}%`,
                    backgroundColor:
                      step?.conversionRate >= 80
                        ? 'var(--color-success)'
                        : step?.conversionRate >= 60
                        ? 'var(--color-warning)'
                        : 'var(--color-error)',
                  }}
                />
              </div>
              {isAbandonment && (
                <div className="mt-2 md:mt-3 flex items-start gap-2">
                  <Icon name="Info" size={14} color="var(--color-warning)" className="mt-0.5 flex-shrink-0 md:w-4 md:h-4" />
                  <p className="text-xs text-warning">
                    High abandonment rate: {step?.abandonmentRate}% of users drop off at this step
                  </p>
                </div>
              )}
              {step?.avgTimeSpent && (
                <div className="mt-2 md:mt-3 flex items-center gap-2">
                  <Icon name="Clock" size={14} color="var(--color-muted-foreground)" className="md:w-4 md:h-4" />
                  <p className="text-xs text-muted-foreground caption">
                    Avg. time: {step?.avgTimeSpent}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversionFunnelSteps;