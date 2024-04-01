import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const OrderPage = () => {
	const { id: orderId } = useParams();
	const [order, setOrder] = useState({});

	useEffect(() => {
		try {
			const fetchOrder = async () => {
				const res = await fetch(`/api/orders/${orderId}`);
				const data = await res.json();
				setOrder(data);
			};
			fetchOrder();
		} catch (error) {
			toast.error(error);
		}
	}, []);

	console.log(order);

    return (
			<>
				{order.user ? (
					<>
						<h1 className='text-4xl text-gray-500 mt-2'>Order no : {order._id}</h1>
						<div className="flex flex-wrap p-10 ">
							<div className="w-full md:w-2/3 ">
								<div className="p-4">
									<h2 className="font-bold text-gray-500  text-3xl mb-5">
										Shipping
									</h2>
									<p className="capitalize">
										<strong>Name: </strong> {order.user.name}
									</p>
									<p>
										<strong>Email: </strong>{' '}
										<a href={`mailto:${order.user.email}`}>
											{order.user.email}
										</a>
									</p>
									<p className="flex gap-1 mb-3">
										<strong>Address:</strong>
										{order.shippingAddress.address},{' '}
										{order.shippingAddress.city}{' '}
										{order.shippingAddress.postalCode},{' '}
										{order.shippingAddress.country}
									</p>
									{order.isDelivered ? (
										<div className="text-green-500 bg-green-200 rounded w-64 p-3">
											Delivered on {order.deliveredAt}
										</div>
									) : (
										<div className="text-red-500 bg-red-200 rounded w-64 p-3">
											Not Delivered
										</div>
									)}
								</div>

								<div className="p-4">
									<h2 className="font-bold text-gray-500 text-2xl mb-2">
										Payment Method
									</h2>
									<p className="mb-2">
										<strong>Method: </strong>
										{order.paymentMethod}
									</p>
									{order.isPaid ? (
										<div className="text-green-500 bg-green-200 rounded w-64 p-3">
											Paid on {order.paidAt}
										</div>
									) : (
										<div className="text-red-500 bg-red-200 rounded w-64 p-3">
											Not Paid
										</div>
									)}
								</div>

								<div className="p-4">
									<h2 className="font-bold text-xl">Order Items</h2>
									{order.orderItems.length === 0 ? (
										<div>Order is empty</div>
									) : (
										<div>
											{order.orderItems.map((item, index) => (
												<div
													key={index}
													className="flex items-center py-2"
												>
													<div className="w-1/12">
														<img
															src={item.image}
															alt={item.name}
															className="w-full rounded"
														/>
													</div>
													<div className="w-7/12 ml-4">
														<Link to={`/product/${item.product}`}>
															{item.name}
														</Link>
													</div>
													<div className="w-4/12 text-right">
														{item.qty} x ${item.price} = $
														{item.qty * item.price}
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							</div>

							<div className="w-full md:w-1/3">
								<div className="p-4 bg-gray-100 rounded">
									<div className="p-4">
										<h2 className="font-bold text-xl">Order Summary</h2>
									</div>
									<div className="p-4">
										<div className="flex justify-between">
											<div>Items</div>
											<div>${order.itemsPrice}</div>
										</div>
									</div>
									<div className="p-4">
										<div className="flex justify-between">
											<div>Shipping</div>
											<div>${order.shippingPrice}</div>
										</div>
									</div>
									<div className="p-4">
										<div className="flex justify-between">
											<div>Tax</div>
											<div>${order.taxPrice}</div>
										</div>
									</div>
									<div className="p-4">
										<div className="flex justify-between">
											<div>Total</div>
											<div>${order.totalPrice}</div>
										</div>
									</div>
									{/* PAY ORDER PLACEHOLDER */}
									{/* {MARK AS DELIVERED PLACEHOLDER} */}
								</div>
							</div>
						</div>
					</>
				) : (
					<h1>Loading...</h1>
				)}
			</>
		);
};

export default OrderPage;
