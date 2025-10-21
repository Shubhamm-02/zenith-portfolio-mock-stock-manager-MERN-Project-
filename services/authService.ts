
// A mock authentication service for the simulation.
// In a real application, this would interact with a backend.

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string; // Google profile picture
  provider?: 'google' | 'local'; // Track authentication provider
}

export interface GoogleAuthResponse {
  credential: string;
  select_by: string;
}

const MOCK_USER: User = {
  id: 'user-123',
  name: 'Demo Trader',
  email: 'trader@example.com',
  provider: 'local'
};

const USER_SESSION_KEY = 'gemini-tradesim-user';

// Google OAuth configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const login = (username: string): Promise<User> => {
  return new Promise((resolve) => {
    // Simulate a network request
    setTimeout(() => {
      const user = { ...MOCK_USER, name: username || MOCK_USER.name };
      sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
      resolve(user);
    }, 500);
  });
};

export const loginWithGoogle = (googleResponse: any): Promise<User> => {
  return new Promise((resolve, reject) => {
    try {
      // Parse the JWT token to get user information
      const payload = JSON.parse(atob(googleResponse.credential.split('.')[1]));
      
      const user: User = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        provider: 'google'
      };
      
      sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
      resolve(user);
    } catch (error) {
      console.error('Failed to parse Google auth response:', error);
      reject(error);
    }
  });
};

export const getGoogleClientId = (): string => {
  return GOOGLE_CLIENT_ID;
};

export const logout = (): void => {
  sessionStorage.removeItem(USER_SESSION_KEY);
};

export const getCurrentUser = (): User | null => {
  const userJson = sessionStorage.getItem(USER_SESSION_KEY);
  if (userJson) {
    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error("Failed to parse user from session storage", error);
      return null;
    }
  }
  return null;
};
