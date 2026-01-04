import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import GlobalControls from '../../components/layout/GlobalControls';
import Icon from '../../components/AppIcon';
import Select from '../../components/ui/Select';
import KPICard from './components/KPICard';
import UserGrowthVisualization from './components/UserGrowthVisualization';
import SecurityPosturePanel from './components/SecurityPosturePanel';
import ExecutiveSummaryTable from './components/ExecutiveSummaryTable';
import AutomatedInsights from './components/AutomatedInsights';

const ExecutiveOverview = () => {
  const navigate = useNavigate();
  const [reportingPeriod, setReportingPeriod] = useState('monthly');
  const [businessUnit, setBusinessUnit] = useState('all');
  const [presentationMode, setPresentationMode] = useState(false);

  const reportingPeriodOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const businessUnitOptions = [
    { value: 'all', label: 'All Business Units' },
    { value: 'enterprise', label: 'Enterprise Division' },
    { value: 'smb', label: 'SMB Division' },
    { value: 'consumer', label: 'Consumer Division' },
  ];

  const kpiData = [
    {
      title: 'Total Active Users',
      value: '167,234',
      unit: '',
      trend: 'up',
      trendValue: '+9.96%',
      icon: 'Users',
      iconColor: 'var(--color-primary)',
      description: 'vs previous period',
    },
    {
      title: 'Authentication Success Rate',
      value: '98.7',
      unit: '%',
      trend: 'up',
      trendValue: '+0.5%',
      icon: 'CheckCircle2',
      iconColor: 'var(--color-success)',
      description: 'vs previous period',
    },
    {
      title: 'Security Incidents',
      value: '3',
      unit: '',
      trend: 'down',
      trendValue: '-57.1%',
      icon: 'Shield',
      iconColor: 'var(--color-warning)',
      description: 'vs previous period',
    },
    {
      title: 'System Availability',
      value: '99.97',
      unit: '%',
      trend: 'up',
      trendValue: '+0.03%',
      icon: 'Activity',
      iconColor: 'var(--color-success)',
      description: 'vs previous period',
    },
    {
      title: 'User Growth Rate',
      value: '10.9',
      unit: '%',
      trend: 'up',
      trendValue: '+2.3%',
      icon: 'TrendingUp',
      iconColor: 'var(--color-primary)',
      description: 'month over month',
    },
    {
      title: 'Compliance Score',
      value: '94',
      unit: '%',
      trend: 'up',
      trendValue: '+3.0%',
      icon: 'FileCheck',
      iconColor: 'var(--color-success)',
      description: 'vs previous period',
    },
  ];

  const quickActions = [
    {
      label: 'Security Center',
      icon: 'Shield',
      path: '/security-command-center',
      description: 'Real-time threat monitoring',
    },
    {
      label: 'Performance Hub',
      icon: 'Activity',
      path: '/system-performance-hub',
      description: 'System health analytics',
    },
    {
      label: 'User Analytics',
      icon: 'Users',
      path: '/user-analytics-dashboard',
      description: 'Behavioral insights',
    },
  ];

  const togglePresentationMode = () => {
    setPresentationMode(!presentationMode);
    if (!presentationMode) {
      document.documentElement?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
              Executive Overview
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Strategic authentication and security insights for leadership
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            <Select
              options={reportingPeriodOptions}
              value={reportingPeriod}
              onChange={setReportingPeriod}
              placeholder="Select period"
              className="w-full sm:w-auto min-w-[160px]"
            />
            <Select
              options={businessUnitOptions}
              value={businessUnit}
              onChange={setBusinessUnit}
              placeholder="Select unit"
              className="w-full sm:w-auto min-w-[180px]"
            />
            <button
              onClick={togglePresentationMode}
              className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-smooth w-full sm:w-auto justify-center"
            >
              <Icon name={presentationMode ? 'Minimize2' : 'Maximize2'} size={16} />
              <span>{presentationMode ? 'Exit' : 'Present'}</span>
            </button>
          </div>
        </div>

        <GlobalControls className="mb-6 md:mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {kpiData?.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="lg:col-span-9">
            <UserGrowthVisualization />
          </div>

          <div className="lg:col-span-3">
            <SecurityPosturePanel />
          </div>
        </div>

        <div className="mb-6 md:mb-8">
          <ExecutiveSummaryTable />
        </div>

        <div className="mb-6 md:mb-8">
          <AutomatedInsights />
        </div>

        <div className="bg-card rounded-xl p-4 md:p-6 lg:p-8 border border-border shadow-teal">
          <h3 className="text-base md:text-lg lg:text-xl font-heading font-semibold text-foreground mb-4 md:mb-6">
            Quick Access to Detailed Dashboards
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {quickActions?.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action?.path)}
                className="flex flex-col items-center text-center p-6 md:p-8 bg-muted/30 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-smooth group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth">
                  <Icon name={action?.icon} size={28} color="var(--color-primary)" />
                </div>
                <h4 className="text-base md:text-lg font-heading font-semibold text-foreground mb-2">
                  {action?.label}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground">{action?.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-6 bg-card rounded-xl border border-border">
          <div className="flex items-center gap-3">
            <Icon name="Info" size={20} color="var(--color-primary)" />
            <p className="text-xs md:text-sm text-muted-foreground caption">
              Data refreshed daily at 2:00 AM UTC. Next update in 6 hours.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs md:text-sm font-medium hover:bg-primary/90 transition-smooth">
            <Icon name="Download" size={16} />
            <span>Download Executive Report</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default ExecutiveOverview;