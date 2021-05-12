import { NextApiRequest, NextApiResponse } from "next";
import { CartItem } from "utils/types";
import cookie from "cookie";
import {
  getItemsFromCart,
  signCookie,
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "server/actions/Cart";

//This lets Next know that we are resolving the requests, otherwise Next will throw an error saying we haven't handled our responses properly.
export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    //Get items from the cart.
    if (req.method === "GET") {
      //If the cart cookie doesn't exist, then we can't return anything.
      if (!req.cookies.cart) {
        res.status(404).json({
          success: false,
          payload: [] as CartItem[],
        });
        return;
      }
      const items = await getItemsFromCart(req.cookies.cart);
      res.status(200).json({
        success: true,
        payload: items,
      });
    }

    //Add to the cart. Generate the cart cookie if it doesn't exist.
    if (req.method === "PUT") {
      const item = JSON.parse(req.body) as CartItem;

      //If the cart cookie doesn't exist, then generate it.
      if (!req.cookies.cart) {
        const jwt = signCookie([item]);
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("cart", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 2592000000, //Make the cart last a month (can be adjusted later if necessary)
            path: "/",
          })
        );

        res.status(200).json({
          success: true,
          payload: {},
        });
        return;
      }
      //If the cart cookie does already exist, then we can just add to it.
      const updatedCart: CartItem[] = addToCart(req.cookies.cart, item);
      const jwt = signCookie(updatedCart);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("cart", jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 2592000000, //Make the cart last a month (can be adjusted later if necessary)
          path: "/",
        })
      );
      res.status(200).json({
        success: true,
        payload: {},
      });
    }

    //Update the quantity of an item in the cart. This is used on the cart page before a user goes to checkout.
    if (req.method === "PATCH") {
      const itemToUpdate: CartItem = JSON.parse(req.body) as CartItem;
      //We can't update an item in the cart if the cart doesn't exist!
      if (!req.cookies.cart) {
        res.status(404).json({
          success: false,
          payload: {},
        });
        return;
      }

      const updatedCart = updateCartQuantity(req.cookies.cart, itemToUpdate);
      const jwt = signCookie(updatedCart);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("cart", jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 2592000000, //Make the cart last a month (can be adjusted later if necessary)
          path: "/",
        })
      );
      res.status(200).json({
        success: true,
        payload: {},
      });
    }

    //Remove an item from the Cart.
    if (req.method === "DELETE") {
      const itemToDelete = JSON.parse(req.body) as CartItem;
      if (!req.cookies.cart) {
        res.status(404).json({
          success: false,
          payload: {},
        });
        return;
      }
      const updatedCart: CartItem[] = removeFromCart(
        req.cookies.cart,
        itemToDelete
      );
      const jwt = signCookie(updatedCart);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("cart", jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 2592000000, //Make the cart last a month (can be adjusted later if necessary)
          path: "/",
        })
      );
      res.status(200).json({
        success: true,
        payload: {},
      });
    }
  } catch (error) {
    //Any errors that occur in the API are sent here.
    console.error(error as Error);
    res.status(500).json({
      success: false,
      payload: [],
    });
  }
}
