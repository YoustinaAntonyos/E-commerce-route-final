'use client'
import Link from "next/link";
import {
  IconArrowLeft,
  IconPackage,
  IconReceipt,
  IconShieldCheck,
  IconShoppingBag,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingAddress } from "../schema/checkout.schema";
import ShippingForm from "../components/ShippingForm";
import PaymentMethod from "../components/PaymentMethod";
import { useState } from "react";
import { createCashOrder, createOnlineOrder } from "../server/checkout.action";
import { AppState } from "@/store/store";
import { cartActions, cartInitialValues } from "@/features/card/slices/cart.slice";
import { getShippingCost } from "@/features/card/cart-pricing";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: AppState) => state.cartReducer);
  const shipping = getShippingCost(cart.data.totalCartPrice);
  const orderTotal = cart.data.totalCartPrice + shipping;
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<shippingAddress>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(shippingAddress),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<shippingAddress> = async (values) => {
    if (!cart.cartId) {
      toast.error("Your cart is empty. Add items before placing an order.");
      return;
    }

    try {
      if (paymentMethod === "cash") {
        const response = await createCashOrder({
          cartId: cart.cartId,
          shippingAddress: values,
        });

        if (response.status !== "success") {
          toast.error(response.message || "Unable to create your order.");
          return;
        }

        toast.success("Order created successfully.");
        dispatch(
          cartActions.setCartInfo({ ...cartInitialValues, status: "success" }),
        );
        reset();
           router.push("/allorders");
        return;
      }

      const response = await createOnlineOrder({
        cartId: cart.cartId,
        shippingAddress: values,
      });

      if (response.status === "success" && typeof response.session?.url === "string") {
        window.location.assign(response.session.url);
        return;
      }

      toast.loading(response.message || "Unable to start online payment.");
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Unable to complete checkout. Please try again.");
    }
  };

    return (
    <>
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8">
  <div className="container-fluid mx-3 px-4">
    <div className="mb-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link className="hover:text-primary-600 transition" href="/">
          Home
        </Link>
        <span className="text-gray-300">/</span>
        <Link className="hover:text-primary-600 transition" href="/cart">
          Cart
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-medium">Checkout</span>
      </nav>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
              <IconReceipt size={18} aria-hidden="true" />
            </span>
            Complete Your Order
          </h1>
          <p className="text-gray-500 mt-2">
            Review your items and complete your purchase
          </p>
        </div>
        <Link
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all"
          href="/cart"
        >
          <IconArrowLeft size={18} aria-hidden="true" />
          Back to Cart
        </Link>
      </div>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">


          {/* shipping-------------- */}
          <ShippingForm register={register} errors={errors}  />

         {/* payment--------------- */}
          <PaymentMethod selectedMethod={paymentMethod} changeMethod={setPaymentMethod} />


        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <IconShoppingBag size={18} aria-hidden="true" />
                Order Summary
              </h2>
              <p className="text-primary-100 text-sm mt-1">
                {cart.numOfCartItems} {cart.numOfCartItems === 1 ? "item" : "items"}
              </p>
            </div>
            <div className="p-5">
              <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                {cart.data.products.length > 0 ? (
                  cart.data.products.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                        <img
                          alt={item.product.title}
                          className="w-full h-full object-contain"
                          src={item.product.imageCover}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.count} × {item.price} EGP
                        </p>
                      </div>
                      <p className="text-sm font-bold text-gray-900 shrink-0">
                        {item.count * item.price}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="py-4 text-center text-sm text-gray-500">
                    Your cart is empty.
                  </p>
                )}
              </div>
              <hr className="border-gray-100 my-4" />
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">{cart.data.totalCartPrice} EGP</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    <IconTruckDelivery size={18} className="text-gray-400" aria-hidden="true" />
                    Shipping
                  </span>
                  <span className={`font-semibold ${shipping === 0 ? "text-green-600" : "text-gray-900"}`}>
                    {shipping === 0 ? "FREE" : `${shipping} EGP`}
                  </span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary-600">
                      {orderTotal}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">EGP</span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={!cart.cartId || cart.data.products.length === 0 || isSubmitting}
                className="w-full mt-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
              >
                <IconPackage size={18} aria-hidden="true" />
                {isSubmitting ? "Processing..." : "Place Order"}
              </button>
              <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <IconShieldCheck size={18} className="text-green-500" aria-hidden="true" />
                  <span>Secure</span>
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <IconTruckDelivery size={18} className="text-blue-500" aria-hidden="true" />
                  <span>Fast Delivery</span>
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <IconPackage size={18} className="text-orange-500" aria-hidden="true" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>

    </>
    )
}
