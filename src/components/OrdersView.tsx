import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Order, OrderStatus } from '../types';
import {
  Package,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  ChevronRight,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import { ProductImage } from './ProductImage';

export const OrdersView: React.FC = () => {
  const { orders, openProduct, cancelOrder, reorderItems, setActivePage } = useShop();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'text-[#16A34A] bg-[#F7F7F5] border-[#E5E5E2]';
      case 'Out for Delivery':
        return 'text-[#0F766E] bg-[#F7F7F5] border-[#0F766E]';
      case 'Shipped':
        return 'text-[#0F766E] bg-[#F7F7F5] border-[#E5E5E2]';
      case 'Ordered':
      default:
        return 'text-[#1A1A1A] bg-[#F7F7F5] border-[#E5E5E2]';
    }
  };

  const steps: OrderStatus[] = ['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'];

  const getStepIndex = (status: OrderStatus) => {
    return steps.indexOf(status);
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="max-w-md mx-auto bg-[#F7F7F5] border border-[#E5E5E2] rounded-[8px] p-8 space-y-3">
          <h2 className="text-[20px] font-bold text-[#1A1A1A]">No orders found</h2>
          <p className="text-xs text-[#5C5C5C]">
            You have not placed any orders yet.
          </p>
          <button
            onClick={() => setActivePage('listing')}
            className="mt-4 h-10 px-6 bg-[#0F766E] hover:bg-[#115E59] active:translate-y-px text-white text-xs font-semibold rounded-[6px] transition-colors"
          >
            Start shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 text-left space-y-6">
      <div className="flex items-baseline justify-between border-b border-[#E5E5E2] pb-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#1A1A1A]">My orders</h1>
          <p className="text-xs text-[#5C5C5C]">
            Review your order history, delivery statuses, and receipts.
          </p>
        </div>
        <span className="text-xs text-[#5C5C5C] font-medium">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
        </span>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => {
          const currentStepIdx = getStepIndex(order.status);

          return (
            <div
              key={order.id}
              className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] overflow-hidden text-xs"
            >
              {/* Card Header */}
              <div className="p-4 bg-[#F7F7F5] border-b border-[#E5E5E2] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <span className="block text-[#5C5C5C]">Order placed</span>
                    <span className="font-semibold text-[#1A1A1A]">{order.date}</span>
                  </div>

                  <div>
                    <span className="block text-[#5C5C5C]">Total amount</span>
                    <span className="font-bold text-[#1A1A1A] tabular-nums">
                      {formatPrice(order.total)}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[#5C5C5C]">Ship to</span>
                    <span className="font-medium text-[#1A1A1A]">
                      {order.deliveryAddress.fullName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[#5C5C5C]">Order #{order.id}</span>
                  <button
                    onClick={() => setSelectedOrderId(order.id)}
                    className="h-8 px-3 border border-[#E5E5E2] bg-[#FFFFFF] hover:border-[#1A1A1A] rounded-[6px] font-semibold text-[#1A1A1A] transition-colors"
                  >
                    Track package
                  </button>
                </div>
              </div>

              {/* Status and Items */}
              <div className="p-4 sm:p-5 space-y-4">
                {/* Status line */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E2]">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-[4px] border font-bold text-xs ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                    <span className="text-[#5C5C5C]">
                      Estimated delivery: {order.estimatedDeliveryDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => reorderItems(order.items)}
                      className="text-[#0F766E] font-semibold hover:underline"
                    >
                      Buy it again
                    </button>
                    {order.status !== 'Delivered' && (
                      <>
                        <span className="text-[#E5E5E2]">|</span>
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="text-[#5C5C5C] hover:text-[#DC2626]"
                        >
                          Cancel order
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Tracking Progress Tracker */}
                <div className="py-2">
                  <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                    {steps.map((st, idx) => {
                      const isComplete = idx <= currentStepIdx;
                      return (
                        <div key={st} className="space-y-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              isComplete ? 'bg-[#0F766E]' : 'bg-[#E5E5E2]'
                            }`}
                          />
                          <span
                            className={`block font-medium ${
                              isComplete ? 'text-[#1A1A1A]' : 'text-[#5C5C5C]'
                            }`}
                          >
                            {st}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items in order */}
                <div className="divide-y divide-[#E5E5E2] pt-2">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => openProduct(item.productId)}
                          className="w-14 h-14 bg-[#F7F7F5] border border-[#E5E5E2] rounded-[6px] p-1 shrink-0 cursor-pointer overflow-hidden"
                        >
                          <ProductImage
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h4
                            onClick={() => openProduct(item.productId)}
                            className="font-medium text-[#1A1A1A] hover:text-[#0F766E] cursor-pointer line-clamp-1"
                          >
                            {item.name}
                          </h4>
                          <p className="text-[#5C5C5C] text-[11px]">
                            Qty: {item.quantity} · {formatPrice(item.price)} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#1A1A1A] tabular-nums">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => openProduct(item.productId)}
                          className="h-7 px-2.5 border border-[#E5E5E2] hover:border-[#1A1A1A] rounded-[4px] font-semibold text-[#1A1A1A] text-[11px]"
                        >
                          View item
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Track Package Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/40 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] max-w-md w-full p-6 shadow-md text-left space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#E5E5E2] pb-3">
              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A]">
                  Tracking details #{selectedOrder.id}
                </h3>
                <p className="text-[#5C5C5C]">
                  Status: <strong className="text-[#0F766E]">{selectedOrder.status}</strong>
                </p>
              </div>
              <button
                onClick={() => setSelectedOrderId(null)}
                className="text-[#5C5C5C] hover:text-[#1A1A1A]"
              >
                ✕
              </button>
            </div>

            {/* Timeline */}
            <div className="space-y-4 pt-2">
              {selectedOrder.trackingHistory.map((step, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 ${
                        step.completed
                          ? 'border-[#0F766E] bg-[#0F766E]'
                          : 'border-[#E5E5E2] bg-[#FFFFFF]'
                      }`}
                    />
                    {idx < selectedOrder.trackingHistory.length - 1 && (
                      <div
                        className={`w-0.5 flex-1 my-1 ${
                          step.completed ? 'bg-[#0F766E]' : 'bg-[#E5E5E2]'
                        }`}
                      />
                    )}
                  </div>

                  <div className="space-y-0.5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1A1A1A]">{step.status}</span>
                      <span className="text-[#5C5C5C] text-[11px]">{step.timestamp}</span>
                    </div>
                    <p className="text-[#5C5C5C]">{step.location}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#E5E5E2] flex justify-end">
              <button
                onClick={() => setSelectedOrderId(null)}
                className="h-8 px-4 bg-[#0F766E] text-white font-semibold rounded-[6px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
