
import React from 'react';
import { User } from '../services/authService';

interface HeaderProps {
  cash: number;
  user?: User | null;
}

const Header: React.FC<HeaderProps> = ({ cash, user }) => {
  return (
    <header className="bg-surface p-4 border-b border-overlay flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center space-x-3">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
        <h1 className="text-xl font-bold text-text">Gemini TradeSim</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* User Profile */}
        {user && (
          <div className="flex items-center space-x-2">
            {user.picture && (
              <img 
                src={user.picture} 
                alt={user.name}
                className="h-8 w-8 rounded-full border border-overlay"
              />
            )}
            <div className="text-right">
              <div className="text-sm font-medium text-text">{user.name}</div>
              <div className="text-xs text-muted">{user.provider === 'google' ? 'Google' : 'Local'}</div>
            </div>
          </div>
        )}
        
        {/* Cash Display */}
        <div className="flex items-center space-x-2 bg-overlay p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6a3 3 0 100 6h6m-6 0l-3 3m9-12a3 3 0 110 6h-6m6 0a3 3 0 100 6H9" />
          </svg>
          <span className="text-text font-semibold font-mono">
              {cash.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
