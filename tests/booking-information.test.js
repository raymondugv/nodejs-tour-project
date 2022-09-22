const request = require("supertest");
const app = require("../app");

const { login, logout } = require("../tests/auth-test");

let token = "";

const CREATE_PAYLOAD = {
	tour_id: 1,
	customer_id: 1,
	number_of_pax: 1,
	departure_date: "2022-11-20",
};

const UPDATE_PAYLOAD = {
	tour_id: 1,
	customer_id: 2,
	number_of_pax: 4,
	departure_date: "2022-12-20",
	booking_status: 3,
	payment_status: 1,
};

describe("booking information functions with admin role", () => {
	beforeAll(async () => {
		const response = await login("admin@email.com", "admin");

		token = response.body.token;
	});

	test("get Booking list", async () => {
		const response = await request(app)
			.get("/booking-informations")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	test("create new Booking", async () => {
		const response = await request(app)
			.post("/booking-informations")
			.set("Authorization", `Bearer ${token}`)
			.send(CREATE_PAYLOAD);

		expect(response.statusCode).toBe(201);
	});

	test("get Booking detail", async () => {
		const response = await request(app)
			.get("/booking-informations/1")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
	});

	test("update Booking", async () => {
		const response = await request(app)
			.put("/booking-informations/1")
			.set("Authorization", `Bearer ${token}`)
			.send(UPDATE_PAYLOAD);

		expect(response.statusCode).toBe(200);
	});

	test("delete Booking", async () => {
		const response = await request(app)
			.delete("/booking-informations/1")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(403);
	});

	afterAll(async () => {
		await logout(token);
	});
});
