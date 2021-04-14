import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export const baseURL = "https://api.bookeo.com/v2/";

export class Bookeo_Client {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Example using Bookeo client to check api keys
  const b = new Bookeo_Client();

  const check = await b.check_keys();
  if (check == "")
    res.status(400).json({ message: "Error checking keys", body: check });
  else res.status(200).json(check);
}
