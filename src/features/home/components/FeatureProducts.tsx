import ProductCard from "@/features/product/components/ProductCard"
import getAllProduct from "@/features/product/services/getAllProduct"

export default async function FeatureProducts() {

    const productResponse = await getAllProduct()

  return (
    <>
    <section className="py-16 ">
        <div className="container-fluid mx-8">
            <div className="title mb-8">
                <h2 className="text-3xl font-bold relative before:w-1 before:h-3/4 before:bg-primary-600 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:rounded-md pl-4">Featured <span className="text-primary-600"> Products</span></h2>
            </div>
            <div className="product-cards grid md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
                {productResponse.data.map((product)=> <ProductCard productInfo={product}/>)}
            </div>
        </div>
    </section>
    </>
  )
}
