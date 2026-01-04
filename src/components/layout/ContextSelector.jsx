import React from 'react';
import { useLocation } from 'react-router-dom';
import Select from '../ui/Select';
import Icon from '../AppIcon';

const ContextSelector = ({ value, onChange, className = '' }) => {
  const location = useLocation();

  const getContextOptions = () => {
    if (
      location?.pathname === '/security-command-center' ||
      location?.pathname === '/system-performance-hub'
    ) {
      return [
        { value: 'production', label: 'Production' },
        { value: 'staging', label: 'Staging' },
        { value: 'development', label: 'Development' },
        { value: 'all', label: 'All Environments' },
      ];
    }

    return [
      { value: 'all-users', label: 'All Users' },
      { value: 'enterprise', label: 'Enterprise' },
      { value: 'professional', label: 'Professional' },
      { value: 'free-tier', label: 'Free Tier' },
      { value: 'trial', label: 'Trial Users' },
    ];
  };

  const getIconName = () => {
    if (
      location?.pathname === '/security-command-center' ||
      location?.pathname === '/system-performance-hub'
    ) {
      return 'Server';
    }
    return 'Filter';
  };

  const getPlaceholder = () => {
    if (
      location?.pathname === '/security-command-center' ||
      location?.pathname === '/system-performance-hub'
    ) {
      return 'Select environment';
    }
    return 'Select segment';
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon name={getIconName()} size={18} color="var(--color-muted-foreground)" />
      <Select
        options={getContextOptions()}
        value={value}
        onChange={onChange}
        placeholder={getPlaceholder()}
        className="min-w-[160px]"
      />
    </div>
  );
};

export default ContextSelector;