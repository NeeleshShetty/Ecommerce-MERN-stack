import { Rating } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
	return (
		<div className="my-3 p-5 rounded border border-gray-500 shadow-xl flex  sm:flex-row h-[300px] md:flex-col md:h-[320px]    gap-2 flex-col ">
			<div className="sm:mr-auto sm:ml-auto  ">
				<Link to={`/product/${product._id}`}>
					<img
						className="sm:h-52 md:h-44 "
						src={product.image}
						variant="top"
					/>
				</Link>
			</div>

			<div className="sm:mr-auto sm:ml-auto  ">
				<Link to={`/product/${product._id}`}>
					<div>
						<strong>{product.name}</strong>
					</div>
				</Link>

				<h3>${product.price}</h3>
				<Stack className='bg-transparent ' spacing={1} >
					<Rating
						name="half-rating-read"
						defaultValue={product.rating}
						precision={0.5}
						readOnly
					/>
				</Stack>
			</div>
			
		</div>
	);
};

export default Product;
