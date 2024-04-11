import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UserList = () => {
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchUser = async () => {
			const res = await fetch(`/api/users`);
			const data = await res.json();
			setUsers(data);
		};
		fetchUser();
	}, []);

	const handleDelete = async (userId) => {
		try {
			if (window.confirm('Are you sure?')) {
				const res = await fetch(`/api/users/${userId}`, {
					method: 'DELETE',
				});
				
				const updatedUser = users.filter((user) => user._id !== userId);
				setUsers(updatedUser);

				toast.success('Deleted Successfully');
			} else {
				return;
			}
		} catch (error) {
			toast.error('Error in deleting the user');
		}
	};

	return (
		<>
			<div className="p-5">
				<TableContainer component={Paper}>
					<Table
						sx={{ minWidth: 650 }}
						aria-label="simple table"
					>
						<TableHead>
							<TableRow>
								<TableCell>Id</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Admin</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((user) => (
								<TableRow
									key={user._id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell>{user._id}</TableCell>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>
										{user.isAdmin ? (
											<DoneIcon className="text-green-500" />
										) : (
											<CloseIcon className="text-red-600" />
										)}
									</TableCell>
									<TableCell>
										<button className="p-3 bg-blue-500 rounded-xl">
											<Link to={`/admin/user/${user._id}/edit`}>
												<EditIcon />
											</Link>
										</button>
										&emsp;&emsp;
										<button
											className="p-3 bg-red-600 rounded-xl"
											onClick={() => handleDelete(user._id)}
										>
											<DeleteOutlineIcon className="cursor-pointer" />
										</button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</>
	);
};

export default UserList;
