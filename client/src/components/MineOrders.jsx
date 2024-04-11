// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useEffect, useState } from 'react';

// const MineOrders = () => {
// 	const [orders, setOrders] = useState([]);
// 	const [loading, setLoading] = useState(false);

// 	useEffect(() => {
// 		try {
// 			const fetchOrders = async () => {
// 				const res = await fetch(`${ORDERS_URL}/mine`);
// 				const data = await res.json();
// 				setOrders(data);
// 			};

// 			fetchOrders();
// 		} catch (error) {
// 			toast.error('Failed to fetch Orders');
// 		}
//     }, []);
    
// 	return (
// 		<div>
// 			<div className="w-2/3 ml-4">
// 				<h2 className="text-2xl font-bold mb-4">My Orders</h2>
// 				{loading ? (
// 					<div className="text-3xl">
// 						<h1>Loading ...</h1>
// 					</div>
// 				) : (
// 					<TableContainer component={Paper}>
// 						<Table
// 							sx={{ minWidth: 650 }}
// 							aria-label="simple table"
// 						>
// 							<TableHead className="mr-32">
// 								<TableRow>
// 									<TableCell>ID</TableCell>
// 									<TableCell>DATE</TableCell>
// 									<TableCell>TOTAL</TableCell>
// 									<TableCell>PAID</TableCell>
// 									<TableCell>DELIVERED</TableCell>
// 									<TableCell></TableCell>
// 								</TableRow>
// 							</TableHead>
// 							<TableBody>
// 								{console.log(orders[0])}
// 								{orders &&
// 									orders.map((order) => (
// 										<TableRow key={order._id}>
// 											<TableCell>{order._id}</TableCell>
// 											<TableCell>
// 												{order.createdAt
// 													? order.createdAt.substring(0, 10)
// 													: 'N/A'}
// 											</TableCell>
// 											<TableCell>{order.totalPrice}</TableCell>
// 											<TableCell>
// 												{order.isPaid ? (
// 													order.paidAt.substring(0, 10)
// 												) : (
// 													<span className="text-red-500 text-center">X</span>
// 												)}
// 											</TableCell>
// 											<TableCell>
// 												{order.isDelivered ? (
// 													order.deliveredAt.substring(0, 10)
// 												) : (
// 													<span className="text-red-500 font-bold p-7">X</span>
// 												)}
// 											</TableCell>
// 											<TableCell>
// 												<Link to={`/order/${order._id}`}>
// 													<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
// 														Details
// 													</button>
// 												</Link>
// 											</TableCell>
// 										</TableRow>
// 									))}
// 							</TableBody>
// 						</Table>
// 					</TableContainer>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default MineOrders;
