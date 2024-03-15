import { Link } from "react-router-dom";

const Product = ({ product }) => {
	return (
		<div className="my-3 p-3 rounded border border-gray-500 shadow-xl flex flex sm:flex-row h-[300px] md:flex-col   gap-2 flex-col ">
			<div className="sm:mr-auto sm:ml-auto  ">
				<Link to={`/product/${product._id}`}>
					<img
						className="sm:h-52 md:h-48 "
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
			</div>
		</div>
	);
};

export default Product;
