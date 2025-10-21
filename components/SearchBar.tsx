import React, { useState, useEffect, useRef } from 'react';
import { Stock } from '../types';

interface SearchBarProps {
  stocks: Stock[];
  onStockSelect: (ticker: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ stocks, onStockSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Stock[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filteredStocks = stocks.filter(
        stock =>
          stock.ticker.toLowerCase().includes(query.toLowerCase()) ||
          stock.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredStocks.slice(0, 7)); // Limit results
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, stocks]);
  
  // Handle clicks outside of search bar to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (ticker: string) => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    onStockSelect(ticker);
  };

  return (
    <div className="relative" ref={searchRef}>
      <label htmlFor="stock-search" className="sr-only">Search Stocks</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          id="stock-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          placeholder="Search for a stock (e.g., RELIANCE, TCS)"
          className="w-full bg-surface border border-overlay rounded-md py-3 pl-10 pr-4 text-text focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
      </div>
      {isOpen && results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-surface border border-overlay rounded-md shadow-lg max-h-60 overflow-auto">
          {results.map(stock => (
            <li
              key={stock.ticker}
              onClick={() => handleSelect(stock.ticker)}
              className="px-4 py-3 cursor-pointer hover:bg-overlay text-subtle hover:text-text transition"
            >
              <span className="font-bold text-text">{stock.ticker}</span> - {stock.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
