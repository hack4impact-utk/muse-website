import fetch from "node-fetch";

export const baseURL = "https://api.bookeo.com/v2/";

export default class Bookeo_Client {
  baseUrl: string;
  apiKey: string;
  secretKey: string;

  constructor() {
    this.baseUrl = baseURL;
    this.apiKey = process.env.BOOKEO_API_KEY as string;
    this.secretKey = process.env.BOOKEO_APP_SECRET as string;
  }

  // Simple function used to check validity of keys
  async check_keys(): Promise<string> {
    //let finishedRequestBody = "";
    const uri =
      `${this.baseUrl}settings/apikeyinfo?` +
      `apiKey=${this.apiKey}` +
      `&secretKey=${this.secretKey}`;

    // Check api key
    console.log("Checking permissions...");
    console.log("URL: " + uri);
    const response = await fetch(uri);
    const data: JSON = (await response.json()) as JSON;

    return JSON.stringify(data);
  }

  availability(): void {
    //TODO: implement availability function
  }

  booking(): void {
    //TODO: implement booking function
  }
}
