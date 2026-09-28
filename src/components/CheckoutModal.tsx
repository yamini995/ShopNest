import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Address, Order } from '../types';
import {
  CheckCircle2,
  CreditCard,
  QrCode,
  Banknote,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  X,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    cartSubtotal,
    promoDiscount,
    placeOrder,
    user,
    setActivePage,
  } = useShop();

  // Multi-step: 1 = Address, 2 = Delivery Method, 3 = Payment, 4 = Review, 5 = Confirmed
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Address state
  const defaultAddr: Address = (user && user.addresses.length > 0)
    ? user.addresses[0]
    : {
        id: 'addr-new',
        fullName: 'Alex Morgan',
        phone: '+1 (555) 382-9014',
        street: '742 Evergreen Terrace',
        apartment: 'Suite 4B',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        isDefault: true,
        type: 'home',
      };

  const [address, setAddress] = useState<Address>(defaultAddr);

  // Delivery option: Standard (Free) or Priority ($4.99)
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const deliveryCharge =
    deliverySpeed === 'express' ? 4.99 : cartSubtotal >= 50 ? 0 : 9.99;

  // Payment method: UPI, Credit/Debit Card, Cash on Delivery
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit/Debit Card' | 'Cash on Delivery'>('Credit/Debit Card');

  // Form states
  const [upiId, setUpiId] = useState('alex.morgan@oksbi');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('884');
  const [cardHolder, setCardHolder] = useState('ALEX MORGAN');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const discountAmount = cartSubtotal * promoDiscount;
  const finalTotal = cartSubtotal - discountAmount + deliveryCharge;

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulate payment transaction network latency
    setTimeout(() => {
      const order = placeOrder(address, paymentMethod, deliveryCharge);
      setConfirmedOrder(order);
      setIsProcessing(false);
      setCurrentStep(5);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-xs">
              S
            </div>
            <span className="font-bold text-sm tracking-tight">ShopNest Safe Checkout</span>
          </div>

          {currentStep !== 5 && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Multi-Step Stepper Progress Bar (Steps 1 to 4) */}
        {currentStep < 5 && (
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
            <div className="flex items-center justify-between text-xs">
              <span
                className={`font-semibold flex items-center gap-1.5 ${
                  currentStep >= 1 ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  currentStep >= 1 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  1
                </span>
                Address
              </span>

              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />

              <span
                className={`font-semibold flex items-center gap-1.5 ${
                  currentStep >= 2 ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  currentStep >= 2 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  2
                </span>
                Delivery
              </span>

              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />

              <span
                className={`font-semibold flex items-center gap-1.5 ${
                  currentStep >= 3 ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  currentStep >= 3 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  3
                </span>
                Payment
              </span>

              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />

              <span
                className={`font-semibold flex items-center gap-1.5 ${
                  currentStep >= 4 ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  currentStep >= 4 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  4
                </span>
                Review
              </span>
            </div>
          </div>
        )}

        {/* Step 1: Delivery Address */}
        {currentStep === 1 && (
          <div className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              1. Where should we deliver your order?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Apartment / Suite (Optional)
                </label>
                <input
                  type="text"
                  value={address.apartment || ''}
                  onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  State / Province
                </label>
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Postal / ZIP Code
                </label>
                <input
                  type="text"
                  value={address.postalCode}
                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Continue to Delivery Speed
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Delivery Speed */}
        {currentStep === 2 && (
          <div className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              2. Select Delivery Speed
            </h3>

            <div className="space-y-3">
              <label
                onClick={() => setDeliverySpeed('standard')}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  deliverySpeed === 'standard'
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    deliverySpeed === 'standard' ? 'border-slate-900' : 'border-slate-300'
                  }`}>
                    {deliverySpeed === 'standard' && (
                      <div className="w-2 h-2 rounded-full bg-slate-900" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Standard Delivery</h4>
                    <p className="text-[11px] text-slate-500">Delivered within 2–3 business days</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700">
                  {cartSubtotal >= 50 ? 'FREE' : '$9.99'}
                </span>
              </label>

              <label
                onClick={() => setDeliverySpeed('express')}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  deliverySpeed === 'express'
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    deliverySpeed === 'express' ? 'border-slate-900' : 'border-slate-300'
                  }`}>
                    {deliverySpeed === 'express' && (
                      <div className="w-2 h-2 rounded-full bg-slate-900" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      Priority Express Delivery
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                        Fastest
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-500">Guaranteed tomorrow by 1:00 PM</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-900">$4.99</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="py-3 px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Continue to Payment Method
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Method */}
        {currentStep === 3 && (
          <div className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              3. Choose Payment Method (Simulated)
            </h3>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                onClick={() => setPaymentMethod('Credit/Debit Card')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'Credit/Debit Card'
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900 text-slate-900 font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <CreditCard className="w-5 h-5 text-slate-800" />
                <span className="text-xs">Card</span>
              </button>

              <button
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'UPI'
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900 text-slate-900 font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <QrCode className="w-5 h-5 text-slate-800" />
                <span className="text-xs">UPI / QR</span>
              </button>

              <button
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900 text-slate-900 font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <Banknote className="w-5 h-5 text-slate-800" />
                <span className="text-xs">Cash on Delivery</span>
              </button>
            </div>

            {/* Credit Card inputs */}
            {paymentMethod === 'Credit/Debit Card' && (
              <div className="space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Expires (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs uppercase text-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* UPI inputs */}
            {paymentMethod === 'UPI' && (
              <div className="space-y-4 bg-slate-50/70 p-4 rounded-xl border border-slate-200 text-center">
                <div className="w-32 h-32 bg-white border border-slate-300 rounded-xl p-2 mx-auto flex items-center justify-center shadow-xs">
                  <div className="w-full h-full border-2 border-slate-900 border-dashed rounded-lg flex flex-col items-center justify-center p-2 text-slate-800">
                    <QrCode className="w-12 h-12" />
                    <span className="text-[9px] font-mono mt-1">SCAN ANY UPI APP</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Or Enter Virtual Payment Address (UPI ID)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@okhdfcbank"
                    className="w-full max-w-sm mx-auto px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none text-center"
                  />
                </div>
              </div>
            )}

            {/* Cash on Delivery notes */}
            {paymentMethod === 'Cash on Delivery' && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-2">
                <h4 className="font-bold flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-amber-700" />
                  Pay with Cash upon Doorstep Delivery
                </h4>
                <p>
                  Please keep exact cash ready (${finalTotal.toFixed(2)}) to handover to our delivery driver. Contactless UPI will also be accepted at your doorstep.
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="py-3 px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Review & Finalize Order
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Final Order Summary & Confirmation */}
        {currentStep === 4 && (
          <div className="p-6 space-y-5">
            <h3 className="text-base font-bold text-slate-900">
              4. Review Order & Place
            </h3>

            {/* Shipping & Payment summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Delivering To:</span>
                <p className="text-slate-600 font-medium">{address.fullName}</p>
                <p className="text-slate-500">{address.street}, {address.city}, {address.postalCode}</p>
                <p className="text-slate-500 font-mono mt-1">{address.phone}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Payment & Speed:</span>
                <p className="text-slate-600 font-medium">Method: {paymentMethod}</p>
                <p className="text-slate-500 capitalize">Speed: {deliverySpeed} Delivery</p>
                <p className="text-emerald-700 font-semibold mt-1">Simulated test mode</p>
              </div>
            </div>

            {/* Line items mini preview */}
            <div className="max-h-36 overflow-y-auto space-y-2 border-y border-slate-100 py-3">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between text-xs">
                  <span className="text-slate-700 truncate max-w-sm">
                    {item.quantity}x {item.product.title}
                  </span>
                  <span className="font-mono text-slate-900 tabular-nums">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total calculation */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="tabular-nums font-mono">${cartSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount</span>
                  <span className="tabular-nums font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="tabular-nums font-mono">
                  {deliveryCharge === 0 ? 'FREE' : `$${deliveryCharge.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Due</span>
                <span className="text-lg tabular-nums font-mono">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentStep(3)}
                className="py-3 px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="flex-1 py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {isProcessing ? (
                  <span>Authorizing Simulated Payment...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ${finalTotal.toFixed(2)} & Complete Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Success Order Confirmation Screen */}
        {currentStep === 5 && confirmedOrder && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Order Confirmed
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Thank you for your order!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                We have received your simulated order. A confirmation receipt has been generated.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-3 text-xs max-w-md mx-auto">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Order Number</span>
                <span className="font-mono font-bold text-slate-900">{confirmedOrder.id}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Estimated Delivery</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {confirmedOrder.estimatedDeliveryDate}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Total Paid</span>
                <span className="font-mono font-bold text-slate-900">${confirmedOrder.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Method</span>
                <span className="font-medium text-slate-800">{confirmedOrder.paymentMethod}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  setActivePage('orders');
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Track Order & View History
              </button>

              <button
                onClick={() => {
                  onClose();
                  setActivePage('home');
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
