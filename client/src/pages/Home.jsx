import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import products from '../products';


const Home = () => {
    return (
			<>
				
				<div className="grid grid-cols-2  sm:grid-cols-1 md:grid-cols-3 gap-4 ">
					{products.map((product) => (
						<div
							key={product.id}
							className="bg-white p-4 rounded shadow"
						>
							<Product product={product} />
						</div>
					))}
				</div>
			</>
		);
};

export default Home;
