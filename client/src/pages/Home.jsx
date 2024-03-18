import { useState, useEffect } from 'react'
import axios from 'axios'
import Product from '../components/Product';


const Home = () => {
	const [products, setProducts] = useState([])
	
	useEffect(() => {
		const fetchdata = async () => {
			try {
				const { data } = await axios.get('/api/products/productslist')
				setProducts(data)
			} catch (error) {
				console.log(error.message);
			}
		}
		fetchdata()
	}, []) 

	console.log(products);
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
