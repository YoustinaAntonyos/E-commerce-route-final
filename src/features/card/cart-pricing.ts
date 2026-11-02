export const FREE_SHIPPING_THRESHOLD = 500;
export const SHIPPING_FEE = 50;

export function getShippingCost(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}
