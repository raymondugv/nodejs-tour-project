const request = require("supertest");
const app = require("../app");
const formData = require("form-data");

const { login, logout } = require("../tests/auth-test");

const random = Array(5)
	.fill()
	.map(() => ((Math.random() * 36) | 0).toString(36))
	.join("");

let token = "";

describe("tour functions with admin role", () => {
	beforeAll(async () => {
		const response = await login("admin@email.com", "admin");

		token = response.body.token;
	});

	test("get all tour", async () => {
		const response = await request(app)
			.get("/tours")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	test("create tour", async () => {
		const response = await request(app)
			.post("/tours")
			.field("title", "This is tour title " + random)
			.field("slug", "this-is-tour-slug-" + random)
			.field("description", "This is tour description " + random)
			.field("price", 1000000)
			.field("departure_date", "2022/11/20")
			.field("departure", 1)
			.field("arrival", 2)
			.field("categories[]", 1)
			.field("categories[]", 2)
			.attach("image", "tests\\example.png")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(201);
	});

	test("get tour by id", async () => {
		const response = await request(app)
			.get("/tours/1")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	test("update tour", async () => {
		const response = await request(app)
			.put("/tours/1")
			.field("title", "This is tour title update " + random)
			.field("slug", "this-is-tour-slug-update-" + random)
			.field("description", "This is tour description update " + random)
			.field("price", 1000000)
			.field("departure_date", "2022/11/20")
			.field("departure", 1)
			.field("arrival", 2)
			.field("categories[]", 3)
			.field("categories[]", 4)
			.attach("image", "tests\\example.png")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	test("delete tour", async () => {
		const response = await request(app)
			.delete("/tours/1")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	afterAll(async () => {
		await logout(token).then((token = ""));
	});
});
