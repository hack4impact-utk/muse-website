import { Client, Environment, CatalogObject } from "square";
import { getAccessToken } from ".";
import { Item, ItemOption, ItemVariation } from "utils/types";
import { getStockStatus } from "./Inventory";
const client = new Client({
  environment: Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN as string,
});

/**
 * Retrieves items in a given category from Square
 * @params category The name of the categories.
 * @returns An array of item within the given categories.
 */
export const getItemsByCategory = async (
  categories: string[]
): Promise<Item[]> => {
  try {
    const token = await getAccessToken();
    const newClient = client.withConfiguration({
      accessToken: token,
    });
    const ids = await Promise.all(
      categories.map(category => getCategoryID(category))
    );
    const response = await newClient.catalogApi.searchCatalogItems({
      categoryIds: ids,
    });
    return Promise.all(
      (response?.result?.items as CatalogObject[]).map(item => formatItem(item))
    );
  } catch (error: unknown) {
    if (error) {
      console.error(error as Error);
    }
    return [] as Item[];
  }
};
/**
 * Retrieves an item from Square when given its ID.
 * @params id The id of the item.
 * @returns The item from Square if successful, or an empty object if unsuccessful.
 *
 */
export const getItemByID = async (id: string): Promise<Item> => {
  try {
    const token = await getAccessToken();
    const newClient = client.withConfiguration({
      accessToken: token,
    });

    const response = await newClient.catalogApi.retrieveCatalogObject(id);
    return await formatItem(response.result.object as CatalogObject);
  } catch (error: unknown) {
    if (error) {
      console.error(error as Error);
    }
    return {} as Item;
  }
};

/**
 * Batch retrieves an array of items by ID.
 * @param ids - The array of item IDs to be batch retrieved.
 * @returns An array of formatted items that were retrieved from Square.
 *
 */

export const batchGetItemsByID = async (ids: string[]): Promise<Item[]> => {
  const token = await getAccessToken();
  const newClient = client.withConfiguration({
    accessToken: token,
  });
  const response = await newClient.catalogApi.batchRetrieveCatalogObjects({
    objectIds: ids,
  });

  return Promise.all(
    (response.result.objects as CatalogObject[]).map(item => formatItem(item))
  );
};

/**
 * Takes in the name of a category and retrieves its ID.
 * @params name The name of the category.
 * @returns The id of the category if successful, or an empty string if unsuccessful.
 */
const getCategoryID = async (name: string): Promise<string> => {
  try {
    const token = await getAccessToken();
    const newClient = client.withConfiguration({
      accessToken: token,
    });
    const response = await newClient.catalogApi.searchCatalogObjects({
      objectTypes: ["CATEGORY"],
      includeDeletedObjects: false,
      includeRelatedObjects: false,
      query: {
        exactQuery: {
          attributeName: "name",
          attributeValue: name,
        },
      },
    });
    return (response?.result?.objects as CatalogObject[])[0].id;
  } catch (error: unknown) {
    if (error) {
      console.error(error as Error);
    }
    return "";
  }
};
/**
 * Retrieves a category's name from its ID. (Square doesn't store category name on items).
 * @param id The id of the category.
 * @returns The name of the category if successful, or a blank string if unsuccessful.
 */
export const getCategoryNameByID = async (id: string): Promise<string> => {
  try {
    const token = await getAccessToken();
    const newClient = client.withConfiguration({
      accessToken: token,
    });
    const response = await newClient.catalogApi.retrieveCatalogObject(id);
    return response.result.object?.categoryData?.name as string;
  } catch (error: unknown) {
    if (error) {
      console.error(error as Error);
    }
    return "";
  }
};
/**
 * Retrieves the url of an item's image from Square.
 * @param imageId The image ID of an item.
 * @returns The url of the image.
 */
const getImageURL = async (imageId: string): Promise<string> => {
  try {
    const token = await getAccessToken();
    const newClient = client.withConfiguration({
      accessToken: token,
    });
    const response = await newClient.catalogApi.retrieveCatalogObject(imageId);
    return response.result.object?.imageData?.url as string;
  } catch (error: unknown) {
    if (error) {
      console.log(error as Error);
    }
    return "";
  }
};
export const getItemOptions = async (item: CatalogObject): Promise<unknown> => {
  try {
    const token = await getAccessToken();
    const newClient = client.withConfiguration({
      accessToken: token,
    });
    const ids = item.itemData?.itemOptions?.map(option => {
      return option.itemOptionId;
    });
    const response = await newClient.catalogApi.batchRetrieveCatalogObjects({
      objectIds: ids as string[],
    });
    return response.result?.objects?.map(option => {
      return {
        id: option.id,
        name: option.itemOptionData?.displayName, //This is like "Color, Size, etc."
        values: option.itemOptionData?.values?.map(optionValue => {
          return {
            id: optionValue.id,
            name: optionValue.itemOptionValueData?.name, //This is like "Green, Blue, Red, etc."
            ordinal: optionValue.itemOptionValueData?.ordinal, //What position that value appears in a list.
          };
        }),
      };
    }) as ItemOption[];
  } catch (error: unknown) {
    if (error) {
      console.log(error as Error);
    }
    return {} as ItemOption[];
  }
};

/**
 * Format an item from Square for easier use.
 * @params squareItem The raw Square API response item.
 * @returns A object of type Item that contains data from the Square API in an easier to use format.
 */
const formatItem = async (squareItem: CatalogObject): Promise<Item> => {
  try {
    const formattedItem: Item = {
      id: squareItem.id,
      name: (squareItem.itemData?.name as string) || "No name found.",
      description: squareItem.itemData?.description || "No description found",
      category: await getCategoryNameByID(
        squareItem.itemData?.categoryId as string
      ),
      imageUrl: squareItem.imageId ? await getImageURL(squareItem.imageId) : "",
      quantity: 0,
      variations: squareItem.itemData?.variations
        ? await Promise.all(
            squareItem.itemData.variations.map(async variation => {
              const formattedVariation: ItemVariation = {
                id: variation.id,
                name:
                  variation.itemVariationData?.name ||
                  "No variation name found",
                price: (
                  Number(
                    variation.itemVariationData?.priceMoney?.amount as bigint
                  ) / 100
                ).toFixed(2),
                stockStatus: await getStockStatus(variation.id),
              };
              if (variation.itemVariationData?.itemOptionValues != undefined) {
                formattedVariation.itemOptionValues =
                  variation.itemVariationData?.itemOptionValues;
              }
              return formattedVariation;
            })
          )
        : ({} as ItemVariation[]),
      options:
        squareItem.itemData?.itemOptions &&
        squareItem.itemData?.itemOptions?.length > 0
          ? await getItemOptions(squareItem)
          : {},
    };
    return formattedItem;
  } catch (error: unknown) {
    if (error) {
      console.error(error as Error);
    }
    return {} as Item;
  }
};
