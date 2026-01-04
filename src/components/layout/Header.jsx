import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Security Center',
      path: '/security-command-center',
      icon: 'Shield',
      tooltip: 'Real-time authentication monitoring and threat detection',
    },
    {
      label: 'Performance',
      path: '/system-performance-hub',
      icon: 'Activity',
      tooltip: 'System health monitoring and infrastructure analytics',
    },
    {
      label: 'User Analytics',
      path: '/user-analytics-dashboard',
      icon: 'Users',
      tooltip: 'Registration trends and behavioral insights',
    },
    {
      label: 'Executive',
      path: '/executive-overview',
      icon: 'TrendingUp',
      tooltip: 'Strategic overview and compliance reporting',
    },
  ];

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-navigation bg-card shadow-teal-md border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-8">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/security-command-center')}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Icon name="Shield" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-heading font-semibold text-foreground">
                Enterprise Auth Analytics
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg
                    transition-smooth font-medium text-sm
                    ${
                      isActive(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-teal'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                  title={item?.tooltip}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border">
            <nav className="flex flex-col p-4 gap-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-smooth font-medium text-left
                    ${
                      isActive(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-teal'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={20} />
                  <div className="flex-1">
                    <div className="font-medium">{item?.label}</div>
                    <div className="text-xs opacity-75 mt-0.5">{item?.tooltip}</div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
      <div className="h-16" />
    </>
  );
};

export default Header;