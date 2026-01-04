import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ConnectionStatus = ({ className = '' }) => {
  const location = useLocation();
  const [status, setStatus] = useState('connected');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const shouldShowStatus =
    location?.pathname === '/security-command-center' ||
    location?.pathname === '/system-performance-hub';

  useEffect(() => {
    if (!shouldShowStatus) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, [shouldShowStatus]);

  if (!shouldShowStatus) return null;

  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: 'Wifi',
          color: 'var(--color-success)',
          bgColor: 'bg-success/10',
          text: 'Connected',
          pulse: true,
        };
      case 'reconnecting':
        return {
          icon: 'RefreshCw',
          color: 'var(--color-warning)',
          bgColor: 'bg-warning/10',
          text: 'Reconnecting',
          pulse: false,
        };
      case 'disconnected':
        return {
          icon: 'WifiOff',
          color: 'var(--color-error)',
          bgColor: 'bg-error/10',
          text: 'Disconnected',
          pulse: false,
        };
      default:
        return {
          icon: 'Wifi',
          color: 'var(--color-muted-foreground)',
          bgColor: 'bg-muted',
          text: 'Unknown',
          pulse: false,
        };
    }
  };

  const config = getStatusConfig();

  const formatLastUpdate = () => {
    const seconds = Math.floor((new Date() - lastUpdate) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg ${config?.bgColor}`}>
        {config?.pulse && (
          <span className="absolute inset-0 rounded-lg animate-pulse opacity-50" style={{ backgroundColor: config?.color }} />
        )}
        <Icon name={config?.icon} size={16} color={config?.color} className="relative z-10" />
        <span className="text-xs font-medium relative z-10" style={{ color: config?.color }}>
          {config?.text}
        </span>
      </div>
      <span className="text-xs text-muted-foreground caption hidden sm:inline">
        Updated {formatLastUpdate()}
      </span>
    </div>
  );
};

export default ConnectionStatus;