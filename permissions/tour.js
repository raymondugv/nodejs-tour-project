const canViewTour = (user) => {
	return user.roleId === 1 || user.roleId === 2;
};

const scopedTours = (user, tours) => {
	if (user.roleId === "1") {
		return tours;
	}

	return tours.filter((tour) => tour.owner === user.id);
};

const canDeleteTour = (user, tour) => {
	return tour.owner === user.id;
};

module.exports = {
	canViewTour,
	scopedTours,
	canDeleteTour,
};
