function redis_config(type = "default") {
	if (type == "url") {
		return { url: process.env.REDIS_URL };
	}

	return {
		host: config.redis.host,
		port: config.redis.port,
	};
}

export default redis_config;
