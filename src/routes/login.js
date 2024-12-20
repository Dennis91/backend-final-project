import { Router } from "express";
import login from "../services/login.js";

const router = Router();

router.post("/", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const token = await login(username, password);

		if (!token) {
			res.status(401).json({ message: "Invalid credentials" });
		} else {
			res.status(200).json({ token: token });
		}
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
});

export default router;
