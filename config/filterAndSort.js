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
	const where = {};
	const { page, size, ...rest } = query;

	Object.keys(rest).forEach((key) => {
		switch (key) {
			case "greater":
				var [key, value] = rest[key].split(",");
				where[key] = {
					...(where[key] || {}),
					[Op.gt]: value,
				};
				break;
			case "greater_or_equal":
				var [key, value] = rest[key].split(",");
				where[key] = {
					...(where[key] || {}),
					[Op.gte]: value,
				};
				break;
			case "less":
				var [key, value] = rest[key].split(",");
				where[key] = {
					...(where[key] || {}),
					[Op.lt]: value,
				};
				break;
			case "less_or_equal":
				var [key, value] = rest[key].split(",");
				where[key] = {
					...(where[key] || {}),
					[Op.lte]: value,
				};
				break;
			case "like":
				var [key, value] = rest[key].split(",");
				where[key] = {
					...(where[key] || {}),
					[Op.like]: value,
				};
				break;
			case "not_like":
				var [key, value] = rest[key].split(",");
				where[key] = {
					...(where[key] || {}),
					[Op.notLike]: value,
				};
				break;
			case "between":
				var [key, value1, value2] = rest[key].split(",");
				where[key] = {
					...(where[key] || {}),
					[Op.between]: [value1, value2],
				};
				break;
			case "not_between":
				var [key, value1, value2] = rest[key].split(",");
				where[key] = {
					...(where[key] || {}),
					[Op.notBetween]: [value1, value2],
				};
				break;
			case "equal":
				var [key, value] = rest[key].split(",");
				where[key] = {
					...(where[key] || {}),
					[Op.eq]: value,
				};
				break;
			case "not_equal":
				var [key, value] = rest[key].split(",");
				where[key] = {
					...(where[key] || {}),
					[Op.ne]: value,
				};
				break;
			case "starts_with":
				var [key, value] = rest[key].split(",");
				where[key] = {
					...(where[key] || {}),
					[Op.startsWith]: value,
				};
				break;
			case "ends_with":
				var [key, value] = rest[key].split(",");
				where[key] = {
					...(where[key] || {}),
					[Op.endsWith]: value,
				};
				break;
			case "substring":
				var [key, value] = rest[key].split(",");
				where[key] = {
					[Op.substring]: value,
				};
				break;
		}
	});

	return where;
};

module.exports = {
	filterFunction,
	sortFunction,
};
