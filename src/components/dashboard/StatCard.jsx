import React from 'react';

export const StatCard = ({ label, value, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-content">
        {icon && <i className={`bi ${icon} mb-2`}></i>}
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
};