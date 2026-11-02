'use client';

import { IconArrowLeft, IconRefresh, IconShoppingCart, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/store";
import { toast } from "sonner";
import { clearCart } from "../server/card.action";
import { cartActions, cartInitialValues } from "../slices/cart.slice";
import CardItems from "../components/CardItems";
import CardSummary from "../components/CardSummary";

export default function CardScreen() {
  const cart = useSelector((state: AppState) => state.cartReducer);
  const isAuthenticated = useSelector(
    (state: AppState) => state.authReducer.isAuthenticated,
  );
  const dispatch = useDispatch();
  const [isClearing, setIsClearing] = useState(false);

  async function handleClearCart() {
    if (isClearing) return;

    setIsClearing(true);
    try {
      const response = await clearCart();
      if (response.status === "error" || response.status === "fail") {
        toast.error(response.message);
        return;
      }

      toast.success(response.message || "Your cart has been cleared.");
      dispatch(
        cartActions.setCartInfo({ ...cartInitialValues, status: "success" }),
      );
    } catch (error) {
      console.error("Clearing the cart failed:", error);
      toast.error("Unable to clear your cart. Please try again.");
    } finally {
      setIsClearing(false);
    }
  }

  if (cart.status !== "success") {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <IconShoppingCart className="mx-auto text-primary-600" size={42} aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            {isAuthenticated ? "We couldn't load your cart" : "Sign in to view your cart"}
          </h1>
          <p className="mt-2 text-gray-500">
            {isAuthenticated
              ? cart.message || "Please try loading your cart again."
              : "Log in to see your saved items and continue to checkout."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {isAuthenticated ? (
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition hover:bg-primary-700"
                onClick={() => window.location.reload()}
              >
                <IconRefresh size={18} aria-hidden="true" />
                Try again
              </button>
            ) : (
              <Link
                href="/login?redirect=/cart"
                className="rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition hover:bg-primary-700"
              >
                Log in
              </Link>
            )}
            <Link
              href="/"
              className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const products = cart.data.products;

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-10">
      <div className="container-fluid mx-3 px-4">
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-primary-600">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-gray-900">Shopping Cart</span>
        </nav>

        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white">
                <IconShoppingCart size={23} aria-hidden="true" />
              </span>
              Shopping Cart
            </h1>
            <p className="mt-2 text-gray-500">
              You have{" "}
              <span className="font-semibold text-primary-600">
                {cart.numOfCartItems} {cart.numOfCartItems === 1 ? "item" : "items"}
              </span>{" "}
              in your cart
            </p>
          </div>
          {products.length > 0 && (
            <button
              type="button"
              disabled={isClearing}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleClearCart}
            >
              <IconTrash size={16} aria-hidden="true" />
              {isClearing ? "Clearing cart..." : "Clear all items"}
            </button>
          )}
        </header>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8">
            <section aria-label="Cart items" className="space-y-5 lg:col-span-2">
              {products.map((product) => (
                <CardItems key={product._id} productInfo={product} />
              ))}
              <Link
                href="/"
                className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-primary-600 transition hover:text-primary-700"
              >
                <IconArrowLeft size={16} aria-hidden="true" />
                Continue shopping
              </Link>
              
            </section>
            <CardSummary cardInfo={cart} isAuthenticated={isAuthenticated} />
          </div>
        ) : (
          <section className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
            <IconShoppingCart className="mx-auto text-gray-300" size={48} aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">
              Browse the shop and add something you love.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition hover:bg-primary-700"
            >
              <IconArrowLeft size={17} aria-hidden="true" />
              Start shopping
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
