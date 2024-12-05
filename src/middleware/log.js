import logger from "../utils/log.js";

const logMiddleware = (req, res, next) => {
	const start = new Date();

	next();

	const ms = new Date() - start;
	logger.info(
		`${req.method} ${req.originalUrl} - Duration: ${ms} ms - ${res.statusCode}`
	);
};

export default logMiddleware;
