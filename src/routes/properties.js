import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import getProperty from "../services/properties/getProperty.js";
import updateProperty from "../services/properties/updateProperty.js";
import deleteProperty from "../services/properties/deleteProperty.js";

import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const { location, pricePerNight, amenities } = req.query;
		const properties = await getProperties({
			location,
			pricePerNight,
			amenities,
		});
		res.status(200).json(properties);
	} catch (error) {
		next(error);
	}
});

router.post("/", authMiddleware, async (req, res, next) => {
	try {
		const newProperty = req.body;
		const property = await createProperty(newProperty);
		res.status(201).json(property);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const property = await getProperty(id);

		if (property) {
			res.status(200).json(property);
		} else {
			res.status(404).json({
				message: "Property not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

router.put("/:id", authMiddleware, async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedProperty = req.body;
		const property = await updateProperty(id, updatedProperty);

		if (property) {
			res.status(200).send({
				message: "Property successfully updated",
			});
		} else {
			res.status(404).json({
				message: "Property not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedProperty = await deleteProperty(id);

		if (deletedProperty) {
			res.status(200).send({
				message: "Property successfully deleted",
			});
		} else {
			res.status(404).json({
				message: "Property not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

export default router;
