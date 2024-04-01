import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Select, MenuItem } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slice/cartSlice";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
		<div className="flex flex-wrap justify-between h-[100vh] p-3">
			<div className="w-full md:w-8/12">
				<h1 className="text-2xl font-bold mb-5">Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<p>
						Your cart is empty{' '}
						<Link
							to="/"
							className="underline text-blue-800"
						>
							Go Back
						</Link>
					</p>
				) : (
					<ul className="list-none">
						{cartItems.map((item) => (
							<li
								key={item._id}
								className="border-b border-gray-200 py-3"
							>
								<div className="flex items-center">
									<div className="w-1/4">
										<img
											src={item.image}
											alt={item.name}
										/>
									</div>
									<div className="w-2/4">
										<Link to={`/product/${item._id}`}>{item.name}</Link>
									</div>
									<div className="w-1/4">${item.price}</div>
									<div className="w-1/4">
										<Select
											value={item.qty}
											onChange={(e) =>
												addToCartHandler(item, Number(e.target.value))
											}
										>
											{[...Array(item.countInStock).keys()].map((x) => (
												<MenuItem
													key={x + 1}
													value={x + 1}
												>
													{x + 1}
												</MenuItem>
											))}
										</Select>
									</div>
									<div className="w-1/4">
										<Button
											variant="outlined"
											onClick={() => removeFromCartHandler(item._id)}
										>
											<FaTrash />
										</Button>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
			<div className="w-full md:w-4/12">
				{cartItems.length ? (
					<Card className="mb-5 sm:mt-10 mt-52 ">
						<ul className="list-none">
							<li className="border-b border-gray-200 py-3">
								<h2 className="text-lg font-semibold">
									Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
									) items
								</h2>
								<p>
									$
									{cartItems
										.reduce((acc, item) => acc + item.qty * item.price, 0)
										.toFixed(2)}
								</p>
							</li>
							<li>
								<Button
									variant="contained"
									disabled={cartItems.length === 0}
									fullWidth
								>
									<Link to={'/shipping'}>Proceed To Checkout</Link>
								</Button>
							</li>
						</ul>
					</Card>
				) : null}
			</div>
		</div>
	);
};

export default CartPage;
