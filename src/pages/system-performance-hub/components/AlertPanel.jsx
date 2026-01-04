import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertPanel = ({ alerts, className = '' }) => {
  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          icon: 'AlertCircle',
          color: 'var(--color-error)',
          bg: 'bg-error/10',
          border: 'border-error/30'
        };
      case 'warning':
        return {
          icon: 'AlertTriangle',
          color: 'var(--color-warning)',
          bg: 'bg-warning/10',
          border: 'border-warning/30'
        };
      case 'info':
        return {
          icon: 'Info',
          color: 'var(--color-primary)',
          bg: 'bg-primary/10',
          border: 'border-primary/30'
        };
      default:
        return {
          icon: 'Bell',
          color: 'var(--color-muted-foreground)',
          bg: 'bg-muted',
          border: 'border-border'
        };
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className={`bg-card rounded-xl border border-border p-4 md:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          Active Alerts
        </h3>
        <Button variant="outline" size="sm" iconName="Settings">
          Configure
        </Button>
      </div>
      <div className="space-y-3">
        {alerts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} color="var(--color-success)" className="mx-auto mb-3" />
            <p className="text-muted-foreground">No active alerts</p>
            <p className="text-sm caption text-muted-foreground mt-1">All systems operating normally</p>
          </div>
        ) : (
          alerts?.map((alert) => {
            const config = getSeverityConfig(alert?.severity);
            return (
              <div
                key={alert?.id}
                className={`rounded-lg border p-4 transition-smooth hover:shadow-teal ${config?.bg} ${config?.border}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Icon name={config?.icon} size={20} color={config?.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-foreground">{alert?.title}</h4>
                      <span className="text-xs caption text-muted-foreground whitespace-nowrap">
                        {formatTimestamp(alert?.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{alert?.description}</p>
                    
                    {alert?.recommendation && (
                      <div className="bg-card/50 rounded-lg p-3 mb-3">
                        <div className="flex items-start gap-2">
                          <Icon name="Lightbulb" size={16} color="var(--color-accent)" />
                          <div className="flex-1">
                            <p className="text-xs font-medium text-foreground mb-1">Recommendation</p>
                            <p className="text-xs caption text-muted-foreground">{alert?.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="outline" size="xs" iconName="Eye">
                        View Details
                      </Button>
                      <Button variant="ghost" size="xs" iconName="X">
                        Dismiss
                      </Button>
                      {alert?.severity === 'critical' && (
                        <Button variant="destructive" size="xs" iconName="AlertCircle">
                          Escalate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AlertPanel;