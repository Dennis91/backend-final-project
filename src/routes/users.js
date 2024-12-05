import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUser from "../services/users/getUser.js";
import updateUser from "../services/users/updateUser.js";
import deleteUser from "../services/users/deleteUser.js";
import authMiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const { username, email } = req.query;
		const users = await getUsers({ username, email });
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
});

router.post("/", authMiddleware, async (req, res, next) => {
	try {
		const newUser = req.body;
		const user = await createUser(newUser);
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await getUser(id);

		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({
				message: "User not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

router.put("/:id", authMiddleware, async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedUser = req.body;
		const user = await updateUser(id, updatedUser);

		if (user) {
			res.status(200).send({
				message: "User successfully updated",
			});
		} else {
			res.status(404).json({
				message: "User not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await deleteUser(id);

		if (user) {
			res.status(200).json({
				message: "User successfully deleted",
			});
		} else {
			res.status(404).json({
				message: "User not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

export default router;
