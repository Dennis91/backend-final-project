const errorMiddleware = (err, req, res, next) => {
	console.error(err);
	res.status(500).send("Something broke!");
};

export default errorMiddleware;
