import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityPosturePanel = () => {
  const riskScore = 87;
  const complianceScore = 94;

  const securityMetrics = [
    {
      label: 'Critical Incidents',
      value: '0',
      status: 'success',
      icon: 'ShieldCheck',
    },
    {
      label: 'High Priority Alerts',
      value: '3',
      status: 'warning',
      icon: 'AlertTriangle',
    },
    {
      label: 'Failed Auth Attempts',
      value: '127',
      status: 'info',
      icon: 'Lock',
    },
    {
      label: 'MFA Adoption',
      value: '89%',
      status: 'success',
      icon: 'Smartphone',
    },
  ];

  const complianceStatus = [
    { standard: 'SOC 2 Type II', status: 'Compliant', icon: 'CheckCircle2', color: 'text-success' },
    { standard: 'ISO 27001', status: 'Compliant', icon: 'CheckCircle2', color: 'text-success' },
    { standard: 'GDPR', status: 'Compliant', icon: 'CheckCircle2', color: 'text-success' },
    { standard: 'HIPAA', status: 'Review Pending', icon: 'Clock', color: 'text-warning' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-success/10 text-success';
      case 'warning':
        return 'bg-warning/10 text-warning';
      case 'info':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-teal">
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4 md:mb-6">
          Security Posture
        </h3>

        <div className="space-y-4 md:space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs md:text-sm text-muted-foreground caption">Risk Score</span>
              <span className="text-lg md:text-xl font-heading font-semibold text-success">
                {riskScore}/100
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-success transition-smooth"
                style={{ width: `${riskScore}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Excellent security posture</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs md:text-sm text-muted-foreground caption">
                Compliance Score
              </span>
              <span className="text-lg md:text-xl font-heading font-semibold text-success">
                {complianceScore}%
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-success transition-smooth"
                style={{ width: `${complianceScore}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Above industry average</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:gap-4 mt-4 md:mt-6">
          {securityMetrics?.map((metric, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${getStatusColor(metric?.status)}`}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <Icon name={metric?.icon} size={18} />
                <span className="text-xs md:text-sm font-medium">{metric?.label}</span>
              </div>
              <span className="text-sm md:text-base font-heading font-semibold">
                {metric?.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-teal">
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4">
          Compliance Status
        </h3>

        <div className="space-y-3">
          {complianceStatus?.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-2 md:gap-3">
                <Icon name={item?.icon} size={16} color={item?.color?.replace('text-', 'var(--color-')} />
                <span className="text-xs md:text-sm text-foreground">{item?.standard}</span>
              </div>
              <span className={`text-xs md:text-sm font-medium ${item?.color}`}>
                {item?.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityPosturePanel;