import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route path='/product/:id' element={<ProductPage />} />
				</Routes>
				<Footer />
			</BrowserRouter>

		</>
	);
};

export default App;
