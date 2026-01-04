import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import GlobalControls from '../../components/layout/GlobalControls';
import KPICard from './components/KPICard';
import FunnelVisualization from './components/FunnelVisualization';
import DemographicBreakdown from './components/DemographicBreakdown';
import RegistrationTrendChart from './components/RegistrationTrendChart';
import DeviceBrowserAnalytics from './components/DeviceBrowserAnalytics';
import ConversionFunnelSteps from './components/ConversionFunnelSteps';
import GeographicDistribution from './components/GeographicDistribution';
import AcquisitionChannels from './components/AcquisitionChannels';

const UserAnalyticsDashboard = () => {
  const [selectedFunnelStage, setSelectedFunnelStage] = useState(null);

  const kpiData = [
    {
      title: 'Total Registrations',
      value: '24,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'UserPlus',
      iconColor: 'var(--color-primary)',
      trend: 'vs last period',
    },
    {
      title: 'Conversion Rate',
      value: '68.3%',
      change: '+5.2%',
      changeType: 'positive',
      icon: 'TrendingUp',
      iconColor: 'var(--color-success)',
      trend: 'vs last period',
    },
    {
      title: 'Avg Session Duration',
      value: '8m 42s',
      change: '-2.1%',
      changeType: 'negative',
      icon: 'Clock',
      iconColor: 'var(--color-secondary)',
      trend: 'vs last period',
    },
    {
      title: 'User Retention',
      value: '82.7%',
      change: '+8.9%',
      changeType: 'positive',
      icon: 'Users',
      iconColor: 'var(--color-accent)',
      trend: '30-day retention',
    },
  ];

  const funnelData = [
    { stage: 'Landing Page Visit', users: 45820, conversionRate: 100 },
    { stage: 'Registration Started', users: 38947, conversionRate: 85 },
    { stage: 'Email Verified', users: 32105, conversionRate: 82 },
    { stage: 'Profile Completed', users: 27289, conversionRate: 85 },
    { stage: 'First Login Success', users: 24847, conversionRate: 91 },
  ];

  const ageData = [
    { label: '18-24', value: 6214, percentage: 25 },
    { label: '25-34', value: 8687, percentage: 35 },
    { label: '35-44', value: 6214, percentage: 25 },
    { label: '45-54', value: 2486, percentage: 10 },
    { label: '55+', value: 1246, percentage: 5 },
  ];

  const genderData = [
    { label: 'Male', value: 13662, percentage: 55 },
    { label: 'Female', value: 9939, percentage: 40 },
    { label: 'Other', value: 1246, percentage: 5 },
  ];

  const registrationTrendData = [
    { date: 'Jan 1', registrations: 720, conversions: 489 },
    { date: 'Jan 5', registrations: 845, conversions: 577 },
    { date: 'Jan 10', registrations: 923, conversions: 630 },
    { date: 'Jan 15', registrations: 1056, conversions: 721 },
    { date: 'Jan 20', registrations: 987, conversions: 674 },
    { date: 'Jan 25', registrations: 1134, conversions: 774 },
    { date: 'Jan 30', registrations: 1289, conversions: 880 },
  ];

  const deviceData = [
    { device: 'Desktop', users: 12424 },
    { device: 'Mobile', users: 9939 },
    { device: 'Tablet', users: 2484 },
  ];

  const browserData = [
    { browser: 'Chrome', users: 14908 },
    { browser: 'Safari', users: 6214 },
    { browser: 'Firefox', users: 2486 },
    { browser: 'Edge', users: 1239 },
  ];

  const funnelSteps = [
    {
      step: 'Email Entry',
      users: 45820,
      conversionRate: 85,
      abandonmentRate: 15,
      avgTimeSpent: '12s',
    },
    {
      step: 'Password Creation',
      users: 38947,
      conversionRate: 82,
      abandonmentRate: 18,
      avgTimeSpent: '28s',
    },
    {
      step: 'Email Verification',
      users: 32105,
      conversionRate: 85,
      abandonmentRate: 15,
      avgTimeSpent: '2m 15s',
    },
    {
      step: 'Profile Setup',
      users: 27289,
      conversionRate: 91,
      abandonmentRate: 9,
      avgTimeSpent: '3m 42s',
    },
    {
      step: 'First Login',
      users: 24847,
      conversionRate: 100,
      abandonmentRate: 0,
      avgTimeSpent: '45s',
    },
  ];

  const geographicData = [
    { country: 'United States', flag: '🇺🇸', users: 8687, growth: 12.5 },
    { country: 'United Kingdom', flag: '🇬🇧', users: 4969, growth: 8.3 },
    { country: 'Canada', flag: '🇨🇦', users: 3723, growth: 15.7 },
    { country: 'Germany', flag: '🇩🇪', users: 2984, growth: 6.2 },
    { country: 'Australia', flag: '🇦🇺', users: 2486, growth: -3.1 },
    { country: 'France', flag: '🇫🇷', users: 1998, growth: 9.8 },
  ];

  const acquisitionData = [
    { channel: 'Organic Search', users: 9939, percentage: 40 },
    { channel: 'Direct', users: 6214, percentage: 25 },
    { channel: 'Social Media', users: 4969, percentage: 20 },
    { channel: 'Referral', users: 2486, percentage: 10 },
    { channel: 'Email', users: 1239, percentage: 5 },
  ];

  const handleFunnelStageClick = (stage) => {
    setSelectedFunnelStage(stage);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4 md:mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                User Analytics Dashboard
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Track registration trends, onboarding effectiveness, and user behavior patterns
              </p>
            </div>
          </div>

          <GlobalControls />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {kpiData?.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="lg:col-span-8">
            <FunnelVisualization data={funnelData} onStageClick={handleFunnelStageClick} />
          </div>

          <div className="lg:col-span-4 space-y-4 md:space-y-6">
            <DemographicBreakdown data={ageData} title="Age Distribution" icon="Users" />
            <DemographicBreakdown data={genderData} title="Gender Distribution" icon="User" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <RegistrationTrendChart data={registrationTrendData} chartType="area" />
          <DeviceBrowserAnalytics deviceData={deviceData} browserData={browserData} />
        </div>

        <div className="mb-6 md:mb-8">
          <ConversionFunnelSteps steps={funnelSteps} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <GeographicDistribution data={geographicData} />
          <AcquisitionChannels data={acquisitionData} />
        </div>
      </main>
    </div>
  );
};

export default UserAnalyticsDashboard;