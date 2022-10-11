const request = require("supertest");
const app = require("@app");
const { login, logout } = require("@tests/auth-test");
const { ROLE } = require("@config/data");

const random = Array(5)
	.fill()
	.map(() => ((Math.random() * 36) | 0).toString(36))
	.join("");

const CREATE_PAYLOAD = {
	name: "New User",
	email: "new-user@email.com",
	password: "password",
	role_id: 4,
};

const UPDATE_PAYLOAD = {
	name: "Update User",
	email: "update-user-" + random + "@email.com",
	password: "password",
	role_id: 4,
};

let token = "";

describe("user functions with admin role", () => {
	beforeAll(async () => {
		const response = await login("admin@email.com", "admin");

		token = response.body.token;
	});

	test("get User list", async () => {
		const response = await request(app)
			.get("/users")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	test("create new User", async () => {
		const response = await request(app)
			.post("/users")
			.set("Authorization", `Bearer ${token}`)
			.send(CREATE_PAYLOAD);

		expect(response.statusCode).toBe(201);
	});

	test("update User information", async () => {
		const response = await request(app)
			.put("/users/5")
			.set("Authorization", `Bearer ${token}`)
			.send(UPDATE_PAYLOAD);

		expect(response.statusCode).toBe(200);
	});

	test("delete User", async () => {
		const response = await request(app)
			.delete("/users/4")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	afterAll(async () => {
		await logout(token).then((token = ""));
	});
});
