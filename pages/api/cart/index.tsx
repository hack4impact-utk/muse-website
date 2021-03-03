import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    res.status(200).json({
      success: true,
      payload: "Trevor",
    });
  }
}
