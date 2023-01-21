import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createToken = (user) => {
	const token = jwt.sign(
		{
			id: user.id,
			username: user.username,
			role: user.role,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: "1h",
		}
	);
	return token;
};

export const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
	const isMatch = await bcrypt.compare(password, hashedPassword);
	return isMatch;
};

export const protect = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	console.log("token: ", token);
	if (!token) {
		res.status(401);
		throw new Error("Not authorized, no token");
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401);
		throw new Error("Not authorized, token failed");
	}
};
