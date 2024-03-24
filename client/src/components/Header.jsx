import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header>
      <nav className="bg-gray-900 p-3">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-white font-medium">
              ProShop
            </Link>
            <div className="hidden md:block">
              <Link
                to="/cart"
                className="ml-10 text-white hover:text-white focus:text-white focus:outline-none"
              >
                <span className="sr-only">Cart</span>
                
                {cartItems.length > 0 && (
                  <Badge badgeContent={cartItems.length} color="secondary" >
				  <FaShoppingCart className="inline-block fa-w-16 ml-2" />
                 </Badge>
                )}
              </Link>
              <Link
                to="/login"
                className="ml-4 text-white hover:text-white focus:text-white focus:outline-none"
              >
                <span className="sr-only">Sign In</span>
                <FaUser className="inline-block fa-w-16 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
