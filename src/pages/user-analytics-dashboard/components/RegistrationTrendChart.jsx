import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const RegistrationTrendChart = ({ data, chartType = 'line' }) => {
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
      <div className="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Icon name="TrendingUp" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Registration Trends
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm text-muted-foreground caption">Last 30 days</span>
        </div>
      </div>

      <div className="w-full h-64 md:h-80" aria-label="Registration Trends Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" opacity={0.3} />
              <XAxis
                dataKey="date"
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
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconType="circle"
              />
              <Line
                type="monotone"
                dataKey="registrations"
                name="Registrations"
                stroke="#2c7a7b"
                strokeWidth={2}
                dot={{ fill: '#2c7a7b', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="conversions"
                name="Conversions"
                stroke="#4c51bf"
                strokeWidth={2}
                dot={{ fill: '#4c51bf', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          ) : (
            <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2c7a7b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2c7a7b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4c51bf" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4c51bf" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" opacity={0.3} />
              <XAxis
                dataKey="date"
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
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconType="circle"
              />
              <Area
                type="monotone"
                dataKey="registrations"
                name="Registrations"
                stroke="#2c7a7b"
                strokeWidth={2}
                fill="url(#colorRegistrations)"
              />
              <Area
                type="monotone"
                dataKey="conversions"
                name="Conversions"
                stroke="#4c51bf"
                strokeWidth={2}
                fill="url(#colorConversions)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RegistrationTrendChart;