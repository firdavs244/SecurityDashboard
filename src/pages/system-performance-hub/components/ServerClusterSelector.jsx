import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ServerClusterSelector = ({ value, onChange, clusters, className = '' }) => {
  const clusterOptions = clusters?.map(cluster => ({
    value: cluster?.id,
    label: cluster?.name,
    description: `${cluster?.serverCount} servers • ${cluster?.region}`
  }));

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon name="Server" size={18} color="var(--color-muted-foreground)" />
      <Select
        options={clusterOptions}
        value={value}
        onChange={onChange}
        placeholder="Select cluster"
        className="min-w-[200px]"
      />
    </div>
  );
};

export default ServerClusterSelector;