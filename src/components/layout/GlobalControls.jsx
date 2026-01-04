import React, { useState } from 'react';
import TimeRangeSelector from './TimeRangeSelector';
import ContextSelector from './ContextSelector';
import ConnectionStatus from './ConnectionStatus';

const GlobalControls = ({ className = '' }) => {
  const [timeRange, setTimeRange] = useState('last-24-hours');
  const [context, setContext] = useState('production');

  return (
    <div className={`flex items-center gap-4 flex-wrap ${className}`}>
      <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
      <ContextSelector value={context} onChange={setContext} />
      <ConnectionStatus />
    </div>
  );
};

export default GlobalControls;