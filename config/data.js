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
	READ: [ROLE.ADMIN, ROLE.OWNER],
	CREATE: [ROLE.ADMIN, ROLE.OWNER],
	UPDATE: [ROLE.ADMIN, ROLE.OWNER],
	DELETE: [ROLE.OWNER],
	ACTIVE: [ROLE.EDITOR],
};

const ACTIVE_FIELD = ["active", "status", "public", "published", "publish"];

module.exports = {
	ROLE: ROLE,
	PERMISSION: PERMISSION,
	PERMISSION_ROLE: PERMISSION_ROLE,
	ACTIVE_FIELD: ACTIVE_FIELD,
};
