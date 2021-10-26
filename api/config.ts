import path from 'path';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const envFile = require('find-config')('.env');
  if (envFile) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv-flow').config({
      path: path.dirname(envFile),
    });
  }
}

export default {
  production: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 80,

  google: {
    apiKey: process.env.GOOGLE_API_KEY!,
    oauthClientId: process.env.OAUTH_CLIENT_ID!,
    oauthClientSecret: process.env.OAUTH_CLIENT_SECRET!,
    refreshToken: process.env.REFRESH_TOKEN!,
  },
};
