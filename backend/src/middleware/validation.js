import { body, validationResult } from "express-validator";

export const handleInputErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error("Input validation failed");
		error.type = "input";
		error.code = 400;
		error.errors = errors.array();
		error.message = error.errors.map((e) => e.msg).join(" ");
		next(error);
	}
	next();
};

export const signUpValidation = [
	body("username")
		.isLength({ min: 5 })
		.trim()
		.withMessage(
			"Username is too short. Username must be at least 5 characters long."
		),
	body("password")
		.isStrongPassword({ minSymbols: 0 })
		.withMessage(
			"Password is too weak. Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number."
		),
];

export const signInValidation = [
	body("username")
		.trim()
		.isLength({ min: 1 })
		.withMessage("Username is required."),
	body("password")
		.trim()
		.isLength({ min: 1 })
		.withMessage("Password is required."),
];
