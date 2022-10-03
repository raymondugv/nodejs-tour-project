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
			"booking-informations",
			"customer-informations",
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
			"booking-informations",
			"customer-informations",
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
			"booking-informations",
			"customer-informations",
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
			"booking-informations",
			"customer-informations",
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
		role_id: 1,
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

const BOOKING_STATUS = {
	NEW_BOOKING: "1",
	PROCESSING: "2",
	CONFIRMED: "3",
	CANCELLED: "4",
	COMPLETED: "5",
};

const PAYMENT_STATUS = {
	WAITING_FOR_PAYMENT: "1",
	PAID: "2",
	REFUNDED: "3",
};

const GENDER = {
	MALE: "0",
	FEMALE: "1",
};

module.exports = {
	ROLE: ROLE,
	PERMISSION: PERMISSION,
	PERMISSION_ROLE: PERMISSION_ROLE,
	ACTIVE_FIELD: ACTIVE_FIELD,
	BOOKING_STATUS: BOOKING_STATUS,
	PAYMENT_STATUS: PAYMENT_STATUS,
	GENDER: GENDER,
};
