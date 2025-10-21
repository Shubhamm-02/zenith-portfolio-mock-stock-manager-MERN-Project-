<div align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react" alt="React Version" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.2-blue?style=for-the-badge&logo=typescript" alt="TypeScript Version" />
  <img src="https://img.shields.io/badge/Vite-6.4.1-purple?style=for-the-badge&logo=vite" alt="Vite Version" />
  <img src="https://img.shields.io/badge/Google_OAuth-Enabled-green?style=for-the-badge&logo=google" alt="Google OAuth" />
</div>

<div align="center">
  <h1>🚀 Zenith Portfolio - Mock Stock Manager</h1>
  <p><strong>A sophisticated, real-time stock trading simulator with AI-powered portfolio analysis</strong></p>
  

  <img src="https://img.shields.io/badge/Status-Live-brightgreen.svg" alt="Status" />
  <img src="https://img.shields.io/badge/Platform-Web-blue.svg" alt="Platform" />
</div>

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Configuration](#️-configuration)
- [🏗️ Architecture](#️-architecture)
- [📱 Screenshots](#-screenshots)
- [🔧 Development](#-development)
- [🤝 Contributing](#-contributing)


---

## 🌟 Features

### 🔐 **Dual Authentication System**
- **Google OAuth 2.0** - Secure sign-in with Google accounts
- **Local Authentication** - Traditional username-based login
- **Session Management** - Persistent user sessions
- **Profile Integration** - Google profile pictures and information

### 📊 **Real-Time Trading Simulation**
- **Live Market Data** - 50+ Indian stocks with real-time price updates
- **Portfolio Tracking** - Monitor your investments with live P&L
- **Trading Interface** - Buy/sell stocks with realistic market simulation
- **Cash Management** - Track available funds and portfolio value

### 📈 **Advanced Analytics & Visualization**
- **Interactive Charts** - Real-time portfolio performance graphs
- **Market Ticker** - Live scrolling stock prices
- **Holdings Table** - Detailed view of all your investments
- **Performance Metrics** - Total value, P&L, and percentage changes

### 🤖 **AI-Powered Portfolio Analysis**
- **Gemini AI Integration** - Get intelligent portfolio insights
- **Diversification Analysis** - Understand your portfolio balance
- **Investment Recommendations** - AI-driven suggestions
- **Risk Assessment** - Portfolio risk analysis and recommendations

### 🎨 **Modern User Experience**
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark Theme** - Professional trading interface
- **Intuitive Navigation** - Easy-to-use trading interface
- **Real-Time Updates** - Live data refresh every 2 seconds

---

# Key Features in Action:
- 🏠 **Dashboard** - Overview of your portfolio performance
- 📊 **Charts** - Visual representation of your investment growth
- 💰 **Trading** - Buy and sell stocks with real-time pricing
- 🔍 **Search** - Find stocks quickly with intelligent search
- 🤖 **AI Analysis** - Get professional portfolio insights

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Google Cloud Console** account (for OAuth)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zenith-portfolio-mock-stock-manager.git
   cd zenith-portfolio-mock-stock-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Gemini AI API Key (for portfolio analysis)
GEMINI_API_KEY=your_gemini_api_key_here
```

### Google OAuth Setup

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing

2. **Enable APIs**
   - Enable Google+ API
   - Enable Google Identity API

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Create OAuth 2.0 Client ID
   - Add authorized origins: `http://localhost:3000`
   - Copy the Client ID to your `.env` file

4. **Configure OAuth Consent Screen**
   - Set up the consent screen
   - Add test users for development

📖 **Detailed Setup Guide:** See [GOOGLE_AUTH_SETUP.md](./GOOGLE_AUTH_SETUP.md)

---

## 🏗️ Architecture

### Tech Stack
- **Frontend:** React 19.2.0 with TypeScript
- **Build Tool:** Vite 6.4.1
- **Charts:** Recharts 3.3.0
- **AI Integration:** Google Gemini AI
- **Authentication:** Google OAuth 2.0
- **Styling:** Custom CSS with modern design system

### Project Structure
```
zenith-portfolio-mock-stock-manager/
├── components/           # React components
│   ├── AIPortfolioAnalysis.tsx
│   ├── Header.tsx
│   ├── HoldingsTable.tsx
│   ├── LoginScreen.tsx
│   ├── MarketTicker.tsx
│   ├── PortfolioChart.tsx
│   ├── SearchBar.tsx
│   ├── StockDetailView.tsx
│   ├── SummaryCard.tsx
│   └── TradeWidget.tsx
├── services/            # Business logic
│   ├── authService.ts   # Authentication
│   ├── geminiService.ts # AI integration
│   └── stockService.ts  # Market data
├── types.ts            # TypeScript definitions
├── constants.ts        # App constants
└── App.tsx            # Main application
```

### Key Components

#### 🔐 Authentication (`authService.ts`)
- Google OAuth 2.0 integration
- Local authentication fallback
- Session management
- User profile handling

#### 📊 Market Data (`stockService.ts`)
- 50+ Indian stocks simulation
- Real-time price updates
- Historical data generation
- Market simulation algorithms

#### 🤖 AI Analysis (`geminiService.ts`)
- Gemini AI integration
- Portfolio analysis
- Investment recommendations
- Risk assessment

---

## 📱 Screenshots

### 🏠 Dashboard
- **Portfolio Overview** - Total value, P&L, cash available
- **Live Charts** - Real-time performance visualization
- **Market Ticker** - Scrolling stock prices
- **Quick Actions** - Trade and analyze buttons

### 💰 Trading Interface
- **Stock Search** - Find stocks by name or ticker
- **Buy/Sell Orders** - Execute trades with real-time pricing
- **Portfolio Holdings** - View all your investments
- **Performance Tracking** - Monitor your returns

### 🤖 AI Analysis
- **Portfolio Insights** - AI-powered analysis
- **Diversification Check** - Portfolio balance assessment
- **Risk Analysis** - Investment risk evaluation
- **Recommendations** - AI-driven suggestions

---

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Features
- **Hot Reload** - Instant updates during development
- **TypeScript** - Full type safety
- **ESLint** - Code quality and consistency
- **Vite** - Lightning-fast build times

### Code Quality
- **TypeScript** - Strict type checking
- **Component Architecture** - Modular, reusable components
- **Service Layer** - Clean separation of concerns
- **Error Handling** - Comprehensive error management

---

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Setup
1. Set production environment variables
2. Configure Google OAuth for production domain
3. Deploy to your preferred hosting platform

### Recommended Hosting
- **Vercel** - Easy deployment with Vite
- **Netlify** - Static site hosting
- **AWS S3** - Scalable cloud hosting
- **GitHub Pages** - Free hosting for public repos

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports
- Use GitHub Issues
- Provide detailed reproduction steps
- Include browser/OS information

### 💡 Feature Requests
- Describe the feature clearly
- Explain the use case
- Consider implementation complexity

### 🔧 Pull Requests
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### 📋 Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📊 Project Stats

<div align="center">
  <img src="https://img.shields.io/github/stars/yourusername/zenith-portfolio-mock-stock-manager?style=social" alt="GitHub stars" />
  <img src="https://img.shields.io/github/forks/yourusername/zenith-portfolio-mock-stock-manager?style=social" alt="GitHub forks" />
  <img src="https://img.shields.io/github/issues/yourusername/zenith-portfolio-mock-stock-manager" alt="GitHub issues" />
  <img src="https://img.shields.io/github/last-commit/yourusername/zenith-portfolio-mock-stock-manager" alt="Last commit" />
</div>

---

## 🎯 Roadmap

### Upcoming Features
- [ ] **Mobile App** - React Native version
- [ ] **Advanced Charts** - More chart types and indicators
- [ ] **Social Trading** - Share portfolios with friends
- [ ] **News Integration** - Real-time market news
- [ ] **Alerts System** - Price and portfolio alerts
- [ ] **Backtesting** - Historical strategy testing

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added Google OAuth integration
- **v1.2.0** - Enhanced AI analysis features
- **v1.3.0** - Improved mobile responsiveness

---

## 📞 Support

### Getting Help
- 📖 **Documentation** - Check this README and setup guides
- 🐛 **Issues** - Report bugs on GitHub Issues
- 💬 **Discussions** - Join GitHub Discussions
- 📧 **Email** - Contact the maintainers

### Common Issues
- **OAuth Setup** - See [GOOGLE_AUTH_SETUP.md](./GOOGLE_AUTH_SETUP.md)
- **Dependencies** - Run `npm install` to resolve
- **Build Issues** - Check Node.js version compatibility
- **API Keys** - Verify environment variables

#### This is a MERN clg project


