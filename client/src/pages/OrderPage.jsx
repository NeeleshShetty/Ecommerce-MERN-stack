import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import {
	usePayOrderMutation,
	useGetPaypalClientIdQuery,
} from '../slice/orderApiSlice';

const OrderPage = () => {
	const { id: orderId } = useParams();
	const [order, setOrder] = useState({});
	const [loadingDeliver, setLoadingDeliver] = useState(false);
	const [deliverOrder, setDeliverOrder] = useState(false);

	const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

	const { userInfo } = useSelector((state) => state.auth);

	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

	const {
		data: paypal,
		isLoading: loadingPayPal,
		error: errorPayPal,
	} = useGetPaypalClientIdQuery();

	//get order
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

	//paypal integration
	useEffect(() => {
		if (!errorPayPal && !loadingPayPal && paypal.clientId) {
			const loadPaypalScript = async () => {
				paypalDispatch({
					type: 'resetOptions',
					value: {
						'client-id': paypal.clientId,
						currency: 'USD',
					},
				});
				paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
			};
			if (order && !order.isPaid) {
				if (!window.paypal) {
					loadPaypalScript();
				}
			}
		}
	}, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

	function onApprove(data, actions) {
		return actions.order.capture().then(async function (details) {
			try {
				await payOrder({ orderId, details });
				refetch();
				// window.location.reload()
				toast.success('Order is paid');
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		});
	}

	function onApprove(data, actions) {
		return actions.order.capture().then(async function (details) {
			try {
				await payOrder({ orderId, details });
				refetch();
				toast.success('Order is paid');
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		});
	}

	// async function onApproveTest() {
	// 	await payOrder({ orderId, details: { payer: {} } });
	// 	refetch();

	// 	toast.success('Order is paid');
	// }

	function onError(err) {
		toast.error(err.message);
	}

	function createOrder(data, actions) {
		return actions.order
			.create({
				purchase_units: [
					{
						amount: { value: order.totalPrice },
					},
				],
			})
			.then((orderID) => {
				return orderID;
			});
	}

	const deliverHandler = async () => {
		const res = await fetch(`/api/orders/${orderId}/deliver`, {
			method: 'PUT',
		});
		await res.json()
		window.location.reload()
	};

	return (
		<>
			{order.user ? (
				<>
					<h1 className="text-4xl text-gray-500 mt-2">
						Order no : {order._id}
					</h1>
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
									<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
								</p>
								<p className="flex gap-1 mb-3">
									<strong>Address:</strong>
									{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
									{order.shippingAddress.postalCode},{' '}
									{order.shippingAddress.country}
								</p>
								{order.isDelivered ? (
									<div className="text-green-500 bg-green-200 rounded w-80 p-3">
										Delivered on {order.deliveredAt}
									</div>
								) : (
									<div className="text-red-500 bg-red-200 rounded w-80 p-3">
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
									<div className="text-green-500 bg-green-200 rounded w-80 p-3">
										Paid on {order.paidAt}
									</div>
								) : (
									<div className="text-red-500 bg-red-200 rounded w-80 p-3">
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
													{item.qty} x ${item.price} = ${item.qty * item.price}
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
								{!order.isPaid && (
									<>
										<div>{loadingPay && <h3>Loading...</h3>}</div>

										<div>
											{isPending ? (
												<h3>Loading...</h3>
											) : (
												<>
													<div>
														{/* <button className='bg-gray-700 p-3 rounded text-white'
																onClick={()=>onApproveTest()}>
															Test Pay order
														</button> */}
													</div>
													<div className="mt-2">
														<PayPalButtons
															createOrder={createOrder}
															onApprove={onApprove}
															onError={onError}
														></PayPalButtons>
													</div>
												</>
											)}
										</div>
									</>
								)}
								{/* {MARK AS DELIVERED PLACEHOLDER} */}

								{loadingDeliver && <h3>Loading...</h3>}

								{userInfo &&
									userInfo.isAdmin &&
									order.isPaid &&
									!order.isDelivered && (
										<div className="">
											<button className='bg-gray-700 rounded p-3 text-white' onClick={deliverHandler}>
												Mark as Delivered
											</button>
										</div>
									)}
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
