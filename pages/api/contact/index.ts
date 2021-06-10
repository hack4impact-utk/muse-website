import { NextApiRequest, NextApiResponse } from "next";
import { sendContactMessage } from "server/actions/ContactForm";
import { EmailMessage } from "utils/types";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  try {
    const emailContent = JSON.parse(req.body) as EmailMessage;
    sendContactMessage(emailContent);
    res.status(200).json({
      payload: {},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      payload: error as string,
    });
  }
}
