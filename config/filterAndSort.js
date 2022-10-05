const { Op } = require("sequelize");

const sortFunction = (field) => {
	if (!field) return;

	const order = [];

	if (Array.isArray(field)) {
		field.forEach((item) => {
			const [key, value] = item.split(",");
			order.push([key, value]);
		});
	} else {
		const [key, value] = field.split(",");
		order.push([key, value]);
	}

	return order;
};

const filterFunction = (query) => {
	const order = {};

	if (query.greater) {
		const [key, value] = query.greater.split(",");
		order[key] = { [Op.gt]: value };
	}

	if (query.less) {
		const [key, value] = query.less.split(",");
		order[key] = { [Op.lt]: value };
	}

	if (query.greater_or_equal) {
		const [key, value] = query.greater_or_equal.split(",");
		order[key] = { [Op.gte]: value };
	}

	if (query.less_or_equal) {
		const [key, value] = query.less_or_equal.split(",");
		order[key] = { [Op.lte]: value };
	}

	if (query.between) {
		const [key, value1, value2] = query.between.split(",");
		order[key] = { [Op.between]: [value1, value2] };
	}

	if (query.not_between) {
		const [key, value1, value2] = query.not_between.split(",");
		order[key] = { [Op.notBetween]: [value1, value2] };
	}

	return order;
};

module.exports = { filterFunction, sortFunction };
