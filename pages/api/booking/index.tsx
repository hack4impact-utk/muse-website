import { NextApiRequest, NextApiResponse } from "next";
import request from "request";

export const baseURL = "https://api.bookeo.com/v2/";

type Response = {
  statusCode: number;
};

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
  check_keys(): string {
    let body = "wait";
    const uri =
      `${this.baseUrl}settings/apikeyinfo?` +
      `apiKey=${this.apiKey}` +
      `&secretKey=${this.secretKey}`;

    // Check api key
    console.log("Checking permissions...");
    console.log("URL: " + uri);
    const response = request(uri, function (error: string, response: Response) {
      //Print response info to console
      console.error("error:", error);
      console.log("statusCode:", response && response.statusCode);
    });

    response.on("data", (chunk: string) => {
      //Read body of response
      body += chunk;
    });

    /* body = response.on('end', function() {
      return body;
    }); */

    return body;
  }

  availability(): void {
    //TODO: implement availability function
  }

  booking(): void {
    //TODO: implement booking function
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  // Example using Bookeo client to check api keys
  const b = new Bookeo_Client();

  const check = b.check_keys();
  if (check == "")
    res.status(400).json({ message: "Error checking keys", body: check });
  else res.status(200).json(check);
}
