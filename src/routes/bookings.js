import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import createBooking from "../services/bookings/createBooking.js";
import getBooking from "../services/bookings/getBooking.js";
import updateBooking from "../services/bookings/updateBooking.js";
import deleteBooking from "../services/bookings/deleteBooking.js";

import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const { userId } = req.query;
		const bookings = await getBookings({ userId });
		res.status(200).json(bookings);
	} catch (error) {
		next(error);
	}
});

router.post("/", authMiddleware, async (req, res, next) => {
	try {
		const newBooking = req.body;
		const booking = await createBooking(newBooking);
		res.status(201).json(booking);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const booking = await getBooking(id);

		if (booking) {
			res.status(200).json(booking);
		} else {
			res.status(404).json({
				message: "Booking not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

router.put("/:id", authMiddleware, async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedBooking = req.body;
		const booking = await updateBooking(id, updatedBooking);

		if (booking) {
			res.status(200).send({
				message: "Booking successfully updated",
			});
		} else {
			res.status(404).json({
				message: "Booking not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedBooking = await deleteBooking(id);

		if (deletedBooking) {
			res.status(200).send({
				message: "Booking successfully deleted",
			});
		} else {
			res.status(404).json({
				message: "Booking not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

export default router;
