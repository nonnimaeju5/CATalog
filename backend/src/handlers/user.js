import prisma from "../db.js";
import {
	createToken,
	hashPassword,
	comparePassword,
} from "../middleware/auth.js";

export const createNewUser = async (req, res) => {
	const user = await prisma.user.create({
		data: {
			username: req.body.username.toLowerCase(),
			password: await hashPassword(req.body.password),
		},
	});
	const token = createToken(user);
	res.json({ token });
};

export const signIn = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			username: req.body.username.toLowerCase(),
		},
	});
	if (user && (await comparePassword(req.body.password, user.password))) {
		const token = createToken(user);
		res.json({ token });
	} else {
		res.status(401);
		throw new Error("Invalid username or password");
	}
};
