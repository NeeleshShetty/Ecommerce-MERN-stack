import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
		<header>
			<nav class="bg-gray-900">
				<div class="container mx-auto">
					<div class="flex items-center justify-between h-16">
						<a
							href="/"
							class="text-white font-medium"
						>
							ProShop
						</a>
						<div class="hidden md:block">
							<a
								href="/cart"
								class="ml-10 text-white hover:text-white focus:text-white focus:outline-none"
							>
								<span class="sr-only">Cart</span>
								<FaShoppingCart class="inline-block fa-w-16 ml-2" />
							</a>
							<a
								href="/login"
								class="ml-4 text-white hover:text-white focus:text-white focus:outline-none"
							>
								<span class="sr-only">Sign In</span>
								<FaUser class="inline-block fa-w-16 ml-2" />
							</a>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;