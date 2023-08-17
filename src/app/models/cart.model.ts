export interface CartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  id: string;
}

export interface Cart {
  items: CartItem[];
}
