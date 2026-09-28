import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Address } from '../types';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  LogOut,
  Plus,
  Trash2,
  Bell,
  Check,
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export const AccountView: React.FC = () => {
  const {
    user,
    orders,
    wishlist,
    priceAlerts,
    removePriceAlert,
    simulatePriceDropTest,
    setActivePage,
    logoutUser,
    updateUserAddresses,
    showToast,
    openProduct,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'alerts' | 'payments'>('profile');

  // Address form modal
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newFullName, setNewFullName] = useState(user?.name || '');
  const [newPhone, setNewPhone] = useState(user?.phone || '');
  const [newStreet, setNewStreet] = useState('');
  const [newApartment, setNewApartment] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');
  const [newType, setNewType] = useState<'home' | 'office'>('home');

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <div className="w-12 h-12 rounded-full bg-[#F7F7F5] border border-[#E5E5E2] text-[#5C5C5C] flex items-center justify-center mx-auto mb-4">
          <User size={24} strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-bold text-[#1A1A1A]">Sign in to your account</h2>
        <p className="text-xs text-[#5C5C5C] mt-1 mb-6">
          Access your orders, saved addresses, and active price alerts.
        </p>
        <button
          onClick={() => setActivePage('home')}
          className="h-10 px-6 bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-semibold rounded-[6px]"
        >
          Return home
        </button>
      </div>
    );
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      fullName: newFullName || user.name,
      phone: newPhone || user.phone,
      street: newStreet,
      apartment: newApartment,
      city: newCity,
      state: newState,
      postalCode: newZip,
      isDefault: user.addresses.length === 0,
      type: newType,
    };
    updateUserAddresses([...user.addresses, newAddr]);
    setShowAddAddress(false);
    setNewStreet('');
    setNewApartment('');
    setNewCity('');
    setNewState('');
    setNewZip('');
  };

  const handleDeleteAddress = (id: string) => {
    updateUserAddresses(user.addresses.filter((a) => a.id !== id));
  };

  const handleSetDefaultAddress = (id: string) => {
    updateUserAddresses(
      user.addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 text-left space-y-6">
      <div className="border-b border-[#E5E5E2] pb-4 flex items-baseline justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-[#1A1A1A]">Account settings</h1>
          <p className="text-xs text-[#5C5C5C]">
            Manage your personal profile, delivery addresses, and alerts.
          </p>
        </div>
        <button
          onClick={logoutUser}
          className="h-8 px-3 border border-[#E5E5E2] hover:border-[#DC2626] text-[#DC2626] rounded-[6px] text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <LogOut size={14} strokeWidth={1.5} />
          <span>Sign out</span>
        </button>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex border-b border-[#E5E5E2] gap-6 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'profile'
              ? 'border-[#0F766E] text-[#0F766E]'
              : 'border-transparent text-[#5C5C5C] hover:text-[#1A1A1A]'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'addresses'
              ? 'border-[#0F766E] text-[#0F766E]'
              : 'border-transparent text-[#5C5C5C] hover:text-[#1A1A1A]'
          }`}
        >
          Saved addresses ({user.addresses.length})
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'alerts'
              ? 'border-[#0F766E] text-[#0F766E]'
              : 'border-transparent text-[#5C5C5C] hover:text-[#1A1A1A]'
          }`}
        >
          Price alerts ({priceAlerts.length})
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'payments'
              ? 'border-[#0F766E] text-[#0F766E]'
              : 'border-transparent text-[#5C5C5C] hover:text-[#1A1A1A]'
          }`}
        >
          Payment methods
        </button>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] p-6 space-y-5 text-xs">
          <h2 className="text-base font-bold text-[#1A1A1A]">Personal information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="block text-[#5C5C5C] mb-1">Full name</span>
              <p className="font-semibold text-sm text-[#1A1A1A]">{user.name}</p>
            </div>
            <div>
              <span className="block text-[#5C5C5C] mb-1">Email address</span>
              <p className="font-semibold text-sm text-[#1A1A1A]">{user.email}</p>
            </div>
            <div>
              <span className="block text-[#5C5C5C] mb-1">Phone number</span>
              <p className="font-semibold text-sm text-[#1A1A1A]">{user.phone}</p>
            </div>
            <div>
              <span className="block text-[#5C5C5C] mb-1">Member since</span>
              <p className="font-semibold text-sm text-[#1A1A1A]">{user.joinedDate}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5E5E2] flex gap-3">
            <button
              onClick={() => setActivePage('orders')}
              className="h-9 px-4 bg-[#0F766E] hover:bg-[#115E59] text-white font-semibold rounded-[6px] transition-colors"
            >
              View order history ({orders.length})
            </button>
            <button
              onClick={() => setActivePage('wishlist')}
              className="h-9 px-4 border border-[#E5E5E2] hover:border-[#1A1A1A] font-semibold text-[#1A1A1A] rounded-[6px] transition-colors"
            >
              View wishlist ({wishlist.length})
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-4 text-xs">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-[#1A1A1A]">Delivery addresses</h2>
            <button
              onClick={() => setShowAddAddress(true)}
              className="h-8 px-3 bg-[#0F766E] text-white font-semibold rounded-[6px] flex items-center gap-1.5"
            >
              <Plus size={16} />
              <span>Add address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-4 bg-[#FFFFFF] border rounded-[8px] space-y-2 relative ${
                  addr.isDefault ? 'border-[#0F766E]' : 'border-[#E5E5E2]'
                }`}
              >
                {addr.isDefault && (
                  <span className="inline-block bg-[#F7F7F5] text-[#0F766E] font-semibold px-2 py-0.5 rounded text-[11px] border border-[#E5E5E2]">
                    Default address
                  </span>
                )}
                <p className="font-semibold text-sm text-[#1A1A1A]">{addr.fullName}</p>
                <p className="text-[#5C5C5C]">
                  {addr.street}
                  {addr.apartment ? `, ${addr.apartment}` : ''}
                </p>
                <p className="text-[#5C5C5C]">
                  {addr.city}, {addr.state} - {addr.postalCode}
                </p>
                <p className="text-[#5C5C5C]">Phone: {addr.phone}</p>
                <span className="inline-block text-[11px] uppercase font-semibold text-[#5C5C5C] bg-[#F7F7F5] px-2 py-0.5 rounded">
                  {addr.type}
                </span>

                <div className="pt-2 border-t border-[#E5E5E2] flex items-center gap-3">
                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefaultAddress(addr.id)}
                      className="text-[#0F766E] font-medium hover:underline"
                    >
                      Set as default
                    </button>
                  )}
                  {user.addresses.length > 1 && (
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-[#DC2626] hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Address Modal */}
          {showAddAddress && (
            <div className="fixed inset-0 z-50 bg-[#1A1A1A]/40 flex items-center justify-center p-4">
              <div className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] p-6 max-w-md w-full shadow-md space-y-4">
                <h3 className="font-bold text-sm text-[#1A1A1A]">Add delivery address</h3>
                <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#5C5C5C] mb-1">Full name</label>
                    <input
                      type="text"
                      value={newFullName}
                      onChange={(e) => setNewFullName(e.target.value)}
                      required
                      className="w-full h-8 px-2.5 border border-[#E5E5E2] rounded-[6px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5C5C5C] mb-1">Phone number</label>
                    <input
                      type="tel"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      required
                      className="w-full h-8 px-2.5 border border-[#E5E5E2] rounded-[6px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5C5C5C] mb-1">Street address</label>
                    <input
                      type="text"
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      required
                      className="w-full h-8 px-2.5 border border-[#E5E5E2] rounded-[6px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5C5C5C] mb-1">Apartment / Suite</label>
                    <input
                      type="text"
                      value={newApartment}
                      onChange={(e) => setNewApartment(e.target.value)}
                      className="w-full h-8 px-2.5 border border-[#E5E5E2] rounded-[6px]"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[#5C5C5C] mb-1">City</label>
                      <input
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        required
                        className="w-full h-8 px-2.5 border border-[#E5E5E2] rounded-[6px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5C5C5C] mb-1">State</label>
                      <input
                        type="text"
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        required
                        className="w-full h-8 px-2.5 border border-[#E5E5E2] rounded-[6px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#5C5C5C] mb-1">PIN code</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={newZip}
                        onChange={(e) => setNewZip(e.target.value)}
                        required
                        className="w-full h-8 px-2.5 border border-[#E5E5E2] rounded-[6px]"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        checked={newType === 'home'}
                        onChange={() => setNewType('home')}
                        className="accent-[#0F766E]"
                      />
                      <span>Home</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        checked={newType === 'office'}
                        onChange={() => setNewType('office')}
                        className="accent-[#0F766E]"
                      />
                      <span>Office</span>
                    </label>
                  </div>
                  <div className="pt-3 border-t border-[#E5E5E2] flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="h-8 px-3 border border-[#E5E5E2] rounded-[6px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="h-8 px-4 bg-[#0F766E] text-white font-semibold rounded-[6px]"
                    >
                      Save address
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Price Alerts */}
      {activeTab === 'alerts' && (
        <div className="space-y-4 text-xs">
          <h2 className="text-base font-bold text-[#1A1A1A]">Active price alerts</h2>
          {priceAlerts.length > 0 ? (
            <div className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] divide-y divide-[#E5E5E2]">
              {priceAlerts.map((alert) => (
                <div key={alert.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4
                      onClick={() => openProduct(alert.productId)}
                      className="font-medium text-sm text-[#1A1A1A] hover:text-[#0F766E] cursor-pointer"
                    >
                      {alert.productName}
                    </h4>
                    <p className="text-[#5C5C5C]">
                      Target price: <strong className="text-[#1A1A1A]">{formatPrice(alert.targetPrice)}</strong> · Created on {alert.createdAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => simulatePriceDropTest(alert.productId, 500)}
                      className="h-8 px-3 bg-[#0F766E] text-white font-semibold rounded-[6px] hover:bg-[#115E59]"
                    >
                      Simulate alert
                    </button>
                    <button
                      onClick={() => removePriceAlert(alert.id)}
                      className="h-8 px-3 border border-[#E5E5E2] hover:border-[#DC2626] text-[#DC2626] rounded-[6px]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#5C5C5C]">You do not have any active price alerts.</p>
          )}
        </div>
      )}

      {/* Tab 4: Payments */}
      {activeTab === 'payments' && (
        <div className="max-w-md bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] p-5 space-y-4 text-xs">
          <h2 className="text-base font-bold text-[#1A1A1A]">Saved payment options</h2>
          <div className="p-3 bg-[#F7F7F5] border border-[#E5E5E2] rounded-[6px] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CreditCard size={18} strokeWidth={1.5} className="text-[#0F766E]" />
              <div>
                <p className="font-semibold text-[#1A1A1A]">HDFC Bank Platinum Card</p>
                <p className="text-[#5C5C5C]">Ending in •••• 8912</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#0F766E]">Default</span>
          </div>

          <div className="p-3 bg-[#F7F7F5] border border-[#E5E5E2] rounded-[6px] flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#1A1A1A]">Unified Payments Interface (UPI)</p>
              <p className="text-[#5C5C5C]">rahul@oksbi</p>
            </div>
            <span className="text-[11px] text-[#16A34A] font-semibold">Verified</span>
          </div>
        </div>
      )}
    </div>
  );
};
