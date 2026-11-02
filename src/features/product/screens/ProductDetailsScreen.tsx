import getProductById from "@/features/product/services/getProductById";
import ProductInfo from "../components/ProductDetails/ProductInfo";

export default async function ProductDetailsScreen({
  productId,
}: {
  productId: string;
}) {
  const product = await getProductById(productId);

  return <ProductInfo productInfo={product} />;
}
