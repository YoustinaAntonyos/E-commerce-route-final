
import FeatureProducts from '@/features/home/components/FeatureProducts';
import AllProduct from '@/features/shop/component/AllProduct';
import ProductCard from '@/features/product/components/ProductCard';
import getAllProduct from '@/features/product/services/getAllProduct';
import { getAllCategories } from '@/features/categories/services/getAllCategories';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await searchParams;
  const categoryId = typeof category === 'string' ? category : undefined;

  if (!categoryId) {
    return (
      <>
        <AllProduct />
        <FeatureProducts />
      </>
    );
  }

  const [productResponse, categoriesResponse] = await Promise.all([
    getAllProduct(categoryId),
    getAllCategories(),
  ]);
  const selectedCategory = categoriesResponse.data.find(
    (item) => item._id === categoryId,
  );
  const categoryTitle = selectedCategory?.name || 'Category Products';

  return (
    <>
      <AllProduct
        title={categoryTitle}
        description={`Explore products in ${categoryTitle}`}
      />
      <section className="py-12">
        <div className="container-fluid mx-8">
          {productResponse.data.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {productResponse.data.map((product) => (
                <ProductCard key={product._id} productInfo={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center">
              <h2 className="text-xl font-bold text-gray-900">
                No products found
              </h2>
              <p className="mt-2 text-gray-500">
                There are no products in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}