// Implements relevant types

import { string } from "@apimatic/schema";

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
  picture: string;
}

export interface ExhibitResponse {
  ourExhibitsCollection: {
    items: Exhibit[];
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
  image: string;
  url: string;
}

export interface BusinessHoursResponse {
  businessHoursCollection: {
    _typename: string;
    items: BusinessHours[];
  };
}
