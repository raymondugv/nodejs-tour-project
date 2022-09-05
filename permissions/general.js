const canViewItem = (user, tour) => {
	return user.roleId === 1 || user.roleId === 2 || tour.owner === user.id;
};

const scopedItems = (user, tours) => {
	if (user.roleId === "1") {
		return tours;
	}

	return tours.filter((tour) => tour.owner === user.id);
};

const canDeleteItem = (user, tour) => {
	return tour.owner === user.id;
};

const canEditItem = (user, tour) => {
	return tour.owner === user.id;
};

module.exports = {
	canViewItem: canViewItem,
	scopedItems: scopedItems,
	canDeleteItem: canDeleteItem,
	canEditItem: canEditItem,
};
