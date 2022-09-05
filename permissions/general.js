const { ROLE, PERMISSION, PERMISSION_ROLE } = require("../data");

const canViewItem = (user, item) => {
	return (
		user.roleId === ROLE.ADMIN ||
		user.roleId === ROLE.OWNER ||
		item.owner === user.id
	);
};

const scopedItems = (user, items) => {
	if (user.roleId === ROLE.ADMIN) {
		return items;
	}

	return items.filter((item) => item.owner === user.id);
};

const canDeleteItem = (user, item) => {
	return item.owner === user.id;
};

const canEditItem = (user, item) => {
	return item.owner === user.id;
};

module.exports = {
	canViewItem,
	scopedItems,
	canDeleteItem,
	canEditItem,
};
