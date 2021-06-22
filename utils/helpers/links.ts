import { builder, BuilderContent } from "@builder.io/react";
builder.init(process.env.NEXT_PUBLIC_BUILDER_IO_KEY as string);
/**
 * Gets information about every page that is made in Builder.io. This is used to sort the pages into different categories.
 * @returns An array of builder.io data.
 */
export const getDropdownLinks = async (): Promise<any[]> => {
  try {
    const results = await builder.getAll("page", {
      key: "pages:all",
      fields: "data",
      options: {
        noTargeting: true,
      },
    });
    return results;
  } catch (error) {
    return [];
  }
};
