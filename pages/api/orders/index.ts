import { NextApiRequest, NextApiResponse } from "next";
import { CartItem } from "utils/types";
import { getItemsFromCart } from "server/actions/Cart";
import { createCheckout } from "server/actions/Square/Orders";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method === "PUT") {
      if (!req.cookies.cart) {
        res.status(404).json({
          success: false,
          payload: [] as CartItem[],
        });
      } else {
        const items = await getItemsFromCart(req.cookies.cart);
        const checkoutUrl = await createCheckout(items);
        //If we've got the checkoutUrl, then we can delete the cart cookie. Might have to be changed later.
        if (checkoutUrl) {
          res.setHeader("Set-Cookie", "cart=; Max-Age=0; SameSite=Lax; Path=/");
        }
        res.status(200).json({
          success: true,
          payload: checkoutUrl,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      payload: error as Error,
    });
  }
}
