import express from "express";
import "dotenv/config.js";
import * as Sentry from "@sentry/node";

import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import bookingsRouter from "./routes/bookings.js";
import reviewsRouter from "./routes/reviews.js";
import amenitiesRouter from "./routes/amenities.js";
import propertiesRouter from "./routes/properties.js";
import hostsRouter from "./routes/hosts.js";

import logMiddleware from "./middleware/log.js";
import errorMiddleware from "./middleware/error.js";

const app = express();

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	integrations: [
		new Sentry.Integrations.Http({ tracing: true }),
		new Sentry.Integrations.Express({ app }),
	],
	tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.get("/", (req, res) => {
	res.send("Hello world!");
});

app.use(express.json());
app.use(logMiddleware);

app.use("/users", usersRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewsRouter);
app.use("/amenities", amenitiesRouter);
app.use("/properties", propertiesRouter);
app.use("/hosts", hostsRouter);

app.use("/login", loginRouter);

app.use(Sentry.Handlers.errorHandler());

app.use(errorMiddleware);

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});
