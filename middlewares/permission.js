import { PERMISSION, PERMISSION_ROLE } from "@config/data";

export default (req, res, next) => {
	const { user, method, originalUrl } = req;
	const endpoint = originalUrl.split("/")[1];
	const url = originalUrl.split("/")[3];

	let action = "";

	switch (method) {
		case "GET":
			action = "read";
			break;
		case "POST":
			if (url == "active") {
				action = "active";
			} else {
				action = "create";
			}
			break;
		case "PUT":
			action = "update";
			break;
		case "DELETE":
			action = "delete";
			break;
	}

	const permission = PERMISSION.find((item) => {
		return item.key == action && item.table_name.includes(endpoint);
	});

	const permissionRole = PERMISSION_ROLE.map(
		(item) =>
			item.permission_id == permission.id && item.role_id == user.roleId
	).find((val) => val === true);

	if (!permission || !permissionRole)
		return res.status(403).json({
			error: "You don't have permission to perform this action.",
		});

	return next();
};
