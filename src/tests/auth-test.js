const request = require("supertest");
const app = require("@app");

const login = async (user, password) => {
	return await request(app)
		.post("/login")
		.send({ email: user, password: password });
};

const logout = async (token) => {
	return await request(app)
		.post("/logout")
		.set("Authorization", `Bearer ${token}`);
};

module.exports = {
	login,
	logout,
};
