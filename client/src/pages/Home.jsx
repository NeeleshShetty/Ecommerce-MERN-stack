import Product from "../components/Product";
import { useGetProductsQuery } from "../slice/productsApiSlice";
const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  // console.log(products);

  return (
    <>
      {isLoading ? (
        <h1 className="text-center text-3xl h-[100vh] mt-52">Loading...</h1>
      ) : error ? (
        <div>{error?.data.message || error.error}</div>
      ) : (
        <>
				
				<div className="grid grid-cols-2  sm:grid-cols-1 md:grid-cols-3 gap-4 ">
					{products.map((product) => (
						<div
							key={product._id}
							className="bg-white p-4 rounded shadow"
						>
							<Product product={product} />
						</div>
					))}
				</div>
			</>
      )}
    </>
  );
};

export default Home;
