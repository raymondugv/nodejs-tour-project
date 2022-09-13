const { PERMISSION, PERMISSION_ROLE } = require("../config/data");

const verifyRoles = (action) => {
	return (req, res, next) => {
		const { user, endpoint } = req;

		const permission = PERMISSION.map(
			(item) => item.key == action && item.table_name.includes(endpoint)
		).find((val) => val === true);

		const permissionRole = PERMISSION_ROLE.map(
			(item) =>
				item.permission_id == permission && item.role_id == user.roleId
		).find((val) => val === true);

		// res.json({ permission, permissionRole });

		if (!permission || !permissionRole)
			res.status(403).json({
				error: "You don't have permission to perform this action.",
			});

		next();
	};
};

module.exports = verifyRoles;
