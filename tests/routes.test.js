const request = require("supertest");
const app = require("../app");
let token = "";

beforeAll(async () => {
	const response = await request(app).post("/login").send({
		email: "admin@admin.com",
		password: "admin",
	});

	token = response.body.token;
});
