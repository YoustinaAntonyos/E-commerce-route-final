import { IconCashBanknote, IconCheck, IconCreditCard, IconShieldCheck, IconWallet } from "@tabler/icons-react";


interface PaymentMethodProps{
    selectedMethod: 'cash' | 'card',
    changeMethod: (method: 'cash' | 'card')=> void
}


export default function PaymentMethod({selectedMethod, changeMethod}:PaymentMethodProps) {
  return (
    <>
     <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <IconWallet size={18} aria-hidden="true" />
                Payment Method
              </h2>
              <p className="text-primary-100 text-sm mt-1">
                Choose how you&apos;d like to pay
              </p>
            </div>
            <div className="p-6 space-y-4">
              <button
                type="button"
                className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4  ${
                    selectedMethod === 'cash' ? 'group border-primary-500 bg-gradient-to-r from-primary-50 to-emerald-50 shadow-sm'
                    : 'group border-gray-200 hover:border-primary-200 hover:bg-gray-50'
                }`}
                onClick={()=>{
                    changeMethod('cash')
                }}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                    selectedMethod === 'cash' ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                    : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                }`}>
                  <IconCashBanknote size={20} className="text-xl" aria-hidden="true" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className={`font-bold  ${
                    selectedMethod === 'cash' ? 'text-primary-700' : 'text-gray-900'
                  }`}>
                    Cash on Delivery
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Pay when your order arrives at your doorstep
                  </p>
                </div>
                  {
                    selectedMethod === 'cash' ?
                    <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all bg-primary-600 text-white">
                     <IconCheck size={14} className="text-xs" aria-hidden="true" />
                    </div> 
                    : <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all border-2 border-gray-200" />

                  }
              </button>
              <button
                type="button"
                className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4  ${
                    selectedMethod === 'card' ? 'group border-primary-500 bg-gradient-to-r from-primary-50 to-emerald-50 shadow-sm'
                    : 'group border-gray-200 hover:border-primary-200 hover:bg-gray-50'
                }`}
                onClick={()=>{
                    changeMethod('card')
                }}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                    selectedMethod === 'card' ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                    : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                }`}>
                  <IconCreditCard size={20} className="text-xl" aria-hidden="true" />
                </div>
                <div className="flex-1 text-left">
                   <h3 className={`font-bold  ${
                    selectedMethod === 'card' ? 'text-primary-700' : 'text-gray-900'
                  }`}>Pay Online</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Secure payment with Credit/Debit Card via Stripe
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      alt="Visa"
                      className="h-5"
                      src="https://img.icons8.com/color/48/visa.png"
                    />
                    <img
                      alt="Mastercard"
                      className="h-5"
                      src="https://img.icons8.com/color/48/mastercard.png"
                    />
                    <img
                      alt="Amex"
                      className="h-5"
                      src="https://img.icons8.com/color/48/amex.png"
                    />
                  </div>
                </div>
                    {
                    selectedMethod === 'card' ?
                    <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all bg-primary-600 text-white">
                     <IconCheck size={14} className="text-xs" aria-hidden="true" />
                    </div> 
                    : <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all border-2 border-gray-200" />

                  }
                  </button>
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                 
                    <IconCheck size={14} className="text-xs" aria-hidden="true" />
                  
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Secure &amp; Encrypted
                  </p>
                  <p className="text-xs text-green-600 mt-0.5">
                    Your payment info is protected with 256-bit SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}
