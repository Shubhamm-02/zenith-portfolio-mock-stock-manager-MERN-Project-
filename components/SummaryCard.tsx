
import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  change?: string;
  changeColor?: string;
  icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, change, changeColor, icon }) => {
  return (
    <div className="bg-surface p-4 rounded-lg shadow-lg flex-1">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">{title}</p>
        <div className="text-muted">{icon}</div>
      </div>
      <div className="mt-2">
        <h3 className="text-2xl font-bold text-text">{value}</h3>
        {change && (
          <p className={`text-sm font-semibold ${changeColor}`}>{change}</p>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
