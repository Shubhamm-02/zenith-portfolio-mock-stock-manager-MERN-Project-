// Google OAuth Configuration
// Copy this file to config.ts and fill in your actual values

export const GOOGLE_OAUTH_CONFIG = {
  clientId: 'your_google_client_id_here',
  // Note: Client secret should never be exposed in frontend code
  // In a real application, you'd handle OAuth through a backend
};

// Instructions for setting up Google OAuth:
// 1. Go to Google Cloud Console (https://console.cloud.google.com/)
// 2. Create a new project or select existing one
// 3. Enable Google+ API
// 4. Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
// 5. Set application type to "Web application"
// 6. Add your domain to authorized origins (e.g., http://localhost:3000)
// 7. Copy the Client ID and replace 'your_google_client_id_here' above
