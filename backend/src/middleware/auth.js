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
		const error = new Error("Not authorized, token missing.");
		error.type = "auth";
		next(error);
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		error.type = "auth";
		error.message = "Not authorized, token failed.";
		next(error);
	}
};

export const isAdmin = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		const error = new Error("Not authorized. Admin only.");
		error.type = "auth";
		error.code = 403;
		next(error);
	}
};
