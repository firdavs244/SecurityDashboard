import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutiveSummaryTable = () => {
  const summaryData = [
    {
      metric: 'Total Active Users',
      current: '167,234',
      previous: '152,089',
      variance: '+9.96%',
      trend: 'up',
      impact: 'Positive',
      impactColor: 'text-success',
    },
    {
      metric: 'Authentication Success Rate',
      current: '98.7%',
      previous: '98.2%',
      variance: '+0.5%',
      trend: 'up',
      impact: 'Positive',
      impactColor: 'text-success',
    },
    {
      metric: 'Security Incidents',
      current: '3',
      previous: '7',
      variance: '-57.1%',
      trend: 'down',
      impact: 'Positive',
      impactColor: 'text-success',
    },
    {
      metric: 'System Availability',
      current: '99.97%',
      previous: '99.94%',
      variance: '+0.03%',
      trend: 'up',
      impact: 'Positive',
      impactColor: 'text-success',
    },
    {
      metric: 'Average Response Time',
      current: '127ms',
      previous: '142ms',
      variance: '-10.6%',
      trend: 'down',
      impact: 'Positive',
      impactColor: 'text-success',
    },
    {
      metric: 'Failed Login Attempts',
      current: '1,247',
      previous: '1,089',
      variance: '+14.5%',
      trend: 'up',
      impact: 'Monitor',
      impactColor: 'text-warning',
    },
    {
      metric: 'MFA Adoption Rate',
      current: '89.3%',
      previous: '85.7%',
      variance: '+4.2%',
      trend: 'up',
      impact: 'Positive',
      impactColor: 'text-success',
    },
    {
      metric: 'Support Tickets',
      current: '234',
      previous: '289',
      variance: '-19.0%',
      trend: 'down',
      impact: 'Positive',
      impactColor: 'text-success',
    },
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getVarianceColor = (variance, impact) => {
    if (impact === 'Positive') return 'text-success';
    if (impact === 'Monitor') return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 lg:p-8 border border-border shadow-teal">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6">
        <h3 className="text-base md:text-lg lg:text-xl font-heading font-semibold text-foreground">
          Executive Summary - Key Metrics Comparison
        </h3>
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground caption">
          <Icon name="Calendar" size={16} />
          <span>Current vs Previous Period</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-muted-foreground caption">
                Metric
              </th>
              <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-muted-foreground caption">
                Current
              </th>
              <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-muted-foreground caption">
                Previous
              </th>
              <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-muted-foreground caption">
                Variance
              </th>
              <th className="text-center py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-muted-foreground caption">
                Impact
              </th>
            </tr>
          </thead>
          <tbody>
            {summaryData?.map((row, index) => (
              <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/30 transition-smooth">
                <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-foreground font-medium">
                  {row?.metric}
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-right text-sm md:text-base font-heading font-semibold text-foreground whitespace-nowrap">
                  {row?.current}
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-right text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                  {row?.previous}
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-right">
                  <div className={`flex items-center justify-end gap-1 ${getVarianceColor(row?.variance, row?.impact)}`}>
                    <Icon name={getTrendIcon(row?.trend)} size={14} />
                    <span className="text-xs md:text-sm font-medium whitespace-nowrap">{row?.variance}</span>
                  </div>
                </td>
                <td className="py-3 md:py-4 px-2 md:px-4 text-center">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${row?.impactColor} bg-current/10`}>
                    {row?.impact}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExecutiveSummaryTable;