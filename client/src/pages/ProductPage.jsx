import { useParams,Link} from 'react-router-dom'
import products from "../products"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Rating } from '@mui/material'
import { Stack } from '@mui/system'
const ProductPage = () => {
    const {id: productId} = useParams()  //useParams is a hook that gets the parameters from the URL. It returns an object with keys 
    const product = products.find((p) => p._id === productId)
    console.log(product);
  return (
		<>
			<div className="bg-gray-100 p-3">
				<div className="container mx-auto">
					<div className="flex flex-col sm:flex-row gap-4 w-full">
						<Link
							to="/"
							className="btn btn-light my-3 border sm:w-24 w-20 sm:h-12 h-10 rounded-lg bg-slate-500 text-white p-4   "
						>
							<ArrowBackIcon className="sm:-mt-4 sm:ml-2 -mt-5 ml-2" />
						</Link>
						<div className="sm:w-1/2">
							<img
								src={product.image}
								alt={product.name}
								className="w-full"
							/>
						</div>
						<div className="sm:w-1/2 sm:mt-20">
							<div className="bg-white p-4 rounded shadow">
								<h3 className="text-xl font-semibold">{product.name}</h3>
								<Stack spacing={1}>
									<Rating
										name="half-rating-read"
										defaultValue={product.rating}
										precision={0.5}
										readOnly
									/>
								</Stack>

								<p className="text-gray-600">Price: ${product.price}</p>
								<p className="text-gray-600">
									Description: {product.description}
								</p>
							</div>
						</div>
						<div className="sm:w-1/4 sm:mt-28">
							<div className="bg-white p-4 rounded shadow">
								<p className="text-gray-600">
									Price: <strong>${product.price}</strong>
								</p>
								<p className="text-gray-600">
									Status:
									{product.countInStock > 0 ? (
										<span className="text-green-500 ml-2">In Stock</span>
									) : (
										<span className="text-red-500 ml-2">Out of Stock</span>
									)}
								</p>
								<button
									className={`p-3 mt-2 rounded-lg text-white ${
										product.countInStock === 0
											? 'bg-gray-400 cursor-not-allowed'
											: 'bg-blue-500 hover:bg-blue-600'
									}`}
									type="button"
									disabled={product.countInStock === 0}
								>
									Add To Cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProductPage