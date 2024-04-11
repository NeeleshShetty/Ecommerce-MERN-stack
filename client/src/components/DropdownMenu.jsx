import React, { useState } from 'react';
import { Select, MenuItem, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import { FaUser } from 'react-icons/fa';

const DropdownMenu = ({ handleLogout }) => {
	const [value, setValue] = useState('');
	const [adminValue, setAdminValue] = useState('');

    const { userInfo } = useSelector((state) => state.auth);
    
	const handleChange = (e) => {
		setValue(e.target.value);
	};
    const handleChangeAdmin = (e) => {
		setAdminValue(e.target.value);
        
    };
    


	return (
		<div className="text-white rounded flex gap-3">
			<Box sx={{ minWidth: 120 }}>
				<FormControl fullWidth>
					<InputLabel sx={{ color: 'gray' }}>
						<div className="flex text-[13px] items-center gap-1">
							<div>{userInfo.name}</div>
							<div>
								<FaUser />
							</div>
						</div>
					</InputLabel>
					<Select
						sx={{ color: 'white' }}
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={value}
						label="Age"
						onChange={handleChange}
					>
						<MenuItem value="Profile">
							<Link to={'/profile'}>Profile</Link>
						</MenuItem>
						<MenuItem value="Login">
							<Link
								to="/login"
								onClick={handleLogout}
							>
								Logout
							</Link>
						</MenuItem>
					</Select>
				</FormControl>
			</Box>

			{userInfo && userInfo.isAdmin ? (
				<Box sx={{ minWidth: 120 }}>
					<FormControl fullWidth>
						<InputLabel sx={{ color: 'gray' }}>
							<div className="flex text-[13px] items-center gap-1">
								<div>Admin</div>
								<div>
									<FaUser />
								</div>
							</div>
						</InputLabel>
						<Select
							sx={{ color: 'white' }}
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={value}
							label="Age"
							onChange={handleChange}
						>
							<MenuItem value="Products">
							<Link to={'/admin/productlist'}>Products</Link>
						</MenuItem>
						<MenuItem value="Users">
							<Link to={'/admin/userlist'}>Users</Link>
						</MenuItem>
						<MenuItem value="Orders">
							<Link to={'/admin/orderlist'}>Orders</Link>
						</MenuItem>
						</Select>
					</FormControl>
				</Box>
			) : 
			null}
		</div>
	);
};

export default DropdownMenu;
