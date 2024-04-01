import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { Badge, Menu, MenuItem, Paper } from '@mui/material';
import { logout } from '../slice/authSlice';
import { clearCartItems } from '../slice/cartSlice'; 
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Header = () => {
	const [show, setShow] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { cartItems } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.auth);
	const userExists = localStorage.getItem('userInfo');


	const handleLogout = async () => {
		try {
			await fetch('/api/users/logout', {
				method: 'POST'
			});

			dispatch(logout())
			dispatch(clearCartItems())
			navigate('/login')
			toast.success("Logout Successful")
		} catch (error) {
			toast.error(error.message)
		}
	}

	return (
		<header>
			<nav className="bg-gray-900 p-3">
				<div className="container mx-auto">
					<div className="flex items-center justify-between h-16">
						<Link
							to="/"
							className="text-white font-medium"
						>
							ProShop
						</Link>
						<div className="flex gap-4 ">
							<div className="mt-5 mr-5">
								<Link
									to="/cart"
									className="ml-10 text-white hover:text-white focus:text-white focus:outline-none"
								>
									<FaShoppingCart className="inline-block fa-w-16 ml-2" />
									{cartItems.length > 0 && (
										<Badge
											className="ml-3 mb-3"
											badgeContent={cartItems.length}
											color="secondary"
										></Badge>
									)}
								</Link>
							</div>

							<div>
								{userExists  ? (
									<div className="text-white flex gap-4">
										<div
											onClick={() => setShow(!show)}
											className="text-gray-500 mt-5 uppercase flex gap-2 cursor-pointer "
										>
											<div>{userInfo.name}</div>
											<div>
												<FaUser  size={25}/>
											</div>
										</div>
										
										{show && <div className="p-2 cursor-pointer">
											<div><Link to={'/profile'}>Profile</Link></div>
											<div onClick={handleLogout}>Logout</div>
											
										</div> }
									</div>
								): (
									<Link
										to="/login"
										className="ml-4  text-white hover:text-white focus:text-white focus:outline-none"
									>
										<FaUser className="inline-block fa-w-16 ml-2 mt-6" />
									</Link>
								)  }
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
