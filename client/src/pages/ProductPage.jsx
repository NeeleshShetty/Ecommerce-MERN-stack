import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GradeIcon from '@mui/icons-material/Grade';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { addToCart } from '../slice/cartSlice';
import { useEffect } from 'react';
import { PRODUCTS_URL } from '../constants';

const ProductPage = () => {
	const [qty, setQty] = useState(1);
  const { id: productId } = useParams(); //useParams is a hook that gets the parameters from the URL. It returns an object with keys
  const [isLoading ,setIsLoading] = useState(true)
	const [product, setProduct] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const addToCartHandler = () => {
		dispatch(addToCart({ ...product, qty }));
		navigate('/cart');
	};

	useEffect(() => {
    try {
      
			const fetchData = async () => {
				const res = await fetch(`${PRODUCTS_URL}/${productId}`);
				const data = await res.json();
				console.log(data);
        setProduct(data);
        setIsLoading(false)
			};
			fetchData();
		} catch (error) {
			toast.error('Product not found')
		}
	}, []);

	return (
		<>
			{isLoading ? (
				<h1 className="text-center text-3xl h-[100vh] mt-52">Loading...</h1>
			): (
				<>
					<div className="bg-gray-100 p-3">
						<div className="container mx-auto">
							<div className="flex flex-col sm:flex-row gap-4 w-full">
								<Link
									to="/"
									className="btn btn-light my-3 border sm:w-24 w-20 sm:h-12 h-10 rounded-lg bg-slate-500 text-white p-4   "
								>
									<ArrowBackIcon className="sm:-mt-4 sm:ml-2 -mt-5 ml-2" />
								</Link>
								<div className="sm:w-1/2">
									<img
										src={product.image}
										alt={product.name}
										className="w-full"
									/>
								</div>
								<div className="sm:w-1/2 sm:mt-20">
									<div className="bg-white p-4 rounded shadow">
										<h3 className="text-xl font-semibold">{product.name}</h3>
										<p className="text-gray-600">Price: ${product.price}</p>
										<Stack>
											<p>
												{product.rating}
												<GradeIcon sx={{ color: 'gold' }} />
											</p>
										</Stack>
										<p className="text-gray-600">
											Description: {product.description}
										</p>
									</div>
								</div>
								<div className="sm:w-1/4 sm:mt-28">
									<div className="bg-white p-4 rounded shadow">
										<p className="text-gray-600">
											Price: <strong>${product.price}</strong>
										</p>
										<p className="text-gray-600">
											Status:
											{product.countInStock > 0 ? (
												<span className="text-green-500 ml-2">In Stock</span>
											) : (
												<span className="text-red-500 ml-2">Out of Stock</span>
											)}
										</p>

										{/* Qty select */}
										{product.countInStock > 0 && (
											<div className="border-t border-gray-200">
												<div className="flex items-center justify-between py-4">
													<label
														htmlFor="quantity"
														className="block text-sm font-medium text-gray-700"
													>
														Qty
													</label>
													<div className="ml-4 flex-shrink-0">
														<select
															id="quantity"
															className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
															value={qty}
															onChange={(e) => setQty(Number(e.target.value))}
														>
															{[...Array(product.countInStock).keys()].map(
																(x) => (
																	<option
																		key={x + 1}
																		value={x + 1}
																	>
																		{x + 1}
																	</option>
																)
															)}
														</select>
													</div>
												</div>
											</div>
										)}

										<button
											className={`p-3 mt-2 rounded-lg text-white ${
												product.countInStock === 0
													? 'bg-gray-400 cursor-not-allowed'
													: 'bg-blue-500 hover:bg-blue-600'
											}`}
											type="button"
											disabled={product.countInStock === 0}
											onClick={addToCartHandler}
										>
											Add To Cart
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ProductPage;
