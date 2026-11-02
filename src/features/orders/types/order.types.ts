export interface OrderShippingAddress {
  phone: string;
  city: string;
  details: string;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface OrderCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface OrderBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface OrderProduct {
  subcategory: OrderSubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: OrderCategory;
  brand: OrderBrand;
  ratingsAverage: number;
  id: string;
}

export interface OrderCartItem {
  count: number;
  _id: string;
  product: OrderProduct;
  price: number;
}

export interface Order {
  shippingAddress: OrderShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: OrderUser;
  cartItems: OrderCartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
}

export type UserOrdersResponse = Order[];
