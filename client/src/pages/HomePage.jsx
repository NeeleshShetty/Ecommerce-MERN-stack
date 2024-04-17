import Product from '../components/Product';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import { useGetProductsQuery } from '../slice/productApiSlice';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const Home = () => {
	const { pageNumber, keyword } = useParams();

	const { data, isLoading, error } = useGetProductsQuery({
		keyword,
		pageNumber,
	});	

	return (
		<>
			{isLoading ? (
				<h1 className="text-center text-3xl h-[100vh] mt-52">Loading...</h1>
			) : error ? (
				toast.error(error?.data?.message || error.error)
			) : (
				<>
					<Meta />
					<div className="sm:mb-32  p-3  md:h-[50vh] md:w-full    ">
						<ProductCarousel />
					</div>

					<div className="grid grid-cols-2  sm:grid-cols-1 md:grid-cols-3 gap-4 ">
						{data.products.map((product) => (
							<div
								key={product._id}
								className="bg-white p-4 rounded shadow"
							>
								<Product product={product} />
							</div>
						))}
					</div>
					<div className=" flex justify-center">
						<Paginate
							pages={data.pages}
							page={data.page}
							keyword={keyword ? keyword : ''}
						/>
					</div>
				</>
			)}
		</>
	);
};

export default Home;
