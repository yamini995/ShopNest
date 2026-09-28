import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from './ProductVisual';
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
  Check,
  ShoppingBag,
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const {
    user,
    orders,
    wishlist,
    products,
    openProduct,
    addToCart,
    toggleWishlist,
    setActivePage,
    logoutUser,
    updateUserAddresses,
    showToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'profile' | 'wishlist' | 'addresses' | 'payments'>('profile');

  // Address form modal/state
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');
  const [newType, setNewType] = useState<'home' | 'office'>('home');

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Sign in to your account</h2>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          Access your orders, saved shipping addresses, and curated wishlist.
        </p>
        <button
          onClick={() => setActivePage('home')}
          className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
        >
          Return Home
        </button>
      </div>
    );
  }

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newZip) return;

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      fullName: user.name,
      phone: user.phone,
      street: newStreet,
      city: newCity,
      state: newState || 'WA',
      postalCode: newZip,
      isDefault: user.addresses.length === 0,
      type: newType,
    };

    updateUserAddresses([...user.addresses, newAddr]);
    setShowAddAddress(false);
    setNewStreet('');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 font-bold text-2xl flex items-center justify-center">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{user.name}</h1>
            <p className="text-xs text-slate-300 font-mono mt-0.5">{user.email}</p>
            <span className="text-[11px] text-emerald-400 mt-1 block">
              Member since {user.joinedDate} · ShopNest Prime Verified
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('orders')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Package className="w-4 h-4 text-emerald-400" />
            My Orders ({orders.length})
          </button>
          <button
            onClick={logoutUser}
            className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold rounded-lg border border-rose-500/30 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-slate-200 gap-6 text-xs sm:text-sm font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-4 h-4" />
          Profile Details
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'wishlist'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className="w-4 h-4" />
          My Wishlist ({wishlist.length})
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'addresses'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MapPin className="w-4 h-4" />
          Saved Addresses ({user.addresses.length})
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'payments'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          Payment Methods
        </button>
      </div>

      {/* Tab 1: Profile Details */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Personal Information</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-500 block mb-0.5">Full Name</label>
                <div className="font-semibold text-slate-800 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  {user.name}
                </div>
              </div>
              <div>
                <label className="text-slate-500 block mb-0.5">Email Address</label>
                <div className="font-semibold text-slate-800 p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-mono">
                  {user.email}
                </div>
              </div>
              <div>
                <label className="text-slate-500 block mb-0.5">Phone Number</label>
                <div className="font-semibold text-slate-800 p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-mono">
                  {user.phone}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Account Summary</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-slate-800 block">Total Lifetime Orders</span>
                  <span className="text-slate-500">{orders.length} orders successfully processed</span>
                </div>
                <button
                  onClick={() => setActivePage('orders')}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800"
                >
                  View All
                </button>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-slate-800 block">Delivery Speed Tier</span>
                  <span className="text-emerald-700 font-medium">Free Next-Day Prime Activated</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          {wishlistedProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">Your Wishlist is Empty</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                Click the heart icon on any product to save it here for later.
              </p>
              <button
                onClick={() => setActivePage('listing')}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-colors"
                >
                  <div>
                    <div
                      onClick={() => openProduct(p.id)}
                      className="w-full aspect-[4/3] bg-slate-50 rounded-xl p-4 cursor-pointer flex items-center justify-center border border-slate-100 mb-3"
                    >
                      <ProductVisual type={p.visualType} className="w-full h-full" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">{p.brand}</span>
                    <h4
                      onClick={() => openProduct(p.id)}
                      className="text-xs font-semibold text-slate-900 hover:text-emerald-700 cursor-pointer line-clamp-1"
                    >
                      {p.title}
                    </h4>
                    <span className="text-sm font-bold text-slate-900 tabular-nums mt-1 block">
                      ${p.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-100">
                    <button
                      onClick={() => {
                        addToCart(p, 1);
                        toggleWishlist(p.id);
                      }}
                      className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Move to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-2 border border-slate-200 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Your Shipping Addresses</h3>
            <button
              onClick={() => setShowAddAddress(!showAddAddress)}
              className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add New Address
            </button>
          </div>

          {/* Add Address Form */}
          {showAddAddress && (
            <form onSubmit={handleAddAddress} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">New Delivery Address</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="text-slate-700 font-semibold block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    placeholder="123 Market St"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="Seattle"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">State</label>
                  <input
                    type="text"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    placeholder="WA"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Postal / ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={newZip}
                    onChange={(e) => setNewZip(e.target.value)}
                    placeholder="98101"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Address Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as 'home' | 'office')}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none"
                  >
                    <option value="home">Home (Delivery all days)</option>
                    <option value="office">Office (Delivery 9am-6pm)</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAddress(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
                >
                  Save Address
                </button>
              </div>
            </form>
          )}

          {/* Addresses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-5 rounded-2xl border transition-all ${
                  addr.isDefault
                    ? 'border-slate-900 bg-slate-50/60 ring-1 ring-slate-900'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{addr.fullName}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                      {addr.type}
                    </span>
                  </div>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Default
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600">
                  {addr.street}
                  {addr.apartment && `, ${addr.apartment}`}
                </p>
                <p className="text-xs text-slate-600">
                  {addr.city}, {addr.state} {addr.postalCode}
                </p>
                <p className="text-xs font-mono text-slate-500 mt-1">{addr.phone}</p>

                <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100 text-xs font-medium">
                  {!addr.isDefault ? (
                    <button
                      onClick={() => handleSetDefaultAddress(addr.id)}
                      className="text-slate-700 hover:text-slate-900 underline"
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span className="text-slate-400">Primary Address</span>
                  )}

                  {user.addresses.length > 1 && (
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-rose-600 hover:text-rose-700 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Payments */}
      {activeTab === 'payments' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Saved Payment Methods</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-slate-700" />
                <div>
                  <span className="font-bold text-slate-900 block font-mono">•••• 4242</span>
                  <span className="text-slate-500 text-[11px]">Expires 08/29 · Visa</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Default
              </span>
            </div>

            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-slate-800 text-white rounded flex items-center justify-center font-bold text-[10px]">
                  UPI
                </div>
                <div>
                  <span className="font-bold text-slate-900 block font-mono">alex.morgan@oksbi</span>
                  <span className="text-slate-500 text-[11px]">Instant UPI auto-verify</span>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">Linked</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
