'use client';

import { IconCheck, IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { removeFromCart, updateProductQuantity } from "../server/card.action";
import { cartActions } from "../slices/cart.slice";
import { CartItem } from "../types/cart.type";

export default function CardItems({ productInfo }: { productInfo: CartItem }) {
  const { count, price, product } = productInfo;
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  async function handleUpdate(newCount: number) {
    if (newCount < 1 || newCount > product.quantity || isUpdating) return;

    setIsUpdating(true);
    try {
      const response = await updateProductQuantity(product.id, newCount);
      if (response.status !== "success") {
        toast.error(response.message || "Unable to update your cart.");
        return;
      }

      dispatch(cartActions.setCartInfo(response));
    } catch (error) {
      console.error("Cart quantity update failed:", error);
      toast.error("Unable to update the quantity. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleRemove() {
    if (isRemoving) return;

    setIsRemoving(true);
    try {
      const response = await removeFromCart(product.id);
      if (response.status !== "success") {
        toast.error(response.message || "Unable to remove this item.");
        return;
      }

      toast.success(response.message || "Item removed from your cart.");
      dispatch(cartActions.setCartInfo(response));
    } catch (error) {
      console.error("Cart item removal failed:", error);
      toast.error("Unable to remove this item. Please try again.");
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-stretch sm:gap-7">
        <div className="flex items-start gap-4 sm:block">
          <Link href={`/products/${product._id}`} className="group shrink-0">
            <div className="h-28 w-28 overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 sm:h-40 sm:w-40">
              <img
                src={product.imageCover}
                alt={product.title}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
              
            </div>
            <div className="relative">
              <span className="inline-flex items-center absolute -bottom-6 right-0 gap-1 rounded-full bg-green-500 px-2.5 py-1 text-xs font-semibold text-white sm:ml-auto sm:mt-5">
            <IconCheck size={14} aria-hidden="true" />
            In Stock
          </span>
            </div>
            
          </Link>
          
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div>
            <Link href={`/products/${product.id}`} className="hover:text-primary-700">
              <h2 className="text-lg font-semibold leading-snug text-gray-900 sm:text-xl">
                {product.title}
              </h2>
            </Link>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span className="rounded-full bg-primary-50 px-3 py-1 font-medium text-primary-700">
                {product.category.name}
              </span>
              {product.sku && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>SKU: {product.sku}</span>
                </>
              )}
            </div>
          </div>

          <p className="mt-4 text-lg font-bold text-primary-600">
            {price} EGP <span className="ml-1 text-sm font-normal text-gray-400">per unit</span>
          </p>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1">
              <button
                type="button"
                aria-label={`Decrease ${product.title} quantity`}
                disabled={count <= 1 || isUpdating || isRemoving}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm transition-colors hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => handleUpdate(count - 1)}
              >
                <IconMinus size={16} aria-hidden="true" />
              </button>
              <span aria-live="polite" className="w-12 text-center font-semibold text-gray-900">
                {count}
              </span>
              <button
                type="button"
                aria-label={`Increase ${product.title} quantity`}
                disabled={count >= product.quantity || isUpdating || isRemoving}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => handleUpdate(count + 1)}
              >
                <IconPlus size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Total</p>
                <p className="text-xl font-bold text-gray-900">
                  {count * price}
                  <span className="ml-1 text-sm font-medium text-gray-400">EGP</span>
                </p>
              </div>
              <button
                type="button"
                aria-label={`Remove ${product.title} from cart`}
                title="Remove item"
                disabled={isRemoving || isUpdating}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 transition-colors hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleRemove}
              >
                <IconTrash size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
