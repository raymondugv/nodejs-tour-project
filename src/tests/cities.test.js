const request = require("supertest");
const app = require("@app");

const { login, logout } = require("@tests/auth-test");

let token = "";

const CREATE_PAYLOAD = {
	name: "New City",
	country: 1,
	slug: "new-city",
	description: "This is new city",
};

const UPDATE_PAYLOAD = {
	name: "New City Updated",
	country: 1,
	slug: "new-city-updated",
	description: "This is new city updated",
};

describe("cities functions with admin role", () => {
	beforeAll(async () => {
		const response = await login("admin@email.com", "admin");

		token = response.body.token;
	});

	test("get City list", async () => {
		const response = await request(app)
			.get("/cities")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	test("get City detail", async () => {
		const response = await request(app)
			.get("/cities/1")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	test("create new City", async () => {
		const response = await request(app)
			.post("/cities")
			.set("Authorization", `Bearer ${token}`)
			.send(CREATE_PAYLOAD);

		expect(response.statusCode).toBe(201);
	});

	test("update City", async () => {
		const response = await request(app)
			.put("/cities/1")
			.set("Authorization", `Bearer ${token}`)
			.send(UPDATE_PAYLOAD);

		expect(response.statusCode).toBe(200);
	});

	test("delete City", async () => {
		const response = await request(app)
			.delete("/cities/2")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	afterAll(async () => {
		await logout(token).then((token = ""));
	});
});
