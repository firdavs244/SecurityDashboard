import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const GeographicLoginMap = ({ loginData, onRegionClick }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Convert lat/lng to SVG coordinates (Mercator projection)
  const projectPoint = (lat, lng) => {
    const x = ((lng + 180) / 360) * 1000;
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = (500 - (mercN / Math.PI) * 500) * 0.7 + 100;
    return { x, y };
  };

  const getThreatColor = (threatLevel) => {
    switch (threatLevel) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      default:
        return '#14b8a6';
    }
  };

  const handlePointClick = (region) => {
    setSelectedRegion(region);
    if (onRegionClick) {
      onRegionClick(region);
    }
  };

  // Simplified world map paths (continents)
  const worldMapPaths = `
    M 150 120 L 300 110 L 320 140 L 300 160 L 250 150 L 200 160 L 150 140 Z
    M 320 150 L 450 145 L 480 130 L 520 140 L 550 160 L 530 180 L 480 185 L 450 175 L 400 170 L 350 180 L 320 170 Z
    M 520 180 L 580 175 L 620 160 L 650 170 L 680 190 L 670 210 L 640 220 L 600 215 L 570 200 L 540 195 Z
    M 100 220 L 180 210 L 230 220 L 250 250 L 230 280 L 180 290 L 130 280 L 100 260 Z
    M 250 260 L 300 255 L 320 270 L 310 290 L 280 300 L 260 285 Z
    M 680 200 L 750 190 L 800 200 L 820 220 L 810 240 L 780 250 L 740 245 L 700 230 Z
    M 150 310 L 200 300 L 230 320 L 220 350 L 190 360 L 160 340 Z
    M 700 280 L 750 275 L 780 290 L 770 310 L 740 320 L 710 305 Z
  `;

  return (
    <div className="bg-card rounded-xl border border-border shadow-teal-sm overflow-hidden h-full flex flex-col">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Geographic Login Patterns
          </h3>
          <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-muted-foreground">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <span className="text-muted-foreground">High Risk</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 relative bg-gradient-to-b from-slate-900 to-slate-800 p-4">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        >
          {/* World map continents */}
          <path
            d={worldMapPaths}
            fill="rgba(148, 163, 184, 0.1)"
            stroke="rgba(148, 163, 184, 0.3)"
            strokeWidth="0.5"
          />

          {/* Grid lines */}
          {[...Array(11)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 100}
              y1="0"
              x2={i * 100}
              y2="500"
              stroke="rgba(148, 163, 184, 0.1)"
              strokeWidth="0.5"
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 100}
              x2="1000"
              y2={i * 100}
              stroke="rgba(148, 163, 184, 0.1)"
              strokeWidth="0.5"
            />
          ))}

          {/* Login points */}
          {loginData?.map((point, index) => {
            const { x, y } = projectPoint(point.latitude, point.longitude);
            const color = getThreatColor(point.threatLevel);
            const radius = Math.min(Math.max(point.loginCount / 200, 3), 15);

            return (
              <g key={index}>
                {/* Pulse ring animation */}
                <circle
                  cx={x}
                  cy={y}
                  r={radius + 10}
                  fill="none"
                  stroke={color}
                  strokeOpacity="0.3"
                  strokeWidth="2"
                >
                  <animate
                    attributeName="r"
                    from={radius}
                    to={radius + 15}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-opacity"
                    from="0.6"
                    to="0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                
                {/* Main point */}
                <circle
                  cx={x}
                  cy={y}
                  r={radius}
                  fill={color}
                  fillOpacity="0.8"
                  stroke={color}
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:fill-opacity-100"
                  onClick={() => handlePointClick(point)}
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <animate
                    attributeName="fill-opacity"
                    values="0.6;1;0.6"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Hover tooltip */}
        {hoveredPoint && (
          <div
            className="absolute bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-lg pointer-events-none z-20"
            style={{
              left: '50%',
              top: '20px',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="text-sm space-y-1">
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={14} className="text-teal-400" />
                <span className="font-medium text-white">{hoveredPoint?.city}, {hoveredPoint?.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Activity" size={14} className="text-slate-400" />
                <span className="text-slate-300">{hoveredPoint?.loginCount?.toLocaleString()} logins</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="TrendingUp" size={14} className="text-slate-400" />
                <span className="text-slate-300">Success: {hoveredPoint?.successRate}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={14} className="text-slate-400" />
                <span className="text-slate-300 capitalize">Threat: {hoveredPoint?.threatLevel}</span>
              </div>
            </div>
          </div>
        )}

        {/* Selected region details */}
        {selectedRegion && (
          <div className="absolute bottom-4 left-4 right-4 bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-lg p-4 shadow-lg z-20">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-base md:text-lg font-heading font-semibold text-white mb-3">
                  {selectedRegion?.city}, {selectedRegion?.country}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-slate-400">Total Logins:</span>
                    <span className="ml-2 font-medium text-white">{selectedRegion?.loginCount?.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Success Rate:</span>
                    <span className="ml-2 font-medium text-teal-400">{selectedRegion?.successRate}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Threat Level:</span>
                    <span 
                      className={`ml-2 font-medium capitalize ${
                        selectedRegion?.threatLevel === 'high' ? 'text-red-400' : 
                        selectedRegion?.threatLevel === 'medium' ? 'text-amber-400' : 
                        'text-teal-400'
                      }`}
                    >
                      {selectedRegion?.threatLevel}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Active Sessions:</span>
                    <span className="ml-2 font-medium text-white">{selectedRegion?.activeSessions?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedRegion(null)}
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-all text-slate-400 hover:text-white"
              >
                <Icon name="X" size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeographicLoginMap;