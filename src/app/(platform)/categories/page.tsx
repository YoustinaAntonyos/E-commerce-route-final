import Link from "next/link";
import { IconTag } from "@tabler/icons-react";
import { getAllCategories } from "@/features/categories/services/getAllCategories";
import { getCategoryIcon } from "@/features/categories/utils/categoryNavigation";

export default async function CategoriesPage() {
  const categoriesResponse = await getAllCategories();
  const categories = categoriesResponse.data;

  return (
    <main className="min-h-screen bg-gray-50 py-10 sm:py-14">
    <div className="container-fluid mx-5 px-4">
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link className="transition-colors hover:text-primary-600" href="/">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-gray-900">All Categories</span>
      </nav>

      <header className="mb-8 flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
          <IconTag size={28} aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Categories</h1>
          <p className="mt-1 text-gray-500">
            Browse all {categories.length} product categories
          </p>
        </div>
      </header>

      {categoriesResponse.error ? (
        <div className="rounded-2xl border border-red-100 bg-white px-6 py-12 text-center">
          <p className="font-medium text-gray-800">
            Categories are temporarily unavailable.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {categoriesResponse.error}
          </p>
        </div>
      ) : categories.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => {
            const CategoryIcon = getCategoryIcon(category.name);
            return (
              <Link
                key={category._id}
                href={`/shop?category=${encodeURIComponent(category._id)}`}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {category.image ? (
                  <img
                    src={category.image}
                    alt=""
                    className="h-44 w-full bg-gray-50 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-44 items-center justify-center bg-primary-50 text-primary-600">
                    <CategoryIcon size={48} aria-hidden="true" />
                  </div>
                )}
                <div className="flex items-center justify-between p-5">
                  <h2 className="font-semibold text-gray-900 transition-colors group-hover:text-primary-600">
                    {category.name}
                  </h2>
                  <CategoryIcon
                    size={20}
                    className="text-gray-400 transition-colors group-hover:text-primary-600"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-12 text-center text-gray-500">
          No categories are available right now.
        </div>
      )}
    </div>
    </main>
  );
}
