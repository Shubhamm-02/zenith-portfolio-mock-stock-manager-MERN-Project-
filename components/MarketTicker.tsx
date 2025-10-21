import React from 'react';
import { Stock } from '../types';

interface MarketTickerProps {
  stocks: Stock[];
}

const TickerItem: React.FC<{ stock: Stock }> = ({ stock }) => {
  const isPositive = stock.change >= 0;
  return (
    <div className="flex items-center space-x-4 px-6 py-2">
      <span className="font-semibold text-sm text-subtle">{stock.ticker}</span>
      <span className="font-mono text-sm">{stock.price.toFixed(2)}</span>
      <span className={`font-mono text-sm ${isPositive ? 'text-secondary' : 'text-danger'}`}>
        {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
      </span>
    </div>
  );
};

const MarketTicker: React.FC<MarketTickerProps> = ({ stocks }) => {
  // Duplicate the array for a seamless loop
  const extendedStocks = [...stocks, ...stocks];

  return (
    <div className="bg-overlay border-y border-gray-700 ticker-wrap">
      <div className="ticker-move">
        {extendedStocks.map((stock, index) => (
          <TickerItem key={`${stock.ticker}-${index}`} stock={stock} />
        ))}
      </div>
    </div>
  );
};

export default MarketTicker;
