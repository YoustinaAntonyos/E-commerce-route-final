'use client'

import {
  IconBox,
  IconPackage,
  IconShoppingBag,
} from "@tabler/icons-react";
import Link from "next/link";
import { getUserOrders } from "../server/orders.actions";
import OrderCard from "../components/OrderCard";
import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { UserOrdersResponse } from "../types/order.types";

// const orders = [
//   {
//     id: "9552",
//     status: "Processing",
//     statusTone: "amber",
//     paymentMethod: "Cash on delivery",
//     paymentType: "cash",
//     date: "Oct 27, 2026",
//     itemCount: 3,
//     city: "Nasr City",
//     address: "jjjjjjjjjjjjjjjjjjjjjjj",
//     phone: "01200695065",
//     subtotal: 547,
//     shipping: 0,
//     products: [
//       {
//         id: "shawl-9552",
//         title: "Woman Shawl",
//         image:
//           "https://ecommerce.routemisr.com/Route-Academy-products/1680402838276-cover.jpeg",
//         quantity: 1,
//         price: 149,
//       },
//       {
//         id: "socks-9552",
//         title: "Woman Socks",
//         image:
//           "https://ecommerce.routemisr.com/Route-Academy-products/1680401528864-cover.jpeg",
//         quantity: 2,
//         price: 199,
//       },
//     ],
//   },
//   {
//     id: "9554",
//     status: "On the way",
//     statusTone: "blue",
//     paymentMethod: "Credit card",
//     paymentType: "card",
//     date: "Oct 27, 2026",
//     itemCount: 3,
//     city: "Nasr City",
//     address: "jjjjjjjjjjjjjjjjjjjjjjj",
//     phone: "01200695065",
//     subtotal: 497,
//     shipping: 0,
//     products: [
//       {
//         id: "shawl-9554",
//         title: "Woman Shawl",
//         image:
//           "https://ecommerce.routemisr.com/Route-Academy-products/1680402838276-cover.jpeg",
//         quantity: 1,
//         price: 149,
//       },
//       {
//         id: "socks-9554",
//         title: "Woman Socks",
//         image:
//           "https://ecommerce.routemisr.com/Route-Academy-products/1680401528864-cover.jpeg",
//         quantity: 2,
//         price: 174,
//       },
//     ],
//   },
// ] as const;

export default function OrdersScreens() {

  const { userInfo } = useAppSelector((state) => state.authReducer)
  const [orders, setOrders] = useState<null | UserOrdersResponse>(null)

  useEffect(() => {
    const userId = userInfo?.id;
    if (!userId) {
      return;
    }

    const fetchOrders = async () => {
      const response = await getUserOrders({ id: userId });
      setOrders(response)
    };

    fetchOrders()
  }, [userInfo?.id])

  if (!userInfo) {
    return;
  }

  // empty state -------

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <IconBox className="text-4xl text-gray-400" size={36} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            When you place orders, they'll appear here<br />so you can track them.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3.5 px-6 rounded-xl font-medium transition-colors"
          >
            <IconShoppingBag size={20} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  // const orders = getUserOrders({id: userInfo.id})

  return (
    <main className="container-fluid mx-3 px-4 py-8">
      <header className="mb-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-sm text-gray-500"
        >
          <Link className="transition hover:text-primary-600" href="/">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span aria-current="page" className="font-medium text-gray-900">
            My Orders
          </span>
        </nav>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/25">
              <IconPackage className="text-white" size={28} aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                My Orders
              </h1>
              <p className="mt-0.5 text-sm text-gray-500">
                Track and manage your {orders.length} {orders.length === 1 ? 'order' : 'orders'}
              </p>
            </div>
          </div>
          <Link
            className="flex items-center gap-2 self-start rounded-xl px-4 py-2 text-sm font-medium text-primary-600 transition-all hover:bg-primary-50 hover:text-primary-700 sm:self-auto"
            href="/"
          >
            <IconShoppingBag size={17} aria-hidden="true" />
            Continue Shopping
          </Link>
        </div>
      </header>

      <section aria-label="Order history" className="space-y-4">
        {/* {orders.map((order) => {
          const StatusIcon = order.statusTone === "amber" ? IconClock : IconTruckDelivery;
          const PaymentIcon = order.paymentType === "cash" ? IconCash : IconCreditCard;

          return (
            
          );
        })} */}

        {/* orders list ------------------- */}
        {orders.map((order) => <OrderCard key={order._id} orderInfo={order} />)}

      </section>
    </main>
  );
}
