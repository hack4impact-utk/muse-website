import { builder } from "@builder.io/react";
builder.init(process.env.NEXT_PUBLIC_BUILDER_IO_KEY as string);
export const getDropdownLinks = async (
  category: string
): Promise<unknown[]> => {
  try {
    let results = await builder.getAll("page", {
      key: "pages:all",
      fields: "data",
      options: {
        noTargeting: true,
      },
    });
    console.log("Results:", results);
    return results;
  } catch (error) {
    return [];
  }
};
