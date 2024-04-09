import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PRODUCTS_URL } from '../../constants';

const ProductEditPage = () => {
	const { id: productId } = useParams();
	const navigate = useNavigate();

	const [loadingUpload, setLoadingUpload] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');

	useEffect(() => {
		try {
			const fetchData = async () => {
				const res = await fetch(`${PRODUCTS_URL}/${productId}`);
				const data = await res.json();

				setName(data.name);
				setPrice(data.price);
				setBrand(data.brand);
				setCategory(data.category);
				setCountInStock(data.countInStock);
				setDescription(data.description);
				setImage(data.image);
				setIsLoading(false);
			};
			fetchData();
		} catch (error) {
			toast.error('Product not found');
		}
	}, []);

	
    
    

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`/api/products/${productId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					price,
					description,
					brand,
					image,
					category,
					countInStock,
				}),
			});

			const data = await res.json();
			toast.success('Updated Successfully');
			navigate('/admin/productlist');
		} catch (error) {
			toast.error('Error in Updating the product');
		}
	};

    const uploadFileHandler = async (e) => {
			if (!image) {
				return toast.error('Please select an image first.');
			}

			const formData = new FormData();
			formData.append('image', e.target.files[0]);


			try {
				const res = await fetch('/api/uploads', {
					method: 'POST',
					body: formData,
				});
				const data = await res.json();
				setImage(data.image);
				toast.success(data.message);
			} catch (error) {
				toast.error(error.message);
			}
    };
    
    console.log(image);

	return (
		<>
			<Link
				to="/admin/productlist"
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
							htmlFor="price"
							className="font-semibold text-gray-600"
						>
							Price
						</label>
						<input
							className="rounded p-2"
							type="number"
							id="price"
							value={price}
							placeholder="Price"
							onChange={(e) => setPrice(e.target.value)}
						/>

						<label
							htmlFor="brand"
							className="font-semibold text-gray-600"
						>
							Brand
						</label>
						<input
							className="rounded p-2"
							type="text"
							id="brand"
							value={brand}
							placeholder="Brand"
							onChange={(e) => setBrand(e.target.value)}
						/>
						<div className="flex flex-col space-y-2">
							<label
								htmlFor="image"
								className="font-bold"
							>
								Image
							</label>
							<input
								id="image"
								type="text"
								placeholder="Enter image url"
								value={image}
								onChange={(e) => setImage(e.target.value)}
								className="border border-gray-300 p-2 rounded"
							/>
							<input
								label="Choose File"
								onChange={uploadFileHandler}
								type="file"
								className="border border-gray-300 p-2 rounded"
							/>
							{loadingUpload && <div className="loader"></div>}
						</div>
						<label
							htmlFor="countinstock"
							className="font-semibold text-gray-600"
						>
							Count In Stock
						</label>
						<input
							className="rounded p-2"
							type="number"
							id="countinstock"
							value={countInStock}
							placeholder="Count In Stock"
							onChange={(e) => setCountInStock(e.target.value)}
						/>
						<label
							htmlFor="category"
							className="font-semibold text-gray-600"
						>
							Category
						</label>
						<input
							className="rounded p-2"
							type="text"
							id="category"
							value={category}
							placeholder="Category"
							onChange={(e) => setCategory(e.target.value)}
						/>
						<label
							htmlFor="description"
							className="font-semibold text-gray-600"
						>
							Description
						</label>
						<input
							className="rounded p-2"
							type="text"
							id="description"
							value={description}
							placeholder="Description"
							onChange={(e) => setDescription(e.target.value)}
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

export default ProductEditPage;
