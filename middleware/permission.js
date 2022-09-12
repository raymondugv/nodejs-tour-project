const {
	canViewItem,
	canDeleteItem,
	canEditItem,
	canActiveItem,
} = require("../permissions/general");

const { PERMISSION, PERMISSION_ROLE } = require("../config/data");

module.exports = (req, res, next) => {
	// const condition =
	// 	canActiveItem(req.user, req.body) ||
	// 	canViewItem(req.user, req.item) ||
	// 	canEditItem(req.user, req.item) ||
	// 	canDeleteItem(req.user, req.item);

	const permission = PERMISSION.find((item) => {
		return item.table_name.includes(req.endpoint);
	});

	const permission_role = PERMISSION_ROLE.find((item) => {
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
