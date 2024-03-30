import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterPage from './pages/RegisterPage';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<ToastContainer />
				<Header />

				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/product/:id"
						element={<ProductPage />}
					/>
					<Route
						path="/cart"
						element={<CartPage />}
					/>
					<Route
						path="/login"
						element={<LoginPage />}
					/>
					<Route
						path="/register"
						element={<RegisterPage />}
					/>
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default App;
