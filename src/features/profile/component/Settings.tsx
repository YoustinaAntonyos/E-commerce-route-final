
'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import {
  IconMapPin,
  IconSettings,
  IconChevronRight,
  IconUser,
  IconDeviceFloppy,
  IconLock,
  IconEye
} from '@tabler/icons-react';
import { AppState } from '@/store/store';
import ProfileScreen from '../screens/ProfileScreen';

export default function Settings() {
  const userInfo = useSelector((state: AppState) => state.authReducer.userInfo);

  return (
    <>
    <ProfileScreen section="settings" />
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
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  href="/profile/my-addresses"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-gray-100 text-gray-500 group-hover:bg-gray-200">
                    <IconMapPin className="w-4 h-4 shrink-0" />
                  </div>
                  <span className="font-medium flex-1">My Addresses</span>
                  <IconChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group bg-primary-50 text-primary-700"
                  href="/profile/settings"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-primary-500 text-white">
                    <IconSettings className="w-4 h-4 shrink-0" />
                  </div>
                  <span className="font-medium flex-1">Settings</span>
                  <IconChevronRight className="w-4 h-4 text-primary-500 shrink-0" />
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="space-y-6">
            
            {/* Page Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
              <p className="text-gray-500 text-sm mt-1">
                Update your profile information and change your password
              </p>
            </div>

            {/* Profile Information Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
                    <IconUser className="w-7 h-7 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Profile Information</h3>
                    <p className="text-sm text-gray-500">
                      Update your personal details
                    </p>
                  </div>
                </div>

                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    //   required=""
                      type="text"
                    defaultValue={userInfo?.name ?? ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    //   required=""
                      type="email"
                    defaultValue={userInfo?.email ?? ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      placeholder="01xxxxxxxxx"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    //   required=""
                      type="tel"
                    defaultValue={userInfo?.phone ?? ''}
                    />
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg shadow-primary-600/25"
                    >
                      <IconDeviceFloppy className="w-5 h-5" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* Account Meta Info */}
              <div className="p-6 sm:p-8 bg-gray-50">
                <h3 className="font-bold text-gray-900 mb-4">
                  Account Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">User ID</span>
                    <span className="font-mono text-gray-700">
                      {userInfo?.id || '—'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Role</span>
                    <span className="px-3 py-1 rounded-lg bg-primary-100 text-primary-700 font-medium capitalize">
                      {userInfo?.role || 'user'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Change Password Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
                    <IconLock className="w-7 h-7 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Change Password</h3>
                    <p className="text-sm text-gray-500">
                      Update your account password
                    </p>
                  </div>
                </div>

                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        placeholder="Enter your current password"
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        // required=""
                        type="password"
                        defaultValue=""
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <IconEye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        placeholder="Enter your new password"
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        // required=""
                        minLength={6}
                        type="password"
                        defaultValue=""
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <IconEye className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 6 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        placeholder="Confirm your new password"
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        // required=""
                        type="password"
                        defaultValue=""
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <IconEye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 shadow-lg shadow-amber-600/25"
                    >
                      <IconLock className="w-5 h-5" />
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </main>

      </div>
    </div>
    </>
  );
}