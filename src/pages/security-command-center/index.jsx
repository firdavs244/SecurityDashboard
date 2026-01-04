import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import GlobalControls from '../../components/layout/GlobalControls';
import KPICard from './components/KPICard';
import ThreatAlertFeed from './components/ThreatAlertFeed';
import GeographicLoginMap from './components/GeographicLoginMap';
import AuthenticationHeatmap from './components/AuthenticationHeatmap';
import AutoRefreshToggle from './components/AutoRefreshToggle';
import Icon from '../../components/AppIcon';

const SecurityCommandCenter = () => {
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState('30');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Mock KPI data with sparklines
  const kpiData = [
    {
      title: 'Authentication Success Rate',
      value: '98.7%',
      change: '+2.3%',
      changeType: 'positive',
      icon: 'CheckCircle',
      status: 'success',
      sparklineData: [
        { value: 96.2 },
        { value: 96.8 },
        { value: 97.1 },
        { value: 97.5 },
        { value: 98.0 },
        { value: 98.3 },
        { value: 98.7 },
      ],
    },
    {
      title: 'Failed Login Attempts',
      value: '247',
      change: '-12.5%',
      changeType: 'positive',
      icon: 'XCircle',
      status: 'warning',
      sparklineData: [
        { value: 320 },
        { value: 298 },
        { value: 285 },
        { value: 270 },
        { value: 265 },
        { value: 255 },
        { value: 247 },
      ],
    },
    {
      title: 'Active Sessions',
      value: '12,458',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'Users',
      status: 'success',
      sparklineData: [
        { value: 11200 },
        { value: 11450 },
        { value: 11680 },
        { value: 11920 },
        { value: 12100 },
        { value: 12280 },
        { value: 12458 },
      ],
    },
    {
      title: 'MFA Adoption Rate',
      value: '87.3%',
      change: '+5.1%',
      changeType: 'positive',
      icon: 'Shield',
      status: 'success',
      sparklineData: [
        { value: 82.5 },
        { value: 83.2 },
        { value: 84.1 },
        { value: 85.0 },
        { value: 85.8 },
        { value: 86.5 },
        { value: 87.3 },
      ],
    },
    {
      title: 'Account Lockouts',
      value: '23',
      change: '+15.0%',
      changeType: 'negative',
      icon: 'Lock',
      status: 'error',
      sparklineData: [
        { value: 18 },
        { value: 19 },
        { value: 20 },
        { value: 21 },
        { value: 22 },
        { value: 22 },
        { value: 23 },
      ],
    },
    {
      title: 'Threat Score',
      value: '42/100',
      change: '-8.3%',
      changeType: 'positive',
      icon: 'AlertTriangle',
      status: 'warning',
      sparklineData: [
        { value: 52 },
        { value: 50 },
        { value: 48 },
        { value: 46 },
        { value: 45 },
        { value: 43 },
        { value: 42 },
      ],
    },
  ];

  // Mock threat alerts data
  const threatAlerts = [
    {
      id: 1,
      severity: 'critical',
      title: 'Multiple Failed Login Attempts Detected',
      description: 'Unusual pattern of failed login attempts from IP 192.168.1.45 targeting multiple user accounts within 5 minutes.',
      timestamp: new Date(Date.now() - 300000),
      affectedAccounts: 12,
      location: 'Moscow, Russia',
    },
    {
      id: 2,
      severity: 'high',
      title: 'Suspicious Geographic Login Pattern',
      description: 'User account accessed from two different continents within 30 minutes, indicating potential credential compromise.',
      timestamp: new Date(Date.now() - 900000),
      affectedAccounts: 1,
      location: 'Beijing, China',
    },
    {
      id: 3,
      severity: 'high',
      title: 'Brute Force Attack Detected',
      description: 'Automated login attempts detected from botnet targeting admin accounts with dictionary-based password guessing.',
      timestamp: new Date(Date.now() - 1800000),
      affectedAccounts: 5,
      location: 'Multiple Locations',
    },
    {
      id: 4,
      severity: 'medium',
      title: 'Unusual Login Time Pattern',
      description: 'Employee account accessed during non-business hours from unfamiliar device, deviating from normal behavior pattern.',
      timestamp: new Date(Date.now() - 3600000),
      affectedAccounts: 1,
      location: 'Lagos, Nigeria',
    },
    {
      id: 5,
      severity: 'medium',
      title: 'Password Reset Spike Detected',
      description: 'Abnormal increase in password reset requests from specific IP range, potentially indicating phishing campaign.',
      timestamp: new Date(Date.now() - 5400000),
      affectedAccounts: 8,
      location: 'São Paulo, Brazil',
    },
    {
      id: 6,
      severity: 'low',
      title: 'New Device Login Notification',
      description: 'User successfully authenticated from previously unseen device type, flagged for verification.',
      timestamp: new Date(Date.now() - 7200000),
      affectedAccounts: 1,
      location: 'London, UK',
    },
  ];

  // Mock geographic login data
  const geographicLoginData = [
    {
      city: 'New York',
      country: 'USA',
      latitude: 40.7128,
      longitude: -74.006,
      loginCount: 3245,
      successRate: 98.5,
      threatLevel: 'low',
      activeSessions: 892,
    },
    {
      city: 'London',
      country: 'UK',
      latitude: 51.5074,
      longitude: -0.1278,
      loginCount: 2156,
      successRate: 97.8,
      threatLevel: 'low',
      activeSessions: 645,
    },
    {
      city: 'Tokyo',
      country: 'Japan',
      latitude: 35.6762,
      longitude: 139.6503,
      loginCount: 1876,
      successRate: 99.1,
      threatLevel: 'low',
      activeSessions: 523,
    },
    {
      city: 'Moscow',
      country: 'Russia',
      latitude: 55.7558,
      longitude: 37.6173,
      loginCount: 456,
      successRate: 82.3,
      threatLevel: 'high',
      activeSessions: 89,
    },
    {
      city: 'Beijing',
      country: 'China',
      latitude: 39.9042,
      longitude: 116.4074,
      loginCount: 1234,
      successRate: 95.2,
      threatLevel: 'medium',
      activeSessions: 378,
    },
    {
      city: 'São Paulo',
      country: 'Brazil',
      latitude: -23.5505,
      longitude: -46.6333,
      loginCount: 987,
      successRate: 96.7,
      threatLevel: 'low',
      activeSessions: 289,
    },
    {
      city: 'Mumbai',
      country: 'India',
      latitude: 19.076,
      longitude: 72.8777,
      loginCount: 1543,
      successRate: 97.3,
      threatLevel: 'low',
      activeSessions: 456,
    },
    {
      city: 'Lagos',
      country: 'Nigeria',
      latitude: 6.5244,
      longitude: 3.3792,
      loginCount: 234,
      successRate: 89.5,
      threatLevel: 'medium',
      activeSessions: 67,
    },
  ];

  // Mock heatmap data
  const heatmapData = [];
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const baseValue = Math.random() * 50 + 20;
      const peakHours = hour >= 9 && hour <= 17;
      const weekday = day < 5;
      const value = peakHours && weekday ? baseValue + 30 : baseValue;
      const attempts = Math.floor(value * 50);

      heatmapData?.push({
        day,
        hour,
        value: Math.min(Math.round(value), 100),
        attempts,
      });
    }
  }

  const handleAlertClick = (alert) => {
    console.log('Alert clicked:', alert);
  };

  const handleRegionClick = (region) => {
    console.log('Region clicked:', region);
  };

  const handleExport = () => {
    console.log('Exporting security report...');
  };

  useEffect(() => {
    if (!autoRefreshEnabled) return;

    const interval = setInterval(() => {
      setLastRefresh(new Date());
      console.log('Auto-refreshing data...');
    }, parseInt(refreshInterval) * 1000);

    return () => clearInterval(interval);
  }, [autoRefreshEnabled, refreshInterval]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-foreground mb-2">
                Security Command Center
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Real-time authentication monitoring and threat detection
              </p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-teal transition-smooth"
            >
              <Icon name="Download" size={18} />
              <span className="text-sm font-medium">Export Report</span>
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <GlobalControls />
            <AutoRefreshToggle
              enabled={autoRefreshEnabled}
              interval={refreshInterval}
              onToggle={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
              onIntervalChange={setRefreshInterval}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {kpiData?.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="lg:col-span-2">
            <GeographicLoginMap loginData={geographicLoginData} onRegionClick={handleRegionClick} />
          </div>
          <div className="lg:col-span-1">
            <ThreatAlertFeed alerts={threatAlerts} onAlertClick={handleAlertClick} />
          </div>
        </div>

        <AuthenticationHeatmap data={heatmapData} />
      </main>
    </div>
  );
};

export default SecurityCommandCenter;