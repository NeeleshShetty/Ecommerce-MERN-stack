import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<>
			<ul className=" mb-4 flex gap-4 justify-center mt-10">
				<li>
					{step1 ? (
						<Link to="/login">
							<span className="font-semibold">Sign In</span>
						</Link>
					) : (
						<span
							disabled
							class="cursor-not-allowed"
						>
							Sign In
						</span>
					)}
				</li>

				<li>
					{step2 ? (
						<Link to="/shipping">
							<span className="font-semibold">Shipping</span>
						</Link>
					) : (
						<span disabled>Shipping</span>
					)}
				</li>

				<li>
					{step3 ? (
						<Link to="/payment">
							<span className="font-semibold">Payment</span>
						</Link>
					) : (
						<span disabled>Payment</span>
					)}
				</li>

				<li>
					{step4 ? (
						<Link to="/placeorder">
							<span className='font-semibold'>Place Order</span>
						</Link>
					) : (
						<span disabled>Place Order</span>
					)}
				</li>
			</ul>
		</>
	);
};

export default CheckoutSteps;
