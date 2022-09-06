const ROLE = {
	ADMIN: 1,
	OWNER: 2,
	USER: 3,
	EDITOR: 4,
};

const PERMISSION = {
	CREATE: 1,
	UPDATE: 2,
	DELETE: 3,
	ACTIVE: 4,
};

const PERMISSION_ROLE = {
	READ: { role: [ROLE.ADMIN, ROLE.OWNER], field: null },
	CREATE: { role: [ROLE.ADMIN, ROLE.OWNER], field: null },
	UPDATE: { role: [ROLE.ADMIN, ROLE.OWNER], field: null },
	DELETE: { role: [ROLE.OWNER], field: null },
	ACTIVE: { role: [ROLE.EDITOR], field: ["active"] },
};

module.exports = {
	ROLE: ROLE,
	PERMISSION: PERMISSION,
	PERMISSION_ROLE: PERMISSION_ROLE,
};
