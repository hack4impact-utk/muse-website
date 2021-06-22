import { NextApiRequest, NextApiResponse } from "next";
import { getDropdownLinks } from "utils/helpers/links";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const links = await getDropdownLinks();

        res.status(200).json({
            payload: links,
        })

    } catch (error) {
        res.status(500).json({
            payload: [],
        })
    }
}
