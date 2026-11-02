import lightLogo from "../../../assets/images/freshcart-logo.svg";
import miniLogo from "../../../assets/images/mini-logo.png";
import Link from "next/link";
import Image from "next/image";
import {
  IconArrowBackUp,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandPinterest,
  IconBrandTwitter,
  IconBrandYoutube,
  IconCreditCard,
  IconHeadset,
  IconMail,
  IconMapPin,
  IconPhone,
  IconShield,
  IconTruck,
} from "@tabler/icons-react";
import { Category } from "@/features/categories/types/categories.type";

export default function Footer({ categories = [] }: { categories?: Category[] }) {
  return (
    <>

 <div className="bg-primary-50 border-y border-primary-100">
  <div className="container-fluid mx-auto px-4 py-6">
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 text-primary-600 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
          <IconTruck />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">
            Free Shipping
          </h4>
          <p className="text-gray-500 text-xs">
            On orders over 500 EGP
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 text-primary-600 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
          <IconArrowBackUp />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">
            Easy Returns
          </h4>
          <p className="text-gray-500 text-xs">
            14-day return policy
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 text-primary-600 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
          <IconShield />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">
            Secure Payment
          </h4>
          <p className="text-gray-500 text-xs">
            100% secure checkout
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 text-primary-600 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
          <IconHeadset />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">
            24/7 Support
          </h4>
          <p className="text-gray-500 text-xs">
            Contact us anytime
          </p>
        </div>
      </div>
    </div>
  </div>
</div>











      {/* <footer id="footer" className="bg-white border-t border-gray-200 pt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <Link href={`/`} className="mb-6">
                <Image src={lightLogo} alt="FreshCart Logo" />
              </Link>

              <p className="text-gray-600 mb-4">
                FreshCart is a versatile e-commerce platform offering a wide
                range of products, from clothing to electronics. It provides a
                user-friendly experience for seamless shopping across diverse
                categories.
              </p>
              <div className="flex space-x-4">
                <span className="text-gray-500 hover:text-primary-600 cursor-pointer">
                  <IconBrandFacebook stroke={2} />
                </span>
                <span className="text-gray-500 hover:text-primary-600 cursor-pointer">
                  <IconBrandTwitter stroke={2} />
                </span>
                <span className="text-gray-500 hover:text-primary-600 cursor-pointer">
                  <IconBrandInstagram stroke={2} />
                </span>
                <span className="text-gray-500 hover:text-primary-600 cursor-pointer">
                  <IconBrandPinterest stroke={2} />
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <ul className="space-y-3">
                <li>
                  <span className="text-gray-600 hover:text-primary-600 cursor-pointer">
                    Men's Fashion
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 hover:text-primary-600 cursor-pointer">
                    Women's Fashion
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 hover:text-primary-600 cursor-pointer">
                    Baby &amp; Toys
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 hover:text-primary-600 cursor-pointer">
                    Beauty &amp; Health
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 hover:text-primary-600 cursor-pointer">
                    Electronics
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <span className="text-gray-600 hover:text-primary-600 cursor-pointer">
                    About Us
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 hover:text-primary-600 cursor-pointer">
                    Contact Us
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 hover:text-primary-600 cursor-pointer">
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 hover:text-primary-600 cursor-pointer">
                    Terms of Service
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 hover:text-primary-600 cursor-pointer">
                    Shipping Policy
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/account"
                    className="text-gray-600 hover:text-primary-600 cursor-pointer"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/allorders"
                    className="text-gray-600 hover:text-primary-600 cursor-pointer"
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wishlist"
                    className="text-gray-600 hover:text-primary-600 cursor-pointer"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="text-gray-600 hover:text-primary-600 cursor-pointer"
                  >
                    Returns &amp; Refunds
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="text-gray-600 hover:text-primary-600 cursor-pointer"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-10 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 mb-4 md:mb-0">
                © {new Date().getFullYear()} FreshCart. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <Image
                  src={miniLogo}
                  alt="FreshCart Mini Logo"
                  className="size-6"
                />
              </div>
            </div>
          </div>
        </div>
      </footer> */}



      <footer id="footer" className="bg-gray-900 text-white">
      <div className="container-fluid mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info & Social Links */}
          <div className="lg:col-span-4">
            <Link className="inline-block mb-6" href="/">
              <div className="bg-white rounded-lg px-4 py-2 inline-block">
                <Image src={lightLogo} alt="FreshCart Logo" />
              
              </div>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at competitive
              prices with a seamless shopping experience.
            </p>
            <div className="space-y-3 mb-6">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                <IconPhone className="text-primary-500 w-4 h-4 shrink-0" />
                <span>+1 (800) 123-4567</span>
              </a>
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                <IconMail className="text-primary-500 w-4 h-4 shrink-0" />
                <span>support@freshcart.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <IconMapPin className="text-primary-500 w-4 h-4 mt-0.5 shrink-0" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <IconBrandFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <IconBrandTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <IconBrandInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <IconBrandYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/shop"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/categories"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/brands"
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/categories"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/categories"
                >
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/categories"
                >
                  Women's Fashion
                </Link>
              </li>
              {/* {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                    href={`/shop?category=${encodeURIComponent(category._id)}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))} */}
            </ul>
          </div>

          {/* Account Column */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/profile"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/allorders"
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/wishlist"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/cart"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/login"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/signup"
                >
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/contact"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/contact"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/checkout"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/contact"
                >
                  Returns &amp; Refunds
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/allorders"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/contact"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/contact"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  href="/contact"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Payments Bar */}
      <div className="border-t border-gray-800">
        <div className="container-fluid mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2026 FreshCart. All rights reserved.
              
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <IconCreditCard className="w-4 h-4" />
                <span>Visa</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <IconCreditCard className="w-4 h-4" />
                <span>Mastercard</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <IconCreditCard className="w-4 h-4" />
                <span>PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
