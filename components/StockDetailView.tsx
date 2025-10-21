import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Stock, HistoricalDataPoint } from '../types';
import { getStockByTicker, generateMockHistory } from '../services/stockService';
import TradeWidget from './TradeWidget';

interface StockDetailViewProps {
  ticker: string;
  stocks: Stock[];
  onBack: () => void;
  onTrade: (ticker: string, shares: number, type: any) => void;
  cash: number;
}

const StockDetailView: React.FC<StockDetailViewProps> = ({ ticker, stocks, onBack, onTrade, cash }) => {
  const [stock, setStock] = useState<Stock | null>(null);
  const [history, setHistory] = useState<HistoricalDataPoint[]>([]);

  useEffect(() => {
    const stockData = getStockByTicker(ticker);
    if (stockData) {
      setStock(stockData);
      setHistory(generateMockHistory(stockData.price));
    }
  }, [ticker]);

  if (!stock) {
    return (
      <div className="text-center p-8 text-muted">
        Loading stock data...
      </div>
    );
  }

  const isPositive = stock.change >= 0;

  return (
    <div>
      <button onClick={onBack} className="mb-6 inline-flex items-center text-sm font-medium text-primary hover:text-primary-focus">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Portfolio
      </button>

      <div className="mb-6 p-4 bg-surface rounded-lg">
        <h2 className="text-2xl font-bold text-text">{stock.name} ({stock.ticker})</h2>
        <p className="text-muted">{stock.industry}</p>
        <div className="flex items-baseline space-x-4 mt-2">
            <p className="text-3xl font-mono font-bold">{stock.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
             <p className={`text-lg font-semibold ${isPositive ? 'text-secondary' : 'text-danger'}`}>
                {isPositive ? '▲' : '▼'} {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface p-4 sm:p-6 rounded-lg shadow-lg h-96">
            <h3 className="text-lg font-semibold text-text mb-4">Price History (180 Days)</h3>
            <ResponsiveContainer width="100%" height="85%">
                 <AreaChart data={history} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} domain={['dataMin * 0.95', 'dataMax * 1.05']} tickFormatter={(value) => `₹${Number(value).toFixed(0)}`} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' }}
                        formatter={(value: number) => [new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value), 'Price']}
                        labelStyle={{ fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="price" stroke={isPositive ? "#10B981" : "#EF4444"} fillOpacity={1} fill="url(#colorPrice)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
        <div>
          <TradeWidget stocks={stocks} onTrade={onTrade} cash={cash} defaultTicker={stock.ticker} />
        </div>
      </div>
    </div>
  );
};

export default StockDetailView;
