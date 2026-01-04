import React, { useState } from 'react';
import Select from '../ui/Select';
import Icon from '../AppIcon';

const TimeRangeSelector = ({ value, onChange, className = '' }) => {
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const timeRangeOptions = [
    { value: 'last-15-min', label: 'Last 15 minutes' },
    { value: 'last-30-min', label: 'Last 30 minutes' },
    { value: 'last-1-hour', label: 'Last hour' },
    { value: 'last-4-hours', label: 'Last 4 hours' },
    { value: 'last-24-hours', label: 'Last 24 hours' },
    { value: 'last-7-days', label: 'Last 7 days' },
    { value: 'last-30-days', label: 'Last 30 days' },
    { value: 'last-90-days', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' },
  ];

  const handleChange = (newValue) => {
    if (newValue === 'custom') {
      setIsCustomOpen(true);
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon name="Clock" size={18} color="var(--color-muted-foreground)" />
      <Select
        options={timeRangeOptions}
        value={value}
        onChange={handleChange}
        placeholder="Select time range"
        className="min-w-[180px]"
      />
    </div>
  );
};

export default TimeRangeSelector;