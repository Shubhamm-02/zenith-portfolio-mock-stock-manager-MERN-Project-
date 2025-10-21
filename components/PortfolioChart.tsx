import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChartDataPoint } from '../types';

interface PortfolioChartProps {
  data: ChartDataPoint[];
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ data }) => {
  if (data.length === 0) {
    return <div className="text-center p-8 text-muted">No portfolio history to display yet.</div>;
  }
  
  const formatYAxis = (tick: number) => `₹${(tick / 1000).toFixed(0)}k`;

  return (
    <div className="bg-surface p-4 sm:p-6 rounded-lg shadow-lg h-80">
      <h3 className="text-lg font-semibold text-text mb-4">Portfolio Performance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
          <YAxis stroke="#9CA3AF" tickFormatter={formatYAxis} tick={{ fontSize: 12 }} domain={['dataMin - 10000', 'dataMax + 10000']}/>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' }}
            formatter={(value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)}
          />
          <Area type="monotone" dataKey="value" stroke="#2563EB" fillOpacity={1} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
