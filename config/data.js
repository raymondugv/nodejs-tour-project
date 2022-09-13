const ROLE = [
	{ id: 1, name: "Admin" },
	{ id: 2, name: "Owner" },
	{ id: 3, name: "User" },
	{ id: 4, name: "Editor" },
];

const PERMISSION = [
	{
		id: 1,
		key: "create",
		table_name: [
			"users",
			"roles",
			"permissions",
			"cities",
			"tours",
			"countries",
		],
	},
	{
		id: 2,
		key: "read",
		table_name: [
			"users",
			"roles",
			"permissions",
			"cities",
			"tours",
			"countries",
		],
	},
	{
		id: 3,
		key: "update",
		table_name: [
			"users",
			"roles",
			"permissions",
			"cities",
			"tours",
			"countries",
		],
	},
	{
		id: 4,
		key: "delete",
		table_name: [
			"users",
			"roles",
			"permissions",
			"cities",
			"tours",
			"countries",
		],
	},
	{
		id: 5,
		key: "active",
		table_name: ["tours"],
	},
];

const PERMISSION_ROLE = [
	{
		permission_id: 1,
		role_id: 1,
	},
	{
		permission_id: 2,
		role_id: 1,
	},
	{
		permission_id: 3,
		role_id: 1,
	},
	{
		permission_id: 1,
		role_id: 2,
	},
	{
		permission_id: 2,
		role_id: 2,
	},
	{
		permission_id: 3,
		role_id: 2,
	},
	{
		permission_id: 4,
		role_id: 2,
	},
	{
		permission_id: 5,
		role_id: 4,
	},
];

const ACTIVE_FIELD = ["active", "status", "public", "published", "publish"];

module.exports = {
	ROLE: ROLE,
	PERMISSION: PERMISSION,
	PERMISSION_ROLE: PERMISSION_ROLE,
	ACTIVE_FIELD: ACTIVE_FIELD,
};
