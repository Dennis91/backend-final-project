import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHost from "../services/hosts/getHost.js";
import updateHost from "../services/hosts/updateHost.js";
import deleteHost from "../services/hosts/deleteHost.js";

import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const { name } = req.query;
		const hosts = await getHosts({ name });
		res.status(200).json(hosts);
	} catch (error) {
		next(error);
	}
});

router.post("/", authMiddleware, async (req, res, next) => {
	try {
		const host = req.body;
		const newHost = await createHost(host);
		res.status(201).json(newHost);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const host = await getHost(id);

		if (host) {
			res.status(200).json(host);
		} else {
			res.status(404).json({
				message: "Host not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

router.put("/:id", authMiddleware, async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedHost = req.body;
		const host = await updateHost(id, updatedHost);

		if (host) {
			res.status(200).send({
				message: "Host successfully updated",
			});
		} else {
			res.status(404).json({
				message: "Host not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
	try {
		const { id } = req.params;
		const host = await deleteHost(id);

		if (host) {
			res.status(200).send({
				message: "Host successfully deleted",
			});
		} else {
			res.status(404).json({
				message: "Host not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

export default router;
