import ProductDetailsScreen from "@/features/product/screens/ProductDetailsScreen";

type Props = {params:Promise<{id:string}>}

export default async function ProductDetailsPage({params}:Props)
  // {
  // params,
// }: {
  // params: Promise<{ id: string }>;
// }) 
{
  const { id } = await params;

  return <ProductDetailsScreen productId={id} />;
}
