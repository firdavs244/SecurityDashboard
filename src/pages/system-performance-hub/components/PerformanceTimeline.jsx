import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceTimeline = ({ data, className = '' }) => {
  const [activeMetric, setActiveMetric] = useState('responseTime');
  const [viewMode, setViewMode] = useState('line');

  const metrics = [
    { id: 'responseTime', label: 'Response Time', color: '#2c7a7b', icon: 'Clock' },
    { id: 'errorRate', label: 'Error Rate', color: '#e53e3e', icon: 'AlertTriangle' },
    { id: 'throughput', label: 'Throughput', color: '#38a169', icon: 'Activity' },
    { id: 'capacity', label: 'Capacity', color: '#4c51bf', icon: 'Database' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-teal-md">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs caption">
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-semibold" style={{ color: entry?.color }}>
                {entry?.value?.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const ChartComponent = viewMode === 'line' ? LineChart : AreaChart;
  const DataComponent = viewMode === 'line' ? Line : Area;

  return (
    <div className={`bg-card rounded-xl border border-border p-4 md:p-6 ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          Performance Timeline
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'line' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('line')}
              iconName="TrendingUp"
            >
              Line
            </Button>
            <Button
              variant={viewMode === 'area' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('area')}
              iconName="BarChart3"
            >
              Area
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {metrics?.map((metric) => (
              <button
                key={metric?.id}
                onClick={() => setActiveMetric(metric?.id)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
                  transition-smooth border
                  ${activeMetric === metric?.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-teal'
                    : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                  }
                `}
              >
                <Icon name={metric?.icon} size={14} />
                <span className="hidden sm:inline">{metric?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            {metrics?.map((metric) => (
              <DataComponent
                key={metric?.id}
                type="monotone"
                dataKey={metric?.id}
                name={metric?.label}
                stroke={metric?.color}
                fill={viewMode === 'area' ? `${metric?.color}40` : undefined}
                strokeWidth={2}
                dot={false}
                animationDuration={300}
                hide={activeMetric !== 'all' && activeMetric !== metric?.id}
              />
            ))}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        {metrics?.map((metric) => {
          const latestValue = data?.[data?.length - 1]?.[metric?.id] || 0;
          return (
            <div key={metric?.id} className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Icon name={metric?.icon} size={14} color={metric?.color} />
                <span className="text-xs caption text-muted-foreground">{metric?.label}</span>
              </div>
              <p className="text-lg md:text-xl font-heading font-semibold" style={{ color: metric?.color }}>
                {latestValue?.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceTimeline;