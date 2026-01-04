
import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import GlobalControls from '../../components/layout/GlobalControls';
import MetricCard from './components/MetricCard';
import SystemArchitecture3D from './components/SystemArchitecture3D';
import ResourceGauge from './components/ResourceGauge';
import PerformanceTimeline from './components/PerformanceTimeline';
import AlertPanel from './components/AlertPanel';
import ServerClusterSelector from './components/ServerClusterSelector';
import MetricGranularityToggle from './components/MetricGranularityToggle';

const SystemPerformanceHub = () => {
  const [selectedCluster, setSelectedCluster] = useState('prod-us-east-1');
  const [metricGranularity, setMetricGranularity] = useState('5min');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const clusters = [
    { id: 'prod-us-east-1', name: 'Production US East', serverCount: 24, region: 'US East' },
    { id: 'prod-us-west-2', name: 'Production US West', serverCount: 18, region: 'US West' },
    { id: 'prod-eu-central-1', name: 'Production EU Central', serverCount: 16, region: 'EU Central' },
    { id: 'staging-us-east-1', name: 'Staging US East', serverCount: 8, region: 'US East' }
  ];

  const primaryMetrics = [
    {
      title: 'API Response Time',
      value: '142',
      unit: 'ms',
      trend: -8.3,
      status: 'good',
      icon: 'Zap',
      threshold: { current: 142, max: 500 },
      trendData: [
        { time: '00:00', value: 165 },
        { time: '00:05', value: 158 },
        { time: '00:10', value: 152 },
        { time: '00:15', value: 148 },
        { time: '00:20', value: 142 }
      ]
    },
    {
      title: 'Database Query Performance',
      value: '89',
      unit: 'ms',
      trend: -12.5,
      status: 'excellent',
      icon: 'Database',
      threshold: { current: 89, max: 300 },
      trendData: [
        { time: '00:00', value: 102 },
        { time: '00:05', value: 98 },
        { time: '00:10', value: 94 },
        { time: '00:15', value: 91 },
        { time: '00:20', value: 89 }
      ]
    },
    {
      title: 'System Uptime',
      value: '99.97',
      unit: '%',
      trend: 0.02,
      status: 'excellent',
      icon: 'Activity',
      threshold: { current: 99.97, max: 100 },
      trendData: [
        { time: '00:00', value: 99.95 },
        { time: '00:05', value: 99.96 },
        { time: '00:10', value: 99.96 },
        { time: '00:15', value: 99.97 },
        { time: '00:20', value: 99.97 }
      ]
    },
    {
      title: 'Concurrent User Load',
      value: '8,432',
      unit: '',
      trend: 15.8,
      status: 'warning',
      icon: 'Users',
      threshold: { current: 8432, max: 10000 },
      trendData: [
        { time: '00:00', value: 7280 },
        { time: '00:05', value: 7650 },
        { time: '00:10', value: 8020 },
        { time: '00:15', value: 8250 },
        { time: '00:20', value: 8432 }
      ]
    }
  ];

  const serverNodes = [
    {
      id: 'node-1',
      name: 'Auth Server 01',
      status: 'healthy',
      cpu: 45,
      memory: 62,
      network: 38,
      region: 'US East'
    },
    {
      id: 'node-2',
      name: 'Auth Server 02',
      status: 'healthy',
      cpu: 52,
      memory: 58,
      network: 42,
      region: 'US East'
    },
    {
      id: 'node-3',
      name: 'Database Primary',
      status: 'healthy',
      cpu: 68,
      memory: 75,
      network: 55,
      region: 'US East'
    },
    {
      id: 'node-4',
      name: 'Database Replica',
      status: 'warning',
      cpu: 82,
      memory: 88,
      network: 62,
      region: 'US West'
    },
    {
      id: 'node-5',
      name: 'Load Balancer',
      status: 'healthy',
      cpu: 35,
      memory: 42,
      network: 78,
      region: 'US East'
    },
    {
      id: 'node-6',
      name: 'Cache Server',
      status: 'healthy',
      cpu: 28,
      memory: 65,
      network: 45,
      region: 'US East'
    }
  ];

  const resourceMetrics = [
    {
      title: 'CPU Usage',
      value: 58,
      max: 100,
      unit: '%',
      icon: 'Cpu',
      status: 'Normal'
    },
    {
      title: 'Memory Usage',
      value: 6.8,
      max: 16,
      unit: 'GB',
      icon: 'HardDrive',
      status: 'Normal'
    },
    {
      title: 'Network I/O',
      value: 245,
      max: 1000,
      unit: 'Mbps',
      icon: 'Network',
      status: 'Normal'
    },
    {
      title: 'Disk Usage',
      value: 428,
      max: 1000,
      unit: 'GB',
      icon: 'Database',
      status: 'Normal'
    }
  ];

  const performanceTimelineData = Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i)?.padStart(2, '0')}:00`,
    responseTime: 120 + Math.random() * 80,
    errorRate: Math.random() * 2,
    throughput: 800 + Math.random() * 400,
    capacity: 60 + Math.random() * 30
  }));

  const activeAlerts = [
    {
      id: 'alert-1',
      severity: 'warning',
      title: 'High Memory Usage on Database Replica',
      description: 'Memory utilization has exceeded 85% threshold on database replica server in US West region.',
      timestamp: new Date(Date.now() - 900000),
      recommendation: 'Consider scaling up the instance or optimizing query performance to reduce memory pressure.'
    },
    {
      id: 'alert-2',
      severity: 'info',
      title: 'Scheduled Maintenance Window',
      description: 'Planned maintenance for load balancer upgrade scheduled for January 5, 2026 at 02:00 UTC.',
      timestamp: new Date(Date.now() - 3600000),
      recommendation: 'Ensure backup systems are ready and notify users of potential brief service interruption.'
    },
    {
      id: 'alert-3',
      severity: 'critical',
      title: 'Elevated Error Rate Detected',
      description: 'API error rate has spiked to 3.2% in the last 15 minutes, exceeding the 2% threshold.',
      timestamp: new Date(Date.now() - 300000),
      recommendation: 'Investigate recent deployments and check application logs for recurring error patterns.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
              System Performance Hub
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Real-time infrastructure monitoring and performance analytics
            </p>
          </div>
          <GlobalControls />
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <ServerClusterSelector
            value={selectedCluster}
            onChange={setSelectedCluster}
            clusters={clusters}
          />
          <MetricGranularityToggle
            value={metricGranularity}
            onChange={setMetricGranularity}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {primaryMetrics?.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="lg:col-span-8">
            <SystemArchitecture3D serverNodes={serverNodes} />
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Resource Utilization
              </h3>
              <div className="space-y-4">
                {resourceMetrics?.map((resource, index) => (
                  <ResourceGauge key={index} {...resource} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <div className="lg:col-span-8">
            <PerformanceTimeline data={performanceTimelineData} />
          </div>

          <div className="lg:col-span-4">
            <AlertPanel alerts={activeAlerts} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SystemPerformanceHub;