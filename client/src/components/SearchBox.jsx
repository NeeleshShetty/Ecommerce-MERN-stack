import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SearchForm = () => {
	const navigate = useNavigate();
	const { keyword: urlKeyword } = useParams();
	const [keyword, setKeyword] = useState(urlKeyword || '');

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword) {
			navigate('/searchpage')
			navigate(`/search/${keyword.trim()}`);
			setKeyword('');
		} else {
			navigate('/');
		}

		
	};

	return (
		<form
			onSubmit={submitHandler}
			className="flex"
		>
			<input
				type="text"
				name="q"
				onChange={(e) => setKeyword(e.target.value)}
				value={keyword}
				placeholder="Search Products..."
				className="mr-2 ml-5 border-2 border-gray-300 rounded-md p-2"
			/>
			<button
				type="submit"
				className="p-2 mx-2 bg-gray-500 text-white rounded-md"
			>
				Search
			</button>
		</form>
	);
};

export default SearchForm;
