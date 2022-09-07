const request = require("supertest");
const app = require("../app");

test("Login endpoint", async () => {
	const res = await request(app).post("/login").send({
		email: "admin@admin.com",
		password: "admin",
	});

	expect(res.statusCode).toEqual(200);
	expect(res.body).toHaveProperty("token");
});
