const errorMiddleware = (err, req, res, next) => {
	console.error(err);
	res
		.status(400)
		.send("An error occurred on the server, please double-check your request!");
};

export default errorMiddleware;
