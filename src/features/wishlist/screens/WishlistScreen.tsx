
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import {
  IconHeart,
  IconShoppingCart,
  IconTrash,
  IconArrowLeft,
  IconRefresh,
} from '@tabler/icons-react';
import { AppState } from '@/store/store';
import { addProductToCart } from '@/features/card/server/card.action';
import { cartActions } from '@/features/card/slices/cart.slice';
import { removeFromWishlist } from '../server/wishlist.action';
import { syncWishlist } from '../utils/syncWishlist';

export default function WishlistScreen() {
  // Wishlist items data array for clean mapping
  const wishlist = useSelector((state: AppState) => state.wishlistReducer);
  const isAuthenticated = useSelector(
    (state: AppState) => state.authReducer.isAuthenticated,
  );
  const dispatch = useDispatch();
  const [busyProductId, setBusyProductId] = useState<string | null>(null);

  async function handleRemove(productId: string) {
    if (busyProductId) return;

    setBusyProductId(productId);
    try {
      const response = await removeFromWishlist(productId);
      if (response.status !== 'success') {
        toast.error(response.message);
        return;
      }

      const refreshed = await syncWishlist(
        dispatch,
        wishlist.data.filter((product) => product._id !== productId),
      );
      toast.success(response.message || 'Item removed from your wishlist.');
      if (!refreshed) {
        toast.error("The item was removed, but your wishlist couldn't be refreshed.");
      }
    } catch (error) {
      console.error('Wishlist item removal failed:', error);
      toast.error('Unable to remove this item. Please try again.');
    } finally {
      setBusyProductId(null);
    }
  }

  async function handleAddToCart(productId: string) {
    if (busyProductId) return;

    setBusyProductId(productId);
    try {
      const response = await addProductToCart(productId);
      if (response.status !== 'success') {
        toast.error(response.message || 'Unable to add this item to your cart.');
        return;
      }

      dispatch(cartActions.setCartInfo(response));
      toast.success(response.message || 'Item added to your cart.');
    } catch (error) {
      console.error('Adding wishlist item to cart failed:', error);
      toast.error('Unable to add this item to your cart. Please try again.');
    } finally {
      setBusyProductId(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      
      {/* Header Banner */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-fluid mx-3 px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link className="hover:text-primary-600 transition-colors" href="/">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Wishlist</span>
          </nav>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <IconHeart className="w-6 h-6 text-red-500 fill-red-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                <p className="text-gray-500 text-sm">
                  {wishlist.data.length} {wishlist.data.length === 1 ? 'item' : 'items'} saved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content / Table */}
      <div className="container-fluid mx-3 px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-100">
            {!isAuthenticated ? (
              <div className="px-6 py-16 text-center">
                <IconHeart className="mx-auto h-12 w-12 text-gray-300" />
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  Sign in to view your wishlist
                </h2>
                <p className="mt-2 text-gray-500">
                  Log in to see the products you have saved.
                </p>
                <Link
                  href="/login?redirect=/wishlist"
                  className="mt-6 inline-flex rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition hover:bg-primary-700"
                >
                  Sign in
                </Link>
              </div>
            ) : wishlist.status !== 'success' ? (
              <div className="px-6 py-16 text-center">
                <IconHeart className="mx-auto h-12 w-12 text-gray-300" />
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  We couldn&apos;t load your wishlist
                </h2>
                <p className="mt-2 text-gray-500">
                  {wishlist.message || 'Please try loading your wishlist again.'}
                </p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition hover:bg-primary-700"
                >
                  <IconRefresh size={18} aria-hidden="true" />
                  Try again
                </button>
              </div>
            ) : wishlist.data.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <IconHeart className="mx-auto h-12 w-12 text-gray-300" />
                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  Your wishlist is empty
                </h2>
                <p className="mt-2 text-gray-500">
                  Save products you love and they will show up here.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-flex rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition hover:bg-primary-700"
                >
                  Start shopping
                </Link>
              </div>
            ) : wishlist.data.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors"
              >
                
                {/* Product Info */}
                <div className="md:col-span-6 flex items-center gap-4">
                  <Link
                    className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center"
                    href={`/products/${item._id}`}
                  >
                    <img
                      alt={item.title}
                      className="w-full h-full object-contain p-2"
                      src={item.imageCover}
                    />
                  </Link>
                  <div className="min-w-0">
                    <Link
                      className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
                      href={`/products/${item._id}`}
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-400 mt-1">
                      {item.category?.name || 'Product'}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                  <span className="md:hidden text-sm text-gray-500">Price:</span>
                  <div className="text-right md:text-center">
                    <div className="font-semibold text-gray-900">
                      {item.priceAfterDiscount ?? item.price} EGP
                    </div>
                    {item.priceAfterDiscount && (
                      <div className="text-sm text-gray-400 line-through">
                        {item.price} EGP
                      </div>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="md:col-span-2 flex md:justify-center items-center">
                  <span className="md:hidden text-sm text-gray-500 mr-2">
                    Status:
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                    item.quantity > 0
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      item.quantity > 0 ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Actions */}
                <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                  <button
                    type="button"
                    disabled={busyProductId !== null || item.quantity <= 0}
                    onClick={() => handleAddToCart(item._id)}
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-primary-600 text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <IconShoppingCart className="w-4 h-4" />
                    <span className="md:hidden lg:inline">
                      {busyProductId === item._id ? 'Adding...' : 'Add to Cart'}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
                    title="Remove"
                    aria-label={`Remove ${item.title} from wishlist`}
                    disabled={busyProductId !== null}
                    onClick={() => handleRemove(item._id)}
                  >
                    <IconTrash className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Continue Shopping Link */}
        <div className="mt-8 flex items-center justify-between">
          <Link
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 text-sm font-medium transition-colors"
            href="/shop"
          >
            <IconArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}