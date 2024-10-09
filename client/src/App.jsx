import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load components
const Home = lazy(() => import('./pages/HomePage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ShippingPage = lazy(() => import('./pages/ShippingPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const PlaceOrderPage = lazy(() => import('./pages/PlaceOrderPage'));
const OrderPage = lazy(() => import('./pages/OrderPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const OrderListPage = lazy(() => import('./pages/admin/OrderListPage'));
const ProductListPage = lazy(() => import('./pages/admin/ProductListPage'));
const ProductEditPage = lazy(() => import('./pages/admin/ProductEditPage'));
const UserList = lazy(() => import('./pages/admin/UserList'));
const UserEditPage = lazy(() => import('./pages/admin/UserEditPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));

const App = () => {
	return (
		<>
			<BrowserRouter>
				<ToastContainer />
				<Header />
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/search/:keyword" element={<SearchPage />} />
						<Route path="/page/:pageNumber" element={<Home />} />
						<Route path="/search/:keyword/page/:pageNumber" element={<SearchPage />} />
						<Route path="/product/:id" element={<ProductPage />} />
						<Route path="/cart" element={<CartPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						
						<Route element={<PrivateRoute />}>
							<Route path="/shipping" element={<ShippingPage />} />
							<Route path="/payment" element={<PaymentPage />} />
							<Route path="/placeorder" element={<PlaceOrderPage />} />
							<Route path="/order/:id" element={<OrderPage />} />
							<Route path="/profile" element={<ProfilePage />} />
						</Route>

						<Route element={<AdminRoute />}>
							<Route path="/admin/orderlist" element={<OrderListPage />} />
							<Route path="/admin/productlist" element={<ProductListPage />} />
							<Route path="/admin/productlist/:pageNumber" element={<ProductListPage />} />
							<Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
							<Route path="/admin/userlist" element={<UserList />} />
							<Route path="/admin/user/:id/edit" element={<UserEditPage />} />
						</Route>
					</Routes>
				</Suspense>
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default App;
