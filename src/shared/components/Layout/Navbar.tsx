"use client";

import {
  IconAddressBook,
  IconAlignBoxTopCenter,
  IconBabyCarriage,
  IconChevronDown,
  IconGift,
  IconHeadset,
  IconHeart,
  IconLogout,
  IconMail,
  IconMenu2,
  IconPhone,
  IconSearch,
  IconSettings,
  IconShoppingCart,
  IconTruck,
  IconUser,
  IconUserCircle,
  IconUserPlus,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/images/freshcart-logo.svg";
import { deleteToken } from "@/features/auth/services/auth.action";
import { authAction } from "@/features/auth/slices/auth.slice";
import { AppState } from "@/store/store";
import { useRouter } from "next/navigation";
import { wishlistActions } from "@/features/wishlist/slices/wishlist.slice";
import { getCategoryIcon, getRequestedCategoryNames } from "@/features/categories/utils/categoryNavigation";
import { Category } from "@/features/categories/types/categories.type";

export default function Navbar({
  categories = [],
  categoriesError,
}: {
  categories?: Category[];
  categoriesError?: string;
}) {
  const { numOfCartItems } = useSelector((state: AppState) => state.cartReducer);
  const wishlistCount = useSelector(
    (state: AppState) => state.wishlistReducer.data.length,
  );
  const { isAuthenticated, userInfo } = useSelector(
    (state: AppState) => state.authReducer,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const featuredCategories = getRequestedCategoryNames(
    categories.map((category) => category.name),
  ).flatMap(({ label, actualName }) => {
    const category = categories.find((item) => item.name === actualName);
    if (!category) return [];
    return [{ label, category, Icon: getCategoryIcon(category.name) }];
  });

  const handleLogout = async () => {
    dispatch(authAction.logout());
    dispatch(wishlistActions.resetWishlist());
    await deleteToken();
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <div className="hidden border-b border-gray-100 text-sm lg:block">
        <div className="container-fluid mx-5">
          <div className="flex h-10 items-center justify-between">
            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2">
                <IconTruck className="h-4 w-4 text-primary-600" />
                <span>Free Shipping on Orders 500 EGP</span>
              </span>
              <span className="flex items-center gap-2">
                <IconGift className="h-4 w-4 text-primary-600" />
                <span>New Arrivals Daily</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-gray-500">
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-1.5 transition-colors hover:text-primary-600"
                >
                  <IconPhone className="h-3.5 w-3.5" />
                  <span>+1 (800) 123-4567</span>
                </a>
                <a
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-1.5 transition-colors hover:text-primary-600"
                >
                  <IconMail className="h-3.5 w-3.5" />
                  <span>support@freshcart.com</span>
                </a>
              </div>
              <span className="h-4 w-px bg-gray-200" aria-hidden="true" />
              {isAuthenticated ? (
                <div className="flex items-center gap-4 text-gray-600">
                  <span>
                    Welcome{userInfo?.name ? `, ${userInfo.name}` : ""}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="transition-colors hover:text-primary-600"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    className="flex items-center gap-1.5 text-gray-600 transition-colors hover:text-primary-600"
                    href="/login"
                  >
                    <IconUser className="h-3.5 w-3.5" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    className="flex items-center gap-1.5 text-gray-600 transition-colors hover:text-primary-600"
                    href="/signup"
                  >
                    <IconUserPlus className="h-3.5 w-3.5" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container-fluid mx-5 ">
          <div className="flex h-16 items-center justify-between gap-3 lg:h-[72px] lg:gap-6">
            <Link
              className="shrink-0"
              href="/"
              aria-label="FreshCart home"
              onClick={closeMobileMenu}
            >
              <Image src={logo} alt="FreshCart" className="h-10 w-auto" />
            </Link>

            <form action="/search" className="hidden max-w-2xl flex-1 lg:flex">
              <div className="relative w-full">
                <input
                  type="search"
                  name="q"
                  placeholder="Search for products, brands and more..."
                  aria-label="Search products"
                  className="w-full rounded-full border border-gray-200 bg-gray-50/50 px-5 py-3 pr-12 text-sm transition-all focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700"
                >
                  <IconSearch className="h-4 w-4" />
                </button>
              </div>
            </form>

            <nav
              // aria-label="Main navigation"
              className="navHid items-center gap-5 xl:flex navEdit" 
            >
              <Link
                className="font-medium text-gray-700 transition-colors hover:text-primary-600"
                href="/"
              >
                Home
              </Link>
              <Link
                className="font-medium text-gray-700 transition-colors hover:text-primary-600"
                href="/shop"
              >
                Shop
              </Link>
              <div className="group/categories relative">
                <button
                  type="button"
                  className="flex items-center gap-1.5 py-2 font-medium text-gray-700 transition-colors hover:text-primary-600"
                  aria-haspopup="true"
                >
                  Categories
                  <IconChevronDown className="h-3 w-3 transition-transform group-hover/categories:rotate-180 group-focus-within/categories:rotate-180" />
                </button>
                <div className="invisible absolute left-0 top-full z-50 pt-1 opacity-0 transition-all duration-200 group-hover/categories:visible group-hover/categories:opacity-100 group-focus-within/categories:visible group-focus-within/categories:opacity-100">
                  <div className="min-w-[210px] rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
                    <Link
                      className="block px-4 py-2.5 text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                      href="/categories"
                    >
                      All Categories
                    </Link>
                    {featuredCategories.map(({ label, category, Icon: CategoryIcon }) => (
                      <Link
                        key={category._id}
                        className="flex items-center gap-2 px-4 py-2.5 text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                        href={`/shop?category=${encodeURIComponent(category._id)}`}
                      >
                        <CategoryIcon className="h-4 w-4" />
                        {label}
                      </Link>
                    ))}
                    {categoriesError && (
                      <p role="status" className="px-4 py-2 text-xs text-gray-500">
                        Categories are temporarily unavailable.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <Link
                className="font-medium text-gray-700 transition-colors hover:text-primary-600"
                href="/brands"
              >
                Brands
              </Link>
            </nav>

            <div className="flex items-center gap-1 lg:gap-2">
              <Link
                className="mr-2 navHidden items-center gap-2 border-r border-gray-200 pr-3 transition-opacity hover:opacity-80 2xl:flex"
                href="/contact"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50">
                  <IconHeadset className="h-4 w-4 text-primary-600" />
                </span>
                <span className="text-xs">
                  <span className="block text-gray-400">Support</span>
                  <span className="block font-semibold text-gray-700">
                    24/7 Help
                  </span>
                </span>
              </Link>

              <Link
                className="group relative rounded-full p-2.5 transition-colors hover:bg-gray-100"
                title="Wishlist"
                aria-label={`Wishlist, ${wishlistCount} items`}
                href="/wishlist"
              >
                <IconHeart
                  className={`h-5 w-5 transition-colors ${
                    wishlistCount > 0
                      ? "fill-red-500 text-red-500"
                      : "text-gray-500 group-hover:text-primary-600"
                  }`}
                />
                {wishlistCount > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex size-[18px] items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                className="group relative rounded-full p-2.5 transition-colors hover:bg-gray-100"
                title="Cart"
                aria-label={`Cart, ${numOfCartItems} items`}
                href="/cart"
              >
                <IconShoppingCart className="h-5 w-5 text-gray-500 transition-colors group-hover:text-primary-600" />
                <span className="absolute right-0.5 top-0.5 flex size-[18px] items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white ring-2 ring-white">
                  {numOfCartItems}
                </span>
              </Link>

              {isAuthenticated ? (
                <div className="group/account relative hidden lg:block">
                  <button
                    type="button"
                    className="rounded-full p-2.5 transition-colors hover:bg-gray-100"
                    title="Account"
                    aria-label="Account menu"
                    aria-haspopup="true"
                  >
                    <IconUserCircle className="h-5 w-5 text-gray-500 transition-colors group-hover/account:text-primary-600" />
                  </button>
                  <div className="invisible absolute right-0 top-full z-50 mt-2 w-64 origin-top-right scale-95 rounded-2xl border border-gray-100 bg-white opacity-0 shadow-xl transition-all duration-200 group-hover/account:visible group-hover/account:scale-100 group-hover/account:opacity-100 group-focus-within/account:visible group-focus-within/account:scale-100 group-focus-within/account:opacity-100">
                    <div className="border-b border-gray-100 p-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                          <IconUserCircle className="h-6 w-6 text-primary-600" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-gray-800">
                            {userInfo?.name || "Your account"}
                          </span>
                          <span className="block truncate text-xs text-gray-400">
                            {userInfo?.email || userInfo?.role || ""}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                        href="/profile"
                      >
                        <IconUser className="h-4 w-4 text-gray-400" />
                        My Profile
                      </Link>
                      <Link
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                        href="/orders"
                      >
                        <IconAlignBoxTopCenter className="h-4 w-4 text-gray-400" />
                        My Orders
                      </Link>
                      <Link
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                        href="/wishlist"
                      >
                        <IconHeart className="h-4 w-4 text-gray-400" />
                        My Wishlist
                      </Link>
                      <Link
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                        href="/profile/my-addresses"
                      >
                        <IconAddressBook className="h-4 w-4 text-gray-400" />
                        Addresses
                      </Link>
                      <Link
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                        href="/profile/settings"
                      >
                        <IconSettings className="h-4 w-4 text-gray-400" />
                        Settings
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50"
                      >
                        <IconLogout className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  className="hidden rounded-full p-2.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary-600 lg:flex"
                  href="/login"
                  title="Sign in"
                  aria-label="Sign in"
                >
                  <IconUserCircle className="h-5 w-5" />
                </Link>
              )}

              <button
                type="button"
                className="toggle ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700 xl:hidden"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              >
                {isMobileMenuOpen ? (
                  <IconX className="h-5 w-5" />
                ) : (
                  <IconMenu2 className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-gray-100 bg-white px-4 py-4 shadow-lg xl:hidden"
          >
            <form action="/search" className="mb-4 lg:hidden">
              <label className="relative block">
                <span className="sr-only">Search products</span>
                <input
                  type="search"
                  name="q"
                  placeholder="Search for products..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 pr-11 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary-600 text-white"
                >
                  <IconSearch className="h-4 w-4" />
                </button>
              </label>
            </form>

            <nav aria-label="Mobile navigation" className="space-y-1">
              <Link
                className="block rounded-lg px-3 py-2.5 font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                href="/"
                // onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                className="block rounded-lg px-3 py-2.5 font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                href="/shop"
                // onClick={closeMobileMenu}
              >
                Shop
              </Link>
              <Link
                className="block rounded-lg px-3 py-2.5 font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                href="/categories"
                onClick={closeMobileMenu}
              >
                Categories
              </Link>
              {featuredCategories.map(({ label, category, Icon: CategoryIcon }) => (
                <Link
                  key={category._id}
                  className="flex items-center gap-3 rounded-lg py-2 pl-6 pr-3 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                  href={`/shop?category=${encodeURIComponent(category._id)}`}
                  onClick={closeMobileMenu}
                >
                  <CategoryIcon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
              {categoriesError && (
                <p role="status" className="px-6 py-2 text-xs text-gray-500">
                  Categories are temporarily unavailable.
                </p>
              )}
              <Link
                className="block rounded-lg px-3 py-2.5 font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                href="/brands"
                onClick={closeMobileMenu}
              >
                Brands
              </Link>
              <Link
                className="block rounded-lg px-3 py-2.5 font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                href="/contact"
                onClick={closeMobileMenu}
              >
                Contact & Support
              </Link>
              <div className="my-3 border-t border-gray-100" />
              {isAuthenticated ? (
                <>
                  <p className="px-3 py-2 text-sm text-gray-500">
                    Signed in{userInfo?.name ? ` as ${userInfo.name}` : ""}
                  </p>
                  <Link
                    className="block rounded-lg px-3 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    href="/profile"
                    onClick={closeMobileMenu}
                  >
                    My Profile
                  </Link>
                  <Link
                    className="block rounded-lg px-3 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    href="/orders"
                    onClick={closeMobileMenu}
                  >
                    My Orders
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-red-500 hover:bg-red-50"
                  >
                    <IconLogout className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 font-medium text-gray-700 hover:border-primary-500 hover:text-primary-600"
                    href="/login"
                    onClick={closeMobileMenu}
                  >
                    <IconUser className="h-4 w-4" />
                    Sign In
                  </Link>
                  <Link
                    className="flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-3 py-2.5 font-medium text-white hover:bg-primary-700"
                    href="/signup"
                    onClick={closeMobileMenu}
                  >
                    <IconUserPlus className="h-4 w-4" />
                    Sign Up
                  </Link>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
                <Link
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-50"
                  href="/wishlist"
                  onClick={closeMobileMenu}
                >
                  <IconHeart
                    className={`h-4 w-4 ${
                      wishlistCount > 0 ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  Wishlist ({wishlistCount})
                </Link>
                <Link
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-gray-50"
                  href="/cart"
                  onClick={closeMobileMenu}
                >
                  <IconShoppingCart className="h-4 w-4" />
                  Cart ({numOfCartItems})
                </Link>
              </div>
              <div className="flex flex-col gap-2 border-t border-gray-100 pt-3 text-sm text-gray-500 sm:flex-row sm:gap-6">
                <a href="tel:+18001234567" className="flex items-center gap-2">
                  <IconPhone className="h-4 w-4 text-primary-600" />
                  +1 (800) 123-4567
                </a>
                <a
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-2"
                >
                  <IconMail className="h-4 w-4 text-primary-600" />
                  support@freshcart.com
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
