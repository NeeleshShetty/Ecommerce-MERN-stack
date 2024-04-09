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
import ShippingPage from './pages/ShippingPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute'
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';
import OrderListPage from './pages/admin/OrderListPage';
import ProductListPage from './pages/admin/ProductListPage';
import ProductEditPage from './pages/admin/ProductEditPage';

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

					<Route
						path=""
						element={<PrivateRoute />}
					>
						<Route
							path="/shipping"
							element={<ShippingPage />}
						/>
						<Route
							path="/payment"
							element={<PaymentPage />}
						/>
						<Route
							path="/placeorder"
							element={<PlaceOrderPage />}
						/>
						<Route
							path="/order/:id"
							element={<OrderPage />}
						/>
						<Route
							path="/profile"
							element={<ProfilePage />}
						/>
					</Route>

					<Route path='' element={<AdminRoute />} >
						<Route path='/admin/orderlist' element={<OrderListPage />} />
						<Route path='/admin/productlist' element={<ProductListPage />} />
						<Route path='/admin/product/:id/edit' element={<ProductEditPage />} />
					</Route>

				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default App;
