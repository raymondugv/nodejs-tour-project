export const exchange = (amount) => {
	return amount.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
