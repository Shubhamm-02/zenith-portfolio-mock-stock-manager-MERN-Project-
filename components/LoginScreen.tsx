
import React, { useState, useEffect } from 'react';
import { login, loginWithGoogle, getGoogleClientId, User } from '../services/authService';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleClientId, setGoogleClientId] = useState<string>('');

  useEffect(() => {
    // Load Google OAuth script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      const clientId = getGoogleClientId();
      setGoogleClientId(clientId);
      
      if (clientId && window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleSignIn
        });
      }
    };

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Make handleGoogleSignIn available globally for Google's callback
  useEffect(() => {
    (window as any).handleGoogleSignIn = handleGoogleSignIn;
  }, []);

  const handleGoogleSignIn = async (response: any) => {
    setIsLoading(true);
    try {
      const user = await loginWithGoogle(response);
      onLogin(user);
    } catch (error) {
      console.error("Google login failed", error);
      alert("Google sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    setIsLoading(true);
    try {
      const user = await login(username);
      onLogin(user);
    } catch (error) {
      console.error("Login failed", error);
      // In a real app, show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-surface rounded-lg shadow-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <h1 className="text-3xl font-bold text-text">Gemini TradeSim</h1>
          </div>
          <p className="text-muted">Welcome to the BSE trading simulation.</p>
        </div>
        {/* Google Sign-In Button */}
        {googleClientId && (
          <div className="mt-6">
            <div 
              id="g_id_onload"
              data-client_id={googleClientId}
              data-callback="handleGoogleSignIn"
              data-auto_prompt="false"
            ></div>
            <div 
              className="g_id_signin w-full"
              data-type="standard"
              data-size="large"
              data-theme="outline"
              data-text="sign_in_with"
              data-shape="rectangular"
              data-logo_alignment="left"
            ></div>
          </div>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-surface text-muted">Or continue with</span>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-subtle mb-1">
              Trader Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full bg-overlay border border-gray-600 rounded-md p-3 focus:ring-primary focus:border-primary text-text"
              placeholder="e.g., Rakesh Jhunjhunwala"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || !username.trim()}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Entering Market...' : 'Start Trading'}
            </button>
          </div>
        </form>
        <p className="text-xs text-center text-muted">
          This is a simulation. No real money is involved.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
