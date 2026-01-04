import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const AcquisitionChannels = ({ data }) => {
  const COLORS = ['#2c7a7b', '#4c51bf', '#c9a961', '#38a169', '#d69e2e', '#e53e3e'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-teal">
          <p className="text-xs text-muted-foreground caption mb-1">{payload?.[0]?.name}</p>
          <p className="text-sm font-semibold text-foreground">
            {payload?.[0]?.value?.toLocaleString()} users
          </p>
          <p className="text-xs text-muted-foreground caption mt-1">
            {payload?.[0]?.payload?.percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-teal-sm">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Icon name="Target" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
          Acquisition Channels
        </h3>
      </div>
      <div className="w-full h-64 md:h-80" aria-label="Acquisition Channels Pie Chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={50}
              fill="#8884d8"
              dataKey="users"
              nameKey="channel"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
        {data?.map((channel, index) => (
          <div key={index} className="flex items-center justify-between p-2 md:p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
              />
              <span className="text-xs md:text-sm text-foreground truncate">{channel?.channel}</span>
            </div>
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              <span className="text-xs md:text-sm font-medium text-foreground">
                {channel?.users?.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground caption">
                {channel?.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcquisitionChannels;