import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Order, OrderStatus } from '../types';
import { ProductVisual } from './ProductVisual';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  MapPin,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';

const STATUS_STEPS: OrderStatus[] = ['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'];

export const OrdersView: React.FC = () => {
  const { orders, setActivePage, openProduct, cancelOrder } = useShop();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(
    orders.length > 0 ? orders[0].id : null
  );

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const getStatusIndex = (status: OrderStatus) => {
    return STATUS_STEPS.indexOf(status);
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          No Orders Placed Yet
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-2 mb-6">
          When you purchase products from ShopNest, their delivery updates, receipts, and tracking timelines will appear here.
        </p>
        <button
          onClick={() => setActivePage('listing')}
          className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Your Orders & Deliveries</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track active packages, view itemized receipts, and manage delivery preferences.
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg self-start sm:self-auto">
          {orders.length} Total {orders.length === 1 ? 'Order' : 'Orders'}
        </div>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const isExpanded = expandedOrderId === order.id;
          const currentStepIdx = getStatusIndex(order.status);

          return (
            <div
              key={order.id}
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
            >
              {/* Order Card Summary Top Strip */}
              <div className="p-4 sm:p-6 bg-slate-50/70 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Order Placed
                    </span>
                    <span className="font-semibold text-slate-800">{order.date}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Total Amount
                    </span>
                    <span className="font-bold text-slate-900 font-mono tabular-nums">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Ship To
                    </span>
                    <span className="font-semibold text-slate-800">{order.deliveryAddress.fullName}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Status
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        order.status === 'Delivered'
                          ? 'text-emerald-700'
                          : 'text-sky-700'
                      }`}
                    >
                      {order.status === 'Delivered' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-500 font-medium">{order.id}</span>
                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition-colors flex items-center gap-1 font-medium"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'Track Order'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Order Status Visual Progress Stepper (Ordered → Shipped → Out for Delivery → Delivered) */}
              <div className="p-6 border-b border-slate-100 bg-white">
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center justify-between relative">
                    {/* Connecting Bar */}
                    <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />
                    <div
                      className="absolute top-4 left-6 h-0.5 bg-emerald-500 -z-0 transition-all duration-500"
                      style={{
                        width: `${(currentStepIdx / (STATUS_STEPS.length - 1)) * 100}%`,
                      }}
                    />

                    {STATUS_STEPS.map((step, idx) => {
                      const isComplete = idx <= currentStepIdx;
                      const isCurrent = idx === currentStepIdx;

                      return (
                        <div key={step} className="flex flex-col items-center relative z-10">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                              isComplete
                                ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-50'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {isComplete ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          <span
                            className={`text-[11px] font-semibold mt-2 text-center ${
                              isCurrent
                                ? 'text-emerald-700'
                                : isComplete
                                ? 'text-slate-800'
                                : 'text-slate-400'
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Items in this Order */}
              <div className="p-6 divide-y divide-slate-100">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => openProduct(item.productId)}
                        className="w-16 h-16 bg-slate-50 rounded-lg p-1.5 cursor-pointer border border-slate-100 shrink-0"
                      >
                        <ProductVisual type={item.visualType} className="w-full h-full" />
                      </div>
                      <div>
                        <h4
                          onClick={() => openProduct(item.productId)}
                          className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-emerald-700 cursor-pointer line-clamp-1"
                        >
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span>Qty: {item.quantity}</span>
                          {item.selectedColor && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>Color: {item.selectedColor}</span>
                            </>
                          )}
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-800 mt-1 block">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => openProduct(item.productId)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium transition-colors"
                      >
                        Buy it again
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expandable Tracking Log & Receipt */}
              {isExpanded && (
                <div className="bg-slate-50/70 p-6 border-t border-slate-200/80 space-y-4 animate-in fade-in">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Detailed Tracking Log
                  </h4>

                  <div className="space-y-3">
                    {order.trackingHistory.map((log, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs">
                        <div
                          className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                            log.completed ? 'bg-emerald-500' : 'bg-slate-300'
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-800">{log.status}</span>
                            <span className="text-slate-400 font-mono text-[11px]">{log.timestamp}</span>
                          </div>
                          <p className="text-slate-500">{log.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery address & breakdown */}
                  <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-bold text-slate-800 block mb-1">Shipping Destination</span>
                      <p className="text-slate-600">
                        {order.deliveryAddress.street}
                        {order.deliveryAddress.apartment && `, ${order.deliveryAddress.apartment}`}
                      </p>
                      <p className="text-slate-600">
                        {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.postalCode}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-800 block mb-1">Payment Method</span>
                      <p className="text-slate-600">{order.paymentMethod}</p>
                      <p className="text-slate-400 text-[11px]">
                        Subtotal: ${order.subtotal.toFixed(2)} · Delivery: ${order.deliveryCharge.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
