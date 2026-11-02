
'use client';

import Link from 'next/link';
import { IconUser } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { AppState } from '@/store/store';

type ProfileSection = 'account' | 'addresses' | 'settings';

const sectionContent: Record<ProfileSection, { title: string; description: string }> = {
  account: {
    title: 'My Account',
    description: 'Manage your addresses and account settings',
  },
  addresses: {
    title: 'My Addresses',
    description: 'Manage your saved delivery addresses',
  },
  settings: {
    title: 'Account Settings',
    description: 'Update your profile information and account settings',
  },
};

export default function ProfileScreen({
  section = 'account',
}: {
  section?: ProfileSection;
}) {
  const userInfo = useSelector((state: AppState) => state.authReducer.userInfo);
  const content = sectionContent[section];

  return (
    <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
      <div className="container-fluid mx-3 px-4 py-10 sm:py-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
          <Link className="hover:text-white transition-colors duration-200" href="/">
            Home
          </Link>
          <span className="text-white/40">/</span>
          <span className="text-white font-medium">{content.title}</span>
        </nav>

        {/* Header Icon & Title */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
            <IconUser className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {userInfo?.name ? `Hello, ${userInfo.name}` : content.title}
            </h1>
            <p className="text-white/80 mt-1">
              {content.description}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}