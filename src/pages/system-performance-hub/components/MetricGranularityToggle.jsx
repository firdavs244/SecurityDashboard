import React from 'react';
import Button from '../../../components/ui/Button';

const MetricGranularityToggle = ({ value, onChange, className = '' }) => {
  const options = [
    { value: '1min', label: '1 Min' },
    { value: '5min', label: '5 Min' },
    { value: '1hour', label: '1 Hour' }
  ];

  return (
    <div className={`flex items-center gap-1 bg-muted rounded-lg p-1 ${className}`}>
      {options?.map((option) => (
        <Button
          key={option?.value}
          variant={value === option?.value ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onChange(option?.value)}
        >
          {option?.label}
        </Button>
      ))}
    </div>
  );
};

export default MetricGranularityToggle;