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
