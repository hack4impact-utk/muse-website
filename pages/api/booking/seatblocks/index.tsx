import { NextApiRequest, NextApiResponse } from "next";
import console from "console";
import Bookeo_Client from "server/actions/Bookeo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Example using Bookeo client to check api keys
  const bookeo = new Bookeo_Client();

  try {
    // Retrieve seatblocks
    if (req.method == "GET") {
      // Get params from parameters
      const startTime = req.query["startTime"] as string;
      const endTime = req.query["endTime"] as string;
      const lastUpdatedStartTime = req.query["lastUpdatedStartTime"] as string;
      const lastUpdatedEndTime = req.query["lastUpdatedEndTime"] as string;

      const productId = req.query["productId"] as string;
      const itemsPerPage = req.query["itemsPerPage"] as string;
      const pageNavigationToken = req.query["pageNavigationToken"] as string;
      const pageNumber = req.query["pageNumber"] as string;

      // Returns JSON with response from Bookeo function
      const response = await bookeo.getSeatBlocks(
        startTime,
        endTime,
        lastUpdatedStartTime,
        lastUpdatedEndTime,
        productId,
        itemsPerPage,
        pageNavigationToken,
        pageNumber
      );

      console.log(JSON.stringify(response));
    }

    res.status(200).json({
      success: true,
      payload: {},
    });
  } catch (error) {
    //Errors in the API are sent here.
    console.error(error as Error);
    res.status(500).json({
      success: false,
      payload: [],
    });
  }
}
