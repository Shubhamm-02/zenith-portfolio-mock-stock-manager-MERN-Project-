
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MarketTicker from './components/MarketTicker';
import SummaryCard from './components/SummaryCard';
import PortfolioChart from './components/PortfolioChart';
import HoldingsTable from './components/HoldingsTable';
import TradeWidget from './components/TradeWidget';
import AIPortfolioAnalysis from './components/AIPortfolioAnalysis';
import StockDetailView from './components/StockDetailView';
import SearchBar from './components/SearchBar';
import LoginScreen from './components/LoginScreen';
import { Stock, PortfolioHolding, TransactionType, ChartDataPoint } from './types';
import { getStocks, simulatePriceUpdates } from './services/stockService';
import { User, getCurrentUser, logout as authLogout } from './services/authService';
import { INITIAL_CASH } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [stocks, setStocks] = useState<Stock[]>(getStocks());
  const [cash, setCash] = useState<number>(INITIAL_CASH);
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
  const [portfolioHistory, setPortfolioHistory] = useState<ChartDataPoint[]>([]);
  const [selectedStockTicker, setSelectedStockTicker] = useState<string | null>(null);

  const calculatePortfolioValue = (currentHoldings: PortfolioHolding[], currentStocks: Stock[]): number => {
    return currentHoldings.reduce((total, holding) => {
      const stock = currentStocks.find(s => s.ticker === holding.ticker);
      return total + (stock ? stock.price * holding.shares : 0);
    }, 0);
  };
  
  // Market Simulation
  useEffect(() => {
    if (!user) return; // Don't run simulation if not logged in

    const interval = setInterval(() => {
      setStocks(prevStocks => {
          const updatedStocks = simulatePriceUpdates();
          // We need access to the latest holdings state here.
          setHoldings(currentHoldings => {
              const newPortfolioValue = calculatePortfolioValue(currentHoldings, updatedStocks);
              setPortfolioHistory(prevHistory => {
                const now = new Date();
                const newPoint = { 
                  name: `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`, 
                  value: newPortfolioValue + cash 
                };
                // Keep history to a reasonable length
                const updatedHistory = [...prevHistory, newPoint];
                return updatedHistory.slice(-100); 
              });
              return currentHoldings;
          });
          return updatedStocks;
      });
    }, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, [user, cash]); // Re-run effect if user logs in, or cash changes for history accuracy.

  const handleTrade = (ticker: string, shares: number, type: TransactionType) => {
    const stock = stocks.find(s => s.ticker === ticker);
    if (!stock) return;

    const tradeValue = stock.price * shares;

    if (type === TransactionType.BUY) {
      if (cash < tradeValue) {
        alert("Not enough cash!");
        return;
      }
      setCash(prevCash => prevCash - tradeValue);
      setHoldings(prevHoldings => {
        const existingHolding = prevHoldings.find(h => h.ticker === ticker);
        if (existingHolding) {
          const totalShares = existingHolding.shares + shares;
          const totalCost = (existingHolding.averageCost * existingHolding.shares) + tradeValue;
          return prevHoldings.map(h =>
            h.ticker === ticker
              ? { ...h, shares: totalShares, averageCost: totalCost / totalShares }
              : h
          );
        } else {
          return [...prevHoldings, { ticker, shares, averageCost: stock.price }];
        }
      });
    } else { // SELL
      const existingHolding = holdings.find(h => h.ticker === ticker);
      if (!existingHolding || existingHolding.shares < shares) {
        alert("Not enough shares to sell!");
        return;
      }
      setCash(prevCash => prevCash + tradeValue);
      setHoldings(prevHoldings => {
        if (existingHolding.shares === shares) {
          return prevHoldings.filter(h => h.ticker !== ticker);
        } else {
          return prevHoldings.map(h =>
            h.ticker === ticker
              ? { ...h, shares: h.shares - shares }
              : h
          );
        }
      });
    }
  };
  
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };
  
  const handleLogout = () => {
    authLogout();
    setUser(null);
    // Reset state
    setCash(INITIAL_CASH);
    setHoldings([]);
    setPortfolioHistory([]);
    setSelectedStockTicker(null);
  };
  
  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const portfolioValue = calculatePortfolioValue(holdings, stocks);
  const totalValue = cash + portfolioValue;
  const initialValue = INITIAL_CASH;
  const totalPL = totalValue - initialValue;
  const totalPLPercent = initialValue > 0 ? (totalPL / initialValue) * 100 : 0;
  
  const isTotalPLPositive = totalPL >= 0;

  const MainDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryCard 
          title="Total Value" 
          value={totalValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
          change={`${isTotalPLPositive ? '+' : ''}${totalPL.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })} (${totalPLPercent.toFixed(2)}%)`}
          changeColor={isTotalPLPositive ? 'text-secondary' : 'text-danger'}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
        />
        <SummaryCard 
          title="Portfolio Value" 
          value={portfolioValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
        />
        <SummaryCard 
          title="Cash Available" 
          value={cash.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6a3 3 0 100 6h6m-6 0l-3 3m9-12a3 3 0 110 6h-6m6 0a3 3 0 100 6H9" /></svg>}
        />
         <SummaryCard 
          title="Holdings" 
          value={holdings.length.toString()}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioChart data={portfolioHistory} />
        </div>
        <div>
          <TradeWidget stocks={stocks} onTrade={handleTrade} cash={cash} />
        </div>
      </div>
      
      <div className="mt-6">
        <HoldingsTable holdings={holdings} stocks={stocks} />
      </div>

      <div className="mt-6">
        <AIPortfolioAnalysis holdings={holdings} stocks={stocks} />
      </div>
    </>
  );

  return (
    <div className="bg-background text-text min-h-screen">
      <Header cash={cash} user={user} />
      <MarketTicker stocks={stocks} />

      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <SearchBar stocks={stocks} onStockSelect={setSelectedStockTicker} />
        </div>
        
        {selectedStockTicker ? (
          <StockDetailView 
            ticker={selectedStockTicker} 
            stocks={stocks} 
            onBack={() => setSelectedStockTicker(null)}
            onTrade={handleTrade}
            cash={cash}
          />
        ) : (
          <MainDashboard />
        )}
      </main>

       <footer className="text-center py-4 text-xs text-muted border-t border-overlay mt-8">
        <p>Gemini TradeSim - A Fictional Stock Trading Simulator.</p>
        <button onClick={handleLogout} className="text-primary hover:underline mt-2">Logout</button>
      </footer>
    </div>
  );
};

export default App;
