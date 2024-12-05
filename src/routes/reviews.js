import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReview from "../services/reviews/getReview.js";
import updateReview from "../services/reviews/updateReview.js";
import deleteReview from "../services/reviews/deleteReview.js";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const reviews = await getReviews();
		res.status(200).json(reviews);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const review = req.body;
		const newReview = await createReview(review);
		res.status(201).json(newReview);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const review = await getReview(id);

		if (review) {
			res.status(200).json(review);
		} else {
			res.status(404).json({
				message: "Review not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedReview = req.body;
		const review = await updateReview(id, updatedReview);

		if (review) {
			res.status(200).send({
				message: "Review successfully updated",
			});
		} else {
			res.status(404).json({
				message: "Review not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const review = await deleteReview(id);

		if (review) {
			res.status(200).json({
				message: "Review successfully deleted",
			});
		} else {
			res.status(404).json({
				message: "Review not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

export default router;
