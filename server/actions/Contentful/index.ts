import { createClient } from "contentful-management";
const client = createClient({
  accessToken: process.env.REACT_APP_DELIVERY_KEY as string,
});

//TODO Delete this export and fill out this file with functions relating to the Contentful API.
//Be sure to export major functions by using the "export" keyword before your function definition.
//Ex: export async function <function_name> () {}
export {};
