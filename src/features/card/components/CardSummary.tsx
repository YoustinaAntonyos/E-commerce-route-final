import {
  IconArrowLeft,
  IconCheck,
  IconLock,
  IconShoppingBag,
  IconTruckDelivery,
} from "@tabler/icons-react";
import Link from "next/link";
import { CartValuesTypes } from "../slices/cart.slice";
import {
  FREE_SHIPPING_THRESHOLD,
  getShippingCost,
} from "../cart-pricing";

export default function CardSummary({
  cardInfo,
  isAuthenticated,
}: {
  cardInfo: CartValuesTypes;
  isAuthenticated: boolean;
}) {
  const { data, numOfCartItems } = cardInfo;
  const { totalCartPrice } = data;
  const shipping = getShippingCost(totalCartPrice);
  const remainingForFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - totalCartPrice,
    0,
  );
  const shippingProgress = Math.min(
    (totalCartPrice / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );

  return (
    <aside className="sticky top-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-5 text-white">
        <h2 className="flex items-center gap-3 text-xl font-bold">
          <IconShoppingBag size={22} aria-hidden="true" />
          Order Summary
        </h2>
        <p className="mt-1 text-primary-100">
          {numOfCartItems} {numOfCartItems === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="space-y-6 p-6">
        <div
          className="rounded-2xl bg-amber-50 px-5 py-4"
          aria-live="polite"
        >
          <p className="flex items-center gap-3 text-sm font-medium text-gray-700">
            <IconTruckDelivery
              size={22}
              className="shrink-0 text-orange-500"
              aria-hidden="true"
            />
            {remainingForFreeShipping > 0
              ? `Add ${remainingForFreeShipping} EGP for free shipping`
              : "You unlocked free shipping!"}
          </p>
          <div
            className="mt-3 h-2.5 overflow-hidden rounded-full bg-amber-100"
            role="progressbar"
            aria-label="Progress toward free shipping"
            aria-valuemin={0}
            aria-valuemax={FREE_SHIPPING_THRESHOLD}
            aria-valuenow={Math.min(totalCartPrice, FREE_SHIPPING_THRESHOLD)}
          >
            <div
              className="h-full rounded-full bg-amber-400 transition-all duration-300"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        <div className="space-y-4 text-gray-600">
          <div className="flex justify-between gap-4">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">{totalCartPrice} EGP</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Shipping</span>
            <span className={`font-medium ${shipping === 0 ? "text-primary-600" : "text-gray-900"}`}>
              {shipping === 0 ? "FREE" : `${shipping} EGP`}
            </span>
          </div>
          <hr className="border-dashed border-gray-200" />
          <div className="flex items-center justify-between gap-4 text-gray-900">
            <span className="font-semibold">Total</span>
            <span className="text-3xl font-bold">
              {totalCartPrice + shipping}
              <span className="ml-1 text-sm font-medium text-gray-500">EGP</span>
            </span>
          </div>
        </div>

        {isAuthenticated ? (
          <Link
            href="/checkout"
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-4 text-lg font-bold text-white shadow-lg shadow-primary-600/20 transition hover:from-primary-700 hover:to-primary-800"
          >
            <IconLock size={19} aria-hidden="true" />
            Secure Checkout
          </Link>
        ) : (
          <Link
            href="/login?redirect=/cart"
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-4 text-lg font-bold text-white shadow-lg shadow-primary-600/20 transition hover:from-primary-700 hover:to-primary-800"
          >
            <IconLock size={19} aria-hidden="true" />
            Login to Checkout
          </Link>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-b border-gray-100 pb-5 text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <IconCheck size={16} className="text-primary-600" aria-hidden="true" />
            Secure Payment
          </span>
          <span className="hidden h-4 border-l border-gray-200 sm:block" />
          <span className="flex items-center gap-2">
            <IconTruckDelivery size={16} className="text-blue-500" aria-hidden="true" />
            Fast Delivery
          </span>
        </div>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 font-medium text-primary-600 transition hover:text-primary-700"
        >
          <IconArrowLeft size={16} aria-hidden="true" />
          Continue Shopping
        </Link>
      </div>
    </aside>
  );
}
