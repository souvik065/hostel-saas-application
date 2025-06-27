const refreshAccessToken = async (token: any) => {
  try {
    const url = process.env.REFRESH_ACCESS_TOKEN_URL ? (process.env.REFRESH_ACCESS_TOKEN_URL as string) : '';

    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ? (process.env.GOOGLE_CLIENT_ID as string) : '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET ? (process.env.GOOGLE_CLIENT_SECRET as string) : '',
      grant_type: 'refresh_token',
      refresh_token: token?.refreshToken,
      redirect_uri: process.env.GOOGLE_REDIRECT_URL ? (process.env.GOOGLE_REDIRECT_URL as string) : '',
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export default refreshAccessToken;
