import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Address, Order } from '../types';
import {
  CreditCard,
  QrCode,
  Banknote,
  ChevronRight,
  ArrowLeft,
  X,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import { ProductImage } from './ProductImage';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    deliveryCharge,
    cartTotal,
    placeOrder,
    user,
    setActivePage,
  } = useShop();

  // Steps: 1 = Address, 2 = Payment, 3 = Review, 4 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Default address
  const defaultAddr: Address =
    user && user.addresses.length > 0
      ? user.addresses[0]
      : {
          id: 'addr-default',
          fullName: 'Rahul Sharma',
          phone: '+91 98765 43210',
          street: '42, 3rd Cross, Indiranagar',
          apartment: 'Flat 302, Green Meadows',
          city: 'Bengaluru',
          state: 'Karnataka',
          postalCode: '560038',
          isDefault: true,
          type: 'home',
        };

  const [address, setAddress] = useState<Address>(defaultAddr);
  const [paymentMethod, setPaymentMethod] = useState<
    'UPI' | 'Credit/Debit Card' | 'Cash on Delivery'
  >('UPI');
  const [upiId, setUpiId] = useState('rahul@oksbi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const handleNextFromAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleNextFromPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = () => {
    const order = placeOrder(address, paymentMethod, deliveryCharge);
    setConfirmedOrder(order);
    setStep(4);
  };

  const handleClose = () => {
    setStep(1);
    setConfirmedOrder(null);
    onClose();
  };

  const handleViewOrder = () => {
    handleClose();
    setActivePage('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/40 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-md text-left">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E5E5E2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step > 1 && step < 4 && (
              <button
                onClick={() => setStep((s) => (s - 1) as any)}
                className="p-1 text-[#5C5C5C] hover:text-[#1A1A1A]"
                aria-label="Back"
              >
                <ArrowLeft size={18} strokeWidth={1.5} />
              </button>
            )}
            <h2 className="text-base font-bold text-[#1A1A1A]">
              {step === 1 && '1. Delivery address & contact'}
              {step === 2 && '2. Payment method'}
              {step === 3 && '3. Review order & confirm'}
              {step === 4 && 'Order confirmed'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 text-[#5C5C5C] hover:text-[#1A1A1A]"
            aria-label="Close checkout"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Step 1: Address Form */}
        {step === 1 && (
          <form onSubmit={handleNextFromAddress} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#1A1A1A] mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  value={address.fullName}
                  onChange={(e) =>
                    setAddress({ ...address, fullName: e.target.value })
                  }
                  required
                  className="w-full h-9 px-3 border border-[#E5E5E2] rounded-[6px] text-xs text-[#1A1A1A] focus:border-[#0F766E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1A1A1A] mb-1">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={address.phone}
                  onChange={(e) =>
                    setAddress({ ...address, phone: e.target.value })
                  }
                  required
                  className="w-full h-9 px-3 border border-[#E5E5E2] rounded-[6px] text-xs text-[#1A1A1A] focus:border-[#0F766E] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#1A1A1A] mb-1">
                Street address
              </label>
              <input
                type="text"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                required
                className="w-full h-9 px-3 border border-[#E5E5E2] rounded-[6px] text-xs text-[#1A1A1A] focus:border-[#0F766E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1A1A1A] mb-1">
                Apartment, suite, unit (optional)
              </label>
              <input
                type="text"
                value={address.apartment || ''}
                onChange={(e) =>
                  setAddress({ ...address, apartment: e.target.value })
                }
                className="w-full h-9 px-3 border border-[#E5E5E2] rounded-[6px] text-xs text-[#1A1A1A] focus:border-[#0F766E] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-[#1A1A1A] mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  required
                  className="w-full h-9 px-3 border border-[#E5E5E2] rounded-[6px] text-xs text-[#1A1A1A] focus:border-[#0F766E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1A1A1A] mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  required
                  className="w-full h-9 px-3 border border-[#E5E5E2] rounded-[6px] text-xs text-[#1A1A1A] focus:border-[#0F766E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1A1A1A] mb-1">
                  PIN code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={address.postalCode}
                  onChange={(e) =>
                    setAddress({ ...address, postalCode: e.target.value })
                  }
                  required
                  className="w-full h-9 px-3 border border-[#E5E5E2] rounded-[6px] text-xs text-[#1A1A1A] focus:border-[#0F766E] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#1A1A1A] mb-1">
                Address type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="addrType"
                    checked={address.type === 'home'}
                    onChange={() => setAddress({ ...address, type: 'home' })}
                    className="accent-[#0F766E]"
                  />
                  <span>Home (all-day delivery)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="addrType"
                    checked={address.type === 'office'}
                    onChange={() => setAddress({ ...address, type: 'office' })}
                    className="accent-[#0F766E]"
                  />
                  <span>Office (9 AM - 6 PM)</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E5E2] flex justify-end">
              <button
                type="submit"
                className="h-10 px-6 bg-[#0F766E] hover:bg-[#115E59] active:translate-y-px text-white text-xs font-semibold rounded-[6px] transition-colors"
              >
                Continue to payment
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Method */}
        {step === 2 && (
          <form onSubmit={handleNextFromPayment} className="p-6 space-y-4 text-xs">
            <div className="space-y-3">
              {/* UPI Option */}
              <label
                className={`p-3 border rounded-[6px] flex flex-col gap-2 cursor-pointer transition-colors ${
                  paymentMethod === 'UPI'
                    ? 'border-[#0F766E] bg-[#F7F7F5]'
                    : 'border-[#E5E5E2]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="accent-[#0F766E]"
                    />
                    <QrCode size={18} strokeWidth={1.5} className="text-[#0F766E]" />
                    <span className="font-semibold text-sm text-[#1A1A1A]">
                      UPI (Google Pay, PhonePe, Paytm, BHIM)
                    </span>
                  </div>
                  <span className="text-[11px] text-[#16A34A] font-semibold">
                    Instant &amp; Free
                  </span>
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="pt-2 pl-6 space-y-2">
                    <p className="text-[#5C5C5C]">
                      Enter UPI ID or scan QR code on payment screen:
                    </p>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@upi"
                      className="w-full max-w-xs h-8 px-2.5 border border-[#E5E5E2] rounded-[6px] bg-[#FFFFFF] text-xs text-[#1A1A1A]"
                    />
                  </div>
                )}
              </label>

              {/* Credit/Debit Card Option */}
              <label
                className={`p-3 border rounded-[6px] flex flex-col gap-2 cursor-pointer transition-colors ${
                  paymentMethod === 'Credit/Debit Card'
                    ? 'border-[#0F766E] bg-[#F7F7F5]'
                    : 'border-[#E5E5E2]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Credit/Debit Card'}
                      onChange={() => setPaymentMethod('Credit/Debit Card')}
                      className="accent-[#0F766E]"
                    />
                    <CreditCard size={18} strokeWidth={1.5} className="text-[#0F766E]" />
                    <span className="font-semibold text-sm text-[#1A1A1A]">
                      Credit / Debit Card
                    </span>
                  </div>
                  <span className="text-[11px] text-[#5C5C5C]">
                    Visa, Mastercard, RuPay
                  </span>
                </div>

                {paymentMethod === 'Credit/Debit Card' && (
                  <div className="pt-2 pl-6 space-y-2">
                    <div>
                      <label className="block text-[#5C5C5C] mb-0.5">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full max-w-xs h-8 px-2.5 border border-[#E5E5E2] rounded-[6px] bg-[#FFFFFF] text-xs text-[#1A1A1A]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div>
                        <label className="block text-[#5C5C5C] mb-0.5">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-20 h-8 px-2.5 border border-[#E5E5E2] rounded-[6px] bg-[#FFFFFF] text-xs text-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#5C5C5C] mb-0.5">CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-16 h-8 px-2.5 border border-[#E5E5E2] rounded-[6px] bg-[#FFFFFF] text-xs text-[#1A1A1A]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </label>

              {/* Cash on Delivery Option */}
              <label
                className={`p-3 border rounded-[6px] flex items-center justify-between cursor-pointer transition-colors ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-[#0F766E] bg-[#F7F7F5]'
                    : 'border-[#E5E5E2]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                    className="accent-[#0F766E]"
                  />
                  <Banknote size={18} strokeWidth={1.5} className="text-[#0F766E]" />
                  <span className="font-semibold text-sm text-[#1A1A1A]">
                    Cash on Delivery
                  </span>
                </div>
                <span className="text-[11px] text-[#5C5C5C]">Pay at doorstep</span>
              </label>
            </div>

            <p className="text-[11px] text-[#5C5C5C] pt-2">
              Note: This is a simulation environment. No real funds will be deducted.
            </p>

            <div className="pt-4 border-t border-[#E5E5E2] flex justify-end">
              <button
                type="submit"
                className="h-10 px-6 bg-[#0F766E] hover:bg-[#115E59] active:translate-y-px text-white text-xs font-semibold rounded-[6px] transition-colors"
              >
                Review order
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Review & Confirm */}
        {step === 3 && (
          <div className="p-6 space-y-4 text-xs">
            {/* Delivery To */}
            <div className="p-3 bg-[#F7F7F5] border border-[#E5E5E2] rounded-[6px]">
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-[#1A1A1A]">Delivering to:</span>
                <button
                  onClick={() => setStep(1)}
                  className="text-[#0F766E] hover:underline"
                >
                  Change
                </button>
              </div>
              <p className="text-[#1A1A1A] font-medium">{address.fullName}</p>
              <p className="text-[#5C5C5C]">
                {address.street}
                {address.apartment ? `, ${address.apartment}` : ''}
              </p>
              <p className="text-[#5C5C5C]">
                {address.city}, {address.state} - {address.postalCode}
              </p>
              <p className="text-[#5C5C5C]">Phone: {address.phone}</p>
            </div>

            {/* Payment via */}
            <div className="p-3 bg-[#F7F7F5] border border-[#E5E5E2] rounded-[6px]">
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-[#1A1A1A]">Payment method:</span>
                <button
                  onClick={() => setStep(2)}
                  className="text-[#0F766E] hover:underline"
                >
                  Change
                </button>
              </div>
              <p className="text-[#1A1A1A] font-medium">{paymentMethod}</p>
              {paymentMethod === 'UPI' && (
                <p className="text-[#5C5C5C]">VPA: {upiId}</p>
              )}
            </div>

            {/* Items summary */}
            <div className="border border-[#E5E5E2] rounded-[6px] divide-y divide-[#E5E5E2]">
              <div className="p-2.5 font-semibold text-[#1A1A1A] bg-[#F7F7F5]">
                Items in this order ({cart.reduce((a, b) => a + b.quantity, 0)})
              </div>
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#F7F7F5] border border-[#E5E5E2] rounded-[4px] p-1 shrink-0 overflow-hidden">
                      <ProductImage
                        src={item.product.images[0]}
                        alt={item.product.name}
                        category={item.product.category}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1A1A] line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-[#5C5C5C]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#1A1A1A] tabular-nums">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-[#E5E5E2]">
              <div className="flex justify-between text-[#5C5C5C]">
                <span>Items subtotal</span>
                <span className="text-[#1A1A1A] font-medium tabular-nums">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#16A34A]">
                  <span>Discount</span>
                  <span className="font-semibold tabular-nums">
                    -{formatPrice(cartDiscount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-[#5C5C5C]">
                <span>Delivery</span>
                <span className="text-[#1A1A1A] font-medium">
                  {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1A1A1A] pt-2 border-t border-[#E5E5E2]">
                <span>Order total</span>
                <span className="tabular-nums">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E5E2] flex justify-end">
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="h-10 px-8 bg-[#0F766E] hover:bg-[#115E59] active:translate-y-px text-white text-xs font-semibold rounded-[6px] transition-colors"
              >
                Place order
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && confirmedOrder && (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#F7F7F5] border border-[#E5E5E2] text-[#0F766E] flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} strokeWidth={2} />
            </div>

            <div>
              <h3 className="text-[20px] font-bold text-[#1A1A1A]">
                Order placed successfully
              </h3>
              <p className="text-xs text-[#5C5C5C] mt-1">
                Order #{confirmedOrder.id} has been confirmed.
              </p>
            </div>

            <div className="bg-[#F7F7F5] border border-[#E5E5E2] rounded-[6px] p-4 text-xs max-w-sm mx-auto text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#5C5C5C]">Delivery date:</span>
                <span className="font-semibold text-[#1A1A1A]">
                  Within 2-3 business days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C5C5C]">Paid via:</span>
                <span className="font-semibold text-[#1A1A1A]">
                  {confirmedOrder.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C5C5C]">Total amount:</span>
                <span className="font-bold text-[#1A1A1A] tabular-nums">
                  {formatPrice(confirmedOrder.total)}
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={handleViewOrder}
                className="h-10 px-6 bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold rounded-[6px] transition-colors"
              >
                Track order
              </button>
              <button
                onClick={handleClose}
                className="h-10 px-6 border border-[#E5E5E2] hover:border-[#1A1A1A] text-[#1A1A1A] text-xs font-semibold rounded-[6px] transition-colors"
              >
                Continue shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
