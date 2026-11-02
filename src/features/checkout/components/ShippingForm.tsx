import { IconBuilding, IconHome, IconInfoCircle, IconMapPin, IconPhone } from "@tabler/icons-react";
import {FieldErrors, UseFormRegister} from "react-hook-form"
import { shippingAddress } from "../schema/checkout.schema";

interface shippingAddressFormProps{
    register: UseFormRegister<shippingAddress>,
    errors: FieldErrors<shippingAddress>
}


export default function ShippingForm({register, errors}:shippingAddressFormProps) {
  return (
    <>
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <IconHome size={18} aria-hidden="true" />
                Shipping Address
              </h2>
              <p className="text-primary-100 text-sm mt-1">
                Where should we deliver your order?
              </p>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <IconInfoCircle size={16} className="text-blue-600 text-sm" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-blue-800 font-medium">
                    Delivery Information
                  </p>
                  <p className="text-xs text-blue-600 mt-0.5">
                    Please ensure your address is accurate for smooth delivery
                  </p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <IconBuilding size={16} className="text-gray-500 text-sm" aria-hidden="true" />
                  </div>
                  <input
                    id="city"
                    className="w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                    placeholder="e.g. Cairo, Alexandria, Giza"
                    type="text"
                    // name="city"
                    {...register('city')}
                  />
                </div>
                {
                    errors.city && <p className="text-sm mt-2 items-center gap-1 flex text-red-600">
                        <span className="w-1 h-1 inline-block rounded-full bg-red-500"></span>
                        {errors.city.message}
                    </p>
                }
              </div>
              <div>
                <label
                  htmlFor="details"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Street Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <IconMapPin size={16} className="text-gray-500 text-sm" aria-hidden="true" />
                  </div>
                  <textarea
                    id="details"
                    rows={3}
                    className="w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all resize-none border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                    placeholder="Street name, building number, floor, apartment..."
                    // name="details"
                    defaultValue={""}
                    {...register('details')}
                  />
                </div>
                 {
                    errors.details && <p className="text-sm mt-2 items-center gap-1 flex text-red-600">
                        <span className="w-1 h-1 inline-block rounded-full bg-red-500"></span>
                        {errors.details.message}
                    </p>
                }
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <IconPhone size={16} className="text-gray-500 text-sm" aria-hidden="true" />
                  </div>
                  <input
                    id="phone"
                    className="w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                    placeholder="01xxxxxxxxx"
                    type="tel"
                    // name="phone"
                    {...register('phone')}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    Egyptian numbers only
                  </span>
                </div>
                 {
                    errors.phone && <p className="text-sm mt-2 items-center gap-1 flex text-red-600">
                        <span className="w-1 h-1 inline-block rounded-full bg-red-500"></span>
                        {errors.phone.message}
                    </p>
                }
              </div>
            </div>
          </div>
    </>
  )
}
