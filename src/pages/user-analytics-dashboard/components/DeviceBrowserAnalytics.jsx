import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const DeviceBrowserAnalytics = ({ deviceData, browserData }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-teal">
          <p className="text-xs text-muted-foreground caption mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <span className="text-xs text-foreground">{entry?.name}:</span>
              <span className="text-sm font-semibold text-foreground">
                {entry?.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-teal-sm">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Icon name="Smartphone" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
          Device &amp; Browser Analytics
        </h3>
      </div>

      <div className="space-y-6 md:space-y-8">
        <div>
          <h4 className="text-sm md:text-base font-medium text-foreground mb-3 md:mb-4">Device Distribution</h4>
          <div className="w-full h-48 md:h-56" aria-label="Device Distribution Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviceData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" opacity={0.3} />
                <XAxis
                  dataKey="device"
                  stroke="#a0aec0"
                  style={{ fontSize: '12px' }}
                  tick={{ fill: '#a0aec0' }}
                />
                <YAxis
                  stroke="#a0aec0"
                  style={{ fontSize: '12px' }}
                  tick={{ fill: '#a0aec0' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="users" name="Users" fill="#2c7a7b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="text-sm md:text-base font-medium text-foreground mb-3 md:mb-4">Browser Distribution</h4>
          <div className="w-full h-48 md:h-56" aria-label="Browser Distribution Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={browserData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" opacity={0.3} />
                <XAxis
                  dataKey="browser"
                  stroke="#a0aec0"
                  style={{ fontSize: '12px' }}
                  tick={{ fill: '#a0aec0' }}
                />
                <YAxis
                  stroke="#a0aec0"
                  style={{ fontSize: '12px' }}
                  tick={{ fill: '#a0aec0' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="users" name="Users" fill="#4c51bf" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceBrowserAnalytics;