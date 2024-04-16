import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GradeIcon from '@mui/icons-material/Grade';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { addToCart } from '../slice/cartSlice';
import { useEffect } from 'react';
import { PRODUCTS_URL } from '../constants';
import { useSelector } from 'react-redux';
import { Rating } from '@mui/material';
import { toast } from 'react-toastify';
import Meta from '../components/Meta';

const ProductPage = () => {
	const [qty, setQty] = useState(1);
	const { userInfo } = useSelector((state) => state.auth);
	const { id: productId } = useParams(); //useParams is a hook that gets the parameters from the URL. It returns an object with keys
	const [isLoading, setIsLoading] = useState(true);
	const [product, setProduct] = useState({});
	const [loadingProductReview, setLoadingProductReview] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
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

				setProduct(data);
				setIsLoading(false);
			};
			fetchData();
		} catch (error) {
			toast.error('Product not found');
		}
	}, []);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`/api/products/${productId}/review`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					productId,
					rating,
					comment,
				}),
			});

			const data = await res.json();
			console.log(data);
			if (data.success === false) {
				return toast.error(data.message);
			}
			setComment(data.comment);
			setRating(data.rating);
			toast.success('Review Submitted');

			setRating(0), setComment('');
			window.location.reload();
		} catch (error) {
			toast.error('Error while Submitting the Review');
		}
	};

	return (
		<>
			{window.scrollTo(0, 0)}
			{isLoading ? (
				<h1 className="text-center text-3xl h-[100vh] mt-52">Loading...</h1>
			) : (
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
							{/* Reviews */}
							<div className="">
								<div className="review flex flex-col md:w-1/2 items-center mt-5">
									<h2 className="text-2xl font-bold text-gray-500 bg-slate-200 w-80 text-left rounded p-2">
										Reviews
									</h2>
									{product.reviews.length === 0 ? (
										<p className="border-b  py-2 bg-blue-200 w-80 mt-2 text-left p-2 text-black font-semibold rounded">
											No Reviews
										</p>
									) : (
										<>
											<Meta
												title={product.name}
												description={product.description}
											/>
											<ul className="list-none p-0">
												{product.reviews.map((review) => (
													<li
														key={review._id}
														className="border-b border-red-200 py-2 p-3 bg-slate-200 w-80 "
													>
														<strong className="font-bold">{review.name}</strong>
														<br />
														<Rating
															value={review.rating}
															readOnly
														/>
														<p>{review.createdAt.substring(0, 10)}</p>

														<div className="bg-gray-300 p-1 rounded">
															<p>{review.comment}</p>
														</div>
													</li>
												))}
											</ul>
										</>
									)}
									<ul>
										<li className="border-b border-gray-200 py-2">
											<h2 className="text-xl font-bold bg-slate-200 w-80 p-2 rounded text-center mt-10">
												Write a Customer Review
											</h2>

											{loadingProductReview && <Loader />}

											{userInfo ? (
												<form onSubmit={submitHandler}>
													<div className="my-2">
														<label
															className="block text-sm font-bold mb-2"
															htmlFor="rating"
														>
															Rating
														</label>
														<select
															className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
															required
															value={rating}
															onChange={(e) => setRating(e.target.value)}
															id="rating"
														>
															<option value="">Select...</option>
															<option value="1">1 - Poor</option>
															<option value="2">2 - Fair</option>
															<option value="3">3 - Good</option>
															<option value="4">4 - Very Good</option>
															<option value="5">5 - Excellent</option>
														</select>
													</div>
													<div className="my-2">
														<label
															className="block text-sm font-bold mb-2"
															htmlFor="comment"
														>
															Comment
														</label>
														<textarea
															className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
															rows="3"
															required
															value={comment}
															onChange={(e) => setComment(e.target.value)}
															id="comment"
														></textarea>
													</div>
													<button
														className={`mt-2 ${
															loadingProductReview
																? 'opacity-50 cursor-not-allowed'
																: ''
														} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
														type="submit"
														disabled={loadingProductReview}
													>
														Submit
													</button>
												</form>
											) : (
												<p>
													Please
													<a
														href="/login"
														className="text-blue-500 hover:underline"
													>
														sign in
													</a>
													to write a review
												</p>
											)}
										</li>
									</ul>
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
