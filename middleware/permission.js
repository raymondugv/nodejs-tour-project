const { PERMISSION, PERMISSION_ROLE } = require("../config/data");

const verifyRoles = (action) => {
	return (req, res, next) => {
		const user = req.user;
		const endpoint = req.originalUrl.split("/")[1];

		const permission = PERMISSION.map(
			(item) => item.key == action && item.table_name.includes(endpoint)
		).find((val) => val === true);

		const permissionRole = PERMISSION_ROLE.map(
			(item) =>
				item.permission_id == permission && item.role_id == user.roleId
		).find((val) => val === true);

		if (!permission || !permissionRole)
			return res.status(403).json({
				error: "You don't have permission to perform this action.",
			});

		return next();
	};
};

module.exports = verifyRoles;
