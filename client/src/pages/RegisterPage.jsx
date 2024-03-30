import { useState, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slice/authSlice';
import { toast } from 'react-toastify';

const RegisterPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
	const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !password || !email) {
					return toast.error('All fields are required');
				}
		try {
			
			const res = await fetch('/api/users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, email, password }),
			});

			const data = await res.json();
			if (data.success === false) {
				return console.log('Login not successfull');
			}
            setLoading(false);
            navigate('/login')
		} catch (error) {
			toast.error('Registration Failed');
		}
	};
	return (
		<Container
			className="mt-10"
			maxWidth="sm"
		>
			<Typography
				variant="h4"
				align="center"
				gutterBottom
			>
				Sign Up
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
							className="w-full"
							label="UserName"
							variant="filled"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Grid>
					<Grid
						item
						xs={12}
					>
						<TextField
							className="w-full"
							label="Email"
							variant="filled"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Grid>
					<Grid
						item
						xs={12}
					>
						<TextField
							className="w-full"
							id="filled-basic"
							label="Password"
							variant="filled"
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
						>
							Sign Up
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
					Already a  Customer? <Link className='underline text-blue-500' to="/login">Login</Link>
				</Grid>
			</Grid>
			
		</Container>
	);
};

export default RegisterPage;
