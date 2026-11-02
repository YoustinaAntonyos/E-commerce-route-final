import {  IconArchive } from '@tabler/icons-react';
import Link from 'next/link';


export default function AllProduct({
  title = "All Products",
  description = "Explore our complete product collection",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <>
     <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
      <div className="container-fluid mx-3 px-4 py-10 sm:py-14">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
          <Link className="hover:text-white transition-colors" href="/">
            Home
          </Link>
          <span className="text-white/40">/</span>
          <span className="text-white font-medium">{title}</span>
        </nav>

        {/* Title & Icon Section */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
            <IconArchive className="text-3xl w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {title}
            </h1>
            <p className="text-white/80 mt-1">
              {description}
            </p>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}
