// Implements relevant types

export interface Item {
  name: string;
  id: string;
  description: string;
  imageUrl: string;
  category: string;
  variations: ItemVariation[];
  quantity: number;
}

export interface ItemVariation {
  name: string;
  id: string;
  price: string;
}

export interface Exhibit {
  id: string;
  name: string;
  description: string;
  image: string;
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
  variation?: undefined;
}
