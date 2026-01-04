import React from 'react';
import Icon from '../../../components/AppIcon';

const ThreatAlertFeed = ({ alerts, onAlertClick }) => {
  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          color: 'var(--color-error)',
          bgColor: 'bg-error/10',
          icon: 'AlertTriangle',
          label: 'Critical',
        };
      case 'high':
        return {
          color: 'var(--color-warning)',
          bgColor: 'bg-warning/10',
          icon: 'AlertCircle',
          label: 'High',
        };
      case 'medium':
        return {
          color: 'var(--color-accent)',
          bgColor: 'bg-accent/10',
          icon: 'Info',
          label: 'Medium',
        };
      case 'low':
        return {
          color: 'var(--color-muted-foreground)',
          bgColor: 'bg-muted',
          icon: 'CheckCircle',
          label: 'Low',
        };
      default:
        return {
          color: 'var(--color-muted-foreground)',
          bgColor: 'bg-muted',
          icon: 'Info',
          label: 'Info',
        };
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffMs = now - alertTime;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-teal-sm h-full flex flex-col">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Threat Alerts
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-muted-foreground caption">
              {alerts?.filter((a) => a?.severity === 'critical')?.length} Critical
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4">
        {alerts?.map((alert) => {
          const config = getSeverityConfig(alert?.severity);
          return (
            <div
              key={alert?.id}
              onClick={() => onAlertClick && onAlertClick(alert)}
              className={`p-3 md:p-4 rounded-lg border border-border ${config?.bgColor} cursor-pointer hover:shadow-teal-sm transition-smooth ${
                alert?.severity === 'critical' ? 'ring-2 ring-error/30' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${config?.color}20` }}
                >
                  <Icon name={config?.icon} size={18} color={config?.color} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm md:text-base font-medium text-foreground line-clamp-2">
                      {alert?.title}
                    </h4>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0"
                      style={{ backgroundColor: `${config?.color}20`, color: config?.color }}
                    >
                      {config?.label}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">
                    {alert?.description}
                  </p>

                  <div className="flex items-center gap-3 md:gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      <span>{formatTimestamp(alert?.timestamp)}</span>
                    </div>
                    {alert?.affectedAccounts && (
                      <div className="flex items-center gap-1">
                        <Icon name="Users" size={14} />
                        <span>{alert?.affectedAccounts} accounts</span>
                      </div>
                    )}
                    {alert?.location && (
                      <div className="flex items-center gap-1">
                        <Icon name="MapPin" size={14} />
                        <span className="truncate">{alert?.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThreatAlertFeed;