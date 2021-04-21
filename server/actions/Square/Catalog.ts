import { Client, Environment, CatalogObject } from "square";
import { getAccessToken } from ".";
import { Item, ItemVariation } from "utils/types";
const client = new Client({
  environment: Environment.Sandbox,
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
        ? squareItem.itemData.variations.map(variation => {
            const formattedVariation: ItemVariation = {
              id: variation.id,
              name:
                variation.itemVariationData?.name || "No variation name found",
              price: (
                (variation.itemVariationData?.priceMoney?.amount as number) /
                100
              ).toFixed(2),
            };
            return formattedVariation;
          })
        : ({} as ItemVariation[]),
    };
    return formattedItem;
  } catch (error: unknown) {
    if (error) {
      console.error(error as Error);
    }
    return {} as Item;
  }
};
