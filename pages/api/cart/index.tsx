import { NextApiRequest, NextApiResponse } from "next";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === "GET") {
    res.status(200).json({
      success: true,
      payload: "Trevor",
    });
  }
}
