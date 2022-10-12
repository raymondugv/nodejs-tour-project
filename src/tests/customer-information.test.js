const request = require("supertest");
const app = require("@app");

const { login, logout } = require("@tests/auth-test");

let token = "";

const CREATE_PAYLOAD = {
	name: "Customer Name",
	email: "email222@email-example.com",
	phone: "0123456785",
	gender: "0",
};

const UPDATE_PAYLOAD = {
	name: "Customer Name",
	phone: "0123456789",
	gender: "0",
	email: "updated-email@example.com",
};

describe("customer information functions with admin role", () => {
	beforeAll(async () => {
		const response = await login("admin@email.com", "admin");

		token = response.body.token;
	});

	test("get Customer list", async () => {
		const response = await request(app)
			.get("/customer-informations")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	test("create new Customer", async () => {
		const response = await request(app)
			.post("/customer-informations")
			.set("Authorization", `Bearer ${token}`)
			.send(CREATE_PAYLOAD);

		expect(response.statusCode).toBe(201);
	});

	test("get Customer detail", async () => {
		const response = await request(app)
			.get("/customer-informations/1")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	test("update Customer", async () => {
		const response = await request(app)
			.put("/customer-informations/1")
			.set("Authorization", `Bearer ${token}`)
			.send(UPDATE_PAYLOAD);

		expect(response.statusCode).toBe(200);
	});

	test("delete Customer", async () => {
		const response = await request(app)
			.delete("/customer-informations/1")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	afterAll(async () => {
		await logout(token);
	});
});
