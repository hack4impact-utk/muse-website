import { v4 as uuidv4 } from "uuid";
import { Client, Environment } from "square";
import { Item, OLItem } from "utils/types";
import { getAccessToken } from ".";
import urls from "utils/urls";
const client = new Client({
  environment:
    process.env.NODE_ENV === "production"
      ? Environment.Production
      : Environment.Sandbox, // ! This will have to be changed in production.
});

/**
 * Create a checkout link to redirect the user to for payment.
 * @param items the items to be placed in the order.
 */
export const createCheckout = async (items: Item[]): Promise<string> => {
  const token = await getAccessToken();
  const newClient = client.withConfiguration({
    accessToken: token,
  });
  const idempotency = uuidv4();
  const orderItems = createOrderLineObjects(items);
  const response = await newClient.checkoutApi.createCheckout(
    process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID as string,
    {
      idempotencyKey: idempotency,
      order: {
        idempotencyKey: uuidv4(),
        order: {
          locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID as string,
          lineItems: orderItems,
          //Shipping and handling has to be applied as a tax for it to show up in the checkout form.
          //TODO: Taxes from the MUSE
          //? Should we have shipping address be provided before payment?
          state: "OPEN",
        },
      },
      merchantSupportEmail: "testing@museknoxville.org",
      askForShippingAddress: true,
      redirectUrl: `${urls.baseUrl}${urls.api.completeOrder}`
    }
  );

  return response.result.checkout?.checkoutPageUrl as string;
};

//! Might have to do some error handling later down the line to make sure this stuff is set properly.
const createOrderLineObjects = (items: Item[]): OLItem[] => {
  const orderItems: OLItem[] = [];

  items.forEach(item => {
    const orderLineItem = {
      id: item.id,
      name: `${item.name} (${item.selectedVariationFromCart?.name})`,
      quantity: item.quantity?.toString(),
      //Amount has to be converted into a BigInt to be compatible with Square's default OrderLineItem type.
      basePriceMoney: {
        amount: BigInt(parseFloat(item.selectedVariationFromCart?.price as string) * 100), //Convert to integer
        currency: "USD",
      },
    } as OLItem;
    orderItems.push(orderLineItem);
  });
  return orderItems;
};
