import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const userExists = localStorage.getItem('userInfo');
	return userExists ? (
		<Outlet />
	) : (
		<Navigate
			to={'/login'}
			replace
		/>
	);
};

export default PrivateRoute;
