const request = require("supertest");
const app = require("../app");

const { login, logout } = require("../tests/auth-test");

let token = "";

const CREATE_PAYLOAD = {
	name: "New test country 2",
};

describe("countries function with admin role", () => {
	beforeAll(async () => {
		const response = await login("admin@email.com", "admin");

		token = response.body.token;
	});

	test("get countries list", async () => {
		const response = await request(app)
			.get("/countries")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	afterAll(async () => {
		await logout(token).then((token = ""));
	});
});
