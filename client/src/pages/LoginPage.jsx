import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slice/authSlice';
import { toast } from 'react-toastify';

const LoginPage = () => {
	const [loading, setLoading] = useState(true);
	const [name, setname] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { userInfo } = useSelector((state) => state.auth);

	

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			if (!name || !password) {
				return toast.error('Enter name and Password')
			}
			const res = await fetch(`/api/users/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, password }),
			});

			const data = await res.json();

			if (data.success === false) {
				return console.log('Login not successfull');
			}
			dispatch(setCredentials({ ...data }));
			toast.success("Login Successfull")
			navigate('/');
			setLoading(false);
		} catch (err) {
			toast.error(err.message);
		}
	};

	
	return (
		<Container maxWidth="sm">
			<Typography
				variant="h4"
				align="center"
				gutterBottom
			>
				Sign In
			</Typography>
			<form onSubmit={handleSubmit}>
				<Grid
					container
					spacing={2}
				>
					<Grid
						item
						xs={12}
					>
						<TextField
							fullWidth
							label="name"
							variant="outlined"
							value={name}
							onChange={(e) => setname(e.target.value)}
						/>
					</Grid>
					<Grid
						item
						xs={12}
					>
						<TextField
							fullWidth
							label="Password"
							type="password"
							variant="outlined"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Grid>
					<Grid
						item
						xs={12}
					>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							fullWidth
							// disabled={isLoading}
						>
							Sign In
						</Button>
					</Grid>
				</Grid>
			</form>
			<Grid
				container
				justifyContent="center"
				className="py-3"
			>
				<Grid item>
					New Customer? <Link to="/register">Register</Link>
				</Grid>
			</Grid>
			{/* {isLoading && <div>Loading...</div>} */}
		</Container>
	);
};

export default LoginPage;
