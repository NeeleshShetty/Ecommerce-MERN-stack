import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
} from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const OrderListPage = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		try {
			const fetchOrders = async () => {
				const res = await fetch('/api/orders');
				const data = await res.json();

				setOrders(data);
			};
			fetchOrders();
		} catch (error) {
			toast.error('Error while fetching the data');
		}
	}, []);

	console.log(orders);

	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 650 }}
				aria-label="simple table"
			>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>USER</TableCell>
						<TableCell>TOTAL</TableCell>
						<TableCell>DATE</TableCell>
						<TableCell>PAID</TableCell>
						<TableCell>DELIVERED</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{orders.map((order) => (
						<TableRow key={order._id}>
							<TableCell>{order._id}</TableCell>
							<TableCell>{order.user && order.user.name}</TableCell>
							<TableCell>${order.totalPrice}</TableCell>
							<TableCell>
								{order.isPaid ? (
									order.paidAt.substring(0, 10)
								) : (
									<span style={{ color: 'red' }}><CloseIcon /></span>
								)}
							</TableCell>
							<TableCell>
								{order.isPaid ? (
									<span style={{ color: 'green' }}><DoneIcon /></span>
								) : (
									<span style={{ color: 'red' }}><CloseIcon /></span>
								)}
							</TableCell>
							<TableCell>
								{order.isDelivered ? (
									order.deliveredAt.substring(0, 10)
								) : (
									<span className='text-center' style={{ color: 'red' }}><CloseIcon /></span>
								)}
							</TableCell>
							<TableCell>
								<Link to={`/order/${order._id}`}>
									<Button variant="contained">Details</Button>
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default OrderListPage;
