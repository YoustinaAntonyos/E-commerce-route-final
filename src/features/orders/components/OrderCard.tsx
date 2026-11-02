'use client'
import { IconCalendar, IconChevronDown, IconClock, IconCreditCard, IconHash, IconMapPin, IconPackage, IconPhone, IconReceipt, IconTruckDelivery } from "@tabler/icons-react";
import { Order } from "../types/order.types";
import { useState } from "react";

export default function OrderCard({ orderInfo }: { orderInfo: Order }) {

  const [isExpanded, setIsExpanded] = useState(false)

  function getStatus() {
    if (orderInfo.isDelivered) {
      return {
        label: "deliverd",
        icon: IconTruckDelivery,
        colors: {
          background: "bg-green-100",
          text: "text-green-600",
          border: "border-green-300"
        }
      }
    }

    if (orderInfo.isPaid) {
      return {
        label: "on the way",
        icon: IconCreditCard,
        colors: {
          background: "bg-blue-100",
          text: "text-blue-600",
          border: "border-blue-300"
        }
      }
    }

    return {
      label: "Processing",
      icon: IconClock,
      colors: {
        background: "bg-orange-100",
        text: "text-orange-600",
        border: "border-orange-300"
      }
    }

  }
  const status = getStatus()
  const StatusIcon = status.icon

  const itemsCount = orderInfo.cartItems.reduce((acc, el) => acc += el.count, 0);


  return (
    <>
      <article
        //   key={order.id}
        className="overflow-hidden rounded-2xl border border-primary-200 bg-white shadow-lg shadow-primary-100/50"
      >
        <div className="p-5 sm:p-6">
          <div className="flex gap-5">
            <div className="relative hidden shrink-0 sm:block">
              <div className="h-28 w-28 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-2.5">
                {
                  orderInfo.cartItems[0] && (
                    <img
                      alt=""
                      className="h-full w-full object-contain"
                      src={orderInfo.cartItems[0].product.imageCover}
                    />
                  )
                }

              </div>
              {orderInfo.cartItems.length > 1 && (
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white shadow-lg">
                  +{orderInfo.cartItems.length - 1}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <div
                    className={`mb-2 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1
                            ${status.colors.text} ${status.colors.background}
                            //  {
                            // order.statusTone === "amber"
                            //   ? "bg-amber-100 text-amber-600"
                            //   : "bg-blue-100 text-blue-600"
                        //   }
                          `}
                  >
                    {/* <IconTruckDelivery size={14} aria-hidden="true" /> */}
                    <StatusIcon size={14} aria-hidden="true" />
                    <span className={`text-xs font-semibold ${status.colors.text}`}>{status.label}</span>
                  </div>
                  <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                    <IconHash
                      className="text-gray-400"
                      size={15}
                      aria-hidden="true"
                    />
                    {orderInfo.id}
                  </h2>
                </div>
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${orderInfo.paymentMethodType === "card"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-gray-100 text-gray-600"
                    }`}
                  title={orderInfo.paymentMethodType}
                >
                  {/* <IconCreditCard size={19} aria-hidden="true" /> */}
                  {orderInfo.paymentMethodType === 'card' ? <IconCreditCard /> : <IconPackage />}

                </div>
              </div>

              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <IconCalendar
                    className="text-gray-400"
                    size={15}
                    aria-hidden="true"
                  />
                  {new Date(orderInfo.createdAt).toLocaleDateString("en-US", {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1.5">
                  <IconPackage
                    className="text-gray-400"
                    size={15}
                    aria-hidden="true"
                  />
                  {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
                </span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1.5">
                  <IconMapPin
                    className="text-gray-400"
                    size={15}
                    aria-hidden="true"
                  />
                  {orderInfo.shippingAddress.city}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    {/* {order.subtotal + order.shipping} */}
                    {orderInfo.totalOrderPrice + orderInfo.shippingPrice}
                  </span>
                  <span className="ml-1 text-sm font-medium text-gray-400">
                    EGP
                  </span>
                </div>
                <button
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all 
                    ${isExpanded? `bg-primary-600 text-white` : `bg-gray-100 text-gray-700 hover:bg-gray-200`}`}
                  onClick={()=>{
                    setIsExpanded(!isExpanded)
                  }}
                >
                  {isExpanded ? "Hide" : "Details"}
                  <IconChevronDown
                    className={`text-xs transition-transform duration-300 ${isExpanded && 'rotate-180'}`}
                    size={16}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>



        {/* expanded details----------------- */}
        {
          isExpanded && <div className="border-t border-gray-100 bg-gray-50/50">
            <div className="p-5 sm:p-6">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary-100">
                  <IconReceipt
                    className="text-primary-600"
                    size={14}
                    aria-hidden="true"
                  />
                </span>
                Order Items
              </h3>
              <div className="space-y-3">
                {orderInfo.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4"
                  >
                    <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-50 p-2">
                      <img
                        alt={item.product.title}
                        className="h-full w-full object-contain"
                        src={item.product.imageCover}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-gray-900">
                        {item.product.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        <span className="font-medium text-gray-700">
                          {item.count}
                        </span>{" "}
                        × {item.price.toLocaleString()} EGP
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {(item.count * item.price).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">EGP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 px-5 pb-5 sm:grid-cols-2 sm:px-6 sm:pb-6">
              <section className="rounded-xl border border-gray-100 bg-white p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100">
                    <IconMapPin
                      className="text-blue-600"
                      size={14}
                      aria-hidden="true"
                    />
                  </span>
                  Delivery Address
                </h3>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">{orderInfo.shippingAddress.city}</p>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {orderInfo.shippingAddress.details}
                  </p>
                  <p className="flex items-center gap-2 pt-1 text-sm text-gray-600">
                    <IconPhone
                      className="text-gray-400"
                      size={14}
                      aria-hidden="true"
                    />
                    {orderInfo.shippingAddress.phone}
                  </p>
                </div>
              </section>

              <section className="rounded-xl border border-amber-200 bg-amber-100 p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500">
                    <IconClock
                      className="text-white"
                      size={14}
                      aria-hidden="true"
                    />
                  </span>
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">{orderInfo.totalOrderPrice} EGP</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {orderInfo.shippingPrice === 0 ? "Free" : `${orderInfo.shippingPrice} EGP`}
                    </span>
                  </div>
                  <hr className="my-2 border-gray-200/50" />
                  <div className="flex justify-between pt-1">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">
                      {orderInfo.totalOrderPrice + orderInfo.shippingPrice} EGP
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        }


      </article>
    </>
  )
}
