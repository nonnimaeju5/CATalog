import prisma from "../db.js";
import {
	createToken,
	hashPassword,
	comparePassword,
} from "../middleware/auth.js";

export const createNewUser = async (req, res, next) => {
	try {
		const isUserInDB = await prisma.user.findUnique({
			where: {
				username: req.body.username.toLowerCase(),
			},
		});
		if (isUserInDB) {
			throw new Error("User already exists. Please try another username.");
		}
		const user = await prisma.user.create({
			data: {
				username: req.body.username.toLowerCase(),
				password: await hashPassword(req.body.password),
			},
		});
		const token = createToken(user);
		return res.json({ token });
	} catch (e) {
		e.type = "input";
		next(e);
	}
};

export const signIn = async (req, res, next) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				username: req.body.username.toLowerCase(),
			},
		});
		if (user && (await comparePassword(req.body.password, user.password))) {
			const token = createToken(user);
			res.json({ token });
		} else {
			throw new Error("Invalid username or password");
		}
	} catch (e) {
		e.type = "input";
		console.log("Error: ", e);
		next(e);
	}
};
