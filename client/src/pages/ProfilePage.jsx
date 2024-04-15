import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ORDERS_URL, USERS_URL } from '../constants';
import { setCredentials } from '../slice/authSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ProfilePage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [orders, setOrders] = useState([]);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name);
			setEmail(userInfo.email);
		}
	}, [userInfo.name, userInfo.email]);

	useEffect(() => {
		try {
			const fetchOrders = async () => {
				const res = await fetch(`${ORDERS_URL}/mine`);
				const data = await res.json();
				setOrders(data);
			};

			fetchOrders();
		} catch (error) {
			toast.error('Failed to fetch Orders');
		}
	}, []);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			return toast.error('Passwords does not match');
		}
		try {
			const res = await fetch(`${USERS_URL}/profile`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: userInfo._id,
					name,
					email,
					password,
				}),
			});

			const data = await res.json();
			if (data.success === false) {
				return console.log(data.message);
			}
			setConfirmPassword('')
			setPassword('')
			toast.success('Updated Successfully');
			
s
			
			dispatch(setCredentials(data));
			setPassword('')
			setConfirmPassword('')
		} catch (error) {
			return toast.error(error);
		}
	};



	return (
		<div className="flex flex-row p-5">
			<div className="w-1/3">
				<h2 className="text-2xl font-bold mb-4">User Profile</h2>

				<form onSubmit={submitHandler}>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Name
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							type="text"
							placeholder="Enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Email
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							placeholder="Enter Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="text"
							placeholder="Enter Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Confirm Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							type="text"
							placeholder="Enter Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>

					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Update
					</button>
				</form>
			</div>

			<div className="w-2/3 ml-4">
				<h2 className="text-2xl font-bold mb-4">My Orders</h2>
				{loading ? (
					<div className="text-3xl">
						<h1>Loading ...</h1>
					</div>
				) : (
					<div className="">
						<TableContainer component={Paper}>
							<Table
								sx={{ minWidth: 650 }}
								aria-label="simple table"
							>
								<TableHead className="mr-32">
									<TableRow>
										<TableCell>ID</TableCell>
										<TableCell>DATE</TableCell>
										<TableCell>TOTAL</TableCell>
										<TableCell>PAID</TableCell>
										<TableCell>DELIVERED</TableCell>
										<TableCell></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{orders &&
										orders.map((order) => (
											<TableRow key={order._id}>
												<TableCell>{order._id}</TableCell>
												<TableCell>
													{order.createdAt
														? order.createdAt.substring(0, 10)
														: 'N/A'}
												</TableCell>
												<TableCell>{order.totalPrice}</TableCell>
												<TableCell>
													{order.isPaid ? (
														order.paidAt.substring(0, 10)
													) : (
														<span className="text-red-500 text-center">X</span>
													)}
												</TableCell>
												<TableCell>
													{order.isDelivered ? (
														order.deliveredAt.substring(0, 10)
													) : (
														<span className="text-red-500 font-bold p-7">
															X
														</span>
													)}
												</TableCell>
												<TableCell>
													<Link to={`/order/${order._id}`}>
														<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
															Details
														</button>
													</Link>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
