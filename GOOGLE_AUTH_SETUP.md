# Google Authentication Setup Guide

This guide will help you set up Google OAuth 2.0 authentication for the Zenith Portfolio Mock Stock Manager.

## Prerequisites

1. A Google account
2. Access to Google Cloud Console

## Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)

2. **Create or Select a Project**
   - Click on the project dropdown at the top
   - Create a new project or select an existing one

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
   - Also enable "Google Identity" if available

4. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - If prompted, configure the OAuth consent screen first:
     - Choose "External" user type
     - Fill in the required fields (App name, User support email, Developer contact)
     - Add your email to test users

5. **Configure OAuth Client**
   - Application type: "Web application"
   - Name: "Zenith Portfolio Stock Manager"
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)

6. **Get Your Client ID**
   - Copy the Client ID from the credentials page
   - **Important**: Do NOT share your Client Secret in frontend code

## Step 2: Configure Environment Variables

1. **Create a `.env` file** in your project root:
```bash
# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Existing Gemini API Key (if you have one)
GEMINI_API_KEY=your_gemini_api_key_here
```

2. **Replace the placeholder** with your actual Google Client ID

## Step 3: Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

The following packages have been added to your `package.json`:
- `@google-cloud/oauth2`: For Google OAuth integration
- `react-google-login`: For React Google login components

## Step 4: Test the Integration

1. **Start the development server**:
```bash
npm run dev
```

2. **Open your browser** and navigate to `http://localhost:3000`

3. **Test Google Sign-In**:
   - You should see a "Sign in with Google" button on the login screen
   - Click it to test the Google authentication flow
   - After successful authentication, you should see your Google profile picture and name in the header

## Step 5: Production Deployment

When deploying to production:

1. **Update Authorized Origins** in Google Cloud Console:
   - Add your production domain to "Authorized JavaScript origins"
   - Add your production domain to "Authorized redirect URIs"

2. **Update Environment Variables**:
   - Set `VITE_GOOGLE_CLIENT_ID` to your production client ID
   - Ensure your production environment has the correct environment variables

## Troubleshooting

### Common Issues:

1. **"This app isn't verified" warning**:
   - This is normal for development
   - Click "Advanced" → "Go to [App Name] (unsafe)" to proceed
   - For production, you'll need to verify your app with Google

2. **"Error 400: redirect_uri_mismatch"**:
   - Check that your domain is added to "Authorized JavaScript origins" in Google Cloud Console
   - Ensure the URL matches exactly (including http/https and port)

3. **Google Sign-In button not appearing**:
   - Check that `VITE_GOOGLE_CLIENT_ID` is set correctly
   - Check browser console for JavaScript errors
   - Ensure the Google Identity Services script is loading

4. **Authentication not working**:
   - Verify your Client ID is correct
   - Check that the Google+ API is enabled
   - Ensure your domain is in the authorized origins list

### Debug Steps:

1. **Check browser console** for any JavaScript errors
2. **Verify environment variables** are loaded correctly
3. **Test with different browsers** to rule out browser-specific issues
4. **Check Google Cloud Console** for any API quota or permission issues

## Security Notes

- **Never expose your Client Secret** in frontend code
- **Use HTTPS in production** for secure authentication
- **Regularly rotate your credentials** for better security
- **Monitor your OAuth usage** in Google Cloud Console

## Additional Resources

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Google's official documentation
3. Check the browser console for error messages
4. Verify your Google Cloud Console configuration
