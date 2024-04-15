import { Pagination as MuiPagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin,keyword='' }) => {
	return (
		pages > 1 && (
			<MuiPagination
				variant="outlined"
				shape="rounded"
				count={pages}
				page={page}
				renderItem={(item) => (
					<PaginationItem
						component={Link}
						to={
							!isAdmin
								? keyword
									? (`/search/${keyword}/page/${item.page}`)
									:( `/page/${item.page}`)
								: (`/admin/productlist/${item.page}`)
						}
						{...item}
					/>
				)}
			/>
		)
	);
};

export default Paginate;
