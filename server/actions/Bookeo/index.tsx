import fetch from "node-fetch";

export const baseURL = "https://api.bookeo.com/v2/";

export default class Bookeo_Client {
  baseUrl: string;
  apiKey: string;
  secretKey: string;

  permissions: string;

  constructor() {
    this.baseUrl = baseURL;
    this.apiKey = process.env.BOOKEO_API_KEY as string;
    this.secretKey = process.env.BOOKEO_APP_SECRET as string;

    this.permissions = `apiKey=${this.apiKey}` + `&secretKey=${this.secretKey}`;
  }

  // Simple function used to check validity of keys
  async check_keys(): Promise<string> {
    //let finishedRequestBody = "";
    const uri = `${this.baseUrl}settings/apikeyinfo?${this.permissions}`;

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

  async getProducts(): Promise<JSON> {
    const uri = `${this.baseUrl}settings/products?${this.permissions}`;

    console.log("Checking available products...");
    const response = await fetch(uri);
    const data: JSON = (await response.json()) as JSON;

    return data;
  }

  async getSeatBlocks(
    startTime?: string,
    endTime?: string,
    lastUpdatedStartTime?: string,
    lastUpdatedEndTime?: string,
    productId?: string,
    itemsPerPage?: string,
    pageNavigationToken?: string,
    pageNumber?: string
  ): Promise<JSON> {
    let uri = `${this.baseUrl}/seatblocks?${this.permissions}`;

    // Build uri with parameters
    if (startTime != null) uri += `startTime=${startTime}&`;
    if (endTime != null) uri += `endTime=${endTime}&`;
    if (lastUpdatedStartTime != null)
      uri += `lastUpdatedStartTime=${lastUpdatedStartTime}&`;
    if (lastUpdatedEndTime != null)
      uri += `lastUpdatedEndTime=${lastUpdatedEndTime}&`;

    if (productId != null) uri += `productId=${productId}&`;
    if (itemsPerPage != null) uri += `itemsPerPage=${itemsPerPage}&`;
    if (pageNavigationToken != null)
      uri += `pageNavigationToken=${pageNavigationToken}&`;
    if (pageNumber != null) uri += `pageNumber=${pageNumber}&`;

    // Send request with specified parameters
    const response = await fetch(uri);
    const data: JSON = (await response.json()) as JSON;

    return data;
  }
}
