import { Client, Environment } from "square";

// Use our refresh token to get the current access token
export async function getAccessToken(): Promise<string> {
  let token;

  try {
    const response = await client.oAuthApi.obtainToken({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      grantType: "refresh_token",
      refreshToken: process.env.REFRESH_TOKEN as string,
      shortLived: false,
    });

    // Set new token
    token = response.result.accessToken;

    //console.log(response.httpResponse);
  } catch (error) {
    console.log(error);
  }
  return token as string;
}

// Create Square client
const client = new Client({
  environment: Environment.Sandbox,
});
