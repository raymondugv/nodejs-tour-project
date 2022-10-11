const getPagination = (query) => {
	const page = query.page ? +query.page : 1;
	const size = query.size ? +query.size : 10;

	const limit = size ? +size : 3;
	const offset = page ? (page - 1) * limit : 0;

	return { limit, offset, page };
};

const getPagingData = (endpoint, data, page, limit) => {
	const { count: totalItems, rows } = data;

	const maxId = Math.max.apply(
		Math,
		rows.map((o) => o.id)
	);

	const minId = Math.min.apply(
		Math,
		rows.map((o) => o.id)
	);

	const currentPage = page ? +page : 1;
	const totalPages = Math.ceil(totalItems / limit);

	return {
		total: totalItems,
		per_page: limit,
		current_page: currentPage,
		last_page: totalPages,
		first_page_url: `/${endpoint}?size=${limit}&page=1`,
		last_page_url: `/${endpoint}?size=${limit}&page=${totalPages}`,
		next_page_url:
			currentPage == totalPages
				? null
				: `/${endpoint}?size=${limit}&page=${currentPage + 1}`,
		prev_page_url:
			currentPage == 1
				? null
				: `/${endpoint}?size=${limit}&page=${currentPage - 1}`,
		from: maxId,
		to: minId,
		data: rows,
	};
};

module.exports = { getPagination, getPagingData };
