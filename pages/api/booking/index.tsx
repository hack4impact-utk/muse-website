import { NextApiRequest, NextApiResponse } from "next";
import Bookeo_Client from "server/actions/Bookeo";

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
