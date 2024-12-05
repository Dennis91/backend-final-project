import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import createAmenity from "../services/amenities/createAmenity.js";
import getAmenity from "../services/amenities/getAmenity.js";
import updateAmenity from "../services/amenities/updateAmenity.js";
import deleteAmenity from "../services/amenities/deleteAmenity.js";

import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const amenities = await getAmenities();
		res.status(200).json(amenities);
	} catch (error) {
		next(error);
	}
});

router.post("/", authMiddleware, async (req, res, next) => {
	try {
		const amenity = req.body;
		const newAmenity = await createAmenity(amenity);
		res.status(201).json(newAmenity);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const amenity = await getAmenity(id);

		if (amenity) {
			res.status(200).json(amenity);
		} else {
			res.status(404).json({
				message: "Amenity not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

router.put("/:id", authMiddleware, async (req, res, next) => {
	try {
		const { id } = req.params;
		const amenity = req.body;
		const updatedAmenity = await updateAmenity(id, amenity);

		if (updatedAmenity) {
			res.status(200).send({
				message: "Amenity successfully updated",
			});
		} else {
			res.status(404).json({
				message: "Amenity not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedAmenity = await deleteAmenity(id);

		if (deletedAmenity) {
			res.status(200).send({
				message: "Amenity successfully deleted",
			});
		} else {
			res.status(404).json({
				message: "Amenity not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

export default router;
