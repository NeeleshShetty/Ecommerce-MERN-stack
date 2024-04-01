import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from 'react-toastify';
import { clearCartItems } from '../slice/cartSlice';
import { ORDERS_URL } from '../constants';


const PlaceOrderPage = () => {
	const navigate = useNavigate();
	const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
	const {
		shippingAddress,
		paymentMethod,
		cartItems,
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice,
    } = useSelector((state) => state.cart);
    const { userInfo } = useSelector(state => state.auth)
    console.log(userInfo._id);

	useEffect(() => {
		if (Object.keys(shippingAddress).length === 0) {
			navigate('/shipping');
		} else if (!paymentMethod) {
			navigate('/payment');
		}
	}, [paymentMethod, shippingAddress, navigate]);

	const placeOrderHandler = async () => {
		try {
			const res = await fetch(`${ORDERS_URL}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
                    orderItems: cartItems,
                    user:userInfo._id,
					shippingAddress,
					paymentMethod,
					itemsPrice,
					shippingPrice,
					taxPrice,
					totalPrice,
				}),
            });
            const data = await res.json()
            console.log(data);
            dispatch(clearCartItems())
            navigate(`/order/${data._id}`)
		} catch (error) {
			return toast.error('Order was not placed');
		}
	};

	

	return (
		<div className="h-auto p-3 mx-auto">
			<CheckoutSteps
				step1
				step2
				step3
				step4
			/>
			<div className="flex flex-wrap">
				<div className="w-full md:w-2/3">
					<div className="p-4">
						<h2 className="font-bold text-xl">Shipping</h2>
						<p>
							<strong>Address:</strong>
							{shippingAddress.address}, {shippingAddress.city}{' '}
							{shippingAddress.postalCode}, {shippingAddress.country}
						</p>
					</div>

					<div className="p-4">
						<h2 className="font-bold text-xl">Payment Method</h2>
						<strong>Method: </strong>
						{paymentMethod}
					</div>

					<div className="p-4">
						<h2 className="font-bold text-xl">Order Items</h2>
						{cartItems.length === 0 ? (
							<div>Your cart is empty</div>
						) : (
							<div>
								{cartItems.map((item, index) => (
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
											<Link to={`/product/${item._id}`}>{item.name}</Link>
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
								<div>${itemsPrice}</div>
							</div>
						</div>
						<div className="p-4">
							<div className="flex justify-between">
								<div>Shipping</div>
								<div>${shippingPrice}</div>
							</div>
						</div>
						<div className="p-4">
							<div className="flex justify-between">
								<div>Tax</div>
								<div>${taxPrice}</div>
							</div>
						</div>
						<div className="p-4">
							<div className="flex justify-between">
								<div>Total</div>
								<div>${totalPrice}</div>
							</div>
						</div>
						<div className="p-4">
							{error && <div className="text-red-500">{error}</div>}
						</div>
						<div className="p-4">
							<button
								type="button"
								className={`w-full py-2 bg-blue-500 text-white rounded ${
									cartItems === 0 ? 'opacity-50 cursor-not-allowed' : ''
								}`}
								disabled={cartItems === 0}
								onClick={placeOrderHandler}
							>
								Place Order
							</button>
							{loading && <div>Loading...</div>}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceOrderPage;
