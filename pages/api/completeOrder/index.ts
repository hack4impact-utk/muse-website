import {NextApiRequest, NextApiResponse} from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.setHeader("Set-Cookie", "cart=; Max-Age=0; SameSite=Lax; Path=/");
        res.redirect(`/orderConfirmation`)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            payload: error,
        })
    }
}
