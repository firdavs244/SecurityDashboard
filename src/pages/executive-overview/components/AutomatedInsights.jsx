import React from 'react';
import Icon from '../../../components/AppIcon';

const AutomatedInsights = () => {
  const insights = [
    {
      id: 1,
      type: 'success',
      icon: 'TrendingUp',
      title: 'Strong User Growth Momentum',
      description: 'User base increased by 9.96% this period, exceeding quarterly target by 23%. Growth rate is accelerating with improved retention metrics.',
      priority: 'High',
      action: 'Review capacity planning',
    },
    {
      id: 2,
      type: 'warning',
      icon: 'AlertTriangle',
      title: 'Failed Login Attempts Increasing',
      description: 'Failed authentication attempts rose 14.5% compared to previous period. Recommend enhanced monitoring and potential security review.',
      priority: 'Medium',
      action: 'Schedule security audit',
    },
    {
      id: 3,
      type: 'info',
      icon: 'Shield',
      title: 'MFA Adoption Improving',
      description: 'Multi-factor authentication adoption reached 89.3%, up 4.2%. On track to meet 95% target by Q2 2026.',
      priority: 'Low',
      action: 'Continue awareness campaign',
    },
    {
      id: 4,
      type: 'success',
      icon: 'Zap',
      title: 'System Performance Optimized',
      description: 'Average response time decreased to 127ms (-10.6%), while maintaining 99.97% availability. Infrastructure scaling effective.',
      priority: 'Low',
      action: 'Document best practices',
    },
  ];

  const getTypeConfig = (type) => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-success/10',
          borderColor: 'border-success/30',
          iconColor: 'var(--color-success)',
        };
      case 'warning':
        return {
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/30',
          iconColor: 'var(--color-warning)',
        };
      case 'info':
        return {
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/30',
          iconColor: 'var(--color-primary)',
        };
      default:
        return {
          bgColor: 'bg-muted',
          borderColor: 'border-border',
          iconColor: 'var(--color-muted-foreground)',
        };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-error bg-error/10';
      case 'Medium':
        return 'text-warning bg-warning/10';
      case 'Low':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 lg:p-8 border border-border shadow-teal">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-base md:text-lg lg:text-xl font-heading font-semibold text-foreground">
          Automated Insights & Recommendations
        </h3>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
          <Icon name="Sparkles" size={16} color="var(--color-primary)" />
          <span className="text-xs md:text-sm font-medium text-primary">AI-Powered</span>
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        {insights?.map((insight) => {
          const config = getTypeConfig(insight?.type);
          return (
            <div
              key={insight?.id}
              className={`p-4 md:p-5 rounded-lg border ${config?.bgColor} ${config?.borderColor} transition-smooth hover:shadow-teal-sm`}
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-background/50 flex items-center justify-center flex-shrink-0">
                  <Icon name={insight?.icon} size={20} color={config?.iconColor} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm md:text-base font-heading font-semibold text-foreground">
                      {insight?.title}
                    </h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(insight?.priority)} whitespace-nowrap`}>
                      {insight?.priority} Priority
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-muted-foreground mb-3 leading-relaxed">
                    {insight?.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <Icon name="ArrowRight" size={14} color="var(--color-primary)" />
                    <span className="text-primary font-medium">{insight?.action}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs md:text-sm text-muted-foreground caption">
            Last updated: {new Date()?.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs md:text-sm font-medium hover:bg-primary/90 transition-smooth">
            <Icon name="Download" size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomatedInsights;