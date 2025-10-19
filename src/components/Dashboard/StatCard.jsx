import React from 'react';

const StatCard = ({ title, value, icon, color, trend, delay }) => {
  return (
    <div 
      className="stat-card"
      style={{ 
        borderLeftColor: color,
        animationDelay: `${delay}s`
      }}
    >
      <div className="stat-icon" style={{ backgroundColor: color }}>
        <i className={`bi bi-${icon}`}></i>
      </div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
        {trend && (
          <span className="stat-trend" style={{ color }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;