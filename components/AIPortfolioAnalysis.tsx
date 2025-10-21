
import React, { useState } from 'react';
import { getPortfolioAnalysis } from '../services/geminiService';
import { PortfolioHolding, Stock } from '../types';

interface AIPortfolioAnalysisProps {
  holdings: PortfolioHolding[];
  stocks: Stock[];
}

// An improved markdown renderer that correctly groups list items
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-2 my-4 pl-4 text-subtle leading-relaxed">
                    {listItems.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            );
            listItems = [];
        }
    };

    lines.forEach((line, index) => {
        if (line.startsWith('### ')) {
            flushList();
            elements.push(<h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-primary">{line.substring(4)}</h3>);
        } else if (line.startsWith('## ')) {
            flushList();
            elements.push(<h2 key={index} className="text-2xl font-bold mt-5 mb-2 text-text">{line.substring(3)}</h2>);
        } else if (line.startsWith('# ')) {
            flushList();
            elements.push(<h1 key={index} className="text-3xl font-bold mt-6 mb-4 text-text">{line.substring(2)}</h1>);
        } else if (/^\d+\.\s/.test(line) || /^\*\s/.test(line) || /^-\s/.test(line)) {
            listItems.push(line.replace(/^\d+\.\s|^\*\s|^-\s/, ''));
        } else if (line.trim() !== '') {
            flushList();
            elements.push(<p key={index} className="mb-4 text-subtle leading-relaxed">{line}</p>);
        }
    });

    flushList(); // Add any remaining list items

    return <>{elements}</>;
};

const AIPortfolioAnalysis: React.FC<AIPortfolioAnalysisProps> = ({ holdings, stocks }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAnalysis = async () => {
    if (holdings.length === 0) {
      setError("You need to have holdings in your portfolio to get an analysis.");
      return;
    }
    setIsLoading(true);
    setError('');
    setAnalysis('');
    try {
      const result = await getPortfolioAnalysis(holdings, stocks);
      setAnalysis(result);
      setIsModalOpen(true);
    } catch (err) {
      setError("Failed to get analysis. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-surface p-6 rounded-lg shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text">AI Portfolio Analysis</h3>
            <p className="text-sm text-muted mt-1">Get insights on your portfolio's diversification.</p>
          </div>
          <button
            onClick={handleAnalysis}
            disabled={isLoading}
            className="bg-primary hover:bg-primary-focus text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center shrink-0"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 2a.5.5 0 01.5.5V3a2 2 0 012 2v1a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2h4.5zM6.5 4a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-3zM3 9.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zm0 2a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                <path d="M11 2.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V3h-4.5a.5.5 0 01-.5-.5z" />
                <path d="M12.5 8.5a.5.5 0 010 1H17a.5.5 0 010-1h-4.5zm-2 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-2 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" />
              </svg>
            )}
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
        
        {error && <p className="text-danger mt-4 text-sm">{error}</p>}
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity"
          onClick={handleCloseModal}
          aria-modal="true"
          role="dialog"
        >
          <div 
            className="bg-surface rounded-lg shadow-2xl p-6 md:p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-overlay">
              <h2 className="text-2xl font-bold text-text">Portfolio Analysis</h2>
              <button onClick={handleCloseModal} className="text-muted hover:text-text transition-colors" aria-label="Close analysis">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div>
              <MarkdownRenderer content={analysis} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIPortfolioAnalysis;
