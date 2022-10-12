const request = require("supertest");
const app = require("@app");

const { login, logout } = require("@tests/auth-test");

let token = "";

const CREATE_PAYLOAD = {
	name: "New test country",
};

const UPDATE_PAYLOAD = {
	name: "Update test country",
};

describe("countries function with admin role", () => {
	beforeAll(async () => {
		const response = await login("admin@email.com", "admin");

		token = response.body.token;
	});

	test("get Country list", async () => {
		const response = await request(app)
			.get("/countries")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	test("get Country detail", async () => {
		const response = await request(app)
			.get("/countries/1")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	test("create new Country", async () => {
		const response = await request(app)
			.post("/countries")
			.set("Authorization", `Bearer ${token}`)
			.send(CREATE_PAYLOAD);

		expect(response.statusCode).toBe(201);
	});

	test("update Country", async () => {
		const response = await request(app)
			.put("/countries/1")
			.set("Authorization", `Bearer ${token}`)
			.send(UPDATE_PAYLOAD);

		expect(response.statusCode).toBe(200);
	});

	test("delete Country", async () => {
		const response = await request(app)
			.delete("/countries/4")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	afterAll(async () => {
		await logout(token).then((token = ""));
	});
});
