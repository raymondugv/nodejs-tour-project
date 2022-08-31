const canViewUser = (user, userToView) => {
	return user.roleId === 1 || user.id === userToView.id;
};

const canEditUser = (user, userToEdit) => {
	return user.id === userToEdit.id;
};

const canDeleteUser = (user, userToDelete) => {
	return user.id === userToDelete.id;
};

module.exports = {
	canViewUser,
	canEditUser,
	canDeleteUser,
};
