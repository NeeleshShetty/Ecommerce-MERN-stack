

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<div className="p-3 mb-3">
			<div>
				<div className="">
					<span className="text-center py-3">
						<p>ProShop &copy; {currentYear}</p>
					</span>
				</div>
			</div>
		</div>
	);
};
export default Footer;
