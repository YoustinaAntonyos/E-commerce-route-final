
'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import {
  IconMapPin,
  IconSettings,
  IconChevronRight,
  IconPlus,
  IconX,
  IconTrash,
  IconHome,
  IconRefresh,
} from '@tabler/icons-react';
import { toast } from 'sonner';
import ProfileScreen from '../screens/ProfileScreen';
import {
  addUserAddress,
  getUserAddresses,
  removeUserAddress,
} from '../services/address.action';
import { AddressInput, UserAddress } from '../types/address.type';

const emptyAddress: AddressInput = {
  name: '',
  details: '',
  phone: '',
  city: '',
};

export default function MyAddress({
  showProfileHeader = true,
}: {
  showProfileHeader?: boolean;
}) {
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [isSaving, setIsSaving] = useState(false);
  const [removingAddressId, setRemovingAddressId] = useState<string | null>(null);

  async function loadAddresses() {
    setIsLoading(true);
    setLoadError('');
    try {
      const response = await getUserAddresses();
      if (response.status !== 'success') {
        setLoadError(response.message);
        return;
      }

      setAddresses(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Loading addresses failed:', error);
      setLoadError('Unable to load your addresses. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void Promise.resolve().then(() => loadAddresses());
  }, []);

  function openAddressForm() {
    setAddressForm(emptyAddress);
    setIsAddressFormOpen(true);
  }

  async function handleAddAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSaving) return;

    setIsSaving(true);
    try {
      const response = await addUserAddress(addressForm);
      if (response.status !== 'success') {
        toast.error(response.message);
        return;
      }

      setIsAddressFormOpen(false);
      setAddressForm(emptyAddress);
      toast.success(response.message || 'Address added successfully.');
      await loadAddresses();
    } catch (error) {
      console.error('Adding address failed:', error);
      toast.error('Unable to add this address. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleRemoveAddress(addressId: string) {
    if (removingAddressId) return;

    setRemovingAddressId(addressId);
    try {
      const response = await removeUserAddress(addressId);
      if (response.status !== 'success') {
        toast.error(response.message);
        return;
      }

      setAddresses((currentAddresses) =>
        currentAddresses.filter((address) => address._id !== addressId),
      );
      toast.success(response.message || 'Address removed successfully.');
    } catch (error) {
      console.error('Removing address failed:', error);
      toast.error('Unable to remove this address. Please try again.');
    } finally {
      setRemovingAddressId(null);
    }
  }

  return (
    <>
    {showProfileHeader && <ProfileScreen section="addresses" />}
    <div className="container-fluid mx-3 px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-72 shrink-0">
          <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">My Account</h2>
            </div>
            <ul className="p-2 space-y-1">
              <li>
                <Link
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group bg-primary-50 text-primary-700"
                  href="/profile/my-addresses"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-primary-500 text-white">
                    <IconMapPin className="w-4 h-4 shrink-0" />
                  </div>
                  <span className="font-medium flex-1">My Addresses</span>
                  <IconChevronRight className="w-4 h-4 text-primary-500 shrink-0" />
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  href="/profile/settings"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-gray-100 text-gray-500 group-hover:bg-gray-200">
                    <IconSettings className="w-4 h-4 shrink-0" />
                  </div>
                  <span className="font-medium flex-1">Settings</span>
                  <IconChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Manage your saved delivery addresses
                </p>
              </div>
              <button
                type="button"
                onClick={openAddressForm}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
              >
                <IconPlus className="w-4 h-4" />
                Add Address
              </button>
            </div>

            {isLoading ? (
              <div className="rounded-3xl border border-gray-100 bg-white p-12 text-center text-gray-500">
                Loading your addresses...
              </div>
            ) : loadError ? (
              <div className="rounded-3xl border border-gray-100 bg-white p-12 text-center">
                <p className="mb-5 text-gray-600">{loadError}</p>
                <button
                  type="button"
                  onClick={() => void loadAddresses()}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  <IconRefresh size={18} aria-hidden="true" />
                  Try again
                </button>
              </div>
            ) : addresses.length === 0 ? (
              /* Empty State Card */
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                  <IconMapPin className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  No Addresses Yet
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  Add your first delivery address to make checkout faster and easier.
                </p>
                <button
                  type="button"
                  onClick={openAddressForm}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25"
                >
                  <IconPlus className="w-4 h-4" />
                  Add Your First Address
                </button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {addresses.map((address) => (
                  <article
                    key={address._id}
                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                          <IconHome size={21} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="truncate font-bold text-gray-900">
                            {address.name}
                          </h3>
                          <p className="text-sm text-gray-500">{address.city}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${address.name} address`}
                        title="Remove address"
                        disabled={removingAddressId !== null}
                        onClick={() => void handleRemoveAddress(address._id)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-100 text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
                      >
                        <IconTrash size={17} aria-hidden="true" />
                      </button>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {address.details}
                    </p>
                    <p className="mt-3 text-sm text-gray-500">{address.phone}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </main>

      </div>
    </div>
    {isAddressFormOpen && (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-8 backdrop-blur-sm"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget && !isSaving) {
            setIsAddressFormOpen(false);
          }
        }}
      >
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-address-title"
          className="relative w-full max-w-xl mt-5 rounded-[28px] bg-white p-6 shadow-2xl sm:p-10"
        >
          <div className="mb-7 flex items-center justify-between">
            <h2 id="add-address-title" className="text-2xl font-bold text-gray-900">
              Add New Address
            </h2>
            <button
              type="button"
              aria-label="Close address form"
              disabled={isSaving}
              onClick={() => setIsAddressFormOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-gray-200 disabled:opacity-50"
            >
              <IconX size={22} aria-hidden="true" />
            </button>
          </div>

          <form onSubmit={handleAddAddress} className="space-y-6">
            <div>
              <label htmlFor="address-name" className="mb-3 block text-base text-gray-700">
                Address Name
              </label>
              <input
                id="address-name"
                required
                maxLength={50}
                value={addressForm.name}
                onChange={(event) =>
                  setAddressForm({ ...addressForm, name: event.target.value })
                }
                placeholder="e.g. Home, Office"
                className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div>
              <label htmlFor="address-details" className="mb-3 block text-base text-gray-700">
                Full Address
              </label>
              <textarea
                id="address-details"
                required
                maxLength={200}
                rows={3}
                value={addressForm.details}
                onChange={(event) =>
                  setAddressForm({ ...addressForm, details: event.target.value })
                }
                placeholder="Street, building, apartment..."
                className="w-full resize-none rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="address-phone" className="mb-3 block text-base text-gray-700">
                  Phone Number
                </label>
                <input
                  id="address-phone"
                  required
                  type="tel"
                  minLength={10}
                  maxLength={15}
                  value={addressForm.phone}
                  onChange={(event) =>
                    setAddressForm({ ...addressForm, phone: event.target.value })
                  }
                  placeholder="01xxxxxxxxx"
                  className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
              <div>
                <label htmlFor="address-city" className="mb-3 block text-base text-gray-700">
                  City
                </label>
                <input
                  id="address-city"
                  required
                  maxLength={60}
                  value={addressForm.city}
                  onChange={(event) =>
                    setAddressForm({ ...addressForm, city: event.target.value })
                  }
                  placeholder="Cairo"
                  className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
            </div>

            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => setIsAddressFormOpen(false)}
                className="rounded-2xl bg-gray-100 px-5 py-4 font-semibold text-gray-700 transition hover:bg-gray-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-2xl bg-green-600 px-5 py-4 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? 'Adding Address...' : 'Add Address'}
              </button>
            </div>
          </form>
        </section>
      </div>
    )}
    </>
  );
}