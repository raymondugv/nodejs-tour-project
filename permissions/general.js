const { ROLE, PERMISSION_ROLE } = require("../config/data");
const isOwner = (user, item) => {
	return item.owner === user.id;
};

const canViewItem = (user, item) => {
	return PERMISSION_ROLE.READ.includes(user.roleId) || isOwner(user, item);
};

const scopedItems = (user, items) => {
	if (user.roleId === ROLE.ADMIN) {
		return items;
	}

	return items.filter((item) => isOwner(user, item));
};

const canDeleteItem = (user, item) => {
	return PERMISSION_ROLE.DELETE.includes(user.roleId) || isOwner(user, item);
};

const canEditItem = (user, item) => {
	return PERMISSION_ROLE.UPDATE.includes(user.roleId) || isOwner(user, item);
};

module.exports = {
	canViewItem,
	scopedItems,
	canDeleteItem,
	canEditItem,
};
