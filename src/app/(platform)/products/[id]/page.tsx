import ProductDetailsScreen from "@/features/product/screens/ProductDetailsScreen";

export default async function ProductDetailsByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProductDetailsScreen productId={id} />;
}
