import { verify, Secret, sign } from "jsonwebtoken";
import { Cart, CartItem, Item } from "utils/types";
import { batchGetItemsByID } from "server/actions/Square/Catalog";
const secret: Secret = process.env.JWTSECRET as string;

/**
 * Fetches an array of Items from Square from the IDs that are stored in the cart cookie.
 * @param cookie The cart cookie that is to be retrieved from.
 * @returns An array of Items to be displayed on the cart page.
 */
export const getItemsFromCart = async (cookie: string): Promise<Item[]> => {
  const cart = getCookieBody(cookie);
  if (cart.length > 0) {
    const items = await batchGetItemsByID(cart.map(item => item.id));
    //Map the quantity to the items.
    cart.forEach(cartItem => {
      items.forEach(item => {
        if (cartItem.id == item.id) {
          item.quantity = cartItem.quantity;
        }
      });
    });

    return items;
  } else {
    return [] as Item[];
  }
};

/**
 * Adds adds an item to the cart. If the item is in the cart already, then the item's quantity is updated. Otherwise, the item is added to the CartItem[].
 *@param cookie The cookie that the body is to be retrieved from
 *@param item The item to add to the cart.
 *@returns The updated CartItem[] including the item that was passed in.
 */
export const addToCart = (cookie: string, item: CartItem): CartItem[] => {
  const cart = getCookieBody(cookie);
  let duplicate = false;
  //If the item is already in the cart, increment its quantity by the quantity specified in the new item.
  cart.forEach(i => {
    if (i.id == item.id) {
      //If the item has no quantity (shouldn't happen), then don't add anything to it.
      i.quantity += item.quantity ? item.quantity : 0;
      duplicate = true;
    }
  });
  if (!duplicate) {
    cart.push(item);
  }

  return cart;
};

/**
 * Search through the cart and update an item's quantity if it is in there.
 * @param cookie The cart cookie that is to be retrieved from
 * @param item The item whose quantity needs updating.
 * @returns An updated array of CartItems.
 */
export const updateCartQuantity = (
  cookie: string,
  item: CartItem
): CartItem[] => {
  const cart = getCookieBody(cookie);
  //Find the item in the cart and change its quantity to the quantity of the item passed in.
  cart.forEach(i => {
    if (i.id === item.id) {
      i.quantity = item.quantity;
    }
  });
  return cart;
};

/**
 * Removes an item from the cart cookie.
 * @param cookie The cart cookie that is to be retrieved from.
 * @param item The item that is to be deleted from the cart.
 * @returns An updated cart with an item removed.
 */
export const removeFromCart = (cookie: string, item: CartItem): CartItem[] => {
  const cart = getCookieBody(cookie);

  cart.splice(cart.indexOf(item));

  return cart;
};

/**
 * This prepares the JWT for the cookie header.
 * @param body The array of CartItems to be put in the new JWT.
 * @returns the JWT that is to be used in the "Set-Cookie" header
 */
export const signCookie = (body: CartItem[]): string => {
  return sign({ items: body }, secret, {
    expiresIn: "30d",
  });
};

/**
 * Retrieve the body from the cookie if the cookie is valid.
 * @param cookie The cart cookie that the body is to be retrieved from.
 * @returns The body of the cookie if the cookie is valid.
 */
export const getCookieBody = (cookie: string): CartItem[] => {
  let body: CartItem[] = [] as CartItem[];
  verify(cookie, secret, (error, decoded) => {
    if (!error && decoded) {
      body = (decoded as Cart).items;
    }
  });

  return body;
};
