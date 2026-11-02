'use client'
import {
  IconArrowsRightLeft,
  IconEye,
  IconHeart,
  IconPlus,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { Product } from "../types/products.type";
import { addProductToCart } from "@/features/card/server/card.action";
import { toast } from "sonner";
import { cartActions } from "@/features/card/slices/cart.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AppState } from "@/store/store";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/features/wishlist/server/wishlist.action";
import { syncWishlist } from "@/features/wishlist/utils/syncWishlist";

export default function ProductCard({ productInfo }: { productInfo: Product }) {
  const { _id, category, title, price, priceAfterDiscount, imageCover, ratingsAverage, ratingsQuantity } = productInfo;

  const {setCartInfo} = cartActions
  const dispatch = useDispatch()
  const wishlistProducts = useSelector(
    (state: AppState) => state.wishlistReducer.data,
  );
  const isInWishlist = wishlistProducts.some((product) => product._id === _id);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);

  async function handleAddToCart(){
    const response = await addProductToCart(_id)
    if(response.status === 'fail' || response.status === 'error'){
      toast.error(response.message)
      return;
    }
    if(response.status === 'success'){
       dispatch(setCartInfo(response))
    toast.success(response.message)
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
              quantity: productInfo.quantity,
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
    <div className="card overflow-hidden rounded-xl bg-white shadow-md">
      <div className="inner">
        <div className="image-box relative">
          <img src={imageCover} className="mx-auto h-50" alt={title} />
          <div className="action-btns absolute right-4 top-4 flex flex-col gap-2 *:flex *:size-6 *:items-center *:justify-center *:rounded-full *:bg-white *:shadow-md">
            <button
              type="button"
              aria-label={isInWishlist ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`}
              aria-pressed={isInWishlist}
              disabled={isUpdatingWishlist}
              onClick={handleToggleWishlist}
            >
              <IconHeart
                className={`size-4 transition-colors duration-150 ${
                  isInWishlist
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500 hover:text-red-500"
                }`}
                stroke={2}
              />
            </button>
            <button type="button">
              <IconArrowsRightLeft className="size-4 transition-colors duration-150 hover:text-primary-600" stroke={2} />
            </button>
            <Link href={`/products/${_id}`} aria-label={`View ${title}`}>
              <IconEye className="size-4 transition-colors duration-150 hover:text-primary-600" stroke={2} />
            </Link>
          </div>
        </div>

        <div className="card-body px-6 py-4">
          <span className="text-sm text-gray-500">{category.name}</span>
          <h3 className="line-clamp-2 text-base font-semibold">{title}</h3>
          <div className="rating mt-2 mb-4 flex items-center gap-3">
            <div className="stars flex items-center text-yellow-500">
              <IconStarFilled size={16} />
              <IconStarFilled size={16} />
              <IconStarFilled size={16} />
              <IconStarFilled size={16} />
              <IconStar stroke={2} size={16} />
            </div>
            <span className="text-sm text-gray-500">
              {ratingsAverage} ({ratingsQuantity})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="price space-x-2">
              <span className="text-md font-bold text-primary-600">{priceAfterDiscount || price} EGP</span>
              {priceAfterDiscount && (
                <span className="text-sm font-bold text-gray-500 line-through">{price} EGP</span>
              )}
            </div>
            <button type="button" className="flex size-10 items-center justify-center rounded-full bg-primary-600 text-white"
            onClick={handleAddToCart}>
              <IconPlus className="ml-0" stroke={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
