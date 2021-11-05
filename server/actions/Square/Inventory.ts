import { getAccessToken } from ".";
import { Client, Environment, InventoryCount } from "square";
const client = new Client({
  environment: Environment.Sandbox,
});

export const getStockStatus = async (
  itemVariationId: string
): Promise<string> => {
  //I'm not going to be using Square's stock status to manage the low stock alerts. Instead, if any item has less than 5 stock, then it is "low stock", and any item with a stock of "0" is out of stock.
  const token = await getAccessToken();
  const newClient = client.withConfiguration({
    accessToken: token,
  });

  const response = await newClient.inventoryApi.retrieveInventoryCount(
    itemVariationId
  );
  const count =
    response.result.counts &&
    response.result.counts.length > 0 &&
    (response?.result?.counts)[0];
  if (count && parseInt(count.quantity as string) == 0) {
    return "OUT_OF_STOCK";
  }
  if (
    count &&
    parseInt(count.quantity as string) > 0 &&
    parseInt(count.quantity as string) <= 5
  ) {
    return "LOW_STOCK";
  }
  return "IN_STOCK";
};
