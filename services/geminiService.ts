
import { GoogleGenAI } from "@google/genai";
import { PortfolioHolding, Stock } from '../types';

export const getPortfolioAnalysis = async (holdings: PortfolioHolding[], stocks: Stock[]): Promise<string> => {
  // FIX: Per guidelines, assume API_KEY is present and remove the check.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const holdingsWithDetails = holdings.map(h => {
    const stockInfo = stocks.find(s => s.ticker === h.ticker);
    return {
      ticker: h.ticker,
      shares: h.shares,
      averageCost: h.averageCost,
      industry: stockInfo?.industry || 'Unknown'
    };
  });

  const prompt = `
    Analyze the diversification of the following mock Indian stock portfolio (BSE). The user is participating in a trading simulation.
    Provide a concise analysis covering:
    1.  A brief summary of the portfolio's composition.
    2.  Strengths: Identify well-diversified sectors or strong holdings.
    3.  Weaknesses & Risks: Point out over-concentration in specific stocks or sectors.
    4.  Actionable Suggestion: Offer one clear suggestion for improvement (e.g., "Consider diversifying into the healthcare sector to reduce technology exposure.").

    Format the response in simple Markdown. Use headings for each section.

    Portfolio Data:
    ${JSON.stringify(holdingsWithDetails, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching portfolio analysis:", error);
    return "An error occurred while analyzing the portfolio. Please try again later.";
  }
};
