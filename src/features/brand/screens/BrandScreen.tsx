'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { IconArrowLeft, IconArrowRight, IconTags } from '@tabler/icons-react';
import ProductCard from '@/features/product/components/ProductCard';
import { apiClient } from '@/shared/services/apiClient';
import type { Brand, Product, ProductsApiResponse } from '@/features/product/types/products.type';

interface BrandsApiResponse {
  results: number;
  data: Brand[];
}

export default function BrandScreen() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandsLoading, setBrandsLoading] = useState(true);
  const [brandsError, setBrandsError] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState('');
  const productRequestId = useRef(0);

  useEffect(() => {
    let cancelled = false;

    apiClient
      .get<BrandsApiResponse>('/brands')
      .then(({ data }) => {
        if (!cancelled) {
          setBrands(data.data);
          setBrandsLoading(false);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setBrandsError(error instanceof Error ? error.message : 'Unable to load brands.');
          setBrandsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => () => {
    productRequestId.current += 1;
  }, []);

  async function handleBrandSelect(brand: Brand) {
    setSelectedBrand(brand);
    setProducts([]);
    setProductsError('');
    setProductsLoading(true);
    const requestId = ++productRequestId.current;

    try {
      const { data } = await apiClient.get<ProductsApiResponse>('/products', {
        params: { brand: brand._id },
      });
      if (requestId === productRequestId.current) {
        setProducts(data.data);
      }
    } catch (error: unknown) {
      if (requestId === productRequestId.current) {
        setProductsError(error instanceof Error ? error.message : 'Unable to load products.');
      }
    } finally {
      if (requestId === productRequestId.current) {
        setProductsLoading(false);
      }
    }
  }

  function handleBrandsNavigation() {
    productRequestId.current += 1;
    setSelectedBrand(null);
    setProducts([]);
    setProductsError('');
    setProductsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-gradient-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
        <div className="container-fluid mx-3 px-4 py-12 sm:py-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/70">
            <Link className="transition-colors hover:text-white" href="/">
              Home
            </Link>
            <Link
              className="cursor-pointer transition-colors hover:text-white"
              href="/brands"
              onClick={handleBrandsNavigation}
            >
              <span className="text-white/40">/</span>
              <span className="font-medium text-white">Brands</span>
            </Link>
            
            {selectedBrand && (
              <>
                <span className="text-white/40">/</span>
                <span className="font-medium text-white">{selectedBrand.name}</span>
              </>
            )}
          </nav>

          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-xl ring-1 ring-white/30 backdrop-blur-sm">
              <IconTags className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {selectedBrand ? `${selectedBrand.name} Products` : 'Top Brands'}
              </h1>
              <p className="mt-1 text-white/80">
                {selectedBrand ? `Explore products from ${selectedBrand.name}` : 'Shop from your favorite brands'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mx-3 px-4 py-10">
        {brandsLoading && (
          <p className="py-8 text-center text-gray-600" role="status">
            Loading brands...
          </p>
        )}

        {brandsError && (
          <p className="py-8 text-center text-red-600" role="alert">
            {brandsError}
          </p>
        )}

        {!selectedBrand && !brandsLoading && !brandsError && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6">
            {brands.map((brand) => (
              <button
                key={brand._id}
                type="button"
                className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl sm:p-5"
                onClick={() => handleBrandSelect(brand)}
              >
                <div className="mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-4">
                  <img
                    alt={brand.name}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    src={brand.image}
                  />
                </div>
                <h3 className="truncate text-center text-sm font-semibold text-gray-900 transition-colors group-hover:text-violet-600">
                  {brand.name}
                </h3>
                <span className="mt-1.5 flex items-center justify-center gap-1 text-xs text-violet-600">
                  View Products
                  <IconArrowRight className="h-3 w-3" />
                </span>
              </button>
            ))}
          </div>
        )}

        {selectedBrand && (
          <section aria-live="polite">
            {/* <button
              type="button"
              onClick={handleBrandsNavigation}
              className="mb-8 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 font-semibold text-gray-700 shadow-sm transition-colors hover:border-violet-300 hover:text-violet-600"
            >
              <IconArrowLeft className="h-4 w-4" />
              Back to brands
            </button> */}

            {productsLoading && (
              <p className="py-12 text-center text-gray-600" role="status">
                Loading products...
              </p>
            )}

            {productsError && (
              <p className="py-12 text-center text-red-600" role="alert">
                {productsError}
              </p>
            )}

            {!productsLoading && !productsError && products.length > 0 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedBrand.name} Products</h2>
                  <p className="mt-1 text-gray-500">{products.length} products found</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product._id} productInfo={product} />
                  ))}
                </div>
              </div>
            )}

            {!productsLoading && !productsError && products.length === 0 && (
              <div className="rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                  <IconTags className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">No products found</h3>
                <p className="mt-2 text-gray-500">No products match your current filters</p>
                <Link
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-violet-700"
                  href="/shop"
                >
                  View all products
                  <IconArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
