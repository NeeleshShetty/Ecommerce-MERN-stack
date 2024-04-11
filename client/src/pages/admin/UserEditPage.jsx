import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PRODUCTS_URL } from '../../constants';

const UserEditPage = () => {
	const { id: userId } = useParams();

	const navigate = useNavigate();

	const [loadingUpload, setLoadingUpload] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);
	useEffect(() => {
		try {
			const fetchData = async () => {
				const res = await fetch(`/api/users/${userId}`);
				const data = await res.json();
				setName(data.name);
				setEmail(data.email);
				setIsAdmin(data.isAdmin);
			};
			fetchData();
		} catch (error) {
			toast.error('Product not found');
		}
	}, []);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`/api/users/${userId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					isAdmin,
				}),
			});

			const data = await res.json();
			toast.success('Updated Successfully');
			navigate('/admin/userlist');
		} catch (error) {
			toast.error('Error in Updating the product');
		}
	};

	return (
		<>
			<Link
				to="/admin/userlist"
				className="btn bg-slate-500 relative top-4 left-3 rounded p-3"
			>
				Go Back
			</Link>
			<div className="w-full max-w-xs mx-auto">
				<h1 className="font-bold text-xl mb-2">Edit Product</h1>
				{isLoading ? (
					<div className="loader"></div>
				) : (
					<form
						onSubmit={submitHandler}
						className="bg-white shadow-md rounded flex flex-col gap-3 px-8 pt-6 pb-8 mb-4"
					>
						<label
							htmlFor="name"
							className="font-semibold text-gray-600"
						>
							Name
						</label>
						<input
							className="rounded p-2"
							type="text"
							id="name"
							value={name}
							placeholder="Name"
							onChange={(e) => setName(e.target.value)}
						/>

						<label
							htmlFor="name"
							className="font-semibold text-gray-600"
						>
							Email
						</label>
						<input
							className="rounded p-2"
							type="email"
							id="email"
							value={email}
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
						/>

						<label
							htmlFor="name"
							className="font-semibold text-gray-600"
						>
							Admin
						</label>
						<input
							className="rounded p-2"
							type="checkbox"
							id="isadmin"
							value={isAdmin}
							checked={isAdmin}
							onChange={(e) => setIsAdmin(e.target.checked)}
						/>

						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							style={{ marginTop: '1rem' }}
						>
							Update
						</button>
					</form>
				)}
			</div>
		</>
	);
};

export default UserEditPage;
