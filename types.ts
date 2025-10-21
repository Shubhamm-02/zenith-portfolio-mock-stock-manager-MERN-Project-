
export interface Stock {
  ticker: string;
  name: string;
  industry: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface HistoricalDataPoint {
  date: string;
  price: number;
}

export interface PortfolioHolding {
  ticker: string;
  shares: number;
  averageCost: number;
}

export interface ChartDataPoint {
  name: string; // Typically a date or time
  value: number; // Typically a price or portfolio value
}

export enum TransactionType {
  BUY = 'BUY',
  SELL = 'SELL',
}
