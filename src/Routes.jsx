import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import SystemPerformanceHub from './pages/system-performance-hub';
import UserAnalyticsDashboard from './pages/user-analytics-dashboard';
import SecurityCommandCenter from './pages/security-command-center';
import ExecutiveOverview from './pages/executive-overview';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<SecurityCommandCenter />} />
        <Route path="/system-performance-hub" element={<SystemPerformanceHub />} />
        <Route path="/user-analytics-dashboard" element={<UserAnalyticsDashboard />} />
        <Route path="/security-command-center" element={<SecurityCommandCenter />} />
        <Route path="/executive-overview" element={<ExecutiveOverview />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
