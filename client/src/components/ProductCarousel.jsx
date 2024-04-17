import { Link } from 'react-router-dom';
import { Paper, Button } from '@mui/material';
import { useGetTopProductsQuery } from '../slice/productApiSlice';
import Carousel from 'react-material-ui-carousel';

const ProductCarousel = () => {
	const { data: products, isLoading, error } = useGetTopProductsQuery();

    return isLoading ? null : (
			<Carousel className="bg-primary mb-4 mt-5 bg-contain object-cover absolute ">
				{products.map((product) => (
					<Paper key={product._id}>
						<Link to={`/product/${product._id}`}>
							<img
								src={product.image}
								alt={product.name}
								style={{ width: '100%' }}
								className='object-contain h-96 w-full]'
							/>
							<h2 className="text-black text-center bg-transparent">
								{product.name} (${product.price})
							</h2>
							{/* <div className="carousel-caption"></div> */}
						</Link>
					</Paper>
				))}
			</Carousel>
		);
};

export default ProductCarousel;
