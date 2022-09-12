const { PERMISSION, PERMISSION_ROLE } = require("../config/data");

module.exports = (req, res, next) => {
	const permission = PERMISSION.find((item) => {
		// check if the endpoint is in the permission table
		return item.table_name.includes(req.endpoint);
	});

	const permission_role = PERMISSION_ROLE.find((item) => {
		// check if the user role is in the permission_role table
		return (
			item.permission_id === permission.id &&
			item.role_id === req.user.roleId
		);
	});

	if (!permission || !permission_role) {
		return res.status(403).json({
			error: "You do not have permission to perform this action.",
		});
	}

	next();
};
