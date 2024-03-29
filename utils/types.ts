import { CatalogItemOptionValueForItemVariation } from "square";

// Implements relevant types
export interface Item {
  name: string;
  id: string;
  selectedVariationFromCart?: ItemVariation;
  description: string;
  imageUrl: string;
  category: string;
  variations: ItemVariation[];
  quantity: number;
  options: unknown;
}

export interface ItemVariation {
  name: string;
  id: string;
  itemId?: string;
  price: string;
  stockStatus: string | Promise<string>;
  itemOptionValues?: CatalogItemOptionValueForItemVariation[];
}

export interface ItemOption {
  id: string;
  name?: string;
  values?: ItemValues[];
}

export interface ItemValues {
  id?: string;
  name?: string;
  ordinal: number;
}
export interface Exhibit {
  id: string;
  name: string;
  description: string;
  picture: {
      url: string;
  };
}

export interface BusinessHours {
  daysOpen: string[];
  daysClosed: string[];
  hours: string[];
}

export interface Partner {
  id: string;
  name: string;
  image: {
    url: string;
  };
  url: string;
}

export interface BusinessHoursResponse {
  businessHoursCollection: {
    _typename: string;
    items: BusinessHours[];
  };
}

export interface EmailMessage {
  userName?: string;
  message?: string;
  email?: string;
  subject?: string;
  phoneNumber?: string;
}

export interface PartnersResponse {
  partnersCollection: {
    _typename: string;
    items: Partner[];
  };
}

export interface Cart {
  items: CartItem[];
  //Parts of the cookie
  iat: number;
  exp: number;
}

export interface CartItem {
  id: string;
  quantity: number;
  //Might be needed later for something like shirt size or color, not sure yet.
  variation: ItemVariation;
}

export interface CartAPIResponse {
  success: boolean;
  payload: Item[];
}

//Order Line Item
export interface OLItem {
  id: string;
  name: string;
  quantity: string;
  basePriceMoney: {
    amount: bigint;
    currency: string;
  };
}
