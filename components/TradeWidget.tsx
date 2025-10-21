import React, { useState, useEffect } from 'react';
import { Stock, TransactionType } from '../types';

interface TradeWidgetProps {
  stocks: Stock[];
  onTrade: (ticker: string, shares: number, type: TransactionType) => void;
  cash: number;
  defaultTicker?: string;
}

const TradeWidget: React.FC<TradeWidgetProps> = ({ stocks, onTrade, cash, defaultTicker }) => {
  const [ticker, setTicker] = useState(defaultTicker || (stocks.length > 0 ? stocks[0].ticker : ''));
  const [shares, setShares] = useState('');
  const [tradeType, setTradeType] = useState<TransactionType>(TransactionType.BUY);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultTicker) {
      setTicker(defaultTicker);
    }
  }, [defaultTicker]);

  const selectedStock = stocks.find(s => s.ticker === ticker);
  const totalCost = selectedStock && shares ? parseFloat(shares) * selectedStock.price : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const sharesNum = parseInt(shares, 10);
    if (isNaN(sharesNum) || sharesNum <= 0) {
      setError('Please enter a valid number of shares.');
      return;
    }

    if (tradeType === TransactionType.BUY && totalCost > cash) {
      setError('Not enough cash to complete this purchase.');
      return;
    }
    
    onTrade(ticker, sharesNum, tradeType);
    setShares('');
  };

  return (
    <div className="bg-surface p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-text mb-4">Trade Stocks</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="ticker" className="block text-sm font-medium text-subtle mb-1">Stock</label>
          <select
            id="ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            className="w-full bg-overlay border border-gray-600 rounded-md p-2 focus:ring-primary focus:border-primary"
          >
            {stocks.map(stock => (
              <option key={stock.ticker} value={stock.ticker}>
                {stock.ticker} - {stock.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="shares" className="block text-sm font-medium text-subtle mb-1">Shares</label>
          <input
            type="number"
            id="shares"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            placeholder="0"
            className="w-full bg-overlay border border-gray-600 rounded-md p-2 focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div className="flex space-x-2 mb-4">
          <button type="button" onClick={() => setTradeType(TransactionType.BUY)} className={`flex-1 p-2 rounded-md text-sm font-semibold transition-colors ${tradeType === TransactionType.BUY ? 'bg-secondary text-white' : 'bg-overlay text-subtle hover:bg-gray-600'}`}>
            Buy
          </button>
          <button type="button" onClick={() => setTradeType(TransactionType.SELL)} className={`flex-1 p-2 rounded-md text-sm font-semibold transition-colors ${tradeType === TransactionType.SELL ? 'bg-danger text-white' : 'bg-overlay text-subtle hover:bg-gray-600'}`}>
            Sell
          </button>
        </div>

        {selectedStock && shares && (
          <div className="text-sm text-muted mb-4 p-2 bg-overlay rounded-md">
            <p>Estimated Total: <span className="font-bold">{totalCost.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span></p>
          </div>
        )}

        {error && <p className="text-sm text-danger mb-4">{error}</p>}

        <button type="submit" className="w-full bg-primary hover:bg-primary-focus text-white font-bold py-2 px-4 rounded-md transition-colors">
          Execute Trade
        </button>
      </form>
    </div>
  );
};

export default TradeWidget;
