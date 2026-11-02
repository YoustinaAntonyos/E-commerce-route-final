import { getAllCategories } from "@/features/categories/services/getAllCategories"

export default async function HomeCategories() {

    const categoriesRespone = await getAllCategories()

  return <>
    <section className="py-10">
        <div className="container-fluid mx-5">
            <div className="title mb-8">
                <h2 className="text-3xl font-bold relative before:w-1 before:h-3/4 before:bg-primary-600 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:rounded-md pl-4">Shop By <span className="text-primary-600"> Category</span></h2>
            </div>
            <div className="category-cards grid md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 gap-4">
                {categoriesRespone.data.map((category) => <div key={category._id} className="bg-white hover:bg-gray-50 transition-colors duration-200 px-8 py-5 cursor-pointer rounded-xl  shadow-md flex flex-col items-center">
                    <img src={category.image} alt={category.name} className="size-15 rounded-full object-cover" />
                    <h3 className="font-semibold">{category.name}</h3>
                </div>)}
            </div>
        </div>
    </section>
  </>
}
