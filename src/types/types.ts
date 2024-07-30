export type MenuType = {
  message: string;
  data?: {
    id: string;
    slug: string;
    title: string;
    desc?: string;
    img?: string;
    color: string;
  }[];
};

export type ProductsType = {
  message: string;
  data?: {
    id: string;
    title: string;
    desc?: string;
    img: string;
    price: number;
    options?: { title: string; additionalPrice: number }[];
  }[];
};

export type OrderType = {
  id: string;
  createdAt: string;
  product: CartItemType[];
  status: string;
  price: number;
};
export type CartItemType = {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  optionTitle?: string;
  quantity: number;
};

export type CartType = {
  products: CartItemType[];
  totalItems: number;
  totalPrice: number;
};

export type SingleProductType = {
  message: string;
  data?: {
    id: string;
    title: string;
    desc?: string;
    img?: string;
    price: number;
    options?: { title: string; additionalPrice: number }[];
  };
};

export type ActionTypes = {
  addTocart: (item: CartItemType) => void;
  removeFromcart: (item: CartItemType) => void;
  removeAllFromcart: () => void;
};
