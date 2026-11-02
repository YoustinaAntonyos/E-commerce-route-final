"use client";

import { useMemo, useState } from "react";
import {
  IconHeart,
  IconRefresh,
  IconShieldHalfFilled,
  IconShoppingCart,
  IconTruck,
} from "@tabler/icons-react";
import { Product } from "../../types/products.type";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/store";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/features/wishlist/server/wishlist.action";
import { syncWishlist } from "@/features/wishlist/utils/syncWishlist";
import { toast } from "sonner";
import {
  addProductToCart,
  updateProductQuantity,
} from "@/features/card/server/card.action";
import { cartActions } from "@/features/card/slices/cart.slice";


export default function ProductInfo({ productInfo }: { productInfo: Product }) {
  const {
    _id,
    brand,
    category,
    imageCover,
    images,
    title,
    description,
    price,
    priceAfterDiscount,
    quantity,
    ratingsAverage,
    ratingsQuantity,
    sold,
  } = productInfo;

//   const [selectedImage, setSelectedImage] = useState(imageCover);
  const [quantityValue, setQuantityValue] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state: AppState) => state.cartReducer);
  const wishlistProducts = useSelector(
    (state: AppState) => state.wishlistReducer.data,
  );
  const isInWishlist = wishlistProducts.some((product) => product._id === _id);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const currentPrice = priceAfterDiscount ?? price;
  const totalPrice = useMemo(() => currentPrice * quantityValue, [currentPrice, quantityValue]);

//   const gallery = images?.length ? [imageCover, ...images] : [imageCover];

  const decrementQty = () => setQuantityValue((prev) => Math.max(1, prev - 1));
  const incrementQty = () => setQuantityValue((prev) => Math.min(quantity || 1, prev + 1));

  async function handleAddToCart() {
    if (isAddingToCart) return;
    if (quantityValue > quantity) {
      toast.error("The selected quantity exceeds the available stock.");
      return;
    }

    setIsAddingToCart(true);
    try {
      const currentCartItem = cart.data.products.find(
        (item) => item.product._id === _id,
      );
      const targetCount = (currentCartItem?.count ?? 0) + quantityValue;
      const addResponse = await addProductToCart(_id);

      if (addResponse.status !== "success") {
        toast.error(addResponse.message || "Unable to add this product to your cart.");
        return;
      }

      dispatch(cartActions.setCartInfo(addResponse));

      if (quantityValue > 1) {
        try {
          const updateResponse = await updateProductQuantity(_id, targetCount);
          if (updateResponse.status !== "success") {
            toast.error(
              updateResponse.message || "The product was added, but its quantity could not be updated.",
            );
            return;
          }

          dispatch(cartActions.setCartInfo(updateResponse));
        } catch (error) {
          console.error("Updating cart quantity after add failed:", error);
          toast.error(
            "The product was added to your cart, but its quantity could not be updated.",
          );
          return;
        }
      }

      toast.success(addResponse.message || "Product added to your cart.");
    } catch (error) {
      console.error("Adding product to cart failed:", error);
      toast.error("Unable to add this product to your cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  }

  async function handleToggleWishlist() {
    if (isUpdatingWishlist) return;

    setIsUpdatingWishlist(true);
    try {
      const response = isInWishlist
        ? await removeFromWishlist(_id)
        : await addToWishlist(_id);
      if (response.status !== "success") {
        toast.error(response.message);
        return;
      }

      const updatedProducts = isInWishlist
        ? wishlistProducts.filter((product) => product._id !== _id)
        : [
            ...wishlistProducts,
            {
              _id,
              title,
              imageCover,
              price,
              priceAfterDiscount,
              quantity,
              category: { name: category.name },
            },
          ];
      const refreshed = await syncWishlist(dispatch, updatedProducts);
      toast.success(
        response.message ||
          (isInWishlist ? "Removed from your wishlist." : "Added to your wishlist."),
      );
      if (!refreshed) {
        toast.error("Your wishlist changed, but couldn't be refreshed.");
      }
    } catch (error) {
      console.error("Updating wishlist failed:", error);
      toast.error("Unable to update your wishlist. Please try again.");
    } finally {
      setIsUpdatingWishlist(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <div className="grid gap-8 lg:grid-cols-[480px_minmax(0,1fr)]">
        <div className="rounded-[22px] bg-[#f3f3f3] p-4 shadow-sm">
          <div className="mb-4 overflow-hidden rounded-[18px] bg-white">
            {/* <img src={selectedImage} alt={title} className="h-[430px] w-full object-contain" /> */}
            <ImageGallery
            showFullscreenButton= {false}
            showNav={false}
            showPlayButton={false}
             items={
                images.map((image)=>{
                    return{
                        original: image,
                        thumbnail: image
                    }
                })
            }/>

          </div>

          {/* <div className="grid grid-cols-2 gap-4">
            
            {gallery.map((image, index) => (
              <button
                key={`${_id}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`overflow-hidden rounded-[16px] border-2 bg-white p-2 transition ${
                  selectedImage === image ? "border-[#1d4e89]" : "border-transparent"
                }`}
              >
                <img src={image} alt={`${title} ${index + 1}`} className="h-32 w-full object-contain" />
              </button>
            ))}
          </div> */}
        </div>

        <div className="flex flex-col justify-start">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-[#e8f5ee] px-3 py-1 text-xs font-medium text-[#1f8a5c]">
              {category?.name ?? "Category"}
            </span>
            <span className="rounded-full bg-[#edf1f7] px-3 py-1 text-xs font-medium text-[#495a75]">
              {brand?.name ?? "Brand"}
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[#1f2b37]">{title}</h1>

          <div className="mt-4 flex items-center gap-3 text-[#5e6c7c]">
            <div className="flex items-center text-[#f4b400]">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className={index < Math.round(ratingsAverage || 0) ? "text-[#f4b400]" : "text-[#d9dde3]"}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm">{ratingsAverage ?? 0} ({ratingsQuantity ?? 0} reviews)</span>
          </div>
              
          <div >
            <span className="mt-6 text-4xl font-bold text-[#1a2b3d]">{currentPrice} EGP</span>
                {
            priceAfterDiscount && <span className=" ml-3 text-3xl text-gray-400 line-through">{price} EGP</span>
          }

            </div>
          

          <div className="mt-5 flex items-center gap-2">
            {quantity > 0 ? (
              <>
                <span className="inline-block h-3 w-3 rounded-full bg-[#1aa56c]" />
                <span className="text-base font-medium text-[#1aa56c]">In Stock</span>
              </>
            ) : (
              <>
                <span className="inline-block h-3 w-3 rounded-full bg-red-500" />
                <span className="text-base font-medium text-red-500">Out Stock</span>
              </>
            )}
          </div>

          <div className="mt-8 border-t border-[#e5e7eb] pt-6">
            <p className="text-xl font-medium text-[#2d3c4d]">{description}</p>

            <div className="mt-8 flex items-center gap-3">
              <span className="text-lg font-medium text-[#2d3c4d]">Quantity</span>

              <div className="ml-2 flex items-center overflow-hidden rounded-xl border border-[#dfe6ec] bg-white">
                <button
                  type="button"
                  onClick={decrementQty}
                  className="flex h-12 w-12 items-center justify-center text-2xl text-[#59677d] transition hover:bg-gray-100"
                >
                  −
                </button>
                <span className="flex h-12 w-16 items-center justify-center text-xl font-medium text-[#2d3c4d]">
                  {quantityValue}
                </span>
                <button
                  type="button"
                  onClick={incrementQty}
                  className="flex h-12 w-12 items-center justify-center text-2xl text-[#59677d] transition hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <span className="ml-2 text-base text-[#64748b]">{quantity ?? 0} available</span>
            </div>

            <div className="mt-8 flex items-center justify-between rounded-2xl border border-[#e5e7eb] bg-[#f8fafb] px-5 py-4">
              <span className="text-xl font-medium text-[#2d3c4d]">Total Price:</span>
              <span className="text-3xl font-bold text-[#1aa56c]">{totalPrice.toFixed(2)} EGP</span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-[1fr_1fr]">
              <button
                type="button"
                disabled={isAddingToCart || quantity <= 0}
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-3 rounded-2xl bg-[#1aa56c] px-6 py-5 text-xl font-semibold text-white shadow-[0_12px_24px_rgba(26,165,108,0.2)] transition hover:bg-[#169a61] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <IconShoppingCart size={22} />
                {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-3 rounded-2xl bg-[#0f172a] px-6 py-5 text-xl font-semibold text-white shadow-[0_12px_24px_rgba(15,23,42,0.2)] transition hover:bg-[#172033]"
              >
                <span className="text-lg">⚡</span>
                Buy Now
              </button>
            </div>

            <button
              type="button"
              disabled={isUpdatingWishlist}
              aria-pressed={isInWishlist}
              onClick={handleToggleWishlist}
              className={`mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border px-6 py-4 text-lg font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
                isInWishlist
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-[#dfe6ec] bg-white text-[#2d3c4d] hover:bg-[#f8fafb]"
              }`}
            >
              <IconHeart
                size={20}
                className={isInWishlist ? "fill-red-500 text-red-500" : ""}
              />
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>

            {/* <div className="mt-8 flex items-center justify-end">
              <button type="button" className="rounded-xl border border-[#dfe6ec] bg-white p-3 text-[#2d3c4d] transition hover:bg-[#f8fafb]">
                ↗
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 border-t border-[#e5e7eb] pt-8 md:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-[#e5e7eb] bg-[#f8fafb] p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9f9f0] text-[#1aa56c]">
            <IconTruck size={22} />
          </div>
          <div>
            <p className="text-lg font-semibold text-[#1f2b37]">Free Delivery</p>
            <p className="text-sm text-[#64748b]">Orders over $50</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[#e5e7eb] bg-[#f8fafb] p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9f9f0] text-[#1aa56c]">
            <IconRefresh size={22} />
          </div>
          <div>
            <p className="text-lg font-semibold text-[#1f2b37]">30 Days Return</p>
            <p className="text-sm text-[#64748b]">Money back</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[#e5e7eb] bg-[#f8fafb] p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9f9f0] text-[#1aa56c]">
            <IconShieldHalfFilled size={22} />
          </div>
          <div>
            <p className="text-lg font-semibold text-[#1f2b37]">Secure Payment</p>
            <p className="text-sm text-[#64748b]">100% Protected</p>
          </div>
        </div>
      </div>
    </main>
  );
}
