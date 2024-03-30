import { useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slice/cartSlice';

const ShippingScreen = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	console.log(shippingAddress);

	const [address, setAddress] = useState(shippingAddress?.address || '');
	const [city, setCity] = useState(shippingAddress?.city || '');
	const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
	const [country, setCountry] = useState(shippingAddress?.country || '');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		navigate('/payment');
	};

	return (
		<div className="max-w-[600px] mx-auto h-[100vh] ">
			<form
				onSubmit={submitHandler}
				className="flex flex-col m l-auto mr-auto items-center gap-2 mt-5"
			>
				<div
					className="my-2 flex flex-col gap-2  justify-between w-96"
					id="address"
				>
					<label className="text-gray-700">Address</label>
					<input
						className="rounded"
						type="text"
						placeholder="Enter address"
						value={address}
						required
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
				<div
					className="my-2 flex flex-col gap-2 justify-between w-96"
					id="city"
				>
					<label className="text-gray-700">City</label>
					<input
						className="rounded"
						type="text"
						placeholder="Enter City"
						value={city}
						required
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>
				<div
					className="my-2 flex flex-col gap-2 justify-between w-96"
					id="postalcode"
				>
					<label className="text-gray-700">Postal Code</label>
					<input
						className="rounded"
						type="text"
						placeholder="Enter Postal Code"
						value={postalCode}
						required
						onChange={(e) => setPostalCode(e.target.value)}
					/>
				</div>
				<div
					className="my-2 flex flex-col gap-2  justify-between w-96"
					id="country"
				>
					<label className="text-gray-700 ">Country</label>
					<input
						className="rounded"
						type="text"
						placeholder="Enter Country"
						value={country}
						required
						onChange={(e) => setCountry(e.target.value)}
					/>
				</div>

				<Button
					type="submit"
					variant="contained"
					color="primary"
				>
					Continue
				</Button>
			</form>
		</div>
	);
};

export default ShippingScreen;
