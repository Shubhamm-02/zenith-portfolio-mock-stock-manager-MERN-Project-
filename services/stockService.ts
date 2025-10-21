import { MOCK_STOCKS } from '../constants';
import { Stock, HistoricalDataPoint } from '../types';

let stockData: Stock[] = JSON.parse(JSON.stringify(MOCK_STOCKS));

export const getStocks = (): Stock[] => {
  return stockData;
};

export const getStockByTicker = (ticker: string): Stock | undefined => {
  return stockData.find(s => s.ticker === ticker);
};

export const generateMockHistory = (currentPrice: number): HistoricalDataPoint[] => {
  const history: HistoricalDataPoint[] = [];
  let price = currentPrice;
  const today = new Date();

  // Generate future point for today
  history.push({
      date: today.toLocaleDateString('en-CA'), // YYYY-MM-DD format
      price: price
  });
  
  // Generate past points by working backwards
  for (let i = 1; i <= 180; i++) {
    const fluctuation = (Math.random() - 0.48) * 0.055; // Creates a slight upward drift
    price = price / (1 + fluctuation); // Reverse the fluctuation to get the previous day's price
    
    // Occasionally add a larger random jump to simulate market volatility
    if (Math.random() > 0.98) {
        price = price / (1 + (Math.random() - 0.5) * 0.1);
    }

    const date = new Date(today);
    date.setDate(today.getDate() - i);
    history.push({
      date: date.toLocaleDateString('en-CA'),
      price: parseFloat(price.toFixed(2)),
    });
  }
  
  return history.reverse(); // Return in chronological order
};


export const simulatePriceUpdates = (): Stock[] => {
  stockData = stockData.map(stock => {
    const changePercent = (Math.random() - 0.5) * 0.02; // Max 2% change
    const newPrice = stock.price * (1 + changePercent);
    const change = newPrice - stock.price;
    
    return {
      ...stock,
      price: parseFloat(newPrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat((changePercent * 100).toFixed(2)),
    };
  });
  return stockData;
};
