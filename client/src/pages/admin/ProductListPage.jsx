import {
	Box,
	Button,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { PRODUCTS_URL } from '../../constants';
const ProductListPage = () => {

	const [products, setProducts] = useState([]);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	


	useEffect(() => {
		
		const fetchData = async () => {
			try {
				const res = await fetch(`/api/products`);
				const data = await res.json();
				setProducts(data.products);
				setIsLoading(false);
			
			
			} catch (error) {
				console.log(error.message);
			}
		}
			fetchData();

}, []);


	const deleteHandler = async(productId) => {
		try {
			const res = await fetch(`${PRODUCTS_URL}/${productId}`, {
				method:'DELETE'
			})
			const data = await res.json()

			const updatedProducts = products.filter((product) => product._id !== productId)
			setProducts(updatedProducts)
			toast.success(data.message);

		} catch (error) {
			toast.error("Error in deleting the product")
		}
	};

	const createProductHandler = async () => {
		try {
			const res = await fetch('/api/products/', {
				method: 'POST',
			});
			const data = await res.json();
			setProducts([...products, data]);
		} catch (error) {
			toast.error('Error while creating sample data');
		}
	};

	return (
		<>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={3}
			>
				<Typography variant="h4">Products</Typography>
				<Button
					variant="contained"
					onClick={createProductHandler}
				>
					<Add /> Create Product
				</Button>
			</Box>

			{isLoading ? (
				<CircularProgress />
			) : error ? (
				<Alert severity="error">{error}</Alert>
			) : (
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>NAME</TableCell>
								<TableCell>PRICE</TableCell>
								<TableCell>CATEGORY</TableCell>
								<TableCell>BRAND</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.map((product) => (
								<TableRow key={product._id}>
									<TableCell>{product._id}</TableCell>
									<TableCell>{product.name}</TableCell>
									<TableCell>${product.price}</TableCell>
									<TableCell>{product.category}</TableCell>
									<TableCell>{product.brand}</TableCell>
									<TableCell>
										<Link to={`/admin/product/${product._id}/edit`}>
											<Button
												variant="outlined"
												color="primary"
											>
												<Edit />
											</Button>
										</Link>
										<Button
											variant="outlined"
											color="secondary"
											onClick={() => deleteHandler(product._id)}
										>
											<Delete />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					
				</TableContainer>
			)}
		</>
	);
};

export default ProductListPage;
