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
	READ: [
		{ role: ROLE.ADMIN, field: [] },
		{ role: ROLE.OWNER, field: [] },
	],
	CREATE: [
		{ role: ROLE.ADMIN, field: [] },
		{ role: ROLE.OWNER, field: [] },
	],
	UPDATE: [
		{ role: ROLE.ADMIN, field: [] },
		{ role: ROLE.OWNER, field: [] },
	],
	DELETE: [{ role: ROLE.OWNER, field: [] }],
	ACTIVE: [{ role: ROLE.EDITOR, field: ["status"] }],
};

module.exports = {
	ROLE: ROLE,
	PERMISSION: PERMISSION,
	PERMISSION_ROLE: PERMISSION_ROLE,
};
