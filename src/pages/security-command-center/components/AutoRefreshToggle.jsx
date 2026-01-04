import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const AutoRefreshToggle = ({ enabled, interval, onToggle, onIntervalChange, className = '' }) => {
  const intervalOptions = [
    { value: '30', label: '30 seconds' },
    { value: '60', label: '1 minute' },
    { value: '300', label: '5 minutes' },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-smooth ${
          enabled
            ? 'bg-primary text-primary-foreground shadow-teal'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        }`}
      >
        <Icon name={enabled ? 'RefreshCw' : 'Pause'} size={16} className={enabled ? 'animate-spin' : ''} />
        <span className="text-sm font-medium hidden sm:inline">
          {enabled ? 'Auto-refresh' : 'Paused'}
        </span>
      </button>

      {enabled && (
        <Select
          options={intervalOptions}
          value={interval}
          onChange={onIntervalChange}
          className="min-w-[140px]"
        />
      )}
    </div>
  );
};

export default AutoRefreshToggle;