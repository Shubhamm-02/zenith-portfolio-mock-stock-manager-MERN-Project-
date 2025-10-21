import React from 'react';
import { PortfolioHolding, Stock } from '../types';

interface HoldingsTableProps {
  holdings: PortfolioHolding[];
  stocks: Stock[];
}

const HoldingsTable: React.FC<HoldingsTableProps> = ({ holdings, stocks }) => {
  const getStockPrice = (ticker: string) => stocks.find(s => s.ticker === ticker)?.price || 0;

  if (holdings.length === 0) {
    return (
      <div className="bg-surface p-6 rounded-lg shadow-lg text-center">
        <p className="text-muted">You have no holdings yet. Buy some stocks to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg shadow-lg overflow-hidden">
      <h3 className="text-lg font-semibold text-text p-4 border-b border-overlay">My Holdings</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-overlay text-subtle uppercase tracking-wider">
            <tr>
              <th className="p-4">Ticker</th>
              <th className="p-4">Shares</th>
              <th className="p-4 text-right">Price</th>
              <th className="p-4 text-right">Market Value</th>
              <th className="p-4 text-right">Total P/L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-overlay">
            {holdings.map(holding => {
              const currentPrice = getStockPrice(holding.ticker);
              const marketValue = holding.shares * currentPrice;
              const totalCost = holding.shares * holding.averageCost;
              const profitLoss = marketValue - totalCost;
              const isProfit = profitLoss >= 0;

              return (
                <tr key={holding.ticker} className="hover:bg-overlay">
                  <td className="p-4 font-bold">{holding.ticker}</td>
                  <td className="p-4">{holding.shares}</td>
                  <td className="p-4 text-right">{currentPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                  <td className="p-4 text-right">{marketValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                  <td className={`p-4 text-right font-semibold ${isProfit ? 'text-secondary' : 'text-danger'}`}>
                    {isProfit ? '+' : ''}{profitLoss.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HoldingsTable;
