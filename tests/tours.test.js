const request = require("supertest");
const app = require("../app");
const random = Array(5)
	.fill()
	.map(() => ((Math.random() * 36) | 0).toString(36))
	.join("");

const CREATE_PAYLOAD = {
	title: "This is tour title " + random,
	slug: "this-is-tour-slug-" + random,
	description: "this is description",
	image: "image",
	price: 1000000,
	departure_date: "2022/11/20",
	departure: 1,
	arrival: 1,
};

const UPDATE_PAYLOAD = {
	title: "This is tour title " + random + " updated",
	slug: "this-is-tour-slug-" + random + "-updated",
	description: "this is description",
	image: "image",
	price: 1000000,
	departure_date: "2022/11/20",
	departure: 1,
	arrival: 1,
};

let token = "";

const login = async (user, password) => {
	return await request(app)
		.post("/login")
		.send({ email: user, password: password });
};

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
			.set("Authorization", `Bearer ${token}`)
			.send(CREATE_PAYLOAD);

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
			.set("Authorization", `Bearer ${token}`)
			.send(UPDATE_PAYLOAD);

		expect(response.statusCode).toBe(200);
	});

	afterAll(() => {
		token = "";
	});
});
